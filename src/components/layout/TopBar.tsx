import { SidebarTrigger } from '@/components/ui/sidebar';
import { MARKET_INDICES } from '@/lib/mock-data';
import { Bell } from 'lucide-react';

export function TopBar() {
  return (
    <header className="h-12 flex items-center justify-between border-b border-border px-4 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="hidden md:flex items-center gap-6 overflow-hidden">
          {MARKET_INDICES.map((idx) => (
            <div key={idx.name} className="flex items-center gap-2 text-xs font-mono">
              <span className="text-muted-foreground">{idx.name}</span>
              <span className="text-foreground font-medium">{idx.value.toLocaleString('en-IN')}</span>
              <span className={idx.change >= 0 ? 'text-gain' : 'text-loss'}>
                {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({idx.changePercent.toFixed(2)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
      <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
        <Bell className="h-4 w-4" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
      </button>
    </header>
  );
}
