import { HOLDINGS, generatePortfolioHistory } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useMemo } from 'react';
import { Briefcase, TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';

const Portfolio = () => {
  const history = useMemo(() => generatePortfolioHistory(30), []);
  const totalValue = HOLDINGS.reduce((sum, h) => sum + h.value, 0);
  const totalPnl = HOLDINGS.reduce((sum, h) => sum + h.pnl, 0);
  const totalInvested = HOLDINGS.reduce((sum, h) => sum + h.avgPrice * h.quantity, 0);
  const pnlPercent = (totalPnl / totalInvested) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <IndianRupee className="h-4 w-4" />
            <span className="text-xs font-medium">Total Value</span>
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">₹{totalValue.toLocaleString('en-IN')}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            {totalPnl >= 0 ? <TrendingUp className="h-4 w-4 text-gain" /> : <TrendingDown className="h-4 w-4 text-loss" />}
            <span className="text-xs font-medium">Total P&L</span>
          </div>
          <div className={`text-2xl font-mono font-bold ${totalPnl >= 0 ? 'text-gain' : 'text-loss'}`}>
            {totalPnl >= 0 ? '+' : ''}₹{totalPnl.toLocaleString('en-IN')}
            <span className="text-sm ml-2">({pnlPercent.toFixed(2)}%)</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Briefcase className="h-4 w-4" />
            <span className="text-xs font-medium">Holdings</span>
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">{HOLDINGS.length}</div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Portfolio Performance (30D)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215, 12%, 50%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215, 12%, 50%)' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: '8px', fontSize: '12px', fontFamily: 'JetBrains Mono' }} />
              <Area type="monotone" dataKey="value" stroke="hsl(199, 89%, 48%)" fill="url(#portfolioGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="text-left px-4 py-3 font-medium">Stock</th>
              <th className="text-right px-4 py-3 font-medium hidden md:table-cell">Qty</th>
              <th className="text-right px-4 py-3 font-medium hidden md:table-cell">Avg Price</th>
              <th className="text-right px-4 py-3 font-medium">LTP</th>
              <th className="text-right px-4 py-3 font-medium">P&L</th>
            </tr>
          </thead>
          <tbody>
            {HOLDINGS.map((h, i) => (
              <motion.tr key={h.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.05 }} className="border-b border-border/50">
                <td className="px-4 py-3">
                  <div className="text-sm font-semibold text-foreground">{h.symbol}</div>
                  <div className="text-xs text-muted-foreground">{h.name}</div>
                </td>
                <td className="px-4 py-3 text-right hidden md:table-cell font-mono text-sm text-muted-foreground">{h.quantity}</td>
                <td className="px-4 py-3 text-right hidden md:table-cell font-mono text-sm text-muted-foreground">₹{h.avgPrice.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">₹{h.currentPrice.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-right">
                  <div className={`font-mono text-sm font-medium ${h.pnl >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {h.pnl >= 0 ? '+' : ''}₹{h.pnl.toLocaleString('en-IN')}
                  </div>
                  <div className={`font-mono text-xs ${h.pnl >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {h.changePercent >= 0 ? '+' : ''}{h.changePercent.toFixed(2)}%
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Portfolio;
