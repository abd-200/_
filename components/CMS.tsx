
import React, { useState, useEffect } from 'react';
import { db } from '../services/dbService';
import { User, UserRole, InvestmentOpportunity, NewsItem } from '../types';
import { 
  Users, Briefcase, FileText, BarChart3, Plus, Trash2, Edit, 
  Globe, ShieldCheck, X, Image as ImageIcon, Save, CheckCircle
} from 'lucide-react';

const CMS: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'inv' | 'news' | 'staff'>('stats');
  const [invs, setInvs] = useState<InvestmentOpportunity[]>(db.getOpportunities());
  const [news, setNews] = useState<NewsItem[]>(db.getNews());
  const [showModal, setShowModal] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const stats = db.getStats();

  const handleSaveInv = (e: React.FormEvent) => {
    e.preventDefault();
    const data = editingItem || {};
    const item: InvestmentOpportunity = {
      id: data.id || 'inv-' + Date.now(),
      title: data.title,
      description: data.description,
      location: data.location,
      expectedBudget: data.expectedBudget,
      image: data.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      status: 'OPEN'
    };
    db.saveOpportunity(item);
    setInvs(db.getOpportunities());
    setShowModal(null);
    setEditingItem(null);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    const data = editingItem || {};
    const item: NewsItem = {
      id: data.id || 'n-' + Date.now(),
      title: data.title,
      content: data.content,
      date: new Date().toISOString().split('T')[0],
      category: data.category || 'CHAMBER',
      image: data.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
      views: 0
    };
    db.saveNews(item);
    setNews(db.getNews());
    setShowModal(null);
    setEditingItem(null);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] flex flex-col lg:flex-row justify-between items-center gap-6 border border-white/5">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-black">لوحة الإدارة السيادية</h1>
            <p className="text-emerald-400 font-bold">مرحباً عطوفة المدير العام عرب الصمادي</p>
          </div>
        </div>
        <div className="flex bg-white/10 p-2 rounded-2xl backdrop-blur-md overflow-x-auto max-w-full gap-2">
          {[
            { id: 'stats', label: 'البيانات والنتائج', icon: BarChart3 },
            { id: 'inv', label: 'الفرص الاستثمارية', icon: Globe },
            { id: 'news', label: 'الأخبار والتعاميم', icon: FileText },
            { id: 'staff', label: 'إدارة الموظفين', icon: Users },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-6 py-2.5 rounded-xl text-sm font-black whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'إجمالي التراخيص', val: stats.activeLicenses, color: 'slate' },
             { label: 'عدد الأعضاء', val: stats.users, color: 'slate' },
             { label: 'الطلبات المعلقة', val: stats.pendingRequests, color: 'amber' },
             { label: 'الإيرادات المحصلة', val: `د.أ ${stats.revenue.toLocaleString()}`, color: 'emerald' },
           ].map((s, i) => (
             <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100">
               <h3 className="text-slate-400 font-black text-xs mb-2 uppercase">{s.label}</h3>
               <p className={`text-4xl font-black text-${s.color}-600 tracking-tight`}>{s.val}</p>
             </div>
           ))}
        </div>
      )}

      {activeTab === 'inv' && (
        <div className="bg-white rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden">
           <div className="p-8 bg-slate-50 flex justify-between items-center border-b">
              <h2 className="text-xl font-black">إدارة الخارطة الاستثمارية</h2>
              <button onClick={() => { setEditingItem({}); setShowModal('inv'); }} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2">
                <Plus className="w-5 h-5" /> إضافة فرصة جديدة
              </button>
           </div>
           <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
             {invs.map(o => (
               <div key={o.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-black text-slate-800">{o.title}</h4>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditingItem(o); setShowModal('inv'); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => { if(confirm('تأكيد الحذف؟')) { db.deleteOpportunity(o.id); setInvs(db.getOpportunities()); } }} className="p-2 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs mb-4 line-clamp-2 font-bold">{o.description}</p>
                  <div className="flex justify-between text-[10px] font-black uppercase text-emerald-600">
                    <span>{o.location}</span>
                    <span>الميزانية: {o.expectedBudget}</span>
                  </div>
               </div>
             ))}
           </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
           <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in zoom-in">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black">تحرير البيانات</h2>
                <button onClick={() => setShowModal(null)} className="p-2 bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={showModal === 'inv' ? handleSaveInv : handleSaveNews} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 px-2">العنوان</label>
                  <input type="text" className="w-full px-5 py-3 bg-slate-50 border rounded-xl font-bold" value={editingItem?.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} required />
                </div>
                {showModal === 'inv' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-400 px-2">الموقع</label>
                      <input type="text" className="w-full px-5 py-3 bg-slate-50 border rounded-xl font-bold" value={editingItem?.location || ''} onChange={e => setEditingItem({...editingItem, location: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-400 px-2">الميزانية</label>
                      <input type="text" className="w-full px-5 py-3 bg-slate-50 border rounded-xl font-bold" value={editingItem?.expectedBudget || ''} onChange={e => setEditingItem({...editingItem, expectedBudget: e.target.value})} />
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 px-2">التفاصيل</label>
                  <textarea className="w-full px-5 py-3 bg-slate-50 border rounded-xl font-bold" rows={4} value={editingItem?.description || editingItem?.content || ''} onChange={e => setEditingItem(showModal === 'inv' ? {...editingItem, description: e.target.value} : {...editingItem, content: e.target.value})} required />
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" /> حفظ التغييرات
                </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default CMS;
