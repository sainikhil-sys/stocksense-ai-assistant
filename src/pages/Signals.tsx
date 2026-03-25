import { SIGNALS } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Zap, Filter } from 'lucide-react';
import { useState } from 'react';

const Signals = () => {
  const [filter, setFilter] = useState<string>('ALL');

  const filtered = filter === 'ALL' ? SIGNALS : SIGNALS.filter(s => s.action === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" /> Signals
        </h1>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {['ALL', 'BUY', 'SELL', 'HOLD'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                filter === f
                  ? f === 'BUY' ? 'bg-gain/15 text-gain'
                  : f === 'SELL' ? 'bg-loss/15 text-loss'
                  : f === 'HOLD' ? 'bg-warning/15 text-warning'
                  : 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((signal, i) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-5 hover:border-primary/20 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <span className={`text-sm font-mono font-bold px-3 py-1.5 rounded-lg ${
                  signal.action === 'BUY' ? 'bg-gain/15 text-gain' :
                  signal.action === 'SELL' ? 'bg-loss/15 text-loss' :
                  'bg-warning/15 text-warning'
                }`}>
                  {signal.action}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-foreground">{signal.stockSymbol}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">{signal.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{signal.stockName}</p>
                  <p className="text-sm text-secondary-foreground mt-2">{signal.reason}</p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                <div className={`text-xl font-mono font-bold ${signal.confidence >= 75 ? 'text-gain' : signal.confidence >= 50 ? 'text-warning' : 'text-loss'}`}>
                  {signal.confidence}%
                </div>
                <div className="w-16 h-1.5 rounded-full bg-secondary mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${signal.confidence >= 75 ? 'bg-gain' : signal.confidence >= 50 ? 'bg-warning' : 'bg-loss'}`}
                    style={{ width: `${signal.confidence}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-2">{signal.timestamp}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Signals;
