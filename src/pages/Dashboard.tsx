import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart2,
  GitBranch,
  Brain,
  AlertTriangle,
  Crosshair,
  FlaskConical,
  Settings,
  Activity,
  Bell,
  ChevronDown,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Overview", exact: true },
  { path: "/dashboard/weekly", icon: BarChart2, label: "Weekly Metrics" },
  { path: "/dashboard/metric-tree", icon: GitBranch, label: "Metric Tree" },
  { path: "/dashboard/ai-insights", icon: Brain, label: "AI Insights" },
  { path: "/dashboard/anomalies", icon: AlertTriangle, label: "Anomalies" },
  { path: "/dashboard/root-cause", icon: Crosshair, label: "Root Cause" },
  { path: "/dashboard/simulation", icon: FlaskConical, label: "Simulation" },
  { path: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const companies = ["Apex Logistics Corp", "GlobalFreight Ltd", "NovaTrans Inc", "SwiftHub EU"];
const weeks = ["Week 23 — Jun 2–8", "Week 22 — May 26–Jun 1", "Week 21 — May 19–25"];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [company, setCompany] = useState(companies[0]);
  const [week, setWeek] = useState(weeks[0]);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [weekOpen, setWeekOpen] = useState(false);

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const currentPage = navItems.find((n) =>
    n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path)
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-60 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <Activity className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-foreground leading-tight truncate">Supply Chain</div>
            <div className="text-xs text-primary font-semibold truncate">Intelligence AI</div>
          </div>
          <button className="ml-auto lg:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3">
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-2 mb-2">
            Platform
          </div>
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const active = isActive(item.path, item.exact);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                    active
                      ? "bg-primary/15 text-primary shadow-glow-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      active ? "text-primary" : "text-sidebar-foreground group-hover:text-foreground"
                    }`}
                  />
                  {item.label}
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-glow-primary" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* System status */}
          <div className="mt-6 mx-2 p-3 rounded-lg bg-success/8 border border-success/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="status-dot-success" />
              <span className="text-xs font-semibold text-success">All Systems Operational</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Last synced 2 min ago</p>
          </div>
        </nav>

        {/* User profile bottom */}
        <div className="border-t border-sidebar-border p-3 flex-shrink-0">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
              JD
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-foreground truncate">Jane Doe</div>
              <div className="text-[10px] text-muted-foreground truncate">VP Supply Chain</div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center gap-4 px-4 md:px-6 flex-shrink-0 bg-background/95 backdrop-blur-sm">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page title */}
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold text-foreground">{currentPage?.label ?? "Dashboard"}</h1>
            <p className="text-[10px] text-muted-foreground">Supply Chain Intelligence Platform</p>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Company selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => { setCompanyOpen(!companyOpen); setWeekOpen(false); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-secondary/40 text-sm text-foreground hover:bg-secondary/60 transition-colors"
              >
                <span className="text-xs font-medium truncate max-w-[140px]">{company}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              </button>
              {companyOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 card-glass rounded-xl border border-border shadow-elevated z-50 py-1 animate-scale-in">
                  {companies.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCompany(c); setCompanyOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-secondary/60 transition-colors ${c === company ? "text-primary font-medium" : "text-foreground"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Week selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => { setWeekOpen(!weekOpen); setCompanyOpen(false); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-secondary/40 text-sm text-foreground hover:bg-secondary/60 transition-colors"
              >
                <span className="text-xs font-medium truncate max-w-[140px]">{week}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              </button>
              {weekOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 card-glass rounded-xl border border-border shadow-elevated z-50 py-1 animate-scale-in">
                  {weeks.map((w) => (
                    <button
                      key={w}
                      onClick={() => { setWeek(w); setWeekOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-secondary/60 transition-colors ${w === week ? "text-primary font-medium" : "text-foreground"}`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-lg border border-border bg-secondary/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-warning shadow-glow-warning" />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity">
              JD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin bg-background-secondary p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
