import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Play, Pause, Square, Clock } from 'lucide-react';
import { projects, tasks } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function TimerWidget() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    // TODO: Save time entry
    console.log('Saving time entry:', {
      project: selectedProject,
      task: selectedTask,
      description,
      duration: seconds,
    });
    setSeconds(0);
    setDescription('');
  };

  const projectTasks = tasks.filter((t) => t.projectId === selectedProject);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Clock className="h-5 w-5" />
          Time Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={cn(
            'rounded-xl py-8 text-center transition-colors',
            isRunning ? 'bg-primary/10' : 'bg-muted'
          )}
        >
          <p className="text-5xl font-mono font-bold text-foreground tracking-tight">
            {formatTime(seconds)}
          </p>
        </div>

        <div className="grid gap-3">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={selectedTask} 
            onValueChange={setSelectedTask}
            disabled={!selectedProject}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select task (optional)" />
            </SelectTrigger>
            <SelectContent>
              {projectTasks.map((task) => (
                <SelectItem key={task.id} value={task.id}>
                  {task.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="What are you working on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {!isRunning ? (
            <Button
              className="flex-1 gap-2"
              onClick={handleStart}
              disabled={!selectedProject}
            >
              <Play className="h-4 w-4" />
              Start
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                className="flex-1 gap-2"
                onClick={handlePause}
              >
                <Pause className="h-4 w-4" />
                Pause
              </Button>
              <Button
                variant="destructive"
                className="gap-2"
                onClick={handleStop}
              >
                <Square className="h-4 w-4" />
                Stop
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
