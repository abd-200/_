
import React, { useState } from 'react';
import { UserRole } from '../types';
import { 
  LayoutDashboard, FileCheck, BarChart3, Users, 
  LogOut, Building2, Newspaper, Briefcase, Scale, Menu, X, Globe, UserCheck, CalendarDays, BookOpen, ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, activeTab, setActiveTab, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.MERCHANT] },
    { id: 'opportunities', label: 'الفرص الاستثمارية', icon: Globe, roles: [UserRole.ADMIN, UserRole.MERCHANT] },
    { id: 'news', label: 'الأخبار والتعاميم', icon: Newspaper, roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.MERCHANT] },
    { id: 'halls', label: 'تأجير القاعات', icon: CalendarDays, roles: [UserRole.ADMIN, UserRole.MERCHANT] },
    { id: 'membership', label: 'خدمات العضوية', icon: Building2, roles: [UserRole.ADMIN, UserRole.MERCHANT] },
    { id: 'laws', label: 'القوانين والأنظمة', icon: BookOpen, roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.MERCHANT] },
    // خدمات حصرية للإدارة والموظفين
    { id: 'certificates', label: 'الشهادات الرقمية', icon: ShieldCheck, roles: [UserRole.ADMIN, UserRole.STAFF] },
    { id: 'analytics', label: 'تحليل السوق الذكي', icon: BarChart3, roles: [UserRole.ADMIN, UserRole.STAFF] },
    { id: 'cms', label: 'إدارة المحتوى', icon: UserCheck, roles: [UserRole.ADMIN] },
  ];

  return (
    <>
      {/* زر القائمة للموبايل - مثبت في الهيدر */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-5 right-4 z-[150] bg-slate-900 text-white p-2.5 rounded-xl shadow-xl border border-white/10"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className={`
        fixed inset-y-0 right-0 z-[110] w-80 bg-slate-900 text-white flex flex-col transition-transform duration-500 pt-24
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <nav className="flex-1 px-6 space-y-2 py-6 overflow-y-auto custom-scrollbar">
          <p className="px-5 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">منظومة الخدمات الذكية</p>
          {menuItems.filter(item => item.roles.includes(currentRole)).map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl font-black text-sm transition-all ${
                activeTab === item.id ? 'bg-emerald-600 text-white shadow-xl translate-x-[-4px]' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-emerald-500'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-red-400 font-black text-sm transition-all">
            <LogOut className="w-5 h-5" /> تسجيل الخروج
          </button>
        </div>
      </div>

      {isOpen && <div onClick={() => setIsOpen(false)} className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />}
    </>
  );
};

export default Sidebar;
