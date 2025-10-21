import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Network, Lock, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [soeid, setSoeid] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(soeid, password);
    
    if (result.success) {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: result.error,
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-card border-border shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-gradient-primary rounded-lg mb-4 shadow-glow">
            <Network className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ImpactAI
          </h1>
          <p className="text-muted-foreground mt-2">Sign in with SSO</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="soeid" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              SOEID
            </Label>
            <Input
              id="soeid"
              type="text"
              placeholder="Enter your SOEID (e.g., JD4005)"
              value={soeid}
              onChange={(e) => setSoeid(e.target.value.toUpperCase())}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-primary hover:shadow-glow transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            For demo: Use <span className="font-mono font-semibold text-foreground">JD4005</span> / <span className="font-mono font-semibold text-foreground">1234</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
