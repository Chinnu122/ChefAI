import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Leaf, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
           <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <Badge className="px-4 py-2 bg-green-100 text-green-800 hover:bg-green-100 text-sm">
               Discover Nature's Healing Power
            </Badge>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary leading-tight">
              Ancient Wisdom, <br/> Modern Science
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Explore our curated collection of 100+ medicinal plants, backed by scientific research and traditional knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/catalog">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 h-12 px-8 text-lg">
                  Shop Plants <ArrowRight className="ml-2 w-5 h-5"/>
                </Button>
              </Link>
              <Link to="/ai-assistant">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-lg border-primary text-primary hover:bg-green-50">
                  <Sparkles className="mr-2 w-5 h-5"/> Ask AI Assistant
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
              alt="Medicinal Plants"
              className="rounded-2xl shadow-2xl max-w-md w-full object-cover z-10"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
             <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-green-100 to-transparent rounded-full opacity-50 blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Why Choose NaturaMedic?</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: <ShieldCheck className="w-10 h-10 text-primary"/>, title: "Scientifically Verified", desc: "Every plant in our catalog is backed by research and traditional usage data." },
               { icon: <Sparkles className="w-10 h-10 text-primary"/>, title: "AI Recommendations", desc: "Get personalized plant suggestions based on your specific health needs." },
               { icon: <Leaf className="w-10 h-10 text-primary"/>, title: "Premium Quality", desc: "Sourced from the finest organic farms to ensure potency and purity." },
             ].map((feature, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.2 }}
                 viewport={{ once: true }}
                 className="p-8 rounded-xl bg-green-50/50 hover:bg-green-50 transition-colors text-center border border-green-100"
               >
                 <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-6">
                   {feature.icon}
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-primary">{feature.title}</h3>
                 <p className="text-muted-foreground">{feature.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for Badge since I haven't created a separate file for it yet or it might be missing
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  )
}

export default Index;
