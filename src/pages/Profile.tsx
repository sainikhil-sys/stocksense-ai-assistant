import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const createdAt = user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Profile</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{user.email?.split('@')[0] ?? 'User'}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="text-sm text-foreground">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Member Since</div>
              <div className="text-sm text-foreground">{createdAt}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Account Status</div>
              <div className="text-sm text-gain font-medium">Active</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Button onClick={signOut} variant="outline" className="w-full border-[hsl(var(--loss))]/30 text-loss hover:bg-[hsl(var(--loss))]/10">
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </motion.div>
    </div>
  );
};

export default Profile;
