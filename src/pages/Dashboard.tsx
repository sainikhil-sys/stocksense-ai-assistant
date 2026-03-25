import { MarketCard } from '@/components/dashboard/MarketCard';
import { MiniChart } from '@/components/dashboard/MiniChart';
import { StockTable } from '@/components/dashboard/StockTable';
import { SignalPreview } from '@/components/dashboard/SignalPreview';
import { MARKET_INDICES } from '@/lib/mock-data';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-heading font-bold text-foreground"
      >
        Market Overview
      </motion.h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {MARKET_INDICES.map((idx, i) => (
          <MarketCard key={idx.name} name={idx.name} value={idx.value} change={idx.change} changePercent={idx.changePercent} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <MiniChart />
        </div>
        <SignalPreview />
      </div>

      <StockTable />
    </div>
  );
};

export default Dashboard;
