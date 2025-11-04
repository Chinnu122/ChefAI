import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SavedRecipe {
  id: string;
  title: string;
  description: string | null;
  ingredients: string[];
  instructions: string[];
  prep_time: string | null;
  cook_time: string | null;
  servings: number | null;
  is_favorite: boolean;
}

export default function SavedRecipes() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchRecipes();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRecipes((data || []).map(recipe => ({
        ...recipe,
        ingredients: recipe.ingredients as string[],
        instructions: recipe.instructions as string[],
      })));
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast.error("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (recipeId: string, currentFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .update({ is_favorite: !currentFavorite })
        .eq('id', recipeId);

      if (error) throw error;

      setRecipes(recipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, is_favorite: !currentFavorite }
          : recipe
      ));

      toast.success(currentFavorite ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error("Failed to update favorite status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold mb-2">My Saved Recipes</h1>
          <p className="text-muted-foreground">
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              You haven't saved any recipes yet
            </p>
            <Button onClick={() => navigate("/")}>
              Generate Your First Recipe
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={{
                  id: recipe.id,
                  title: recipe.title,
                  description: recipe.description || "",
                  ingredients: recipe.ingredients,
                  instructions: recipe.instructions,
                  prepTime: recipe.prep_time || undefined,
                  cookTime: recipe.cook_time || undefined,
                  servings: recipe.servings || undefined,
                  isFavorite: recipe.is_favorite,
                }}
                onFavoriteToggle={() => handleFavoriteToggle(recipe.id, recipe.is_favorite)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}