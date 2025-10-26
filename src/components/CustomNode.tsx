import { Handle, Position, NodeProps } from "reactflow";
import { Card } from "@/components/ui/card";
import { Play, Zap, GitBranch, Mail, Database, FileText } from "lucide-react";

const iconMap = {
  play: Play,
  zap: Zap,
  branch: GitBranch,
  mail: Mail,
  database: Database,
  file: FileText,
};

export const CustomNode = ({ data }: NodeProps) => {
  const Icon = iconMap[data.icon as keyof typeof iconMap] || Zap;
  
  const getColorClass = () => {
    switch (data.type) {
      case "trigger":
        return "border-success bg-success/10";
      case "action":
        return "border-primary bg-primary/10";
      case "condition":
        return "border-warning bg-warning/10";
      default:
        return "border-border bg-card";
    }
  };

  return (
    <Card className={`px-4 py-3 min-w-[180px] ${getColorClass()} shadow-md`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          data.type === "trigger" ? "bg-success text-success-foreground" :
          data.type === "action" ? "bg-primary text-primary-foreground" :
          data.type === "condition" ? "bg-warning text-warning-foreground" :
          "bg-muted text-muted-foreground"
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground capitalize">{data.type}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </Card>
  );
};
