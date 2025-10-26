import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Play } from "lucide-react";
import { NodePalette } from "./NodePalette";
import { CustomNode } from "./CustomNode";
import { toast } from "sonner";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 250, y: 100 },
    data: { label: "Start", type: "trigger", icon: "play" },
  },
];

const initialEdges: Edge[] = [];

type WorkflowCanvasProps = {
  workflowId: string;
};

export const WorkflowCanvas = ({ workflowId }: WorkflowCanvasProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showPalette, setShowPalette] = useState(false);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNode = (type: string, label: string, icon: string) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "custom",
      position: { x: 250, y: 100 + nodes.length * 100 },
      data: { label, type, icon },
    };
    setNodes((nds) => [...nds, newNode]);
    setShowPalette(false);
  };

  const handleRunWorkflow = () => {
    toast.success("Workflow execution started!", {
      description: "Your workflow is now running...",
    });
  };

  return (
    <Card className="h-[600px] relative overflow-hidden bg-card border-border/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-secondary/20"
      >
        <Background color="hsl(var(--muted-foreground))" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.data.type) {
              case "trigger":
                return "hsl(var(--success))";
              case "action":
                return "hsl(var(--primary))";
              case "condition":
                return "hsl(var(--warning))";
              default:
                return "hsl(var(--muted))";
            }
          }}
        />
        <Panel position="top-right" className="flex gap-2">
          <Button onClick={() => setShowPalette(!showPalette)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Node
          </Button>
          <Button onClick={handleRunWorkflow} className="gap-2 bg-success hover:bg-success/90">
            <Play className="w-4 h-4" />
            Run
          </Button>
        </Panel>
      </ReactFlow>

      {showPalette && (
        <NodePalette
          onAddNode={handleAddNode}
          onClose={() => setShowPalette(false)}
        />
      )}
    </Card>
  );
};
