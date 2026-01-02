
import React, { useState } from 'react';
import { Search, Plus, Filter, Download, ShieldCheck, Lock } from 'lucide-react';

const Certificates: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">شهادات المنشأ</h1>
          <p className="text-slate-500">إصدار وتتبع شهادات المنشأ الموثقة رقمياً</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
        >
          <Plus className="w-5 h-5" />
          إصدار شهادة جديدة
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="البحث برقم الشهادة أو اسم التاجر..."
              className="w-full pr-12 pl-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-colors border border-slate-100">
            <Filter className="w-5 h-5" />
            تصفية
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-slate-500 font-bold text-sm">رقم الشهادة</th>
                <th className="px-6 py-4 text-slate-500 font-bold text-sm">اسم المنشأة</th>
                <th className="px-6 py-4 text-slate-500 font-bold text-sm">المنتج</th>
                <th className="px-6 py-4 text-slate-500 font-bold text-sm">وجهة التصدير</th>
                <th className="px-6 py-4 text-slate-500 font-bold text-sm">التوثيق الرقمي</th>
                <th className="px-6 py-4 text-slate-500 font-bold text-sm">الحالة</th>
                <th className="px-6 py-4 text-slate-500 font-bold text-sm">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { id: 'CERT-2024-001', company: 'معصرة عجلون الحديثة', product: 'زيت زيتون بكر', dest: 'دبي، الإمارات', status: 'موثقة', hash: '8f2d...3a1b' },
                { id: 'CERT-2024-002', company: 'مزارع الجبل', product: 'فواكه مجففة', dest: 'الدوحة، قطر', status: 'موثقة', hash: '4c9e...1f2d' },
                { id: 'CERT-2024-003', company: 'حرفيو عجلون', product: 'منتجات خشبية', dest: 'مسقط، عمان', status: 'قيد المراجعة', hash: 'pending' },
              ].map((cert, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-700">{cert.id}</td>
                  <td className="px-6 py-4 text-slate-600">{cert.company}</td>
                  <td className="px-6 py-4 text-slate-600">{cert.product}</td>
                  <td className="px-6 py-4 text-slate-600">{cert.dest}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-1 rounded-lg w-fit">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      {cert.hash}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      cert.status === 'موثقة' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">طلب إصدار شهادة منشأ</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">نوع المنتج</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="مثال: زيت زيتون" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">جهة التصدير</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="الدولة والمدينة" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">قيمة الشحنة (د.أ)</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">تحميل المستندات</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center text-slate-400 hover:border-emerald-300 transition-colors cursor-pointer">
                    اسحب وأفلت الملفات هنا
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button 
                  type="submit"
                  className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all"
                >
                  إرسال الطلب والتوثيق
                </button>
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
