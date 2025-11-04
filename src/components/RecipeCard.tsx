import { Clock, Users, Heart, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Recipe {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  isFavorite?: boolean;
}

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteToggle?: () => void;
}

export const RecipeCard = ({ recipe, onFavoriteToggle }: RecipeCardProps) => {
  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please log in to save recipes");
        return;
      }

      const { error } = await supabase
        .from('recipes')
        .insert({
          user_id: user.id,
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          prep_time: recipe.prepTime,
          cook_time: recipe.cookTime,
          servings: recipe.servings,
        });

      if (error) throw error;

      toast.success("Recipe saved successfully!");
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error("Failed to save recipe");
    }
  };

  const handleShare = () => {
    const text = `Check out this recipe: ${recipe.title}`;
    if (navigator.share) {
      navigator.share({ title: recipe.title, text });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Recipe link copied to clipboard!");
    }
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-smooth">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{recipe.title}</CardTitle>
            <CardDescription className="text-base">{recipe.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            {recipe.id && onFavoriteToggle && (
              <Button variant="ghost" size="icon" onClick={onFavoriteToggle}>
                <Heart className={`w-4 h-4 ${recipe.isFavorite ? 'fill-accent text-accent' : ''}`} />
              </Button>
            )}
            {!recipe.id && (
              <Button variant="ghost" size="icon" onClick={handleSave}>
                <Heart className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {recipe.prepTime && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Prep: {recipe.prepTime}
            </Badge>
          )}
          {recipe.cookTime && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Cook: {recipe.cookTime}
            </Badge>
          )}
          {recipe.servings && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {recipe.servings} servings
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Instructions</h3>
          <ol className="space-y-3">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="flex-1 pt-0.5">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};