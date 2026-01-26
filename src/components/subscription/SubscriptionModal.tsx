import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Lock, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Plan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: { text: string; included: boolean }[];
  cta: string;
}

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  isYearly: boolean;
}

export function SubscriptionModal({ isOpen, onClose, plan, isYearly }: SubscriptionModalProps) {
  const [step, setStep] = useState<'review' | 'payment' | 'success'>('review');
  const [isLoading, setIsLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!plan) return null;

  const price = isYearly ? plan.priceYearly : plan.priceMonthly;
  const billingPeriod = isYearly ? 'year' : 'month';

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with Django backend API call
    // Example: await api.subscriptions.create({ planId: plan.id, isYearly, paymentMethod: { cardNumber, expiry, cvc, name } });

    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    setStep('review');
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setName('');
    onClose();
  };

  const handleGoToDashboard = () => {
    handleClose();
    toast({
      title: 'Subscription Activated',
      description: `Welcome to FreelanceOS ${plan.name}!`,
    });
    navigate('/dashboard');
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ').substring(0, 19) : '';
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'review' && (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Your Plan</DialogTitle>
              <DialogDescription>
                Review your subscription details before proceeding.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{plan.name} Plan</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <Badge variant={plan.id === 'pro' ? 'default' : 'secondary'}>
                  {plan.id === 'free' ? 'Free' : isYearly ? 'Yearly' : 'Monthly'}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">What's included:</h4>
                <ul className="space-y-1">
                  {plan.features
                    .filter((f) => f.included)
                    .slice(0, 5)
                    .map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-3 w-3 text-primary" />
                        {feature.text}
                      </li>
                    ))}
                </ul>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>
                  ${price}
                  {price > 0 && <span className="text-sm font-normal text-muted-foreground">/{billingPeriod}</span>}
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={() => (price === 0 ? handleGoToDashboard() : setStep('payment'))}>
                {price === 0 ? 'Get Started' : 'Continue to Payment'}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </DialogTitle>
              <DialogDescription>
                Enter your card information to complete your subscription.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePayment}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    ${price}
                    <span className="text-sm font-normal text-muted-foreground">/{billingPeriod}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Your payment information is secure and encrypted.
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setStep('review')}>
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : `Pay $${price}`}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === 'success' && (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <DialogTitle>Payment Successful!</DialogTitle>
              <DialogDescription>
                Welcome to FreelanceOS {plan.name}. Your subscription is now active.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  You now have access to all {plan.name} features. Start exploring your dashboard!
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full" onClick={handleGoToDashboard}>
                Go to Dashboard
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
