import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Play, Mail, Database, FileText, GitBranch, Zap } from "lucide-react";

type NodePaletteProps = {
  onAddNode: (type: string, label: string, icon: string) => void;
  onClose: () => void;
};

const nodeTemplates = [
  { type: "trigger", label: "Form Submit", icon: "play", category: "Triggers" },
  { type: "trigger", label: "Schedule", icon: "play", category: "Triggers" },
  { type: "action", label: "Send Email", icon: "mail", category: "Actions" },
  { type: "action", label: "Update Database", icon: "database", category: "Actions" },
  { type: "action", label: "Generate Report", icon: "file", category: "Actions" },
  { type: "action", label: "API Call", icon: "zap", category: "Actions" },
  { type: "condition", label: "If/Else", icon: "branch", category: "Logic" },
];

const iconMap = {
  play: Play,
  mail: Mail,
  database: Database,
  file: FileText,
  branch: GitBranch,
  zap: Zap,
};

export const NodePalette = ({ onAddNode, onClose }: NodePaletteProps) => {
  return (
    <Card className="absolute top-4 left-4 w-80 p-4 z-10 bg-card border-border shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Add Node</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {["Triggers", "Actions", "Logic"].map((category) => (
          <div key={category}>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              {category}
            </h4>
            <div className="space-y-2">
              {nodeTemplates
                .filter((node) => node.category === category)
                .map((node, index) => {
                  const Icon = iconMap[node.icon as keyof typeof iconMap];
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-3"
                      onClick={() => onAddNode(node.type, node.label, node.icon)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{node.label}</span>
                    </Button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
