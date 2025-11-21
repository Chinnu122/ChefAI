import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-primary">NaturaMedic</h3>
            <p className="text-sm text-muted-foreground">
              Discover the healing power of nature with our curated collection of scientifically verified medicinal plants.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog?category=Immunity" className="hover:text-primary">Immunity</Link></li>
              <li><Link to="/catalog?category=Digestion" className="hover:text-primary">Digestion</Link></li>
              <li><Link to="/catalog?category=Skin" className="hover:text-primary">Skin Care</Link></li>
              <li><Link to="/catalog?category=Ayurvedic+Classics" className="hover:text-primary">Ayurvedic Classics</Link></li>
            </ul>
          </div>

           {/* Support */}
           <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@naturamedic.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Herbal Lane, Green City</li>
            </ul>
          </div>

        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NaturaMedic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
