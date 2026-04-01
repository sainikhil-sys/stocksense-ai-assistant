import { useParams, useNavigate } from 'react-router-dom';
import { STOCKS, SIGNALS, generateChartData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, Activity, BarChart3, Brain } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TradeDialog } from '@/components/TradeDialog';

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const stock = STOCKS.find(s => s.symbol === symbol);
  const chartData = useMemo(() => generateChartData(60), []);
  const signals = SIGNALS.filter(s => s.stockSymbol === symbol);
  const [period, setPeriod] = useState('1M');
  const [tradeMode, setTradeMode] = useState<'BUY' | 'SELL'>('BUY');
  const [tradeOpen, setTradeOpen] = useState(false);

  if (!stock) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Stock not found
      </div>
    );
  }

  const isPositive = stock.change >= 0;
  const rsi = 28 + Math.random() * 50;
  const macd = (Math.random() - 0.5) * 20;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-bold text-foreground">{stock.symbol}</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{stock.sector}</span>
          </div>
          <p className="text-sm text-muted-foreground">{stock.name}</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-end gap-4">
            <span className="text-4xl font-mono font-bold text-foreground">₹{stock.price.toLocaleString('en-IN')}</span>
            <div className={`flex items-center gap-1 text-lg font-mono ${isPositive ? 'text-gain' : 'text-loss'}`}>
              {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => { setTradeMode('BUY'); setTradeOpen(true); }} className="bg-[hsl(var(--gain))] hover:bg-[hsl(var(--gain))]/90 text-background font-semibold px-6">
              Buy
            </Button>
            <Button onClick={() => { setTradeMode('SELL'); setTradeOpen(true); }} className="bg-[hsl(var(--loss))] hover:bg-[hsl(var(--loss))]/90 text-white font-semibold px-6">
              Sell
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {['1D', '1W', '1M', '3M', '1Y'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${period === p ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}>
              {p}
            </button>
          ))}
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? 'hsl(160, 84%, 39%)' : 'hsl(0, 72%, 51%)'} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={isPositive ? 'hsl(160, 84%, 39%)' : 'hsl(0, 72%, 51%)'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215, 12%, 50%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215, 12%, 50%)' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: '8px', fontSize: '12px', fontFamily: 'JetBrains Mono' }} />
              <Area type="monotone" dataKey="price" stroke={isPositive ? 'hsl(160, 84%, 39%)' : 'hsl(0, 72%, 51%)'} fill="url(#stockGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Open', value: `₹${stock.open.toLocaleString('en-IN')}` },
          { label: 'High', value: `₹${stock.high.toLocaleString('en-IN')}` },
          { label: 'Low', value: `₹${stock.low.toLocaleString('en-IN')}` },
          { label: 'Volume', value: (stock.volume / 1000000).toFixed(1) + 'M' },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }} className="glass-card rounded-xl p-3">
            <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
            <div className="text-sm font-mono font-semibold text-foreground">{item.value}</div>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="technicals" className="w-full">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="technicals" className="data-[state=active]:bg-card text-xs"><Activity className="h-3 w-3 mr-1" /> Technicals</TabsTrigger>
          <TabsTrigger value="volume" className="data-[state=active]:bg-card text-xs"><BarChart3 className="h-3 w-3 mr-1" /> Volume</TabsTrigger>
          <TabsTrigger value="signals" className="data-[state=active]:bg-card text-xs"><Brain className="h-3 w-3 mr-1" /> Signals</TabsTrigger>
        </TabsList>

        <TabsContent value="technicals" className="glass-card rounded-xl p-4 mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-2">RSI (14)</div>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-mono font-bold ${rsi < 30 ? 'text-gain' : rsi > 70 ? 'text-loss' : 'text-foreground'}`}>{rsi.toFixed(1)}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${rsi < 30 ? 'bg-gain/15 text-gain' : rsi > 70 ? 'bg-loss/15 text-loss' : 'bg-secondary text-muted-foreground'}`}>
                  {rsi < 30 ? 'Oversold' : rsi > 70 ? 'Overbought' : 'Neutral'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary mt-2 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-gain via-warning to-loss" style={{ width: `${rsi}%` }} />
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2">MACD</div>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-mono font-bold ${macd >= 0 ? 'text-gain' : 'text-loss'}`}>{macd.toFixed(2)}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${macd >= 0 ? 'bg-gain/15 text-gain' : 'bg-loss/15 text-loss'}`}>
                  {macd >= 0 ? 'Bullish' : 'Bearish'}
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="volume" className="glass-card rounded-xl p-4 mt-3">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(-15)}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215, 12%, 50%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(215, 12%, 50%)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: '8px', fontSize: '12px', fontFamily: 'JetBrains Mono' }} />
                <Bar dataKey="volume" fill="hsl(199, 89%, 48%)" radius={[2, 2, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="signals" className="glass-card rounded-xl p-4 mt-3">
          {signals.length > 0 ? (
            <div className="space-y-2">
              {signals.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${s.action === 'BUY' ? 'bg-gain/15 text-gain' : s.action === 'SELL' ? 'bg-loss/15 text-loss' : 'bg-warning/15 text-warning'}`}>{s.action}</span>
                    <div>
                      <div className="text-sm text-foreground">{s.type}</div>
                      <div className="text-xs text-muted-foreground">{s.reason}</div>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-foreground">{s.confidence}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">No active signals for this stock</p>
          )}
        </TabsContent>
      </Tabs>
      {stock && (
        <TradeDialog
          open={tradeOpen}
          onOpenChange={setTradeOpen}
          stock={{ symbol: stock.symbol, name: stock.name, price: stock.price }}
          mode={tradeMode}
        />
      )}
    </div>
  );
};

export default StockDetail;
