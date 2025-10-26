import { Workflow, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-50" />
              <div className="relative bg-gradient-primary p-2 rounded-lg">
                <Workflow className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                FlowMaster
              </h1>
              <p className="text-xs text-muted-foreground">Intelligent Automation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">3 Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
