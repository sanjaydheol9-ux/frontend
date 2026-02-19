import { useState } from "react";
import { Settings, User, Bell, Shield, Database, Zap, ChevronRight, Check } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Database },
  { id: "security", label: "Security", icon: Shield },
  { id: "ai", label: "AI Engine", icon: Zap },
];

const integrations = [
  { name: "SAP S/4HANA", desc: "ERP integration for order and inventory data", status: "Connected", logo: "SAP" },
  { name: "Oracle WMS", desc: "Warehouse management system sync", status: "Connected", logo: "ORC" },
  { name: "Blue Yonder TMS", desc: "Transportation management and carrier data", status: "Pending", logo: "BY" },
  { name: "Kinaxis RapidResponse", desc: "Supply chain planning integration", status: "Disconnected", logo: "KNX" },
];

const statusStyle: Record<string, string> = {
  Connected: "text-success bg-success/10 border-success/20",
  Pending: "text-warning bg-warning/10 border-warning/20",
  Disconnected: "text-muted-foreground bg-muted border-border",
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">Settings</h2>
          <p className="text-xs text-muted-foreground">Platform configuration and preferences</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="md:w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <div className="card-glass rounded-xl border border-border p-6 space-y-5">
              <h3 className="text-sm font-bold text-foreground">Profile Information</h3>
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                  JD
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Jane Doe</div>
                  <div className="text-xs text-muted-foreground">VP Supply Chain Operations</div>
                  <button className="text-xs text-primary hover:text-primary-glow mt-1 transition-colors">Change avatar</button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: "Jane Doe" },
                  { label: "Job Title", value: "VP Supply Chain Operations" },
                  { label: "Email Address", value: "jane.doe@apexlogistics.com" },
                  { label: "Department", value: "Operations & Logistics" },
                  { label: "Company", value: "Apex Logistics Corp" },
                  { label: "Timezone", value: "EST (UTC-5)" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                    <input
                      defaultValue={f.value}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={save}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : "Save Changes"}
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="card-glass rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground">Notification Preferences</h3>
              {[
                { label: "High Severity Anomaly Alerts", desc: "Instant push + email for critical events", on: true },
                { label: "Weekly Performance Summary", desc: "Sent every Monday at 08:00 EST", on: true },
                { label: "AI Insight Regeneration", desc: "Notify when new insights are available", on: false },
                { label: "Carrier SLA Breach Risk", desc: "Alert 4 hours before predicted breach", on: true },
                { label: "Simulation Completion", desc: "Notify when a simulation run completes", on: false },
                { label: "Executive Digest (Daily)", desc: "Summary at EOD 17:00 EST", on: true },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div>
                    <div className="text-sm text-foreground font-medium">{n.label}</div>
                    <div className="text-xs text-muted-foreground">{n.desc}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input type="checkbox" defaultChecked={n.on} className="sr-only peer" />
                    <div className="w-10 h-5 bg-border rounded-full peer peer-checked:bg-primary transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-foreground rounded-full transition-transform peer-checked:translate-x-5" />
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-4">
              {integrations.map((int, i) => (
                <div key={i} className="card-glass rounded-xl border border-border p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/60 border border-border flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                    {int.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground">{int.name}</div>
                    <div className="text-xs text-muted-foreground">{int.desc}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex-shrink-0 ${statusStyle[int.status]}`}>
                    {int.status}
                  </span>
                  <button className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button className="w-full py-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                + Add Integration
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="card-glass rounded-xl border border-border p-6 space-y-5">
              <h3 className="text-sm font-bold text-foreground">Security Settings</h3>
              {[
                { label: "Two-Factor Authentication", desc: "Authenticator app enabled", status: "Enabled", color: "text-success" },
                { label: "Single Sign-On (SSO)", desc: "Okta integration active", status: "Active", color: "text-success" },
                { label: "Session Timeout", desc: "Auto-logout after 8 hours", status: "8 hours", color: "text-foreground" },
                { label: "Audit Logging", desc: "All actions logged and retained 90 days", status: "On", color: "text-success" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-foreground">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                  <span className={`text-xs font-semibold ${s.color}`}>{s.status}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ai" && (
            <div className="card-glass rounded-xl border border-border p-6 space-y-5">
              <h3 className="text-sm font-bold text-foreground">AI Engine Configuration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "AI Model", value: "GPT-4o (logistics-tuned)" },
                  { label: "Insight Refresh Rate", value: "Every 15 minutes" },
                  { label: "Anomaly Sensitivity", value: "High (σ = 1.5)" },
                  { label: "Simulation Iterations", value: "10,000 (Monte Carlo)" },
                  { label: "Confidence Threshold", value: "85% minimum" },
                  { label: "Data Lookback Window", value: "6 weeks" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                    <input
                      defaultValue={f.value}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Update AI Configuration
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
