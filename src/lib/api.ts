const BASE_URL = "http://127.0.0.1:8000";

export async function getAIInsights(current: number, previous: number) {
  const res = await fetch(
    `${BASE_URL}/ai/insights?current_week=${current}&previous_week=${previous}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch AI insights");
  }

  return res.json();
}
