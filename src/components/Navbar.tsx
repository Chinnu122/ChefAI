import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Sprout, Leaf, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Placeholder state for cart/auth (will be replaced with real context later)
  const cartCount = 2;
  const isLoggedIn = false;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
    { href: '/ai-assistant', label: 'AI Assistant', icon: <Sparkles className="w-4 h-4 mr-1" /> },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 font-serif text-xl font-bold text-primary">
          <Leaf className="h-6 w-6" />
          <span>NaturaMedic</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center ${
                location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons & Actions */}
        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="hidden md:flex relative text-muted-foreground hover:text-primary">
            <Heart className="h-5 w-5" />
          </Link>

          <Link to="/cart" className="relative text-muted-foreground hover:text-primary">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full">
                {cartCount}
              </Badge>
            )}
          </Link>

          {isLoggedIn ? (
             <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
             </Link>
          ) : (
            <div className="hidden md:flex gap-2">
               <Link to="/auth">
                 <Button variant="ghost" size="sm">Sign In</Button>
               </Link>
               <Link to="/auth">
                 <Button size="sm" className="bg-primary hover:bg-primary/90">Sign Up</Button>
               </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-lg font-medium ${
                      location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                     <span className="flex items-center">{link.icon} {link.label}</span>
                  </Link>
                ))}
                <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
                {!isLoggedIn && (
                    <div className="flex flex-col gap-2 mt-4">
                         <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                           <Button variant="outline" className="w-full">Sign In</Button>
                         </Link>
                         <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                           <Button className="w-full">Sign Up</Button>
                         </Link>
                    </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
