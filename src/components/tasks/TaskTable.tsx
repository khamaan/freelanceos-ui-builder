import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  MoreHorizontal, 
  ArrowUpDown,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle
} from 'lucide-react';
import type { Task } from '@/types';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusConfig = {
  'todo': { label: 'To Do', icon: Circle, className: 'bg-secondary text-secondary-foreground' },
  'in-progress': { label: 'In Progress', icon: Clock, className: 'bg-primary/20 text-primary' },
  'review': { label: 'Review', icon: AlertCircle, className: 'bg-warning/20 text-warning' },
  'completed': { label: 'Completed', icon: CheckCircle2, className: 'bg-success/20 text-success' },
};

const priorityConfig = {
  'low': { label: 'Low', className: 'bg-secondary text-secondary-foreground' },
  'medium': { label: 'Medium', className: 'bg-primary/20 text-primary' },
  'high': { label: 'High', className: 'bg-warning/20 text-warning' },
  'urgent': { label: 'Urgent', className: 'bg-destructive/20 text-destructive' },
};

interface TaskTableProps {
  tasks: Task[];
  onStatusChange?: (taskId: string, status: Task['status']) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

type SortField = 'title' | 'priority' | 'dueDate' | 'status';
type SortDirection = 'asc' | 'desc';

export function TaskTable({ tasks, onStatusChange, onEdit, onDelete }: TaskTableProps) {
  const [sortField, setSortField] = useState<SortField>('dueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'priority':
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case 'dueDate':
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const toggleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(t => t.id));
    }
  };

  const toggleSelectTask = (taskId: string) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedTasks.length === tasks.length}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead className="min-w-[180px]">
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8"
                onClick={() => handleSort('title')}
              >
                Task
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">Project</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8"
                onClick={() => handleSort('status')}
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8"
                onClick={() => handleSort('priority')}
              >
                Priority
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden lg:table-cell">
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8"
                onClick={() => handleSort('dueDate')}
              >
                Due Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden xl:table-cell">Time</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => {
            const status = statusConfig[task.status];
            const priority = priorityConfig[task.priority];
            const StatusIcon = status.icon;
            return (
              <TableRow key={task.id} className="group">
                <TableCell>
                  <Checkbox
                    checked={selectedTasks.includes(task.id)}
                    onCheckedChange={() => toggleSelectTask(task.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <StatusIcon className={cn('h-4 w-4 flex-shrink-0', status.className.split(' ')[1])} />
                    <div className="min-w-0">
                      <span className="font-medium text-foreground block truncate">{task.title}</span>
                      <span className="text-xs text-muted-foreground md:hidden block">{task.projectName}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground hidden md:table-cell">
                  {task.projectName}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(status.className, "whitespace-nowrap")}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline" className={cn(priority.className)}>
                    {priority.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground hidden lg:table-cell">
                  {format(parseISO(task.dueDate), 'MMM d, yyyy')}
                </TableCell>
                <TableCell className="text-muted-foreground hidden xl:table-cell">
                  {task.timeSpent}h / {task.timeEstimate}h
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(task)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusChange?.(task.id, 'completed')}>
                        Mark Complete
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => onDelete?.(task.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
