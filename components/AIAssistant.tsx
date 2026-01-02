
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Sparkles, MessageSquare } from 'lucide-react';
import { getAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك في غرفة تجارة عجلون الذكية. أنا مساعدك الرقمي المدعوم بـ Gemini 3. كيف يمكنني خدمتك اليوم؟', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      const response = await getAIResponse(input, messages.map(m => ({ role: m.role as any, parts: [{ text: m.text }] })));
      setMessages(prev => [...prev, { role: 'model', text: response || 'عذراً، يرجى المحاولة لاحقاً.', timestamp: new Date() }]);
    } catch (e) { console.error(e); }
    setIsTyping(false);
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[200] flex items-center group">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white w-12 h-32 rounded-r-3xl shadow-2xl flex flex-col items-center justify-center gap-4 border-y-2 border-r-2 border-white/20 transition-all hover:w-16 hover:bg-emerald-700"
        >
          <Bot className="w-6 h-6" />
          <span className="[writing-mode:vertical-lr] text-[10px] font-black tracking-widest uppercase">المساعد الذكي</span>
        </button>
      ) : (
        <div className="ml-6 bg-white w-[350px] h-[550px] rounded-[2.5rem] shadow-4xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-left-10">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-lg shadow-inner"><Bot className="w-4 h-4" /></div>
              <div>
                <h3 className="font-black text-xs leading-none">مساعد عجلون</h3>
                <span className="text-[9px] text-emerald-400 font-bold">متصل الآن</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-bold leading-relaxed ${m.role === 'user' ? 'bg-white border text-slate-700 shadow-sm' : 'bg-emerald-600 text-white shadow-lg'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold px-2"><Sparkles className="w-3 h-3 animate-spin" /> جاري التفكير...</div>}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="كيف يمكنني مساعدتك؟" 
              className="flex-1 bg-slate-100 px-5 py-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" 
            />
            <button onClick={handleSend} className="bg-emerald-600 text-white p-3.5 rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
