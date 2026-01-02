
import React, { useState, useEffect } from 'react';
import { analyzeMarketData } from '../services/geminiService';
import { Brain, Sparkles, RefreshCcw, Landmark, Wheat, Trees, ShoppingBag } from 'lucide-react';

const MarketAnalytics: React.FC = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const marketData = [
    { sector: 'الزراعة', growth: 12, value: 1200000 },
    { sector: 'السياحة', growth: 18, value: 850000 },
    { sector: 'الصناعات الغذائية', growth: 8, value: 540000 },
    { sector: 'الحرف اليدوية', growth: 5, value: 120000 },
  ];

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const result = await analyzeMarketData(marketData);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">تحليلات السوق الذكية</h1>
          <p className="text-slate-500">رؤى مدعومة بالذكاء الاصطناعي لاقتصاد عجلون</p>
        </div>
        <button 
          onClick={runAnalysis}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-100 transition-all disabled:opacity-50"
        >
          <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          تحديث التحليل
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          { label: 'الزراعة', value: '1.2M', growth: '+12%', icon: Wheat, color: 'emerald' },
          { label: 'السياحة البيئية', value: '850K', growth: '+18%', icon: Trees, color: 'blue' },
          { label: 'الخدمات', value: '450K', growth: '+4%', icon: Landmark, color: 'purple' },
          { label: 'التجزئة', value: '320K', growth: '-2%', icon: ShoppingBag, color: 'amber' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className={`p-3 w-fit rounded-2xl bg-${item.color}-50 text-${item.color}-600 mb-4`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h4 className="text-slate-500 font-medium mb-1">{item.label}</h4>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-800">د.أ {item.value}</span>
              <span className={`text-xs font-bold ${item.growth.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                {item.growth}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Brain className="w-64 h-64" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8 bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-sm font-bold">تقرير Gemini AI الإستراتيجي</span>
          </div>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-white/20 rounded w-3/4"></div>
              <div className="h-4 bg-white/20 rounded w-full"></div>
              <div className="h-4 bg-white/20 rounded w-5/6"></div>
            </div>
          ) : analysis ? (
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">الملخص التنفيذي</h3>
                <p className="text-indigo-50 text-lg leading-relaxed max-w-3xl">
                  {analysis.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-md border border-white/10">
                  <h4 className="text-amber-300 font-bold mb-4 flex items-center gap-2">
                    🎯 فرصة النمو الأعلى
                  </h4>
                  <p className="text-indigo-100">{analysis.growthOpportunity}</p>
                </div>
                <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-md border border-white/10">
                  <h4 className="text-emerald-300 font-bold mb-4 flex items-center gap-2">
                    🚀 القطاع الأفضل أداءً
                  </h4>
                  <p className="text-indigo-100">{analysis.topPerformingSector}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                  📝 التوصيات المقترحة للغرفة
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/50 flex items-center justify-center text-xs shrink-0 mt-1">
                        {i + 1}
                      </div>
                      <p className="text-indigo-50">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>لا توجد بيانات تحليل حالياً. يرجى التحديث.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketAnalytics;
