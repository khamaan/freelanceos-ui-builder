import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { 
  Briefcase, 
  BarChart3, 
  Clock, 
  CheckSquare, 
  Calendar, 
  DollarSign,
  ArrowRight,
  Star,
  Zap,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Powerful Analytics',
    description: 'Track your revenue, hours, and project performance with beautiful charts and insights.',
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Start and stop timers with one click. Automatic billing calculations.',
  },
  {
    icon: CheckSquare,
    title: 'Task Management',
    description: 'Organize your work with Kanban boards, priorities, and deadlines.',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Never miss a deadline with calendar integration and reminders.',
  },
  {
    icon: DollarSign,
    title: 'Invoicing',
    description: 'Create professional invoices and track payments effortlessly.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared with third parties.',
  },
];

const stats = [
  { value: '10K+', label: 'Freelancers' },
  { value: '$50M+', label: 'Revenue Tracked' },
  { value: '500K+', label: 'Tasks Completed' },
  { value: '99.9%', label: 'Uptime' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FreelanceOS</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              The ultimate freelance toolkit
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Manage your freelance business{' '}
              <span className="text-gradient">like a pro</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Track time, manage projects, send invoices, and grow your business — all in one beautiful platform designed for independent professionals.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/20 blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-foreground md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features designed to help you focus on what matters — your work.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="border-y border-border bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-warning text-warning" />
              ))}
            </div>
            <blockquote className="text-xl font-medium text-foreground md:text-2xl">
              "FreelanceOS transformed how I run my business. I went from juggling spreadsheets to having everything in one place. My revenue increased 40% in the first year."
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold text-foreground">Sarah Chen</p>
              <p className="text-muted-foreground">Freelance Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Ready to take control of your freelance career?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of freelancers who trust FreelanceOS.
          </p>
          <div className="mt-8">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <Briefcase className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">FreelanceOS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 FreelanceOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
