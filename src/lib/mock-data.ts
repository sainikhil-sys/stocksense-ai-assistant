export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  marketCap: string;
  sector: string;
}

export interface Signal {
  id: string;
  stockSymbol: string;
  stockName: string;
  type: 'RSI' | 'MACD' | 'Volume' | 'Crossover';
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  reason: string;
  timestamp: string;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  value: number;
  pnl: number;
}

export interface AIAnalysis {
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  entryPrice: number;
  exitPrice: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  reasoning: string;
}

export const STOCKS: Stock[] = [
  { id: '1', symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 34.20, changePercent: 1.41, volume: 12453200, high: 2470, low: 2410, open: 2420, marketCap: '16.6L Cr', sector: 'Energy' },
  { id: '2', symbol: 'TCS', name: 'Tata Consultancy Services', price: 3890.50, change: -22.30, changePercent: -0.57, volume: 3421000, high: 3920, low: 3875, open: 3910, marketCap: '14.2L Cr', sector: 'IT' },
  { id: '3', symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.25, change: 15.80, changePercent: 0.95, volume: 8745000, high: 1685, low: 1655, open: 1660, marketCap: '12.8L Cr', sector: 'Banking' },
  { id: '4', symbol: 'INFY', name: 'Infosys', price: 1520.00, change: -8.45, changePercent: -0.55, volume: 5632000, high: 1535, low: 1512, open: 1528, marketCap: '6.3L Cr', sector: 'IT' },
  { id: '5', symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1089.60, change: 12.40, changePercent: 1.15, volume: 7892000, high: 1095, low: 1072, open: 1075, marketCap: '7.6L Cr', sector: 'Banking' },
  { id: '6', symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2345.10, change: -5.20, changePercent: -0.22, volume: 2134000, high: 2360, low: 2335, open: 2350, marketCap: '5.5L Cr', sector: 'FMCG' },
  { id: '7', symbol: 'SBIN', name: 'State Bank of India', price: 628.90, change: 8.75, changePercent: 1.41, volume: 15230000, high: 632, low: 618, open: 620, marketCap: '5.6L Cr', sector: 'Banking' },
  { id: '8', symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1456.30, change: 23.10, changePercent: 1.61, volume: 4567000, high: 1462, low: 1428, open: 1430, marketCap: '8.5L Cr', sector: 'Telecom' },
  { id: '9', symbol: 'WIPRO', name: 'Wipro', price: 478.25, change: -3.15, changePercent: -0.65, volume: 6789000, high: 485, low: 475, open: 482, marketCap: '2.5L Cr', sector: 'IT' },
  { id: '10', symbol: 'TATAMOTORS', name: 'Tata Motors', price: 892.40, change: 18.60, changePercent: 2.13, volume: 9876000, high: 898, low: 870, open: 872, marketCap: '3.3L Cr', sector: 'Auto' },
];

export const SIGNALS: Signal[] = [
  { id: '1', stockSymbol: 'RELIANCE', stockName: 'Reliance Industries', type: 'RSI', action: 'BUY', confidence: 82, reason: 'RSI at 28.5 — oversold territory. Strong support at ₹2,400.', timestamp: '2 min ago' },
  { id: '2', stockSymbol: 'TCS', stockName: 'Tata Consultancy', type: 'MACD', action: 'SELL', confidence: 71, reason: 'MACD crossover below signal line. Bearish divergence forming.', timestamp: '8 min ago' },
  { id: '3', stockSymbol: 'TATAMOTORS', stockName: 'Tata Motors', type: 'Volume', action: 'BUY', confidence: 88, reason: 'Volume spike 3.2x above 20-day avg. Breakout above resistance at ₹880.', timestamp: '12 min ago' },
  { id: '4', stockSymbol: 'SBIN', stockName: 'State Bank of India', type: 'Crossover', action: 'BUY', confidence: 76, reason: '50-day MA crossed above 200-day MA. Golden cross formation.', timestamp: '25 min ago' },
  { id: '5', stockSymbol: 'WIPRO', stockName: 'Wipro', type: 'RSI', action: 'SELL', confidence: 67, reason: 'RSI at 73.2 — overbought. Resistance at ₹485.', timestamp: '34 min ago' },
  { id: '6', stockSymbol: 'HDFCBANK', stockName: 'HDFC Bank', type: 'MACD', action: 'HOLD', confidence: 55, reason: 'MACD near zero line. Neutral momentum. Wait for confirmation.', timestamp: '45 min ago' },
];

export const HOLDINGS: Holding[] = [
  { id: '1', symbol: 'RELIANCE', name: 'Reliance Industries', quantity: 50, avgPrice: 2380, currentPrice: 2456.75, change: 34.20, changePercent: 1.41, value: 122837.5, pnl: 3837.5 },
  { id: '2', symbol: 'TCS', name: 'Tata Consultancy', quantity: 25, avgPrice: 3950, currentPrice: 3890.50, change: -22.30, changePercent: -0.57, value: 97262.5, pnl: -1487.5 },
  { id: '3', symbol: 'HDFCBANK', name: 'HDFC Bank', quantity: 100, avgPrice: 1620, currentPrice: 1678.25, change: 15.80, changePercent: 0.95, value: 167825, pnl: 5825 },
  { id: '4', symbol: 'SBIN', name: 'State Bank of India', quantity: 200, avgPrice: 610, currentPrice: 628.90, change: 8.75, changePercent: 1.41, value: 125780, pnl: 3780 },
  { id: '5', symbol: 'TATAMOTORS', name: 'Tata Motors', quantity: 75, avgPrice: 850, currentPrice: 892.40, change: 18.60, changePercent: 2.13, value: 66930, pnl: 3180 },
];

export const generateChartData = (days: number = 30) => {
  const data = [];
  let price = 2400;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.48) * 40;
    price += change;
    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 15000000) + 3000000,
    });
  }
  return data;
};

export const generatePortfolioHistory = (days: number = 30) => {
  const data = [];
  let value = 550000;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.45) * 8000;
    value += change;
    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      value: Math.round(value),
    });
  }
  return data;
};

export const MARKET_INDICES = [
  { name: 'NIFTY 50', value: 22456.80, change: 127.35, changePercent: 0.57 },
  { name: 'SENSEX', value: 73890.25, change: 412.60, changePercent: 0.56 },
  { name: 'BANK NIFTY', value: 48234.50, change: -89.20, changePercent: -0.18 },
  { name: 'NIFTY IT', value: 34567.10, change: -156.40, changePercent: -0.45 },
];
