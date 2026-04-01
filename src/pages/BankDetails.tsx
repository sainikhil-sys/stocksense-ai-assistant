import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Plus, Trash2, Building2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface BankDetail {
  id: string;
  account_holder_name: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  account_type: string;
  is_primary: boolean;
}

const BankDetails = () => {
  const { user } = useAuth();
  const [banks, setBanks] = useState<BankDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ account_holder_name: '', bank_name: '', account_number: '', ifsc_code: '', account_type: 'savings' });

  const fetchBanks = async () => {
    const { data, error } = await supabase.from('bank_details').select('*').order('created_at', { ascending: false });
    if (!error && data) setBanks(data as unknown as BankDetail[]);
    setLoading(false);
  };

  useEffect(() => { fetchBanks(); }, []);

  const handleAdd = async () => {
    if (!form.account_holder_name || !form.bank_name || !form.account_number || !form.ifsc_code) {
      toast.error('Please fill all fields');
      return;
    }
    const { error } = await supabase.from('bank_details').insert({
      ...form,
      user_id: user?.id,
      is_primary: banks.length === 0,
    } as any);
    if (error) {
      toast.error('Failed to add bank details');
    } else {
      toast.success('Bank account added');
      setForm({ account_holder_name: '', bank_name: '', account_number: '', ifsc_code: '', account_type: 'savings' });
      setDialogOpen(false);
      fetchBanks();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('bank_details').delete().eq('id', id);
    if (!error) {
      toast.success('Bank account removed');
      fetchBanks();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Bank Accounts</h1>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Account
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : banks.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-8 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No bank accounts added yet</p>
          <p className="text-xs text-muted-foreground mt-1">Add your bank details to enable withdrawals</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {banks.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                    {b.bank_name}
                    {b.is_primary && <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary">Primary</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{b.account_holder_name} • ****{b.account_number.slice(-4)}</div>
                  <div className="text-xs text-muted-foreground">IFSC: {b.ifsc_code} • {b.account_type}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)} className="text-muted-foreground hover:text-loss">
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Add Bank Account</DialogTitle>
            <DialogDescription className="text-muted-foreground">Enter your bank details for withdrawals</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Input placeholder="Account Holder Name" value={form.account_holder_name} onChange={e => setForm(f => ({ ...f, account_holder_name: e.target.value }))} className="bg-secondary border-border" />
            <Input placeholder="Bank Name" value={form.bank_name} onChange={e => setForm(f => ({ ...f, bank_name: e.target.value }))} className="bg-secondary border-border" />
            <Input placeholder="Account Number" value={form.account_number} onChange={e => setForm(f => ({ ...f, account_number: e.target.value }))} className="bg-secondary border-border" />
            <Input placeholder="IFSC Code" value={form.ifsc_code} onChange={e => setForm(f => ({ ...f, ifsc_code: e.target.value }))} className="bg-secondary border-border" />
            <select value={form.account_type} onChange={e => setForm(f => ({ ...f, account_type: e.target.value }))} className="w-full rounded-md border border-border bg-secondary text-foreground px-3 py-2 text-sm">
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </select>
            <Button onClick={handleAdd} className="w-full">Add Bank Account</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankDetails;
