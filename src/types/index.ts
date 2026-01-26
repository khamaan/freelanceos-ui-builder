export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  progress: number;
  budget: number;
  spent: number;
  deadline: string;
  description: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assignee: string;
  timeEstimate: number;
  timeSpent: number;
}

export interface TimeEntry {
  id: string;
  projectId: string;
  projectName: string;
  taskId: string;
  taskName: string;
  description: string;
  startTime: string;
  endTime: string | null;
  duration: number;
  billable: boolean;
  rate: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'meeting' | 'deadline' | 'reminder' | 'task';
  projectId?: string;
  color: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  avatar?: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  createdAt: string;
}

export interface Stats {
  totalRevenue: number;
  pendingPayments: number;
  activeProjects: number;
  completedTasks: number;
  hoursThisWeek: number;
  hoursThisMonth: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  timezone: string;
  hourlyRate: number;
}
