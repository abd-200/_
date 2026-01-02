
export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  MERCHANT = 'MERCHANT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions?: string[];
  stats?: {
    tasksCompleted: number;
    avgResponseTime: string;
  };
}

export interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  expectedBudget: string;
  image: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  category: 'LOCAL' | 'GLOBAL' | 'CHAMBER';
  views: number;
}

export interface Law {
  id: string;
  title: string;
  description: string;
  category: string;
  fullText: string;
}

export interface LicenseRequest {
  id: string;
  merchantName: string;
  businessName: string;
  serviceType: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ASSIGNED';
  assignedTo?: string;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'staff';
  text: string;
  timestamp: Date;
  attachment?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'SUCCESS' | 'ERROR' | 'INFO' | 'WARNING';
  read: boolean;
  timestamp: string;
}

/**
 * Interface for system-wide statistics used in Dashboard and CMS
 */
export interface SystemStats {
  views: number;
  users: number;
  requests: number;
  revenue: number;
  activeLicenses: number;
  totalUsers: number;
  pendingRequests: number;
}
