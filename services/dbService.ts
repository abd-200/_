
import { NewsItem, Law, User, UserRole, InvestmentOpportunity, SystemStats } from '../types';

export const db = {
  // الفرص الاستثمارية - واقع عجلون
  getOpportunities: (): InvestmentOpportunity[] => {
    const defaults: InvestmentOpportunity[] = [
      { 
        id: 'inv-1', 
        title: 'تطوير منتجع بيئي بجانب تلفريك عجلون', 
        description: 'إنشاء وحدات فندقية خشبية ومطاعم تطل على قلعة عجلون لخدمة زوار التلفريك المتزايدين.', 
        location: 'منطقة الصوان', 
        expectedBudget: '2.5 مليون د.أ', 
        image: 'https://images.unsplash.com/photo-1542401886-65d6c60db275?auto=format&fit=crop&q=80&w=1000', 
        status: 'OPEN' 
      },
      { 
        id: 'inv-2', 
        title: 'مركز عجلون الدولي لتعبئة زيت الزيتون', 
        description: 'وحدة متكاملة للفحص والتعبئة لغايات التصدير العالمي تحت علامة تجارية موحدة للمحافظة.', 
        location: 'لواء كفرنجة', 
        expectedBudget: '800 ألف د.أ', 
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=1000', 
        status: 'OPEN' 
      }
    ];
    return JSON.parse(localStorage.getItem('ajlun_inv_v3') || JSON.stringify(defaults));
  },

  saveOpportunity: (opp: InvestmentOpportunity) => {
    const list = db.getOpportunities();
    const idx = list.findIndex(o => o.id === opp.id);
    if (idx > -1) list[idx] = opp; else list.unshift(opp);
    localStorage.setItem('ajlun_inv_v3', JSON.stringify(list));
  },

  deleteOpportunity: (id: string) => {
    const list = db.getOpportunities().filter(o => o.id !== id);
    localStorage.setItem('ajlun_inv_v3', JSON.stringify(list));
  },

  // الأخبار الحقيقية
  getNews: (): NewsItem[] => {
    const defaults: NewsItem[] = [
      { 
        id: 'n-1', 
        title: 'عرب الصمادي يبحث سبل التعاون مع الملحق التجاري الإيطالي', 
        content: 'ناقش مدير عام الغرفة عطوفة عرب الصمادي آليات دعم المشاريع الصغيرة والمتوسطة في المحافظة وتبادل الخبرات التقنية.', 
        date: '2024-05-24', 
        category: 'CHAMBER', 
        views: 3100, 
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800' 
      },
      { 
        id: 'n-2', 
        title: 'بدء استقبال طلبات الترخيص الإلكتروني للدورة الجديدة', 
        content: 'أعلنت الغرفة عن تفعيل بوابة التراخيص الذكية لتقليل وقت الإنجاز إلى أقل من 5 دقائق.', 
        date: '2024-05-22', 
        category: 'LOCAL', 
        views: 1250, 
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800' 
      }
    ];
    return JSON.parse(localStorage.getItem('ajlun_news_v3') || JSON.stringify(defaults));
  },

  saveNews: (item: NewsItem) => {
    const news = db.getNews();
    const idx = news.findIndex(n => n.id === item.id);
    if (idx > -1) news[idx] = item; else news.unshift(item);
    localStorage.setItem('ajlun_news_v3', JSON.stringify(news));
  },

  deleteNews: (id: string) => {
    const news = db.getNews().filter(n => n.id !== id);
    localStorage.setItem('ajlun_news_v3', JSON.stringify(news));
  },

  getStats: (): SystemStats => ({
    views: 45800,
    users: 2150,
    totalUsers: 2150,
    requests: 112,
    pendingRequests: 18,
    activeLicenses: 1840,
    revenue: 245000
  }),

  getStaff: (): User[] => {
    const defaults: User[] = [
      { id: 's1', name: 'أحمد المومني', email: 'ahmad@ajlun.jo', role: UserRole.STAFF, stats: { tasksCompleted: 145, avgResponseTime: '15m' } },
      { id: 's2', name: 'سارة القضاة', email: 'sara@ajlun.jo', role: UserRole.STAFF, stats: { tasksCompleted: 92, avgResponseTime: '40m' } }
    ];
    return JSON.parse(localStorage.getItem('ajlun_staff_v3') || JSON.stringify(defaults));
  }
};
