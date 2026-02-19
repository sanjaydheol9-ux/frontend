import { useState } from "react";
import { AlertTriangle, Filter, TrendingUp } from "lucide-react";

const anomalies = [
  { id: "ANO-047", time: "Tue Jun 4 — 14:23", kpi: "On-Time Delivery", metric: "78.3%", baseline: "91.7%", deviation: "-14.6%", severity: "High", trigger: "Carrier No-Show", status: "Reviewed" },
  { id: "ANO-046", time: "Tue Jun 4 — 09:41", kpi: "Dispatch Time", metric: "112 min", baseline: "78.9 min", deviation: "+42%", severity: "High", trigger: "Zone C Saturation", status: "Escalated" },
  { id: "ANO-045", time: "Wed Jun 5 — 11:15", kpi: "Delivery Performance", metric: "82.1%", baseline: "91.4%", deviation: "-10.2%", severity: "High", trigger: "WMS Override", status: "Reviewed" },
  { id: "ANO-044", time: "Wed Jun 5 — 16:30", kpi: "Warehouse Utilization", metric: "94.1%", baseline: "74.9%", deviation: "+25.6%", severity: "Medium", trigger: "Inbound Surge", status: "Monitoring" },
  { id: "ANO-043", time: "Thu Jun 6 — 08:02", kpi: "Order Accuracy", metric: "94.8%", baseline: "97.4%", deviation: "-2.7%", severity: "Medium", trigger: "Label Mismatch", status: "Resolved" },
  { id: "ANO-042", time: "Thu Jun 6 — 13:55", kpi: "Dispatch Time", metric: "94 min", baseline: "78.9 min", deviation: "+19%", severity: "Medium", trigger: "Carrier Delay", status: "Resolved" },
  { id: "ANO-041", time: "Fri Jun 7 — 07:30", kpi: "On-Time Delivery", metric: "89.1%", baseline: "91.7%", deviation: "-2.8%", severity: "Low", trigger: "Traffic Congestion", status: "Resolved" },
  { id: "ANO-040", time: "Fri Jun 7 — 15:10", kpi: "Order Accuracy", metric: "96.2%", baseline: "97.4%", deviation: "-1.2%", severity: "Low", trigger: "Shift Handover", status: "Resolved" },
  { id: "ANO-039", time: "Sat Jun 8 — 10:45", kpi: "Warehouse Utilization", metric: "81.3%", baseline: "74.9%", deviation: "+8.5%", severity: "Low", trigger: "Weekend Surge", status: "Monitoring" },
];

const severityBadge: Record<string, string> = {
  High: "bg-destructive/15 text-destructive border-destructive/25",
  Medium: "bg-warning/15 text-warning border-warning/25",
  Low: "bg-muted text-muted-foreground border-border",
};

const statusBadge: Record<string, string> = {
  Escalated: "bg-destructive/10 text-destructive",
  Reviewed: "bg-primary/10 text-primary",
  Monitoring: "bg-warning/10 text-warning",
  Resolved: "bg-success/10 text-success",
};

const dotMap: Record<string, string> = {
  High: "status-dot-danger",
  Medium: "status-dot-warning",
  Low: "status-dot-success",
};

export default function Anomalies() {
  const [filter, setFilter] = useState<"All" | "Low" | "Medium" | "High">("All");

  const filtered = filter === "All" ? anomalies : anomalies.filter((a) => a.severity === filter);
  const highCount = anomalies.filter((a) => a.severity === "High").length;
  const medCount = anomalies.filter((a) => a.severity === "Medium").length;
  const lowCount = anomalies.filter((a) => a.severity === "Low").length;

  const mostCommon = "Carrier No-Show / Delay";
  const anomalyRate = ((anomalies.length / 14823) * 100).toFixed(3);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-warning/10 border border-warning/25 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-warning" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Anomaly Detection</h2>
            <p className="text-xs text-muted-foreground">AI-flagged deviations — Week 23</p>
          </div>
        </div>
        <div className="sm:ml-auto flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold border bg-warning/15 text-warning border-warning/30 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" />
            Anomaly Rate: {anomalyRate}%
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Anomalies", value: anomalies.length, color: "text-foreground", bg: "" },
          { label: "High Severity", value: highCount, color: "text-destructive", bg: "bg-destructive/5 border-destructive/20" },
          { label: "Medium Severity", value: medCount, color: "text-warning", bg: "bg-warning/5 border-warning/20" },
          { label: "Low Severity", value: lowCount, color: "text-muted-foreground", bg: "" },
        ].map((s, i) => (
          <div key={i} className={`card-glass rounded-xl border border-border p-4 text-center ${s.bg}`}>
            <div className={`data-value text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Most common trigger */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-warning/20 bg-warning/5">
        <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
        <p className="text-sm text-foreground">
          Most common trigger this week:{" "}
          <span className="font-bold text-warning">{mostCommon}</span>
          <span className="text-muted-foreground text-xs ml-2">— responsible for 5 of {anomalies.length} anomalies</span>
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground mr-2">Filter by severity:</span>
        {(["All", "High", "Medium", "Low"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              filter === f
                ? "bg-primary/15 text-primary border-primary/30"
                : "bg-secondary/30 text-muted-foreground border-border hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            {f}
            {f !== "All" && (
              <span className="ml-1 text-[10px] opacity-60">
                ({f === "High" ? highCount : f === "Medium" ? medCount : lowCount})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card-glass rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                {["ID", "Timestamp", "KPI", "Detected", "Baseline", "Deviation", "Severity", "Trigger", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-primary">{a.id}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{a.time}</td>
                  <td className="px-4 py-3 text-xs text-foreground font-medium whitespace-nowrap">{a.kpi}</td>
                  <td className="px-4 py-3 text-xs font-bold data-value text-foreground">{a.metric}</td>
                  <td className="px-4 py-3 text-xs data-value text-muted-foreground">{a.baseline}</td>
                  <td className={`px-4 py-3 text-xs font-bold data-value ${a.deviation.startsWith("-") ? "text-destructive" : "text-warning"}`}>
                    {a.deviation}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={dotMap[a.severity]} />
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${severityBadge[a.severity]}`}>
                        {a.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap">{a.trigger}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusBadge[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border/50 bg-muted/10 text-xs text-muted-foreground">
          Showing {filtered.length} of {anomalies.length} anomalies
        </div>
      </div>
    </div>
  );
}
