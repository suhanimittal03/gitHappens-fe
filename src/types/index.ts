// Dashboard Types
export interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

export interface RecentAnalysis {
  id: string;
  module: string;
  timestamp: string;
  impact: "High" | "Medium" | "Low";
  status: "completed" | "in-progress" | "failed";
}

export interface ImpactTrendData {
  date: string;
  high: number;
  medium: number;
  low: number;
}

// Analysis Types
export interface ImpactAnalysisRequest {
  module: string;
  changeType: string;
  description?: string;
}

export interface AffectedComponent {
  name: string;
  type: string;
  impact: "High" | "Medium" | "Low";
  details: string;
}

export interface ImpactAnalysisResult {
  id: string;
  module: string;
  timestamp: string;
  summary: {
    totalAffected: number;
    highImpact: number;
    mediumImpact: number;
    lowImpact: number;
    criticalPaths: number;
  };
  affectedComponents: AffectedComponent[];
  recommendations: string[];
  riskScore: number;
}

// History Types
export interface AnalysisHistoryItem {
  id: string;
  module: string;
  changeType: string;
  timestamp: string;
  impact: "High" | "Medium" | "Low";
  status: "completed" | "in-progress" | "failed";
  affectedModules: number;
  criticalIssues: number;
  commitHash?: string;
  commitMessage?: string;
  author?: string;
  repositoryImpacts?: RepositoryImpact[];
}

export interface RepositoryImpact {
  repositoryName: string;
  affectedFiles: AffectedFile[];
  riskLevel: "High" | "Medium" | "Low";
  summary: string;
}

export interface AffectedFile {
  path: string;
  changeType: "modified" | "added" | "deleted";
  linesChanged: number;
  impactDescription: string;
}

// Dependency Graph Types
export interface GraphNode {
  id: string;
  label: string;
  type: "file" | "class" | "function" | "external";
  path?: string;
  file?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: "contains" | "imports";
}

export interface DependencyGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
