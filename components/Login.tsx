
import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowLeft, UserPlus, LogIn, FileSearch } from 'lucide-react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState<'login' | 'register' | 'import'>('login');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Admin Access - عطوفة عرب الصمادي
    if ((email === 'admin' || email === 'arab@ajlun.jo') && password === 'ajlun2026') {
      onLogin({
        id: 'admin-arab',
        name: 'عرب الصمادي',
        email: 'arab@ajlun.jo',
        role: UserRole.ADMIN
      });
      return;
    }

    // Default Mock for Demo
    if (email.length > 3 && password.length > 3) {
      onLogin({
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email: email,
        role: UserRole.MERCHANT
      });
    } else {
      setError('يرجى التأكد من البيانات المدخلة.');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 left-8 text-slate-400 hover:text-emerald-600">
          <ArrowLeft className="w-6 h-6 rotate-180" />
        </button>

        <div className="text-center mb-8">
          <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto shadow-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900">
            {view === 'login' ? 'بوابة الدخول الآمن' : view === 'register' ? 'إنشاء حساب تاجر' : 'استيراد حساب عضوية'}
          </h2>
          <p className="text-slate-500 font-bold mt-1">غرفة تجارة عجلون الذكية</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {view === 'import' ? (
            <div className="space-y-4">
              <input type="text" placeholder="رقم السجل التجاري" className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none font-bold" required />
              <input type="text" placeholder="رقم العضوية في الغرفة" className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none font-bold" required />
              <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2">
                <FileSearch className="w-5 h-5" /> استرجاع البيانات الموثقة
              </button>
            </div>
          ) : (
            <>
              <div className="relative">
                <Mail className="absolute right-5 top-5 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-14 pl-6 py-4 bg-slate-50 border rounded-2xl outline-none font-bold" 
                  placeholder="البريد الإلكتروني"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute right-5 top-5 text-slate-400 w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-14 pl-6 py-4 bg-slate-50 border rounded-2xl outline-none font-bold" 
                  placeholder="كلمة المرور"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" /> {view === 'login' ? 'دخول النظام' : 'تسجيل جديد'}
              </button>
            </>
          )}
        </form>

        <div className="mt-8 flex flex-col gap-3 text-center">
          {view === 'login' ? (
            <>
              <button onClick={() => setView('register')} className="text-slate-500 font-bold hover:text-emerald-600">إنشاء حساب جديد</button>
              <button onClick={() => setView('import')} className="text-emerald-600 font-black">هل لديك عضوية سابقة؟ استيراد البيانات</button>
            </>
          ) : (
            <button onClick={() => setView('login')} className="text-slate-500 font-bold">العودة لتسجيل الدخول</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
