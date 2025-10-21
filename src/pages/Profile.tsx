import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { User, Building2 } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  // TODO: Replace with API call to fetch user's CSI mappings
  // Required API endpoint: GET /api/users/{soeid}/csi-mappings
  const csiIds = [
    { id: "176777", name: "RTOP Dev Tools" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Profile
          </h1>
          <p className="text-muted-foreground">
            Your account details and CSI mappings
          </p>
        </div>

        <div className="grid gap-6 max-w-3xl">
          {/* User Details */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">User Details</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Name</label>
                    <p className="text-lg font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">SOEID</label>
                    <p className="text-lg font-medium font-mono">{user?.soeid}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* CSI Mappings */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Mapped CSI IDs</h2>
                <div className="space-y-3">
                  {csiIds.map((csi) => (
                    <div
                      key={csi.id}
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border/50"
                    >
                      <div>
                        <p className="font-medium">{csi.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          CSI ID: {csi.id}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
