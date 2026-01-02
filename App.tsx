
import React, { useState, useEffect } from 'react';
import { UserRole, User, InvestmentOpportunity, NewsItem } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Certificates from './components/Certificates';
import MarketAnalytics from './components/MarketAnalytics';
import AIAssistant from './components/AIAssistant';
import CMS from './components/CMS';
import Login from './components/Login';
import { db } from './services/dbService';
import { Bell, Search, ShieldCheck, LogIn, Globe, Menu, X, Newspaper, ArrowLeft, CalendarDays, Building2, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ajlun_user');
    if (saved) setCurrentUser(JSON.parse(saved));
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('ajlun_user', JSON.stringify(user));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ajlun_user');
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    if (searchQuery) {
      // نظام البحث الشامل
      return (
        <div className="space-y-8 animate-in slide-in-from-bottom-5">
          <h2 className="text-2xl font-black">نتائج البحث عن: <span className="text-emerald-600">"{searchQuery}"</span></h2>
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 font-bold">يتم الآن جلب النتائج من قاعدة البيانات...</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard': return <Dashboard user={currentUser} onServiceClick={(tab) => setActiveTab(tab)} />;
      case 'opportunities': return (
        <div className="space-y-10 animate-in fade-in">
          <div><h1 className="text-4xl font-black mb-2">الخارطة الاستثمارية</h1><p className="text-slate-400 font-bold">فرص واعدة في قلب الطبيعة العجلونية</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {db.getOpportunities().map(o => (
              <div key={o.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all group">
                <img src={o.image} className="h-64 w-full object-cover group-hover:scale-105 transition-transform" />
                <div className="p-10">
                  <h3 className="text-2xl font-black mb-4">{o.title}</h3>
                  <p className="text-slate-500 font-bold text-sm mb-6 line-clamp-2">{o.description}</p>
                  <div className="flex justify-between items-center"><span className="text-emerald-600 font-black text-xl">{o.expectedBudget}</span><button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm">التفاصيل</button></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      case 'halls': return (
        <div className="space-y-10 animate-in fade-in">
          <div><h1 className="text-4xl font-black mb-2">تأجير القاعات</h1><p className="text-slate-400 font-bold">قاعات مجهزة لأرقى الفعاليات والمؤتمرات</p></div>
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto"><CalendarDays className="w-10 h-10" /></div>
            <h2 className="text-2xl font-black">نظام الحجز الإلكتروني</h2>
            <p className="text-slate-500 max-w-lg mx-auto font-bold">نوفر لكم قاعة الاجتماعات الرئيسية وقاعة التدريب بأسعار تفضيلية للأعضاء وتجهيزات تقنية متكاملة.</p>
            <button className="bg-emerald-600 text-white px-12 py-5 rounded-3xl font-black text-lg shadow-xl shadow-emerald-500/20">طلب حجز قاعة</button>
          </div>
        </div>
      );
      case 'membership': return (
        <div className="space-y-10 animate-in fade-in">
          <h1 className="text-4xl font-black">خدمات العضوية</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['تجديد العضوية السنوية', 'إصدار بطاقة عضوية', 'تعديل بيانات المنشأة'].map(s => (
              <div key={s} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-emerald-500 transition-all group cursor-pointer text-center">
                <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-emerald-600 group-hover:text-white transition-all"><Building2 className="w-6 h-6" /></div>
                <h3 className="font-black text-lg">{s}</h3>
              </div>
            ))}
          </div>
        </div>
      );
      case 'laws': return (
        <div className="space-y-10 animate-in fade-in">
          <h1 className="text-4xl font-black">القوانين والأنظمة</h1>
          <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden">
            {[
              'قانون الشركات الأردني رقم (22) لسنة 1997',
              'نظام الغرف التجارية الأردنية',
              'قانون ضريبة الدخل والأنظمة التابعة له'
            ].map((law, i) => (
              <div key={i} className="p-8 border-b last:border-0 flex justify-between items-center hover:bg-slate-50 transition-all cursor-pointer">
                <div className="flex items-center gap-4"><BookOpen className="text-emerald-600 w-5 h-5" /><span className="font-black">{law}</span></div>
                <button className="text-slate-400 font-bold text-sm">تحميل PDF</button>
              </div>
            ))}
          </div>
        </div>
      );
      case 'news': return (
        <div className="space-y-10 animate-in fade-in">
          <h1 className="text-4xl font-black">المركز الإعلامي</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {db.getNews().map(n => (
              <div key={n.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 group">
                <img src={n.image} className="w-full h-48 object-cover" />
                <div className="p-8">
                  <h3 className="text-lg font-black mb-4">{n.title}</h3>
                  <button className="text-emerald-600 font-black flex items-center gap-2 text-sm">اقرأ المزيد <ArrowLeft className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      case 'certificates': 
        if (currentUser?.role === UserRole.ADMIN || currentUser?.role === UserRole.STAFF) return <Certificates />;
        return <Dashboard user={currentUser} onServiceClick={(tab) => setActiveTab(tab)} />;
      case 'analytics': return <MarketAnalytics />;
      case 'cms': return <CMS user={currentUser!} />;
      default: return <Dashboard user={currentUser} onServiceClick={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" dir="rtl">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-[100] h-20 bg-white/80 backdrop-blur-2xl border-b border-slate-100 flex items-center px-4 lg:px-12">
        <div className="flex items-center gap-3 w-fit lg:w-80">
          <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg"><ShieldCheck className="w-6 h-6" /></div>
          <h1 className="font-black text-xl hidden sm:block tracking-tighter">غرفة تجارة عجلون الذكية</h1>
        </div>
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-xl">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث عن خدمة أو فرصة استثمارية..."
              className="w-full pr-12 pl-6 py-3 bg-slate-100/50 border border-slate-200 rounded-full font-bold text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 lg:w-80 justify-end">
          <div className="hidden sm:flex items-center gap-4">
            {!currentUser ? (
              <button onClick={() => setShowLogin(true)} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-black text-sm flex items-center gap-2">
                <LogIn className="w-4 h-4" /> دخول
              </button>
            ) : (
              <div onClick={() => setActiveTab('cms')} className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black cursor-pointer shadow-lg">{currentUser.name[0]}</div>
            )}
          </div>
          {!currentUser && <button onClick={() => setShowLogin(true)} className="sm:hidden p-2 text-slate-900 ml-12"><LogIn className="w-6 h-6" /></button>}
          {currentUser && <div onClick={() => setActiveTab('cms')} className="sm:hidden w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black cursor-pointer shadow-lg ml-12">{currentUser.name[0]}</div>}
        </div>
      </header>

      <Sidebar currentRole={currentUser?.role || UserRole.MERCHANT} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="pt-24 lg:mr-80 p-4 lg:p-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {showLogin && <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      <AIAssistant />
    </div>
  );
};

export default App;
