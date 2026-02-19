import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  selectedWeek: { label: string; value: number };
};

type AIResponse = {
  status: string;
  summary: string;
  bottleneck?: string;
  root_cause?: string;
  recommendations: string[];
};

export default function AIInsights() {
  const { selectedWeek } = useOutletContext<ContextType>();
  const [data, setData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInsights() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:8000/ai/insights?current_week=${selectedWeek.value}&previous_week=${selectedWeek.value - 1}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch AI insights");
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      }

      setLoading(false);
    }

    fetchInsights();
  }, [selectedWeek]);

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold">AI Weekly Insights</h2>

      {loading && <p>Analyzing performance with AI...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="card-glass p-6 rounded-xl space-y-4 border border-border">

          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              data.status === "Alert"
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}>
              {data.status}
            </span>
          </div>

          <div>
            <h3 className="font-semibold">Summary</h3>
            <p className="text-muted-foreground">{data.summary}</p>
          </div>

          <div>
            <h3 className="font-semibold">Main Bottleneck</h3>
            <p className="text-muted-foreground">{data.bottleneck}</p>
          </div>

          <div>
            <h3 className="font-semibold">Root Cause</h3>
            <p className="text-muted-foreground">{data.root_cause}</p>
          </div>

          <div>
            <h3 className="font-semibold">Recommendations</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {data.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}
