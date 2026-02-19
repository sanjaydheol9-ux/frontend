import { useState } from "react";
import { Brain, RefreshCw, TrendingDown, AlertTriangle, ChevronRight, CheckCircle, Zap } from "lucide-react";

const recommendations = [
  {
    id: 1,
    priority: "Critical",
    title: "Redistribute Zone C Dispatch Load",
    detail:
      "Zone C accounts for 64% of the dispatch delay variance. Reallocate 30% of pending orders to Zones A and B. Estimated dispatch time improvement: 18 minutes.",
    impact: "High",
    effort: "Low",
    color: "danger",
  },
  {
    id: 2,
    priority: "High",
    title: "Re-route Carrier Fleet — Eastern Corridor",
    detail:
      "Road congestion on I-87 adds 22min average delay. AI recommends activating Route 9W bypass for all carriers tagged to Northeast delivery zones.",
    impact: "High",
    effort: "Medium",
    color: "warning",
  },
  {
    id: 3,
    priority: "Medium",
    title: "Increase Picking Staff — Shift 2 Window",
    detail:
      "Order accuracy dips to 95.1% during Shift 2 (12:00–18:00). Adding 4 additional pickers during this window could recover 2.1% accuracy points.",
    impact: "Medium",
    effort: "Medium",
    color: "primary",
  },
];

const priorityColor: Record<string, string> = {
  danger: "border-destructive/25 bg-destructive/5",
  warning: "border-warning/25 bg-warning/5",
  primary: "border-primary/25 bg-primary/5",
};

const badgeColor: Record<string, string> = {
  Critical: "bg-destructive/15 text-destructive",
  High: "bg-warning/15 text-warning",
  Medium: "bg-primary/15 text-primary",
};

const impactColor: Record<string, string> = {
  High: "text-destructive",
  Medium: "text-warning",
  Low: "text-success",
};

export default function AIInsights() {
  const [loading, setLoading] = useState(false);
  const [status] = useState<"Alert" | "Normal">("Alert");

  const regenerate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">AI Insights Engine</h2>
          <p className="text-xs text-muted-foreground">GPT-4o powered operational intelligence — updated every 15 min</p>
        </div>
        <button
          onClick={regenerate}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/25 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Regenerate Insights
        </button>
      </div>

      {/* Main AI Status Card */}
      <div className={`card-glass rounded-2xl border p-6 md:p-8 relative overflow-hidden ${
        status === "Alert" ? "border-warning/25 card-glow-warning" : "border-success/25 card-glow-success"
      }`}>
        <div className="hero-glow w-72 h-48 opacity-30 -top-8 -right-8" style={{ background: status === "Alert" ? "hsl(38, 95%, 56%, 0.2)" : "hsl(158, 82%, 44%, 0.2)" }} />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Status badge */}
            <div className="flex flex-col items-center gap-3 min-w-[120px]">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                status === "Alert" ? "bg-warning/15 border border-warning/30" : "bg-success/15 border border-success/30"
              }`}>
                {status === "Alert"
                  ? <AlertTriangle className="w-7 h-7 text-warning" />
                  : <CheckCircle className="w-7 h-7 text-success" />
                }
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                status === "Alert"
                  ? "bg-warning/15 text-warning border-warning/30"
                  : "bg-success/15 text-success border-success/30"
              }`}>
                {status === "Alert" ? "⚠ ALERT" : "✓ NORMAL"}
              </span>
            </div>

            {/* Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1.5">Primary Bottleneck</div>
                <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                  Zone C Dispatch Saturation
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Dispatch queue at 94% capacity with no elasticity buffer. Processing lag averaging 24 minutes above SLA.
                </p>
              </div>

              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1.5">Root Cause</div>
                <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Zap className="w-4 h-4 text-warning" />
                  Carrier Consolidation Failure
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  3 carriers failed scheduled pickup windows. Compounded by manual override delay in WMS routing engine.
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1.5">Executive Summary</div>
                <div className="p-4 rounded-xl bg-muted/40 border border-border">
                  <p className="text-sm text-foreground leading-relaxed">
                    <span className="text-primary font-semibold">Week 23 Performance Summary:</span> This week's operational data indicates a{" "}
                    <span className="text-destructive font-medium">3.4% decline in delivery performance</span> and a{" "}
                    <span className="text-destructive font-medium">3.5% drop in on-time delivery rate</span>, primarily attributed to Zone C dispatch saturation caused by carrier consolidation failures on Tuesday and Wednesday. Warehouse utilization improved by 3.7%, signaling effective inbound throughput. Immediate intervention on dispatch routing and carrier SLA enforcement is recommended to recover KPIs within the next 48-72 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Top Operational Recommendations</h3>
          <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
            AI Generated
          </span>
        </div>
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <div
              key={rec.id}
              className={`card-glass rounded-xl border p-5 transition-all hover:scale-[1.01] duration-200 ${priorityColor[rec.color]}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-xs font-black text-muted-foreground flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeColor[rec.priority]}`}>
                      {rec.priority}
                    </span>
                    <h4 className="text-sm font-semibold text-foreground">{rec.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{rec.detail}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-muted-foreground">
                      Impact: <span className={`font-semibold ${impactColor[rec.impact]}`}>{rec.impact}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Effort: <span className="font-semibold text-foreground">{rec.effort}</span>
                    </span>
                    <button className="ml-auto flex items-center gap-1 text-primary hover:text-primary-glow transition-colors font-medium">
                      View Action Plan <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Model Info */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 border border-border">
        <Brain className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <p className="text-xs text-muted-foreground">
          Insights generated using <span className="text-foreground font-medium">GPT-4o + proprietary logistics fine-tuning</span>. 
          Model confidence: <span className="text-success font-medium">94.2%</span>. 
          Data freshness: <span className="text-foreground font-medium">2 minutes ago</span>.
        </p>
      </div>
    </div>
  );
}
