import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, Award, User, MapPin, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
    const navigate = useNavigate();

    // Mock data for now until we have real user/orders
    const user = {
        full_name: "Jane Doe",
        email: "jane@example.com",
        join_date: "Jan 2025"
    };

    const rewards = {
        points: 450,
        next_tier: 1000,
        badges: [
            { name: "New Member", icon: "🌱", desc: "Joined the community" },
            { name: "Herbal Explorer", icon: "🌿", desc: "Ordered 5 different plants" }
        ]
    };

    const orders = [
        { id: "ORD-1234", date: "2025-03-15", total: 45.99, status: "Delivered", items: 3 },
        { id: "ORD-5678", date: "2025-02-28", total: 22.50, status: "Processing", items: 1 }
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/auth");
        toast.success("Logged out successfully");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary">My Account</h1>
                        <p className="text-muted-foreground">Welcome back, {user.full_name}</p>
                    </div>
                    <Button variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <Card className="h-fit md:col-span-1">
                        <CardContent className="p-4 space-y-2">
                            <Button variant="ghost" className="w-full justify-start font-medium text-primary bg-primary/10">
                                <User className="w-4 h-4 mr-2" /> Profile
                            </Button>
                            <Button variant="ghost" className="w-full justify-start font-medium">
                                <Package className="w-4 h-4 mr-2" /> Orders
                            </Button>
                            <Button variant="ghost" className="w-full justify-start font-medium">
                                <Award className="w-4 h-4 mr-2" /> Rewards
                            </Button>
                            <Button variant="ghost" className="w-full justify-start font-medium">
                                <MapPin className="w-4 h-4 mr-2" /> Addresses
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Main Content Area */}
                    <div className="md:col-span-3 space-y-8">

                        {/* Rewards Section */}
                        <Card className="border-primary/20 bg-gradient-to-br from-green-50 to-white overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Award className="w-5 h-5 text-yellow-600" /> Nature Rewards
                                        </CardTitle>
                                        <CardDescription>Earn points with every purchase</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-3xl font-bold text-primary">{rewards.points}</span>
                                        <span className="text-sm text-muted-foreground block">Total Points</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Member Status</span>
                                        <span>{rewards.next_tier - rewards.points} points to Gold</span>
                                    </div>
                                    <Progress value={(rewards.points / rewards.next_tier) * 100} className="h-2 bg-green-100" />
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {rewards.badges.map((badge, i) => (
                                        <div key={i} className="bg-white p-3 rounded-lg border shadow-sm text-center flex flex-col items-center gap-2">
                                            <span className="text-2xl">{badge.icon}</span>
                                            <span className="text-xs font-bold">{badge.name}</span>
                                        </div>
                                    ))}
                                    <div className="bg-gray-50 p-3 rounded-lg border border-dashed text-center flex flex-col items-center justify-center gap-2 text-muted-foreground opacity-70">
                                        <span className="text-2xl">🔒</span>
                                        <span className="text-xs">Ayurveda Master</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Orders */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="space-y-1 mb-2 sm:mb-0">
                                                <div className="font-bold">{order.id}</div>
                                                <div className="text-sm text-muted-foreground">{order.date} • {order.items} items</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className={order.status === 'Delivered' ? 'bg-green-600' : ''}>
                                                    {order.status}
                                                </Badge>
                                                <span className="font-bold w-20 text-right">${order.total}</span>
                                                <Button variant="outline" size="sm">View</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
