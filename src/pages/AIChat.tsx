import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Brain, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI stock market assistant. Ask me about any stock — I can analyze trends, recommend buy/sell/hold decisions, and explain market indicators. Try asking:\n\n- *"Analyze RELIANCE for me"*\n- *"Should I buy TCS right now?"*\n- *"What\'s the outlook for banking stocks?"*' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke('ai-stock-chat', {
        body: { messages: newMessages.map(m => ({ role: m.role, content: m.content })) },
      });

      if (response.error) throw response.error;

      const assistantContent = response.data?.choices?.[0]?.message?.content
        || response.data?.content
        || 'I apologize, but I could not generate a response. Please try again.';

      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);
    } catch (error) {
      console.error('AI chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I\'m having trouble connecting to the AI service right now. This feature requires the AI edge function to be deployed. Please try again later.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-heading font-bold text-foreground">AI Assistant</h1>
          <p className="text-xs text-muted-foreground">Powered by Lovable AI • Stock analysis & recommendations</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'bg-primary/10' : 'bg-accent/10'
            }`}>
              {msg.role === 'assistant' ? <Brain className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-accent" />}
            </div>
            <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'bg-accent/10 text-foreground ml-auto'
                : 'glass-card text-foreground'
            }`}>
              <div className="prose prose-sm prose-invert max-w-none [&_p]:text-foreground [&_li]:text-foreground [&_strong]:text-foreground [&_em]:text-muted-foreground [&_code]:text-primary [&_code]:bg-secondary [&_code]:px-1 [&_code]:rounded">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <div className="glass-card rounded-xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
              <span className="text-sm text-muted-foreground">Analyzing...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about any stock..."
          className="flex-1 px-4 py-3 text-sm bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
