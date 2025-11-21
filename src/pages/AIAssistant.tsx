import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { Send, Sparkles, User, Bot, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Recommendation {
  plantName: string;
  reasoning: string;
  id?: string;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
    recommendations?: Recommendation[];
}

const AIAssistant = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm your herbal expert. Tell me about your health concern (e.g., 'I have trouble sleeping' or 'I need an immunity boost'), and I'll recommend the best medicinal plants for you." }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const { data, error } = await supabase.functions.invoke('recommend-plant', {
                body: { problem: userMessage }
            });

            if (error) throw error;

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.generalAdvice,
                recommendations: data.recommendations
            }]);

        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error while analyzing your request. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-50/30 py-12">
            <div className="container max-w-4xl h-[80vh] flex flex-col">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-primary flex justify-center items-center gap-3">
                        <Sparkles className="w-8 h-8 text-yellow-500" /> AI Herbalist
                    </h1>
                    <p className="text-muted-foreground">Get personalized plant recommendations based on your needs.</p>
                </div>

                <Card className="flex-1 flex flex-col shadow-xl border-primary/10 overflow-hidden">
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full p-6">
                            <div className="space-y-6">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.role === 'assistant' && (
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Bot className="w-6 h-6 text-primary" />
                                            </div>
                                        )}

                                        <div className={`max-w-[80%] space-y-4`}>
                                            <div className={`p-4 rounded-2xl ${
                                                msg.role === 'user'
                                                ? 'bg-primary text-white rounded-tr-none'
                                                : 'bg-white border shadow-sm rounded-tl-none'
                                            }`}>
                                                <p className="leading-relaxed">{msg.content}</p>
                                            </div>

                                            {/* Render Recommendations Cards if available */}
                                            {msg.recommendations && msg.recommendations.length > 0 && (
                                                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                                    {msg.recommendations.map((rec, rIdx) => (
                                                        <Card key={rIdx} className="overflow-hidden border-l-4 border-l-primary">
                                                            <CardHeader className="pb-2 bg-muted/20">
                                                                <CardTitle className="text-base font-bold text-primary">{rec.plantName}</CardTitle>
                                                            </CardHeader>
                                                            <CardContent className="pt-4 text-sm space-y-3">
                                                                <p>{rec.reasoning}</p>
                                                                {rec.id && (
                                                                    <Link to={`/plant/${rec.id}`}>
                                                                        <Button size="sm" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                                                                            View Plant
                                                                        </Button>
                                                                    </Link>
                                                                )}
                                                                 {/* Mock Add to Cart since we don't have real cart logic yet */}
                                                                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                                                                     <ShoppingCart className="w-3 h-3 mr-2"/> Add to Cart
                                                                </Button>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {msg.role === 'user' && (
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                                <User className="w-6 h-6 text-gray-600" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                {loading && (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Bot className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="bg-white border shadow-sm p-4 rounded-2xl rounded-tl-none">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-75"></div>
                                                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-150"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4 bg-white border-t">
                        <form
                            className="flex w-full gap-2"
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        >
                            <Input
                                placeholder="Ask about a health concern..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1"
                                disabled={loading}
                            />
                            <Button type="submit" disabled={loading || !input.trim()} size="icon" className="bg-primary hover:bg-primary/90">
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default AIAssistant;
