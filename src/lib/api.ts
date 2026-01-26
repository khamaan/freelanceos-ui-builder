/**
 * API Service Layer
 * 
 * This file contains placeholder functions for all API interactions.
 * Each function is designed to be replaced with actual Django backend endpoints.
 * 
 * Django Backend Endpoints (to be implemented):
 * 
 * Authentication:
 * - POST /api/auth/login/
 * - POST /api/auth/logout/
 * - POST /api/auth/register/
 * - GET  /api/auth/user/
 * 
 * Projects:
 * - GET    /api/projects/
 * - POST   /api/projects/
 * - GET    /api/projects/:id/
 * - PUT    /api/projects/:id/
 * - DELETE /api/projects/:id/
 * 
 * Tasks:
 * - GET    /api/tasks/
 * - POST   /api/tasks/
 * - GET    /api/tasks/:id/
 * - PUT    /api/tasks/:id/
 * - DELETE /api/tasks/:id/
 * - PATCH  /api/tasks/:id/status/
 * 
 * Time Tracking:
 * - GET    /api/time-entries/
 * - POST   /api/time-entries/
 * - PUT    /api/time-entries/:id/
 * - DELETE /api/time-entries/:id/
 * - POST   /api/time-entries/start/
 * - POST   /api/time-entries/stop/
 * 
 * Calendar:
 * - GET    /api/events/
 * - POST   /api/events/
 * - PUT    /api/events/:id/
 * - DELETE /api/events/:id/
 * 
 * Clients:
 * - GET    /api/clients/
 * - POST   /api/clients/
 * - GET    /api/clients/:id/
 * - PUT    /api/clients/:id/
 * - DELETE /api/clients/:id/
 * 
 * Invoices:
 * - GET    /api/invoices/
 * - POST   /api/invoices/
 * - GET    /api/invoices/:id/
 * - PUT    /api/invoices/:id/
 * - DELETE /api/invoices/:id/
 * - POST   /api/invoices/:id/send/
 * 
 * Stats:
 * - GET    /api/stats/dashboard/
 * - GET    /api/stats/revenue/
 * - GET    /api/stats/time/
 */

import { 
  projects, 
  tasks, 
  timeEntries, 
  calendarEvents, 
  clients, 
  invoices, 
  stats, 
  currentUser,
  revenueData,
  projectDistribution 
} from './mockData';
import type { Project, Task, TimeEntry, CalendarEvent, Client, Invoice, Stats, User } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// PROJECTS API
// ============================================

export async function fetchProjects(): Promise<Project[]> {
  // TODO: Replace with Django backend endpoint
  // GET /api/projects/
  await delay(300);
  return projects;
}

export async function fetchProject(id: string): Promise<Project | undefined> {
  // TODO: Replace with Django backend endpoint
  // GET /api/projects/:id/
  await delay(200);
  return projects.find(p => p.id === id);
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  // TODO: Replace with Django backend endpoint
  // POST /api/projects/
  await delay(300);
  const newProject = { ...project, id: `proj-${Date.now()}` };
  return newProject;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  // TODO: Replace with Django backend endpoint
  // PUT /api/projects/:id/
  await delay(300);
  const project = projects.find(p => p.id === id);
  if (!project) throw new Error('Project not found');
  return { ...project, ...data };
}

export async function deleteProject(id: string): Promise<void> {
  // TODO: Replace with Django backend endpoint
  // DELETE /api/projects/:id/
  await delay(300);
}

// ============================================
// TASKS API
// ============================================

export async function fetchTasks(): Promise<Task[]> {
  // TODO: Replace with Django backend endpoint
  // GET /api/tasks/
  await delay(300);
  return tasks;
}

export async function fetchTask(id: string): Promise<Task | undefined> {
  // TODO: Replace with Django backend endpoint
  // GET /api/tasks/:id/
  await delay(200);
  return tasks.find(t => t.id === id);
}

export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  // TODO: Replace with Django backend endpoint
  // POST /api/tasks/
  await delay(300);
  const newTask = { ...task, id: `task-${Date.now()}` };
  return newTask;
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  // TODO: Replace with Django backend endpoint
  // PUT /api/tasks/:id/
  await delay(300);
  const task = tasks.find(t => t.id === id);
  if (!task) throw new Error('Task not found');
  return { ...task, ...data };
}

export async function updateTaskStatus(id: string, status: Task['status']): Promise<Task> {
  // TODO: Replace with Django backend endpoint
  // PATCH /api/tasks/:id/status/
  await delay(200);
  const task = tasks.find(t => t.id === id);
  if (!task) throw new Error('Task not found');
  return { ...task, status };
}

export async function deleteTask(id: string): Promise<void> {
  // TODO: Replace with Django backend endpoint
  // DELETE /api/tasks/:id/
  await delay(300);
}

// ============================================
// TIME TRACKING API
// ============================================

