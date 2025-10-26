import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, MoreVertical, Clock } from "lucide-react";
import { Workflow } from "@/pages/Index";

type WorkflowListProps = {
  workflows: Workflow[];
  onSelect: (id: string) => void;
};

export const WorkflowList = ({ workflows, onSelect }: WorkflowListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workflows.map((workflow) => (
        <Card
          key={workflow.id}
          className="p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] bg-gradient-card border-border/50"
          onClick={() => onSelect(workflow.id)}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {workflow.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {workflow.description}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={workflow.status === "active" ? "default" : "secondary"}
                className={
                  workflow.status === "active"
                    ? "bg-success text-success-foreground"
                    : ""
                }
              >
                {workflow.status === "active" ? (
                  <Play className="w-3 h-3 mr-1" />
                ) : (
                  <Pause className="w-3 h-3 mr-1" />
                )}
                {workflow.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{workflow.lastRun || "Never"}</span>
              </div>
              <span className="font-medium">{workflow.totalRuns} runs</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
