import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { lovable } from '@/integrations/lovable/index';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (view === 'forgot') {
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        toast({ title: 'Check your email', description: 'We sent you a password reset link.' });
        setView('login');
      } else if (view === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        toast({ title: 'Account created!', description: 'Check your email to verify your account.' });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const isLogin = view === 'login';
  const isForgot = view === 'forgot';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-heading font-bold text-foreground">StockSense</span>
          </div>
          <p className="text-sm text-muted-foreground">AI-powered stock market intelligence</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          {isForgot ? (
            <div className="mb-6">
              <button onClick={() => setView('login')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
                <ArrowLeft className="h-4 w-4" /> Back to sign in
              </button>
              <h2 className="text-lg font-semibold text-foreground">Reset your password</h2>
              <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send you a reset link.</p>
            </div>
          ) : (
            <>
              <div className="flex bg-secondary rounded-lg p-1 mb-6">
                <button onClick={() => setView('login')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${isLogin ? 'bg-card text-foreground' : 'text-muted-foreground'}`}>
                  Sign In
                </button>
                <button onClick={() => setView('signup')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${!isLogin ? 'bg-card text-foreground' : 'text-muted-foreground'}`}>
                  Sign Up
                </button>
              </div>

              <button
                type="button"
                onClick={async () => {
                  const { error } = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin });
                  if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
                }}
                className="w-full flex items-center justify-center gap-3 py-2.5 bg-secondary border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors mb-4"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={async () => {
                  const { error } = await lovable.auth.signInWithOAuth('apple', { redirect_uri: window.location.origin });
                  if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
                }}
                className="w-full flex items-center justify-center gap-3 py-2.5 bg-secondary border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors mb-4"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Continue with Apple
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="you@example.com"
                required
              />
            </div>
            {!isForgot && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary pr-10"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}
            {isLogin && (
              <button type="button" onClick={() => setView('forgot')} className="text-xs text-primary hover:underline">
                Forgot password?
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isForgot ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
