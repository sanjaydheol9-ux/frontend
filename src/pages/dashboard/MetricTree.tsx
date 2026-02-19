import { GitBranch, TrendingDown, TrendingUp, Minus } from "lucide-react";

type TreeNode = {
  id: string;
  label: string;
  value: string;
  delta?: number;
  children?: TreeNode[];
  status: "success" | "warning" | "danger" | "neutral";
};

const tree: TreeNode = {
  id: "root",
  label: "Overall Performance Score",
  value: "89.7%",
  delta: -2.8,
  status: "warning",
  children: [
    {
      id: "delivery",
      label: "Delivery Performance",
      value: "91.4%",
      delta: -3.4,
      status: "warning",
      children: [
        { id: "carrier", label: "Carrier Reliability", value: "84.2%", delta: -8.1, status: "danger" },
        { id: "routing", label: "Route Optimization", value: "93.1%", delta: -1.2, status: "warning" },
        { id: "firstmile", label: "First-Mile Pickup", value: "96.8%", delta: 0.3, status: "success" },
      ],
    },
    {
      id: "accuracy",
      label: "Order Accuracy",
      value: "97.4%",
      delta: -1.1,
      status: "warning",
      children: [
        { id: "picking", label: "Picking Accuracy", value: "96.1%", delta: -2.1, status: "danger" },
        { id: "packing", label: "Packing Compliance", value: "98.9%", delta: 0.1, status: "success" },
        { id: "labeling", label: "Label Accuracy", value: "97.2%", delta: -1.4, status: "warning" },
      ],
    },
    {
      id: "dispatch",
      label: "Dispatch Time",
      value: "78.9 min",
      delta: -3.2,
      status: "danger",
      children: [
        { id: "zoneA", label: "Zone A Processing", value: "68.4 min", delta: 1.2, status: "success" },
        { id: "zoneB", label: "Zone B Processing", value: "71.2 min", delta: -2.1, status: "warning" },
        { id: "zoneC", label: "Zone C Processing", value: "99.1 min", delta: -21.8, status: "danger" },
      ],
    },
    {
      id: "warehouse",
      label: "Warehouse Utilization",
      value: "74.9%",
      delta: 3.7,
      status: "success",
      children: [
        { id: "inbound", label: "Inbound Throughput", value: "89.2%", delta: 4.1, status: "success" },
        { id: "storage", label: "Storage Efficiency", value: "78.4%", delta: 2.9, status: "success" },
        { id: "outbound", label: "Outbound Flow", value: "57.1%", delta: 4.2, status: "warning" },
      ],
    },
  ],
};

const statusStyles = {
  success: { badge: "bg-success/10 text-success border-success/20", dot: "bg-success shadow-glow-success", text: "text-success" },
  warning: { badge: "bg-warning/10 text-warning border-warning/20", dot: "bg-warning shadow-glow-warning", text: "text-warning" },
  danger: { badge: "bg-destructive/10 text-destructive border-destructive/20", dot: "bg-destructive shadow-glow-danger", text: "text-destructive" },
  neutral: { badge: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground", text: "text-muted-foreground" },
};

function MetricNode({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const s = statusStyles[node.status];
  const TrendIcon = (node.delta ?? 0) > 0 ? TrendingUp : (node.delta ?? 0) < 0 ? TrendingDown : Minus;

  return (
    <div className={`${level > 0 ? "ml-6 md:ml-10 mt-2" : ""}`}>
      <div className={`card-glass rounded-xl border p-4 ${s.badge.replace("text-", "border-").replace("/10", "/20").replace("text-", "")} flex items-center gap-4 group hover:scale-[1.01] transition-all duration-200 ${level === 0 ? "border-2" : ""}`}>
        {level > 0 && (
          <div className="relative flex-shrink-0">
            <div className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 w-6 md:w-10 border-t border-dashed border-border" />
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground mb-0.5">{node.label}</div>
          <div className="data-value text-lg font-bold text-foreground">{node.value}</div>
        </div>
        {node.delta !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold flex-shrink-0 ${s.text}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            {node.delta > 0 ? "+" : ""}{node.delta}%
          </div>
        )}
        {level === 0 && <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex-shrink-0 ${s.badge}`}>
          {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
        </span>}
      </div>
      {node.children && (
        <div className="relative mt-2 pl-0">
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-2">
            {node.children.map((child) => (
              <MetricNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MetricTree() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center">
          <GitBranch className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">Metric Tree</h2>
          <p className="text-xs text-muted-foreground">Hierarchical KPI breakdown — drill down to root contributors</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs">
        {(["success", "warning", "danger"] as const).map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${statusStyles[s].dot}`} />
            <span className="text-muted-foreground capitalize">{s === "danger" ? "Critical" : s}</span>
          </div>
        ))}
        <span className="text-muted-foreground ml-auto hidden md:block">Click to expand sub-metrics</span>
      </div>

      {/* Tree */}
      <div className="space-y-4">
        <MetricNode node={tree} level={0} />
      </div>

      {/* Zone C highlight */}
      <div className="card-glass rounded-xl border border-destructive/25 bg-destructive/5 p-4 flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-destructive mt-1 flex-shrink-0 animate-pulse" />
        <div>
          <p className="text-sm font-semibold text-destructive">Zone C Processing — Critical Driver</p>
          <p className="text-xs text-muted-foreground mt-1">
            Zone C dispatch processing time of <span className="text-foreground font-medium">99.1 min</span> is the primary contributor to the overall performance decline. This is 20.2 minutes above the 78.9 min network average and represents a{" "}
            <span className="text-destructive font-medium">−21.8% deviation</span> from the previous week.
          </p>
        </div>
      </div>
    </div>
  );
}
