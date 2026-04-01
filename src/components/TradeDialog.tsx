import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface TradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stock: { symbol: string; name: string; price: number };
  mode: 'BUY' | 'SELL';
}

export function TradeDialog({ open, onOpenChange, stock, mode }: TradeDialogProps) {
  const [quantity, setQuantity] = useState('1');
  const [loading, setLoading] = useState(false);
  const qty = parseInt(quantity) || 0;
  const total = qty * stock.price;

  const handleTrade = async () => {
    if (qty <= 0) {
      toast.error('Enter a valid quantity');
      return;
    }
    setLoading(true);
    // Simulate order placement
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    toast.success(`${mode} order placed: ${qty} × ${stock.symbol} @ ₹${stock.price.toLocaleString('en-IN')}`);
    onOpenChange(false);
    setQuantity('1');
  };

  const isBuy = mode === 'BUY';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isBuy ? 'bg-gain/15 text-gain' : 'bg-loss/15 text-loss'}`}>
              {mode}
            </span>
            {stock.symbol}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">{stock.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
            <span className="text-sm text-muted-foreground">Market Price</span>
            <span className="font-mono font-semibold text-foreground">₹{stock.price.toLocaleString('en-IN')}</span>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Quantity</label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="bg-secondary border-border font-mono"
            />
          </div>

          <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
            <span className="text-sm text-muted-foreground">Estimated Total</span>
            <span className="font-mono font-bold text-foreground">₹{total.toLocaleString('en-IN')}</span>
          </div>

          <Button
            onClick={handleTrade}
            disabled={loading || qty <= 0}
            className={`w-full font-semibold ${isBuy ? 'bg-[hsl(var(--gain))] hover:bg-[hsl(var(--gain))]/90 text-background' : 'bg-[hsl(var(--loss))] hover:bg-[hsl(var(--loss))]/90 text-white'}`}
          >
            {loading ? 'Placing Order...' : `${mode} ${qty} share${qty !== 1 ? 's' : ''}`}
          </Button>

          <p className="text-[10px] text-muted-foreground text-center">
            This is a simulated trade. No real money is involved.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
