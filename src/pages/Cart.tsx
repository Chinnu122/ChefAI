import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, CreditCard, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Mock data for now
const initialCart = [
    { id: '1', name: 'Ashwagandha', price: 15.99, quantity: 1, image: 'https://images.unsplash.com/photo-1611078488986-2621d7556b8d' },
    { id: '2', name: 'Turmeric', price: 12.50, quantity: 2, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5' },
];

const Cart = () => {
    const [cart, setCart] = useState(initialCart);

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
        toast.success("Item removed from cart");
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container max-w-5xl">
                <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
                        <Link to="/catalog">
                            <Button>Continue Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <Card key={item.id} className="flex flex-col sm:flex-row overflow-hidden">
                                    <div className="w-full sm:w-32 h-32 bg-gray-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 p-4 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                                <p className="text-muted-foreground text-sm">Medicinal Herb</p>
                                            </div>
                                            <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center border rounded-md">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-r-none" onClick={() => updateQuantity(item.id, -1)}>
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-l-none" onClick={() => updateQuantity(item.id, 1)}>
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10" onClick={() => removeItem(item.id)}>
                                                <Trash2 className="w-4 h-4 mr-1" /> Remove
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24 shadow-lg border-primary/10">
                                <CardHeader className="bg-primary/5 pb-4">
                                    <CardTitle className="text-lg">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `$${shipping}`}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-primary">${total.toFixed(2)}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex-col gap-4 bg-gray-50 pt-6">
                                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={() => toast.success("Proceeding to checkout...")}>
                                        Checkout
                                    </Button>
                                    <div className="flex items-center justify-center text-xs text-muted-foreground gap-2">
                                        <Lock className="w-3 h-3" /> Secure Checkout powered by Stripe
                                    </div>
                                    <div className="flex gap-2 justify-center opacity-50 grayscale">
                                        <CreditCard className="w-6 h-6" />
                                        {/* Add more icons if available */}
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
