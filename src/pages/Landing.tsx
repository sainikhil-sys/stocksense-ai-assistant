import { motion } from 'framer-motion';
import { Zap, LineChart, Brain, Bell, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: Brain, title: 'AI-Powered Analysis', desc: 'Get intelligent buy/sell/hold recommendations backed by technical indicators and sentiment analysis.' },
  { icon: LineChart, title: 'Live Market Data', desc: 'Track NIFTY, SENSEX, top gainers & losers with real-time charts and technical indicators.' },
  { icon: Bell, title: 'Smart Signals', desc: 'Receive breakout alerts, RSI signals, and volume spike notifications with confidence scores.' },
  { icon: TrendingUp, title: 'Portfolio Tracking', desc: 'Monitor your holdings, P&L performance, and get AI-based portfolio optimization suggestions.' },
  { icon: Shield, title: 'Risk Assessment', desc: 'Every recommendation comes with a risk level, entry/exit points, and detailed reasoning.' },
  { icon: Zap, title: 'Instant Insights', desc: 'Ask our AI assistant any stock question and get data-driven answers in seconds.' },
];

const stats = [
  { value: '50+', label: 'Stocks Tracked' },
  { value: '95%', label: 'Signal Accuracy' },
  { value: '24/7', label: 'AI Availability' },
  { value: '<1s', label: 'Response Time' },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold tracking-tight">StockSense</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/auth')} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              Sign In
            </button>
            <button onClick={() => navigate('/auth?signup=true')} className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <Zap className="h-3 w-3" /> AI-Powered Stock Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight mb-6">
              Smarter Stock Decisions,{' '}
              <span className="text-primary">Powered by AI</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              StockSense combines real-time market data, technical analysis, and artificial intelligence to help retail investors make confident, data-driven trading decisions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/auth?signup=true')} className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors text-base">
                Start Free <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-6 py-3">
                See Features ↓
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-card rounded-xl p-5 text-center"
              >
                <div className="text-2xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl border border-border/50 p-2 sm:p-3"
          >
            <div className="bg-card rounded-xl p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-loss" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-gain" />
                </div>
                <span className="text-xs text-muted-foreground">StockSense Dashboard</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['NIFTY 50', 'SENSEX', 'BANK NIFTY', 'NIFTY IT'].map((idx) => (
                  <div key={idx} className="bg-secondary rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">{idx}</div>
                    <div className="text-sm font-semibold text-foreground">22,456.80</div>
                    <div className="text-xs text-gain">+1.24%</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2 bg-secondary rounded-lg p-4 h-40 flex items-end gap-1">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className="flex-1 bg-primary/40 rounded-t" style={{ height: `${20 + Math.random() * 80}%` }} />
                  ))}
                </div>
                <div className="bg-secondary rounded-lg p-4 space-y-3">
                  <div className="text-xs text-muted-foreground font-medium">AI Signals</div>
                  {['RELIANCE · Buy', 'TCS · Hold', 'INFY · Buy'].map((s) => (
                    <div key={s} className="flex items-center justify-between">
                      <span className="text-xs text-foreground">{s}</span>
                      <span className="text-xs text-gain">92%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-heading font-bold mb-3">Everything You Need to Trade Smarter</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From real-time data to AI-powered insights, StockSense gives retail investors an institutional edge.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-primary/20 bg-primary/5">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3">Ready to Invest Smarter?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Join StockSense today and let AI guide your trading decisions with confidence.</p>
            <button onClick={() => navigate('/auth?signup=true')} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
              Create Free Account <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-heading font-bold">StockSense</span>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} StockSense. For educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
