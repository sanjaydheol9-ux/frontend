import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Truck, CheckCircle, Clock, Warehouse, Package } from "lucide-react";

type ContextType = {
  selectedWeek: number;
};

type Metrics = {
  delivery_score: number;
  accuracy_score: number;
  dispatch_score: number;
  warehouse_score: number;
  on_time_score: number;
};

export default function Overview() {
  const { selectedWeek } = useOutletContext<ContextType>();

  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMetrics() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/metrics/${selectedWeek}`
        );
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
      setLoading(false);
    }

    fetchMetrics();
  }, [selectedWeek]); // 👈 runs whenever week changes

  if (loading) return <div>Loading metrics...</div>;
  if (!metrics) return null;

  const kpis = [
    {
      label: "Delivery Performance",
      value: `${metrics.delivery_score}%`,
      icon: Truck,
    },
    {
      label: "Order Accuracy",
      value: `${metrics.accuracy_score}%`,
      icon: CheckCircle,
    },
    {
      label: "Dispatch Score",
      value: `${metrics.dispatch_score}`,
      icon: Clock,
    },
    {
      label: "Warehouse Utilization",
      value: `${metrics.warehouse_score}%`,
      icon: Warehouse,
    },
    {
      label: "On-Time Delivery",
      value: `${metrics.on_time_score}%`,
      icon: Package,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Week {selectedWeek} Performance Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="card-glass rounded-xl p-5 border border-border"
          >
            <div className="mb-3">
              <kpi.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="text-xs text-muted-foreground">
              {kpi.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
