import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, ArrowLeft, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface Plant {
    id: string;
    name: string;
    botanical_name: string;
    origin_year: string;
    description: string;
    uses: string[];
    benefits: string[];
    precautions: string;
    rating: number;
    image_url: string;
    price: number;
    stock: number;
    category: string;
}

const PlantDetails = () => {
    const { id } = useParams();

    const { data: plant, isLoading } = useQuery({
        queryKey: ['plant', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('plants')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw error;

            // Parse JSON fields if they come as strings (Supabase client might auto-parse jsonb, but being safe)
            const parsedData = {
                ...data,
                uses: typeof data.uses === 'string' ? JSON.parse(data.uses) : data.uses,
                benefits: typeof data.benefits === 'string' ? JSON.parse(data.benefits) : data.benefits,
            };
            return parsedData as Plant;
        },
        enabled: !!id
    });

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
    }

    if (!plant) {
        return <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Plant not found</h2>
            <Link to="/catalog"><Button>Return to Catalog</Button></Link>
        </div>;
    }

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container">
                <Link to="/catalog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative shadow-lg">
                            <img
                                src={plant.image_url || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'}
                                alt={plant.name}
                                className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-4 left-4 bg-white/90 text-primary hover:bg-white text-lg px-3 py-1">
                                {plant.category}
                            </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                             {/* Placeholder thumbnails */}
                             {[1, 2, 3, 4].map((i) => (
                                 <div key={i} className="aspect-square rounded-lg bg-gray-100 overflow-hidden cursor-pointer hover:ring-2 ring-primary">
                                     <img
                                        src={plant.image_url}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover opacity-70 hover:opacity-100"
                                     />
                                 </div>
                             ))}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-primary mb-2">{plant.name}</h1>
                        <p className="text-xl text-muted-foreground italic mb-4">{plant.botanical_name}</p>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center text-yellow-500">
                                {Array(5).fill(0).map((_, i) => (
                                    <span key={i} className={`text-xl ${i < Math.round(plant.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                ))}
                            </div>
                            <span className="text-muted-foreground">({plant.rating} Rating)</span>
                            <Separator orientation="vertical" className="h-6" />
                            <span className="flex items-center text-muted-foreground"><Calendar className="w-4 h-4 mr-1"/> Est. {plant.origin_year}</span>
                        </div>

                        <div className="text-3xl font-bold text-primary mb-8">
                            ${plant.price}
                        </div>

                        <div className="prose prose-green max-w-none mb-8 text-muted-foreground">
                            <p>{plant.description}</p>
                        </div>

                        <div className="flex gap-4 mb-8">
                            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-lg h-14">
                                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 w-14 p-0 rounded-full">
                                <Heart className="w-6 h-6" />
                            </Button>
                        </div>

                        <Tabs defaultValue="benefits" className="w-full">
                            <TabsList className="w-full grid grid-cols-3 h-12 bg-green-50">
                                <TabsTrigger value="benefits" className="data-[state=active]:bg-white">Benefits</TabsTrigger>
                                <TabsTrigger value="uses" className="data-[state=active]:bg-white">Common Uses</TabsTrigger>
                                <TabsTrigger value="precautions" className="data-[state=active]:bg-white text-destructive data-[state=active]:text-destructive">Precautions</TabsTrigger>
                            </TabsList>
                            <TabsContent value="benefits" className="pt-6">
                                <ul className="space-y-3">
                                    {plant.benefits?.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent>
                            <TabsContent value="uses" className="pt-6">
                                <div className="flex flex-wrap gap-2">
                                    {plant.uses?.map((use, i) => (
                                        <Badge key={i} variant="secondary" className="px-3 py-1 text-sm">
                                            {use}
                                        </Badge>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="precautions" className="pt-6">
                                <div className="flex gap-4 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                                    <AlertTriangle className="w-6 h-6 shrink-0" />
                                    <p className="text-sm font-medium">{plant.precautions}</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlantDetails;
