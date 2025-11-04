import { ChefHat, Sparkles } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroFood})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/80 to-secondary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <ChefHat className="w-12 h-12 text-primary-foreground" />
          <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
          AI-Powered Recipe Finder
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
          Transform your ingredients into delicious meals with AI. 
          Just tell us what you have, and we'll create the perfect recipe.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-primary-foreground/80">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            <span>Personalized Recipes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            <span>Save Favorites</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            <span>Share with Friends</span>
          </div>
        </div>
      </div>
    </section>
  );
};