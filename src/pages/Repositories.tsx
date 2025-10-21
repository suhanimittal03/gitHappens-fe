import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GitBranch, Save, ToggleLeft } from "lucide-react";
import { toast } from "sonner";

interface Repository {
  id: string;
  name: string;
  csiId: string;
  csiName: string;
  branch: string;
  enabled: boolean;
}

// Mock data - Replace with API call
const getMockRepositories = (): Repository[] => [
  {
    id: "1",
    name: "impact-analyzer-frontend",
    csiId: "176777",
    csiName: "RTOP Dev Tools",
    branch: "master",
    enabled: true,
  },
  {
    id: "2",
    name: "impact-analyzer-backend",
    csiId: "176777",
    csiName: "RTOP Dev Tools",
    branch: "feature/dev",
    enabled: true,
  },
  {
    id: "3",
    name: "data-processing-service",
    csiId: "176777",
    csiName: "RTOP Dev Tools",
    branch: "release/prod",
    enabled: false,
  },
];

// Mock branches - Replace with API call per repository
const getMockBranches = (): string[] => [
  "master",
  "feature/dev",
  "release/prod",
  "develop",
  "hotfix/critical-fix",
];

const Repositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>(getMockRepositories());
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [branches] = useState<string[]>(getMockBranches());
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [branchDialogOpen, setBranchDialogOpen] = useState(false);

  const handleEnableAll = () => {
    setRepositories(repos => repos.map(repo => ({ ...repo, enabled: true })));
    toast.success("All repositories enabled");
  };

  const handleToggle = (repoId: string) => {
    setRepositories(repos =>
      repos.map(repo =>
        repo.id === repoId ? { ...repo, enabled: !repo.enabled } : repo
      )
    );
  };

  const handleSetBranch = (repo: Repository) => {
    setSelectedRepo(repo);
    setSelectedBranch(repo.branch);
    setBranchDialogOpen(true);
  };

  const handleBranchSubmit = () => {
    if (selectedRepo && selectedBranch) {
      setRepositories(repos =>
        repos.map(repo =>
          repo.id === selectedRepo.id ? { ...repo, branch: selectedBranch } : repo
        )
      );
      toast.success(`Branch updated to ${selectedBranch}`);
      setBranchDialogOpen(false);
    }
  };

  const handleSave = () => {
    // TODO: Implement API call to save repository configurations
    // Required API endpoint: POST /api/repositories/config
    // Request body: Repository[]
    console.log("Saving repositories:", repositories);
    toast.success("Repository settings saved successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Repositories
          </h1>
          <p className="text-muted-foreground">
            Manage your Git repositories and branch configurations
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Button onClick={handleEnableAll} variant="outline">
            <ToggleLeft className="mr-2 w-4 h-4" />
            Enable All
          </Button>
          <Button onClick={handleSave} className="ml-auto">
            <Save className="mr-2 w-4 h-4" />
            Save
          </Button>
        </div>

        {/* Repository List */}
        <div className="space-y-4">
          {repositories.map((repo) => (
            <Card key={repo.id} className="p-6 bg-gradient-card border-border/50">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{repo.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {repo.csiId} - {repo.csiName}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetBranch(repo)}
                    className="min-w-[160px]"
                  >
                    <GitBranch className="mr-2 w-4 h-4" />
                    {repo.branch}
                  </Button>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={repo.enabled}
                      onCheckedChange={() => handleToggle(repo.id)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {repo.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Branch Selection Dialog */}
      <Dialog open={branchDialogOpen} onOpenChange={setBranchDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Branch</DialogTitle>
            <DialogDescription>
              Choose a branch for {selectedRepo?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {branches.map((branch) => (
              <div
                key={branch}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedBranch === branch
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-secondary/50"
                }`}
                onClick={() => setSelectedBranch(branch)}
              >
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{branch}</span>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBranchDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBranchSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Repositories;
