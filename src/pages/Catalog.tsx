import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Define the Plant interface
interface Plant {
    id: string;
    name: string;
    botanical_name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    rating: number;
}

const Catalog = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState([0, 100]);

    const { data: plants, isLoading } = useQuery({
        queryKey: ['plants'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('plants')
                .select('*');
            if (error) throw error;
            return data as Plant[];
        }
    });

    const categories = ["Immunity", "Digestion", "Skin", "Hair", "Heart", "Diabetes", "Ayurvedic Classics"];

    const filteredPlants = plants?.filter(plant => {
        const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              plant.botanical_name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? plant.category === selectedCategory : true;
        const matchesPrice = plant.price >= priceRange[0] && plant.price <= priceRange[1];

        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="min-h-screen bg-muted/10 py-12">
            <div className="container">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <div className="w-full md:w-64 space-y-8 h-fit sticky top-24">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center"><Filter className="w-4 h-4 mr-2"/> Categories</h3>
                            <div className="space-y-2">
                                <Button
                                    variant={selectedCategory === null ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setSelectedCategory(null)}
                                >
                                    All Plants
                                </Button>
                                {categories.map(cat => (
                                    <Button
                                        key={cat}
                                        variant={selectedCategory === cat ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                             <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                             <Slider
                                defaultValue={[0, 100]}
                                max={200}
                                step={1}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="my-4"
                             />
                             <div className="flex justify-between text-sm text-muted-foreground">
                                 <span>${priceRange[0]}</span>
                                 <span>${priceRange[1]}</span>
                             </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search Bar */}
                        <div className="relative mb-8">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search by name or botanical name..."
                                className="pl-10 h-12"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Results Grid */}
                        {isLoading ? (
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1,2,3,4,5,6].map(i => (
                                    <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-xl"></div>
                                ))}
                             </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPlants?.map((plant) => (
                                    <motion.div
                                        key={plant.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow border-none shadow-sm">
                                            <div className="relative aspect-square overflow-hidden">
                                                <img
                                                    src={plant.image_url || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'}
                                                    alt={plant.name}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Heart className="w-4 h-4" />
                                                </Button>
                                                <Badge className="absolute top-3 left-3 bg-white/90 text-primary hover:bg-white">
                                                    {plant.category}
                                                </Badge>
                                            </div>
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-lg font-serif">{plant.name}</CardTitle>
                                                        <p className="text-sm text-muted-foreground italic">{plant.botanical_name}</p>
                                                    </div>
                                                    <div className="flex items-center bg-green-50 px-2 py-1 rounded text-xs font-bold text-green-700">
                                                        ★ {plant.rating}
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="flex-grow">
                                                <p className="text-sm text-muted-foreground line-clamp-3">
                                                    {plant.description}
                                                </p>
                                            </CardContent>
                                            <CardFooter className="flex items-center justify-between border-t pt-4">
                                                <span className="text-lg font-bold text-primary">${plant.price}</span>
                                                <div className="flex gap-2">
                                                    <Link to={`/plant/${plant.id}`}>
                                                        <Button variant="outline" size="sm">Details</Button>
                                                    </Link>
                                                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                                                        <ShoppingCart className="w-4 h-4 mr-1" /> Add
                                                    </Button>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
