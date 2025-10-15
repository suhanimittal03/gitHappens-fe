import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  GitBranch,
  TrendingUp,
  Network,
  CheckCircle2,
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Analysis",
      description: "Leverage advanced AI to automatically detect impact across your entire codebase",
    },
    {
      icon: Network,
      title: "Dependency Mapping",
      description: "Visualize complex relationships between modules and services instantly",
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Evaluate change risk and prioritize critical areas that need attention",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get comprehensive impact analysis in seconds, not hours",
    },
    {
      icon: GitBranch,
      title: "Multi-Stack Support",
      description: "Works with any tech stack through intelligent configuration",
    },
    {
      icon: TrendingUp,
      title: "Smart Insights",
      description: "Actionable recommendations to optimize your development workflow",
    },
  ];

  const benefits = [
    "Reduce deployment risks by 80%",
    "Save up to 6 hours per week on impact analysis",
    "Catch hidden dependencies before they cause issues",
    "Accelerate your SDLC with automated insights",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Impact Analysis</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform How You
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Analyze Code Changes
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Automate impact analysis with AI-driven insights. Understand dependencies, evaluate risks,
              and ship with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analyze">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all text-lg px-8">
                  Start Free Analysis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need for
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Smart Impact Analysis</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to make impact analysis effortless and accurate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-border/50 hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Why Teams Choose
                <span className="bg-gradient-primary bg-clip-text text-transparent"> ImpactAI</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6 bg-card border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-success/10 rounded-lg flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-lg font-medium">{benefit}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="p-12 bg-gradient-primary text-center border-none shadow-glow">
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Ready to Revolutionize Your Development Process?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join teams already using AI-powered impact analysis to ship faster and more confidently
            </p>
            <Link to="/analyze">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 hover:shadow-lg transition-all"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
