import { LayoutDashboard, LineChart, Briefcase, Zap, MessageSquare, LogOut, UserCircle } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import stocksenseLogo from '@/assets/stocksense-logo.png';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Stocks', url: '/stocks', icon: LineChart },
  { title: 'Portfolio', url: '/portfolio', icon: Briefcase },
  { title: 'Signals', url: '/signals', icon: Zap },
  { title: 'AI Assistant', url: '/ai-chat', icon: MessageSquare },
  { title: 'Profile', url: '/profile', icon: UserCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { signOut, user } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="p-4 flex items-center gap-3">
        <img src={stocksenseLogo} alt="StockSense" className="h-8 w-8 shrink-0 rounded-lg" width={32} height={32} />
        {!collapsed && (
          <span className="font-heading font-bold text-lg text-foreground tracking-tight">
            StockSense
          </span>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/'}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      activeClassName="bg-secondary text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {user && (
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-loss hover:bg-secondary transition-colors w-full"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="text-sm">Sign Out</span>}
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
