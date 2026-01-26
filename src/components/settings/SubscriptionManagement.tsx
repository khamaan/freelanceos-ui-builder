import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  CreditCard,
  Check,
  Download,
  Crown,
  Zap,
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  Receipt,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock subscription data
const currentSubscription = {
  plan: 'Pro',
  status: 'active',
  priceMonthly: 19,
  billingCycle: 'monthly',
  nextBillingDate: '2024-02-15',
  startDate: '2024-01-15',
  features: {
    projects: { used: 8, limit: 'Unlimited' },
    storage: { used: 4.2, limit: 10, unit: 'GB' },
    teamMembers: { used: 3, limit: 5 },
  },
};

const paymentMethod = {
  type: 'card',
  brand: 'Visa',
  last4: '4242',
  expiryMonth: 12,
  expiryYear: 2025,
};

const invoices = [
  { id: 'inv-001', date: '2024-01-15', amount: 19, status: 'paid' },
  { id: 'inv-002', date: '2023-12-15', amount: 19, status: 'paid' },
  { id: 'inv-003', date: '2023-11-15', amount: 19, status: 'paid' },
];

const plans = [
  { id: 'free', name: 'Free', price: 0, current: false },
  { id: 'pro', name: 'Pro', price: 19, current: true },
  { id: 'enterprise', name: 'Enterprise', price: 49, current: false },
];

export function SubscriptionManagement() {
  const { toast } = useToast();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showChangePlanDialog, setShowChangePlanDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelSubscription = () => {
    setIsLoading(true);
    // TODO: Replace with Django backend API call
    setTimeout(() => {
      setIsLoading(false);
      setShowCancelDialog(false);
      toast({
        title: 'Subscription cancelled',
        description: 'Your subscription will remain active until the end of the billing period.',
      });
    }, 1000);
  };

  const handleChangePlan = (planId: string) => {
    setIsLoading(true);
    // TODO: Replace with Django backend API call
    setTimeout(() => {
      setIsLoading(false);
      setShowChangePlanDialog(false);
      toast({
        title: 'Plan updated',
        description: `You've successfully switched to the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan.`,
      });
    }, 1000);
  };

  const handleUpdatePaymentMethod = () => {
    // TODO: Replace with Django backend API call
    toast({
      title: 'Coming soon',
      description: 'Payment method update will be available soon.',
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // TODO: Replace with Django backend API call
    toast({
      title: 'Downloading invoice',
      description: `Invoice ${invoiceId} is being downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Current Plan
              </CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </div>
            <Badge variant={currentSubscription.status === 'active' ? 'default' : 'secondary'}>
              {currentSubscription.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{currentSubscription.plan} Plan</h3>
                <p className="text-muted-foreground">
                  ${currentSubscription.priceMonthly}/month • Billed {currentSubscription.billingCycle}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowChangePlanDialog(true)}>
                Change Plan
              </Button>
              <Link to="/pricing">
                <Button variant="ghost" size="icon">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="space-y-4">
            <h4 className="font-medium">Usage This Period</h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Projects</span>
                  <span className="font-medium">
                    {currentSubscription.features.projects.used} / {currentSubscription.features.projects.limit}
                  </span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="font-medium">
                    {currentSubscription.features.storage.used} / {currentSubscription.features.storage.limit} {currentSubscription.features.storage.unit}
                  </span>
                </div>
                <Progress 
                  value={(currentSubscription.features.storage.used / currentSubscription.features.storage.limit) * 100} 
                  className="h-2" 
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Team Members</span>
                  <span className="font-medium">
                    {currentSubscription.features.teamMembers.used} / {currentSubscription.features.teamMembers.limit}
                  </span>
                </div>
                <Progress 
                  value={(currentSubscription.features.teamMembers.used / currentSubscription.features.teamMembers.limit) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next billing: {new Date(currentSubscription.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Receipt className="h-4 w-4" />
              <span>Member since: {new Date(currentSubscription.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>
            Manage your payment information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-14 items-center justify-center rounded bg-muted">
                <span className="text-xs font-bold">{paymentMethod.brand}</span>
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• {paymentMethod.last4}</p>
                <p className="text-sm text-muted-foreground">
                  Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleUpdatePaymentMethod}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>
            Download your past invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="font-medium">
                      {new Date(invoice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-muted-foreground">${invoice.amount}.00</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="capitalize">
                    <Check className="h-3 w-3 mr-1" />
                    {invoice.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownloadInvoice(invoice.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Cancel Subscription
          </CardTitle>
          <CardDescription>
            Once cancelled, you'll lose access to Pro features at the end of your billing period.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={() => setShowCancelDialog(true)}>
            Cancel Subscription
          </Button>
        </CardContent>
      </Card>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel? You'll lose access to:
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-2 py-4">
            <li className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-destructive" />
              Unlimited projects
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-destructive" />
              Advanced analytics
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-destructive" />
              Invoice generation
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-destructive" />
              Priority support
            </li>
          </ul>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Subscription
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancelSubscription}
              disabled={isLoading}
            >
              {isLoading ? 'Cancelling...' : 'Yes, Cancel'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Plan Dialog */}
      <Dialog open={showChangePlanDialog} onOpenChange={setShowChangePlanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Plan</DialogTitle>
            <DialogDescription>
              Select a new plan. Changes take effect immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                  plan.current 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => !plan.current && handleChangePlan(plan.id)}
              >
                <div>
                  <p className="font-medium">{plan.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {plan.price === 0 ? 'Free' : `$${plan.price}/month`}
                  </p>
                </div>
                {plan.current && (
                  <Badge>Current</Badge>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangePlanDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}