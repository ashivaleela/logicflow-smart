import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { WorkflowList } from "@/components/WorkflowList";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { ExecutionPanel } from "@/components/ExecutionPanel";

export type Workflow = {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  lastRun?: string;
  totalRuns: number;
};

const Index = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: "1",
      name: "Email Notification Flow",
      description: "Send email when form is submitted",
      status: "active",
      lastRun: "2 hours ago",
      totalRuns: 45,
    },
    {
      id: "2",
      name: "Data Sync Workflow",
      description: "Sync data between Google Sheets and Database",
      status: "active",
      lastRun: "5 minutes ago",
      totalRuns: 120,
    },
  ]);
  
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);

  const handleNewWorkflow = () => {
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: "New Workflow",
      description: "Click to edit description",
      status: "inactive",
      totalRuns: 0,
    };
    setWorkflows([...workflows, newWorkflow]);
    setSelectedWorkflow(newWorkflow.id);
    setShowCanvas(true);
  };

  const handleSelectWorkflow = (id: string) => {
    setSelectedWorkflow(id);
    setShowCanvas(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!showCanvas ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Your Workflows</h2>
                <p className="text-muted-foreground mt-2">
                  Automate your tasks with intelligent workflows
                </p>
              </div>
              <Button onClick={handleNewWorkflow} className="gap-2">
                <Plus className="w-4 h-4" />
                New Workflow
              </Button>
            </div>

            <WorkflowList 
              workflows={workflows} 
              onSelect={handleSelectWorkflow}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowCanvas(false)}
              >
                ← Back to Workflows
              </Button>
              <h2 className="text-2xl font-bold text-foreground">
                {workflows.find(w => w.id === selectedWorkflow)?.name}
              </h2>
              <div className="w-32" /> {/* Spacer for alignment */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <WorkflowCanvas workflowId={selectedWorkflow || ""} />
              </div>
              <div className="lg:col-span-1">
                <ExecutionPanel workflowId={selectedWorkflow || ""} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
