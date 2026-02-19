import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, Package, CheckCircle, Clock, Warehouse, Truck, AlertCircle } from "lucide-react";

const weekData = [
  { day: "Mon", delivery: 94.2, accuracy: 98.1, dispatch: 82, warehouse: 71 },
  { day: "Tue", delivery: 91.8, accuracy: 97.5, dispatch: 79, warehouse: 74 },
  { day: "Wed", delivery: 88.4, accuracy: 96.2, dispatch: 75, warehouse: 78 },
  { day: "Thu", delivery: 86.1, accuracy: 95.8, dispatch: 71, warehouse: 81 },
  { day: "Fri", delivery: 89.3, accuracy: 97.1, dispatch: 77, warehouse: 79 },
  { day: "Sat", delivery: 92.6, accuracy: 98.4, dispatch: 83, warehouse: 72 },
  { day: "Sun", delivery: 93.7, accuracy: 98.9, dispatch: 85, warehouse: 69 },
];

const kpiCompare = [
  { kpi: "Delivery", current: 91.4, previous: 94.8 },
  { kpi: "Accuracy", current: 97.4, previous: 98.5 },
  { kpi: "Dispatch", current: 78.9, previous: 82.1 },
  { kpi: "Warehouse", current: 74.9, previous: 71.2 },
  { kpi: "On-Time", current: 88.2, previous: 91.7 },
];

const kpiCards = [
  {
    label: "Delivery Performance",
    value: "91.4%",
    trend: -3.4,
    icon: Truck,
    status: "warning",
    subtext: "vs 94.8% prev week",
  },
  {
    label: "Order Accuracy",
    value: "97.4%",
    trend: -1.1,
    icon: CheckCircle,
    status: "warning",
    subtext: "vs 98.5% prev week",
  },
  {
    label: "Avg Dispatch Time",
    value: "78.9 min",
    trend: -3.2,
    icon: Clock,
    status: "warning",
    subtext: "vs 82.1 min prev week",
  },
  {
    label: "Warehouse Utilization",
    value: "74.9%",
    trend: 3.7,
    icon: Warehouse,
    status: "success",
    subtext: "vs 71.2% prev week",
  },
  {
    label: "On-Time Delivery",
    value: "88.2%",
    trend: -3.5,
    icon: Package,
    status: "danger",
    subtext: "vs 91.7% prev week",
  },
];

const statusMap = {
  success: { dot: "status-dot-success", badge: "bg-success/10 text-success border-success/20", glow: "card-glow-success", top: "border-top-success" },
  warning: { dot: "status-dot-warning", badge: "bg-warning/10 text-warning border-warning/20", glow: "card-glow-warning", top: "border-top-warning" },
  danger: { dot: "status-dot-danger", badge: "bg-destructive/10 text-destructive border-destructive/20", glow: "card-glow-danger", top: "border-top-danger" },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="card-glass rounded-xl p-3 border border-border text-xs">
      <p className="text-muted-foreground mb-2 font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-foreground">{p.name}:</span>
          <span className="text-foreground font-semibold data-value">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function Overview() {
  const hasAlert = true;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Alert Banner */}
      {hasAlert && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/8 border border-warning/25 animate-fade-up">
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-warning">Performance Degradation Detected</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              On-Time Delivery dropped 3.5% below weekly average. AI analysis in progress — check AI Insights for root cause report.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-warning/15 text-warning border border-warning/30 flex-shrink-0">
            ALERT
          </span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpiCards.map((kpi, i) => {
          const s = statusMap[kpi.status as keyof typeof statusMap];
          const isUp = kpi.trend > 0;
          const TrendIcon = isUp ? TrendingUp : kpi.trend < 0 ? TrendingDown : Minus;
          return (
            <div
              key={i}
              className={`card-glass rounded-xl p-5 ${s.top} hover:scale-[1.02] transition-all duration-200`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.badge.replace("text-", "bg-").replace("/10", "/10")} border ${s.badge.split(" ").slice(-1)[0]}`}>
                  <kpi.icon className={`w-4 h-4 ${s.badge.split(" ")[1]}`} />
                </div>
                <span className={`status-dot-${kpi.status === "danger" ? "danger" : kpi.status === "warning" ? "warning" : "success"}`} />
              </div>
              <div className="data-value text-2xl font-bold text-foreground mb-1">{kpi.value}</div>
              <div className="text-xs text-muted-foreground mb-2 leading-tight">{kpi.label}</div>
              <div className={`flex items-center gap-1 text-xs font-medium ${isUp ? "text-success" : "text-destructive"}`}>
                <TrendIcon className="w-3 h-3" />
                {Math.abs(kpi.trend)}%
                <span className="text-muted-foreground font-normal ml-1 truncate">{kpi.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="card-glass rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Week-over-Week Performance</h3>
              <p className="text-xs text-muted-foreground">Daily KPI trends this week</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
              Live
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 28%, 14%)" />
              <XAxis dataKey="day" tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "hsl(215, 20%, 52%)" }} />
              <Line type="monotone" dataKey="delivery" name="Delivery %" stroke="hsl(213, 100%, 60%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(213, 100%, 60%)" }} />
              <Line type="monotone" dataKey="accuracy" name="Accuracy %" stroke="hsl(158, 82%, 44%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(158, 82%, 44%)" }} />
              <Line type="monotone" dataKey="dispatch" name="Dispatch Score" stroke="hsl(38, 95%, 56%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(38, 95%, 56%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card-glass rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">KPI Comparison</h3>
              <p className="text-xs text-muted-foreground">Current vs Previous Week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={kpiCompare} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 28%, 14%)" />
              <XAxis dataKey="kpi" tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 105]} tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "hsl(215, 20%, 52%)" }} />
              <Bar dataKey="current" name="Current Week" fill="hsl(213, 100%, 60%)" radius={[4, 4, 0, 0]} opacity={0.9} />
              <Bar dataKey="previous" name="Prev Week" fill="hsl(220, 30%, 25%)" radius={[4, 4, 0, 0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-glass rounded-xl p-4 border border-border">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">System Status</div>
          <div className="space-y-2">
            {[
              { label: "AI Engine", status: "Operational" },
              { label: "Data Pipeline", status: "Operational" },
              { label: "Alert System", status: "Active" },
              { label: "Simulation Core", status: "Operational" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-xs text-foreground">{s.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className="status-dot-success" />
                  <span className="text-xs text-success">{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass rounded-xl p-4 border border-border">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Top Alerts</div>
          <div className="space-y-2">
            {[
              { msg: "On-Time Delivery drop detected", sev: "High" },
              { msg: "Warehouse Zone C at 94% capacity", sev: "Med" },
              { msg: "Dispatch queue buildup — Sector 7", sev: "Med" },
              { msg: "Carrier SLA breach risk identified", sev: "Low" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold flex-shrink-0 ${
                  a.sev === "High" ? "bg-destructive/15 text-destructive" :
                  a.sev === "Med" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"
                }`}>{a.sev}</span>
                <span className="text-xs text-foreground leading-tight">{a.msg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass rounded-xl p-4 border border-border">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Quick Stats</div>
          <div className="space-y-3">
            {[
              { label: "Orders Processed", value: "14,823", unit: "this week" },
              { label: "Active Carriers", value: "47", unit: "on-route" },
              { label: "Anomalies Detected", value: "12", unit: "reviewed" },
              { label: "Avg Lead Time", value: "2.4 days", unit: "vs 2.1 target" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <div className="text-right">
                  <span className="text-xs font-bold text-foreground data-value">{s.value}</span>
                  <span className="text-[10px] text-muted-foreground ml-1">{s.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
