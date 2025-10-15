import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Search, Filter, Download } from "lucide-react";

const History = () => {
  const historyData = [
    {
      id: 1,
      module: "Payment Gateway Module",
      date: "2024-01-15",
      time: "14:30",
      user: "John Doe",
      risk: "high",
      components: 12,
      status: "reviewed",
    },
    {
      id: 2,
      module: "User Authentication Service",
      date: "2024-01-15",
      time: "11:20",
      user: "Jane Smith",
      risk: "medium",
      components: 7,
      status: "pending",
    },
    {
      id: 3,
      module: "Email Notification Handler",
      date: "2024-01-14",
      time: "16:45",
      user: "Mike Johnson",
      risk: "low",
      components: 3,
      status: "reviewed",
    },
    {
      id: 4,
      module: "Data Processing Pipeline",
      date: "2024-01-14",
      time: "09:15",
      user: "Sarah Williams",
      risk: "high",
      components: 15,
      status: "reviewed",
    },
    {
      id: 5,
      module: "API Gateway Configuration",
      date: "2024-01-13",
      time: "13:50",
      user: "David Brown",
      risk: "medium",
      components: 8,
      status: "reviewed",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Analysis History
          </h1>
          <p className="text-muted-foreground">
            Complete timeline of all impact analyses
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 bg-gradient-card border-border/50 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by module name or user..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="mr-2 w-4 h-4" />
              Export
            </Button>
          </div>
        </Card>

        {/* Timeline */}
        <div className="space-y-4">
          {historyData.map((item) => (
            <Card
              key={item.id}
              className="p-6 bg-gradient-card border-border/50 hover:shadow-md transition-all hover:border-primary/30 cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg mt-1">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.module}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>{item.date} at {item.time}</span>
                        <span>•</span>
                        <span>by {item.user}</span>
                        <span>•</span>
                        <span>{item.components} components affected</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      item.risk === "high"
                        ? "bg-destructive/10 text-destructive"
                        : item.risk === "medium"
                        ? "bg-warning/10 text-warning"
                        : "bg-success/10 text-success"
                    }`}
                  >
                    {item.risk.toUpperCase()} RISK
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      item.status === "reviewed"
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
