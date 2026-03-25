import { motion } from 'framer-motion';
import { STOCKS } from '@/lib/mock-data';
import { useNavigate } from 'react-router-dom';

export function StockTable() {
  const navigate = useNavigate();
  const gainers = [...STOCKS].filter(s => s.change > 0).sort((a, b) => b.changePercent - a.changePercent);
  const losers = [...STOCKS].filter(s => s.change < 0).sort((a, b) => a.changePercent - b.changePercent);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gain mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gain" /> Top Gainers
        </h3>
        <div className="space-y-2">
          {gainers.slice(0, 5).map((stock) => (
            <button
              key={stock.id}
              onClick={() => navigate(`/stocks/${stock.symbol}`)}
              className="flex items-center justify-between w-full p-2.5 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">{stock.symbol}</div>
                <div className="text-xs text-muted-foreground">{stock.name}</div>
              </div>
              <div className="text-right font-mono">
                <div className="text-sm text-foreground">₹{stock.price.toLocaleString('en-IN')}</div>
                <div className="text-xs text-gain">+{stock.changePercent.toFixed(2)}%</div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-4">
        <h3 className="text-sm font-semibold text-loss mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-loss" /> Top Losers
        </h3>
        <div className="space-y-2">
          {losers.slice(0, 5).map((stock) => (
            <button
              key={stock.id}
              onClick={() => navigate(`/stocks/${stock.symbol}`)}
              className="flex items-center justify-between w-full p-2.5 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">{stock.symbol}</div>
                <div className="text-xs text-muted-foreground">{stock.name}</div>
              </div>
              <div className="text-right font-mono">
                <div className="text-sm text-foreground">₹{stock.price.toLocaleString('en-IN')}</div>
                <div className="text-xs text-loss">{stock.changePercent.toFixed(2)}%</div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
