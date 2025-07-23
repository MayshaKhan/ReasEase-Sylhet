import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'signup') {
      setIsLogin(false);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isLogin ? "Logged in successfully!" : "Account created successfully!",
      description: "Welcome to our platform.",
    });
    navigate("/");
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password reset email sent",
      description: "Check your email for reset instructions.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md relative">
          <CardHeader className="text-center pt-12">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="absolute top-4 left-4 p-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Sign in to your account to continue"
                : "Join our real estate platform today"}
            </CardDescription>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="userType">I am a</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg">
              {isLogin ? "🔐 Log In" : "📝 Create Account"}
            </Button>

            {isLogin && (
              <Button
                type="button"
                variant="link"
                className="w-full text-sm"
                onClick={handleForgotPassword}
              >
                🔁 Forgot Password?
              </Button>
            )}
          </form>

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              variant="outline"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;