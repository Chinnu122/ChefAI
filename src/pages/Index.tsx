import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { IngredientInput } from "@/components/IngredientInput";
import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, LogOut, BookMarked } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      toast.error("Please add at least one ingredient");
      return;
    }

    setLoading(true);
    setRecipe(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-recipe', {
        body: { ingredients }
      });

      if (error) throw error;

      setRecipe(data);
      toast.success("Recipe generated!");
    } catch (error) {
      console.error('Error generating recipe:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("429")) {
        toast.error("Rate limit exceeded. Please try again later.");
      } else if (errorMessage.includes("402")) {
        toast.error("AI credits depleted. Please add more credits.");
      } else {
        toast.error("Failed to generate recipe. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recipe Finder</h2>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/saved-recipes")}
                >
                  <BookMarked className="w-4 h-4 mr-2" />
                  My Recipes
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate("/auth")}>
                Log In
              </Button>
            )}
          </div>
        </div>
      </header>

      <Hero />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">What's in Your Kitchen?</h2>
            <p className="text-muted-foreground text-lg">
              Add your ingredients and let AI create a delicious recipe
            </p>
          </div>

          <IngredientInput 
            ingredients={ingredients} 
            onIngredientsChange={setIngredients} 
          />

          <div className="flex justify-center mt-6">
            <Button 
              size="lg" 
              onClick={handleGenerateRecipe}
              disabled={loading || ingredients.length === 0}
              className="px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Recipe"
              )}
            </Button>
          </div>
        </section>

        {recipe && (
          <section className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <RecipeCard recipe={recipe} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Powered by AI • Create delicious meals from your ingredients</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;