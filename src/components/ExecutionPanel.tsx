import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Play } from "lucide-react";

type Execution = {
  id: string;
  status: "success" | "failed" | "running" | "pending";
  timestamp: string;
  duration?: string;
};

const mockExecutions: Execution[] = [
  { id: "1", status: "success", timestamp: "2 min ago", duration: "1.2s" },
  { id: "2", status: "success", timestamp: "15 min ago", duration: "0.8s" },
  { id: "3", status: "failed", timestamp: "1 hour ago", duration: "2.1s" },
  { id: "4", status: "success", timestamp: "3 hours ago", duration: "1.5s" },
];

type ExecutionPanelProps = {
  workflowId: string;
};

export const ExecutionPanel = ({ workflowId }: ExecutionPanelProps) => {
  const getStatusIcon = (status: Execution["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "running":
        return <Play className="w-4 h-4 text-primary animate-pulse" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Execution["status"]) => {
    const variants = {
      success: "bg-success/10 text-success border-success/20",
      failed: "bg-destructive/10 text-destructive border-destructive/20",
      running: "bg-primary/10 text-primary border-primary/20",
      pending: "bg-muted text-muted-foreground border-border",
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <Card className="p-4 h-[600px] flex flex-col bg-gradient-card border-border/50">
      <h3 className="font-semibold text-lg mb-4 text-foreground">
        Recent Executions
      </h3>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {mockExecutions.map((execution) => (
          <Card
            key={execution.id}
            className="p-3 border-border/50 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getStatusIcon(execution.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  {getStatusBadge(execution.status)}
                  <span className="text-xs text-muted-foreground">
                    {execution.timestamp}
                  </span>
                </div>
                {execution.duration && (
                  <div className="text-xs text-muted-foreground">
                    Duration: {execution.duration}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-success">95%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">1.2s</div>
            <div className="text-xs text-muted-foreground">Avg Duration</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
