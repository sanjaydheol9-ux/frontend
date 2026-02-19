import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { FlaskConical, Play, AlertTriangle, CheckCircle, Minus } from "lucide-react";

const generateSimData = (orderIncrease: number, pickElasticity: number, dispatchElasticity: number) => {
  const baseline = 91.4;
  const points = [];
  for (let pct = 0; pct <= 100; pct += 5) {
    const stress = pct / 100;
    const pickImpact = (1 - pickElasticity / 100) * stress * 12;
    const dispatchImpact = (1 - dispatchElasticity / 100) * stress * 8;
    const orderImpact = (orderIncrease / 100) * stress * 15;
    const score = Math.max(40, baseline - pickImpact - dispatchImpact - orderImpact);
    points.push({
      load: `${pct}%`,
      score: parseFloat(score.toFixed(1)),
      baseline: baseline,
    });
  }
  return points;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="card-glass rounded-xl p-3 border border-border text-xs">
      <p className="text-muted-foreground mb-2">Load: {label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-foreground">{p.name}: </span>
          <span className="font-bold data-value">{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default function Simulation() {
  const [orderIncrease, setOrderIncrease] = useState(25);
  const [pickElasticity, setPickElasticity] = useState(60);
  const [dispatchElasticity, setDispatchElasticity] = useState(55);
  const [ran, setRan] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseline = 91.4;
  const simScore = parseFloat(
    Math.max(40, baseline - (orderIncrease * 0.15) - ((100 - pickElasticity) * 0.08) - ((100 - dispatchElasticity) * 0.05)).toFixed(1)
  );
  const delta = parseFloat((simScore - baseline).toFixed(1));
  const riskLevel = simScore >= 88 ? "Low" : simScore >= 80 ? "Medium" : simScore >= 70 ? "High" : "Critical";
  const riskColor: Record<string, string> = {
    Low: "text-success bg-success/10 border-success/20",
    Medium: "text-warning bg-warning/10 border-warning/20",
    High: "text-destructive bg-destructive/10 border-destructive/20",
    Critical: "text-destructive bg-destructive/15 border-destructive/30",
  };
  const RiskIcon = riskLevel === "Low" ? CheckCircle : riskLevel === "Medium" ? Minus : AlertTriangle;

  const simData = generateSimData(orderIncrease, pickElasticity, dispatchElasticity);
  const breakingPoint = simData.find((d) => d.score < 75)?.load ?? ">100%";

  const runSimulation = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setRan(true); }, 1200);
  };

  const SliderInput = ({
    label, value, onChange, min, max, unit, desc,
  }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; unit: string; desc: string }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-foreground">{label}</div>
          <div className="text-xs text-muted-foreground">{desc}</div>
        </div>
        <span className="data-value text-primary font-bold text-sm px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, hsl(213, 100%, 60%) ${((value - min) / (max - min)) * 100}%, hsl(220, 30%, 18%) ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center">
          <FlaskConical className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">Load Simulation & Stress Testing</h2>
          <p className="text-xs text-muted-foreground">Monte Carlo scenario modelling — configure parameters and run</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="card-glass rounded-xl border border-border p-6 space-y-6">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Simulation Parameters</div>

          <SliderInput
            label="Order Volume Increase"
            value={orderIncrease}
            onChange={setOrderIncrease}
            min={0}
            max={100}
            unit="%"
            desc="Surge above current weekly baseline"
          />
          <SliderInput
            label="Picking Elasticity"
            value={pickElasticity}
            onChange={setPickElasticity}
            min={20}
            max={100}
            unit="%"
            desc="Warehouse picking capacity headroom"
          />
          <SliderInput
            label="Dispatch Elasticity"
            value={dispatchElasticity}
            onChange={setDispatchElasticity}
            min={20}
            max={100}
            unit="%"
            desc="Dispatch throughput flexibility"
          />

          <button
            onClick={runSimulation}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow-primary disabled:opacity-60"
          >
            {loading ? (
              <><span className="animate-spin">⊙</span> Running Simulation...</>
            ) : (
              <><Play className="w-4 h-4" /> Run Simulation</>
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Score cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Baseline Score", value: `${baseline}%`, color: "text-foreground", bg: "bg-muted/40" },
              { label: "Simulated Score", value: ran ? `${simScore}%` : "—", color: delta < 0 ? "text-destructive" : "text-success", bg: ran ? "bg-primary/5" : "bg-muted/40" },
              { label: "Performance Δ", value: ran ? `${delta > 0 ? "+" : ""}${delta}%` : "—", color: delta < 0 ? "text-destructive" : "text-success", bg: ran ? (delta < 0 ? "bg-destructive/5" : "bg-success/5") : "bg-muted/40" },
              { label: "Breaking Point", value: ran ? breakingPoint : "—", color: "text-warning", bg: ran ? "bg-warning/5" : "bg-muted/40" },
            ].map((card, i) => (
              <div key={i} className={`rounded-xl border border-border p-4 text-center ${card.bg} card-glass`}>
                <div className="text-xs text-muted-foreground mb-1">{card.label}</div>
                <div className={`data-value text-xl font-bold ${card.color}`}>{card.value}</div>
              </div>
            ))}
          </div>

          {/* Risk indicator */}
          {ran && (
            <div className={`flex items-center gap-3 p-4 rounded-xl border ${riskColor[riskLevel]}`}>
              <RiskIcon className="w-5 h-5 flex-shrink-0" />
              <div>
                <span className="text-sm font-bold">Risk Level: {riskLevel}</span>
                <p className="text-xs opacity-75 mt-0.5">
                  {riskLevel === "Low" && "Operations remain stable. No immediate intervention required."}
                  {riskLevel === "Medium" && "Performance degradation expected. Monitor closely and prepare contingency."}
                  {riskLevel === "High" && "Significant disruption likely. Activate emergency dispatch protocols."}
                  {riskLevel === "Critical" && "System failure imminent. Halt order intake and escalate immediately."}
                </p>
              </div>
            </div>
          )}

          {/* Breaking point chart */}
          <div className="card-glass rounded-xl border border-border p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground">Stress Curve — Delivery Score vs Load %</h3>
              <p className="text-xs text-muted-foreground">Red zone below 75% indicates operational breakdown</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={simData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 28%, 14%)" />
                <XAxis dataKey="load" tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 100]} tick={{ fill: "hsl(215, 20%, 52%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={75} stroke="hsl(0, 84%, 62%)" strokeDasharray="6 3" label={{ value: "Critical Threshold", fill: "hsl(0, 84%, 62%)", fontSize: 10 }} />
                <ReferenceLine y={88} stroke="hsl(38, 95%, 56%)" strokeDasharray="6 3" label={{ value: "Warning Zone", fill: "hsl(38, 95%, 56%)", fontSize: 10 }} />
                <Line type="monotone" dataKey="baseline" name="Baseline" stroke="hsl(220, 30%, 35%)" strokeWidth={1.5} strokeDasharray="6 4" dot={false} />
                <Line type="monotone" dataKey="score" name="Simulated" stroke="hsl(213, 100%, 60%)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
