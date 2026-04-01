import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-xl p-8 text-center max-w-md">
        <CheckCircle className="h-16 w-16 text-gain mx-auto mb-4" />
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-6">Welcome to StockSense Pro. You now have access to all premium features.</p>
        <Button onClick={() => navigate('/')} className="w-full">Go to Dashboard</Button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
