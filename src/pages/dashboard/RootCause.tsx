import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Crosshair, AlertTriangle, ChevronRight, TrendingDown } from "lucide-react";

const contributionData = [
  { factor: "Carrier Delays", contribution: 42, color: "hsl(0, 84%, 62%)" },
  { factor: "WMS Routing Error", contribution: 28, color: "hsl(38, 95%, 56%)" },
  { factor: "Zone C Saturation", contribution: 18, color: "hsl(213, 100%, 60%)" },
  { factor: "Staff Shortfall", contribution: 8, color: "hsl(195, 100%, 50%)" },
  { factor: "Other Factors", contribution: 4, color: "hsl(215, 20%, 40%)" },
];

const breakdown = [
  {
    kpi: "On-Time Delivery",
    baseline: 91.7,
    current: 88.2,
    drop: -3.5,
    drivers: ["Carrier consolidation failure (×3 pickup misses)", "I-87 congestion — 22 min avg delay"],
    severity: "high",
  },
  {
    kpi: "Delivery Performance",
    baseline: 94.8,
    current: 91.4,
    drop: -3.4,
    drivers: ["Zone C dispatch saturation at 94%", "Manual WMS override introduced 8-12 min lag"],
    severity: "high",
  },
  {
    kpi: "Order Accuracy",
    baseline: 98.5,
    current: 97.4,
    drop: -1.1,
    drivers: ["Shift 2 picker accuracy decline", "Label mismatch in Sector 7 bin system"],
    severity: "medium",
  },
];

const severityColor: Record<string, string> = {
  high: "border-destructive/25 bg-destructive/5",
  medium: "border-warning/25 bg-warning/5",
  low: "border-success/25 bg-success/5",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="card-glass rounded-xl p-3 border border-border text-xs">
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="text-foreground font-bold">{payload[0]?.value}% contribution</p>
    </div>
  );
};

export default function RootCause() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-destructive/10 border border-destructive/25 flex items-center justify-center">
          <Crosshair className="w-4 h-4 text-destructive" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">Root Cause Analysis Engine</h2>
          <p className="text-xs text-muted-foreground">AI-powered causal inference — Week 23</p>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-glass rounded-xl p-5 border border-border">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Causal Contribution Breakdown</h3>
            <p className="text-xs text-muted-foreground">Relative impact on delivery performance drop</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={contributionData} layout="vertical" barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 28%, 14%)" horizontal={false} />
              <XAxis type="number" domain={[0, 50]} tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="factor" tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} width={110} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="contribution" radius={[0, 4, 4, 0]}>
                {contributionData.map((d, i) => (
                  <Cell key={i} fill={d.color} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Executive Verdict */}
        <div className="card-glass rounded-xl p-5 border border-destructive/25 bg-destructive/5 card-glow-danger">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h3 className="text-sm font-semibold text-foreground">Executive Verdict</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Primary Driver</div>
              <p className="text-sm font-bold text-destructive">Carrier Consolidation Failure (42% variance)</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Compounding Factor</div>
              <p className="text-sm font-semibold text-warning">WMS Routing Logic Override (28% variance)</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-border mt-4">
              <p className="text-xs text-foreground leading-relaxed">
                The 3.5% On-Time Delivery decline this week is primarily attributable to three simultaneous carrier pickup failures on Tuesday (Jun 4), which triggered a cascade effect in the WMS routing engine. An unauthorized manual override compounded the bottleneck in Zone C, causing an 8–12 minute processing lag that affected 2,847 orders.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">Model confidence</span>
              <span className="text-xs font-bold text-success data-value">96.7%</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Breakdown */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-destructive" />
          KPI Drop Breakdown
        </h3>
        <div className="space-y-4">
          {breakdown.map((b, i) => (
            <div key={i} className={`card-glass rounded-xl border p-5 ${severityColor[b.severity]}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-sm font-semibold text-foreground">{b.kpi}</h4>
                    <span className="data-value text-destructive font-bold text-sm">{b.drop}%</span>
                    <span className="text-xs text-muted-foreground">({b.baseline}% → {b.current}%)</span>
                  </div>
                  <div className="space-y-1">
                    {b.drivers.map((d, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <ChevronRight className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Comparison bars */}
                <div className="flex gap-4 text-center min-w-[180px]">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Baseline</div>
                    <div className="text-lg font-bold data-value text-muted-foreground">{b.baseline}%</div>
                  </div>
                  <div className="w-px bg-border self-stretch" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Current</div>
                    <div className="text-lg font-bold data-value text-destructive">{b.current}%</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
