import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Check, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PLAN = {
  name: 'StockSense Pro',
  price: '₹999',
  interval: 'month',
  priceId: 'price_1THPKkGWsvvCM6CaEVaVZ99h',
  productId: 'prod_UFvBtAPYuX4r8m',
  features: [
    'Unlimited AI-powered signals',
    'Advanced technical analysis',
    'Real-time portfolio tracking',
    'Priority AI chat assistant',
    'Custom alert notifications',
    'Strategy backtesting',
  ],
};

const Pricing = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to start checkout');
    } finally {
      setLoading(false);
    }
  };

  const handleManage = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to open portal');
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Pricing</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 border-primary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
          <Crown className="h-3 w-3 inline mr-1" />PRO
        </div>

        <h2 className="text-xl font-heading font-bold text-foreground mt-2">{PLAN.name}</h2>
        <div className="flex items-end gap-1 mt-2">
          <span className="text-4xl font-mono font-bold text-foreground">{PLAN.price}</span>
          <span className="text-muted-foreground text-sm mb-1">/{PLAN.interval}</span>
        </div>

        <div className="mt-6 space-y-3">
          {PLAN.features.map(f => (
            <div key={f} className="flex items-center gap-3 text-sm">
              <Check className="h-4 w-4 text-gain shrink-0" />
              <span className="text-foreground">{f}</span>
            </div>
          ))}
        </div>

        <Button onClick={handleSubscribe} disabled={loading} className="w-full mt-6 gap-2">
          <Zap className="h-4 w-4" />
          {loading ? 'Starting checkout...' : 'Subscribe Now'}
        </Button>

        <button onClick={handleManage} className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors">
          Already subscribed? Manage subscription →
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">Free Plan</h3>
        <p className="text-xs text-muted-foreground">Basic access to market data, limited signals, and portfolio overview. Upgrade to Pro for the full experience.</p>
      </motion.div>
    </div>
  );
};

export default Pricing;
