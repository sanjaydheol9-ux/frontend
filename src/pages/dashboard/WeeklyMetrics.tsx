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
import { BarChart2, TrendingDown, TrendingUp } from "lucide-react";

const weeklyData = [
  { week: "W18", delivery: 95.1, accuracy: 98.8, dispatch: 85.2, warehouse: 68.4, ontime: 93.1 },
  { week: "W19", delivery: 93.8, accuracy: 98.2, dispatch: 83.7, warehouse: 70.1, ontime: 91.9 },
  { week: "W20", delivery: 94.2, accuracy: 98.5, dispatch: 84.1, warehouse: 71.4, ontime: 92.4 },
  { week: "W21", delivery: 96.1, accuracy: 99.1, dispatch: 87.3, warehouse: 69.8, ontime: 94.2 },
  { week: "W22", delivery: 94.8, accuracy: 98.5, dispatch: 82.1, warehouse: 71.2, ontime: 91.7 },
  { week: "W23", delivery: 91.4, accuracy: 97.4, dispatch: 78.9, warehouse: 74.9, ontime: 88.2 },
];

const trendData = [
  { kpi: "Delivery Performance", current: 91.4, prev: 94.8, trend: -3.4 },
  { kpi: "Order Accuracy", current: 97.4, prev: 98.5, trend: -1.1 },
  { kpi: "Dispatch Time Score", current: 78.9, prev: 82.1, trend: -3.2 },
  { kpi: "Warehouse Utilization", current: 74.9, prev: 71.2, trend: 3.7 },
  { kpi: "On-Time Delivery", current: 88.2, prev: 91.7, trend: -3.5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="card-glass rounded-xl p-3 border border-border text-xs">
      <p className="text-muted-foreground font-medium mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-bold text-foreground data-value">{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default function WeeklyMetrics() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
          <BarChart2 className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">Weekly Metrics</h2>
          <p className="text-xs text-muted-foreground">6-week KPI trend — Weeks 18–23</p>
        </div>
      </div>

      {/* Trend Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {trendData.map((t, i) => (
          <div key={i} className={`card-glass rounded-xl border p-4 ${t.trend >= 0 ? "border-success/20" : "border-destructive/20"}`}>
            <div className="text-xs text-muted-foreground mb-2 leading-tight">{t.kpi}</div>
            <div className="data-value text-xl font-bold text-foreground mb-1">{t.current}%</div>
            <div className={`flex items-center gap-1 text-xs font-semibold ${t.trend >= 0 ? "text-success" : "text-destructive"}`}>
              {t.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {t.trend > 0 ? "+" : ""}{t.trend}%
              <span className="text-muted-foreground font-normal">vs W22</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="card-glass rounded-xl border border-border p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">KPI Performance Trend — 6 Weeks</h3>
          <p className="text-xs text-muted-foreground">Delivery, Accuracy, and Dispatch scores over time</p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 28%, 14%)" />
            <XAxis dataKey="week" tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[60, 100]} tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "11px", color: "hsl(215, 20%, 52%)" }} />
            <Line type="monotone" dataKey="delivery" name="Delivery %" stroke="hsl(213, 100%, 60%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(213, 100%, 60%)" }} />
            <Line type="monotone" dataKey="accuracy" name="Accuracy %" stroke="hsl(158, 82%, 44%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(158, 82%, 44%)" }} />
            <Line type="monotone" dataKey="dispatch" name="Dispatch Score" stroke="hsl(38, 95%, 56%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(38, 95%, 56%)" }} />
            <Line type="monotone" dataKey="ontime" name="On-Time %" stroke="hsl(195, 100%, 50%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(195, 100%, 50%)" }} strokeDasharray="6 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card-glass rounded-xl border border-border p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">Warehouse Utilization by Week</h3>
          <p className="text-xs text-muted-foreground">Capacity usage across the 6-week window</p>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 28%, 14%)" />
            <XAxis dataKey="week" tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[50, 100]} tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="warehouse" name="Warehouse %" radius={[4, 4, 0, 0]} fill="hsl(213, 100%, 60%)" opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Raw data table */}
      <div className="card-glass rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-muted/20">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Raw Weekly Data</h3>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Week", "Delivery %", "Accuracy %", "Dispatch Score", "Warehouse %", "On-Time %"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyData.map((row, i) => (
                <tr key={i} className={`border-b border-border/40 hover:bg-secondary/20 transition-colors ${row.week === "W23" ? "bg-primary/5" : ""}`}>
                  <td className="px-4 py-2.5 text-xs font-bold text-primary data-value">{row.week}</td>
                  <td className="px-4 py-2.5 text-xs data-value text-foreground">{row.delivery}%</td>
                  <td className="px-4 py-2.5 text-xs data-value text-foreground">{row.accuracy}%</td>
                  <td className="px-4 py-2.5 text-xs data-value text-foreground">{row.dispatch}%</td>
                  <td className="px-4 py-2.5 text-xs data-value text-foreground">{row.warehouse}%</td>
                  <td className="px-4 py-2.5 text-xs data-value text-foreground">{row.ontime}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
