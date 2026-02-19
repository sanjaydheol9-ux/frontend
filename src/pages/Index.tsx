import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Brain, Activity, Zap, FileText, Shield, ChevronRight, Linkedin } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Activity,
    title: "Real-Time KPI Monitoring",
    desc: "Track delivery performance, order accuracy, and warehouse utilization with millisecond latency across your entire network.",
    color: "primary",
  },
  {
    icon: Brain,
    title: "AI Anomaly Detection",
    desc: "Neural pattern recognition identifies deviations 35% faster than traditional threshold-based systems.",
    color: "accent",
  },
  {
    icon: Zap,
    title: "Root Cause Analysis Engine",
    desc: "Automated causal inference traces disruptions to their origin across thousands of interdependent supply nodes.",
    color: "success",
  },
  {
    icon: BarChart3,
    title: "Load Simulation & Stress Testing",
    desc: "Monte Carlo simulation models capacity under demand surges, exposing breaking points before they occur.",
    color: "warning",
  },
  {
    icon: FileText,
    title: "AI Executive Summary Generator",
    desc: "Distill complex operational data into board-ready narratives with actionable recommendations in seconds.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Predictive Risk Intelligence",
    desc: "Multi-horizon forecasting anticipates disruptions 72 hours ahead with supplier and geopolitical signal integration.",
    color: "accent",
  },
];

const metrics = [
  { value: "18%", label: "Average Cost Reduction", sub: "vs. industry baseline" },
  { value: "27%", label: "Faster Dispatch Cycles", sub: "across distribution centers" },
  { value: "35%", label: "Anomaly Detection Lift", sub: "compared to rule-based systems" },
  { value: "99.7%", label: "Platform Uptime SLA", sub: "enterprise-grade reliability" },
];

const colorMap: Record<string, string> = {
  primary: "text-primary border-primary/20 bg-primary/5",
  accent: "text-accent border-accent/20 bg-accent/5",
  success: "text-success border-success/20 bg-success/5",
  warning: "text-warning border-warning/20 bg-warning/5",
};

const iconBgMap: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ---- NAV ---- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm tracking-wide text-foreground">
              Supply Chain <span className="text-primary">Intelligence AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#metrics" className="hover:text-foreground transition-colors">Performance</a>
            <a href="#footer" className="hover:text-foreground transition-colors">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-border/80 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="text-sm px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-glow-primary"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ---- HERO ---- */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        {/* Glow blobs */}
        <div className="hero-glow w-[600px] h-[400px] bg-primary/10 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4" />
        <div className="hero-glow w-[300px] h-[300px] bg-accent/8 top-1/3 right-1/4" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs font-medium mb-8 animate-fade-in">
            <span className="status-dot-success" />
            Enterprise AI Platform — v3.2 Live
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            AI-Powered{" "}
            <span className="text-gradient-primary">Supply Chain</span>
            <br />
            Intelligence
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            Real-time insights, anomaly detection, predictive simulation, and automated root cause analysis — unified in one enterprise platform.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all shadow-glow-primary hover:shadow-lg group"
            >
              Launch Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border bg-secondary/40 text-foreground font-semibold text-base hover:bg-secondary/60 transition-all">
              Request Demo
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Trust badges */}
          <div
            className="mt-16 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            {["SOC 2 Type II Certified", "GDPR Compliant", "ISO 27001", "99.7% Uptime SLA", "Enterprise SSO"].map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-success" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- METRICS ---- */}
      <section id="metrics" className="py-20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-gradient-primary data-value mb-2">{m.value}</div>
                <div className="text-sm font-semibold text-foreground mb-1">{m.label}</div>
                <div className="text-xs text-muted-foreground">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/30 text-muted-foreground text-xs font-medium mb-4">
              Core Capabilities
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Intelligence at every layer of<br />your supply chain
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Six interconnected AI modules designed to eliminate blind spots and surface actionable intelligence across your entire logistics network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`card-glass rounded-xl p-6 border hover:scale-[1.02] transition-all duration-300 group ${colorMap[f.color]}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${iconBgMap[f.color]}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- SOCIAL PROOF ---- */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="card-glass rounded-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="hero-glow w-96 h-64 bg-primary/8 -top-12 -right-12" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Enterprise Ready</div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Trusted by logistics teams<br />managing 10M+ SKUs
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  From regional distributors to global 3PLs, Supply Chain Intelligence AI integrates with your existing WMS, TMS, and ERP systems in under 48 hours.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["SAP", "Oracle WMS", "Manhattan Associates", "Blue Yonder", "Kinaxis"].map((t) => (
                    <span key={t} className="px-3 py-1 text-xs rounded-md border border-border bg-secondary/40 text-muted-foreground font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[240px]">
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow-primary"
                >
                  Launch Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-secondary/40 transition-colors">
                  Request Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer id="footer" className="border-t border-border/40 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-sm text-foreground">Supply Chain Intelligence AI</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Enterprise-grade AI analytics for supply chain performance optimization and predictive intelligence.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-16 gap-y-4 text-sm">
              <div>
                <div className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">Product</div>
                {["Dashboard", "AI Insights", "Simulation", "Anomaly Detection"].map((l) => (
                  <div key={l}>
                    <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors text-xs block mb-2">{l}</Link>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">Company</div>
                {["About", "Careers", "Press", "Contact"].map((l) => (
                  <div key={l}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs block mb-2">{l}</a>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">Legal</div>
                {["Privacy Policy", "Terms of Service", "Security", "Compliance"].map((l) => (
                  <div key={l}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs block mb-2">{l}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground">
              © 2025 Supply Chain Intelligence AI. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <span className="text-xs text-muted-foreground">Enterprise support available 24/7</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
