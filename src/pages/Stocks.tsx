import { STOCKS } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useState } from 'react';

const Stocks = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = STOCKS.filter(s =>
    s.symbol.toLowerCase().includes(search.toLowerCase()) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">All Stocks</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-64"
          />
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="text-left px-4 py-3 font-medium">Symbol</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Name</th>
              <th className="text-right px-4 py-3 font-medium">Price</th>
              <th className="text-right px-4 py-3 font-medium">Change</th>
              <th className="text-right px-4 py-3 font-medium hidden md:table-cell">Volume</th>
              <th className="text-right px-4 py-3 font-medium hidden lg:table-cell">Sector</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((stock, i) => (
              <motion.tr
                key={stock.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => navigate(`/stocks/${stock.symbol}`)}
                className="border-b border-border/50 hover:bg-secondary/30 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold text-foreground">{stock.symbol}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-sm text-muted-foreground">{stock.name}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-mono font-medium text-foreground">₹{stock.price.toLocaleString('en-IN')}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`text-sm font-mono ${stock.change >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-right hidden md:table-cell">
                  <span className="text-sm font-mono text-muted-foreground">{(stock.volume / 1000000).toFixed(1)}M</span>
                </td>
                <td className="px-4 py-3 text-right hidden lg:table-cell">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{stock.sector}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stocks;