export async function fetchTimeEntries(): Promise<TimeEntry[]> {
  // TODO: Replace with Django backend endpoint
  // GET /api/time-entries/
  await delay(300);
  return timeEntries;
}

export async function startTimer(data: Omit<TimeEntry, 'id' | 'endTime' | 'duration'>): Promise<TimeEntry> {
  // TODO: Replace with Django backend endpoint
  // POST /api/time-entries/start/
  await delay(200);
  return {
    ...data,
    id: `time-${Date.now()}`,
    endTime: null,
    duration: 0,
  };
}

export async function stopTimer(id: string): Promise<TimeEntry> {
  // TODO: Replace with Django backend endpoint
  // POST /api/time-entries/stop/
  await delay(200);
  const entry = timeEntries.find(t => t.id === id);
  if (!entry) throw new Error('Time entry not found');
  return {
    ...entry,
    endTime: new Date().toISOString(),
    duration: 1.5, // Mock duration
  };
}

export async function createTimeEntry(entry: Omit<TimeEntry, 'id'>): Promise<TimeEntry> {
  // TODO: Replace with Django backend endpoint
  // POST /api/time-entries/
  await delay(300);
  return { ...entry, id: `time-${Date.now()}` };
}

export async function updateTimeEntry(id: string, data: Partial<TimeEntry>): Promise<TimeEntry> {
  // TODO: Replace with Django backend endpoint
  // PUT /api/time-entries/:id/
  await delay(300);
  const entry = timeEntries.find(t => t.id === id);
  if (!entry) throw new Error('Time entry not found');
  return { ...entry, ...data };
}

export async function deleteTimeEntry(id: string): Promise<void> {
  // TODO: Replace with Django backend endpoint
  // DELETE /api/time-entries/:id/
  await delay(300);
}

// ============================================
// CALENDAR API
// ============================================

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  // TODO: Replace with Django backend endpoint
  // GET /api/events/
  await delay(300);
  return calendarEvents;
}

export async function createCalendarEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
  // TODO: Replace with Django backend endpoint
  // POST /api/events/
  await delay(300);
  return { ...event, id: `event-${Date.now()}` };
}

export async function updateCalendarEvent(id: string, data: Partial<CalendarEvent>): Promise<CalendarEvent> {
  // TODO: Replace with Django backend endpoint
  // PUT /api/events/:id/
  await delay(300);
  const event = calendarEvents.find(e => e.id === id);
  if (!event) throw new Error('Event not found');
  return { ...event, ...data };
}

export async function deleteCalendarEvent(id: string): Promise<void> {
  // TODO: Replace with Django backend endpoint
  // DELETE /api/events/:id/
  await delay(300);
}

// ============================================
// CLIENTS API
// ============================================

export async function fetchClients(): Promise<Client[]> {
  // TODO: Replace with Django backend endpoint
  // GET /api/clients/
  await delay(300);
  return clients;
}

export async function createClient(client: Omit<Client, 'id'>): Promise<Client> {
  // TODO: Replace with Django backend endpoint
  // POST /api/clients/
  await delay(300);
  return { ...client, id: `client-${Date.now()}` };
}

// ============================================
// INVOICES API
// ============================================

export async function fetchInvoices(): Promise<Invoice[]> {
  // TODO: Replace with Django backend endpoint
  // GET /api/invoices/
  await delay(300);
  return invoices;
}

export async function createInvoice(invoice: Omit<Invoice, 'id'>): Promise<Invoice> {
  // TODO: Replace with Django backend endpoint
  // POST /api/invoices/
  await delay(300);
  return { ...invoice, id: `inv-${Date.now()}` };
}

export async function sendInvoice(id: string): Promise<Invoice> {
  // TODO: Replace with Django backend endpoint
  // POST /api/invoices/:id/send/
  await delay(300);
  const invoice = invoices.find(i => i.id === id);
  if (!invoice) throw new Error('Invoice not found');
  return { ...invoice, status: 'sent' };
}

// ============================================
// STATS API
// ============================================

export async function fetchDashboardStats(): Promise<Stats> {
  // TODO: Replace with Django backend endpoint
  // GET /api/stats/dashboard/
  await delay(300);
  return stats;
}

export async function fetchRevenueData() {
  // TODO: Replace with Django backend endpoint
  // GET /api/stats/revenue/
  await delay(300);
  return revenueData;
}

export async function fetchProjectDistribution() {
  // TODO: Replace with Django backend endpoint
  // GET /api/stats/projects/
  await delay(300);
  return projectDistribution;
}

// ============================================
// USER API
// ============================================

export async function fetchCurrentUser(): Promise<User> {
  // TODO: Replace with Django backend endpoint
  // GET /api/auth/user/
  await delay(200);
  return currentUser;
}

export async function updateUserSettings(data: Partial<User>): Promise<User> {
  // TODO: Replace with Django backend endpoint
  // PUT /api/auth/user/
  await delay(300);
  return { ...currentUser, ...data };
}
