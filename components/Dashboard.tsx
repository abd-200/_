
import React from 'react';
import { User } from '../types';
import { db } from '../services/dbService';
import { 
  TrendingUp, BadgeCheck, Sparkles, Building2, Globe, Handshake, CalendarDays, BookOpen, FileText, ArrowLeft, ShieldCheck, Newspaper
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [ { val: 4000 }, { val: 3000 }, { val: 5000 }, { val: 4500 }, { val: 7000 }, { val: 9000 } ];

interface DashboardProps {
  user: User | null;
  onServiceClick: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onServiceClick }) => {
  const stats = db.getStats();

  const services = [
    { id: 'opportunities', icon: Globe, label: 'فرص الاستثمار', color: 'indigo', desc: 'خارطة عجلون الرقمية' },
    { id: 'news', icon: Newspaper, label: 'الأخبار والتعاميم', color: 'blue', desc: 'تحديثات يومية' },
    { id: 'halls', icon: CalendarDays, label: 'تأجير القاعات', color: 'pink', desc: 'حجز قاعات المؤتمرات' },
    { id: 'membership', icon: Building2, label: 'خدمات العضوية', icon2: Handshake, color: 'emerald', desc: 'إدارة شؤون الأعضاء' },
    { id: 'laws', icon: BookOpen, label: 'القوانين والأنظمة', color: 'amber', desc: 'التشريعات التجارية' },
    { id: 'certificates', icon: ShieldCheck, label: 'الشهادات الرقمية', color: 'purple', desc: 'إصدار وتوثيق فوري' },
    { id: 'analytics', icon: TrendingUp, label: 'تحليل السوق', color: 'orange', desc: 'رؤى ذكية للتجار' },
    { id: 'cms', icon: FileText, label: 'إدارة المحتوى', color: 'slate', desc: 'للمدير العام فقط' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[4rem] p-12 lg:p-20 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541444196041-94575b63777f?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-right">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black tracking-widest uppercase">المنظومة الذكية الموحدة لغرفة تجارة عجلون</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
              {user ? `أهلاً بك، عطوفة ${user.name.split(' ')[0]}` : 'بوابتك للاقتصاد الذكي'}
              <br/><span className="text-emerald-400">في محافظة عجلون</span>
            </h1>
            <p className="text-slate-400 text-lg lg:text-xl font-medium mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              تمتع بالوصول إلى 8 خدمات رقمية متكاملة مدعومة بالذكاء الاصطناعي لإدارة منشأتك التجارية وتوسيع استثماراتك.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button onClick={() => onServiceClick('opportunities')} className="bg-emerald-600 text-white px-10 py-5 rounded-3xl font-black text-lg shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all">ابدأ الاستثمار الآن</button>
              <button onClick={() => onServiceClick('halls')} className="bg-white/5 border border-white/10 px-10 py-5 rounded-3xl font-black text-lg backdrop-blur-md hover:bg-white/10 transition-all">حجز القاعات</button>
            </div>
          </div>
          <div className="hidden lg:block w-96 bg-white/5 p-8 rounded-[3.5rem] backdrop-blur-3xl border border-white/10 shadow-2xl">
             <div className="flex justify-between items-center mb-8"><h3 className="font-black text-sm text-slate-400 uppercase">مؤشر النمو الرقمي</h3><TrendingUp className="text-emerald-400 w-5 h-5" /></div>
             <div className="h-40 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><Area type="monotone" dataKey="val" stroke="#10b981" fill="rgba(16,185,129,0.1)" strokeWidth={4} /></AreaChart></ResponsiveContainer>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center"><p className="text-[10px] text-slate-500 font-bold">الأعضاء</p><p className="text-xl font-black">2.1K</p></div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center"><p className="text-[10px] text-slate-500 font-bold">الرضا</p><p className="text-xl font-black">98%</p></div>
             </div>
          </div>
        </div>
      </div>

      {/* Services Grid - الـ 8 خدمات */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black px-4 flex items-center gap-3"><Sparkles className="text-emerald-600" /> شبكة الخدمات الرقمية الموحدة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2">
          {services.map((s, i) => (
            <div 
              key={i} 
              onClick={() => onServiceClick(s.id)}
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-2xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center mb-6 group-hover:bg-${s.color}-600 group-hover:text-white transition-all duration-500 shadow-inner`}>
                <s.icon className="w-7 h-7" />
              </div>
              <h3 className="font-black text-lg text-slate-900 mb-2">{s.label}</h3>
              <p className="text-[11px] text-slate-400 font-bold leading-snug">{s.desc}</p>
              <ArrowLeft className="absolute bottom-8 left-8 w-5 h-5 text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-[-8px] transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'شهادات موثقة', val: stats.activeLicenses, icon: BadgeCheck, color: 'emerald' },
          { label: 'فرص استثمارية', val: '12+', icon: Globe, color: 'blue' },
          { label: 'طلبات مكتملة', val: stats.requests, icon: Sparkles, color: 'amber' },
          { label: 'إجمالي الإيرادات', val: `د.أ ${stats.revenue.toLocaleString()}`, icon: Building2, color: 'indigo' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 flex items-center gap-6 shadow-sm">
            <div className={`p-5 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 shadow-inner`}><stat.icon className="w-8 h-8" /></div>
            <div><p className="text-slate-400 text-xs font-black uppercase mb-1">{stat.label}</p><p className="text-3xl font-black text-slate-900">{stat.val}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
