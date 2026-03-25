import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketCardProps {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  index: number;
}

export function MarketCard({ name, value, change, changePercent, index }: MarketCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-medium">{name}</span>
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-gain" />
        ) : (
          <TrendingDown className="h-4 w-4 text-loss" />
        )}
      </div>
      <div className="font-mono text-lg font-bold text-foreground">
        {value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
      </div>
      <div className={`font-mono text-sm mt-1 ${isPositive ? 'text-gain' : 'text-loss'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
      </div>
    </motion.div>
  );
}
