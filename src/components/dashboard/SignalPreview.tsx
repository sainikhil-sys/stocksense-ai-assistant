import { motion } from 'framer-motion';
import { SIGNALS } from '@/lib/mock-data';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SignalPreview() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" /> Live Signals
        </h3>
        <button onClick={() => navigate('/signals')} className="text-xs text-accent hover:underline">
          View All
        </button>
      </div>
      <div className="space-y-2">
        {SIGNALS.slice(0, 3).map((signal, i) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                signal.action === 'BUY' ? 'bg-gain/15 text-gain' :
                signal.action === 'SELL' ? 'bg-loss/15 text-loss' :
                'bg-warning/15 text-warning'
              }`}>
                {signal.action}
              </span>
              <div>
                <div className="text-sm font-medium text-foreground">{signal.stockSymbol}</div>
                <div className="text-xs text-muted-foreground">{signal.type} • {signal.timestamp}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-muted-foreground">Confidence</div>
              <div className={`text-sm font-mono font-bold ${signal.confidence >= 75 ? 'text-gain' : signal.confidence >= 50 ? 'text-warning' : 'text-loss'}`}>
                {signal.confidence}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
