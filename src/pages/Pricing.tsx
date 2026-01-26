import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Briefcase, Check, X } from 'lucide-react';
import { SubscriptionModal } from '@/components/subscription/SubscriptionModal';

const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    priceMonthly: 0,
    priceYearly: 0,
    popular: false,
    features: [
      { text: 'Up to 3 projects', included: true },
      { text: 'Basic time tracking', included: true },
      { text: 'Task management', included: true },
      { text: '500MB storage', included: true },
      { text: 'Email support', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Invoice generation', included: false },
      { text: 'Team collaboration', included: false },
      { text: 'Priority support', included: false },
      { text: 'Custom branding', included: false },
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing freelancers',
    priceMonthly: 19,
    priceYearly: 190,
    popular: true,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Advanced time tracking', included: true },
      { text: 'Task management', included: true },
      { text: '10GB storage', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Invoice generation', included: true },
      { text: 'Team collaboration (up to 5)', included: true },
      { text: 'Priority support', included: false },
      { text: 'Custom branding', included: false },
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For agencies and teams',
    priceMonthly: 49,
    priceYearly: 490,
    popular: false,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Advanced time tracking', included: true },
      { text: 'Task management', included: true },
      { text: 'Unlimited storage', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Invoice generation', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom branding', included: true },
    ],
    cta: 'Contact Sales',
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FreelanceOS</span>
          </Link>
          <div className="flex items-center gap-4">
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

      {/* Header */}
      <section className="pt-32 pb-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <Label htmlFor="billing-toggle" className={!isYearly ? 'text-foreground' : 'text-muted-foreground'}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className={isYearly ? 'text-foreground' : 'text-muted-foreground'}>
              Yearly
              <Badge variant="secondary" className="ml-2">Save 20%</Badge>
            </Label>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      ${isYearly ? plan.priceYearly : plan.priceMonthly}
                    </span>
                    {plan.priceMonthly > 0 && (
                      <span className="text-muted-foreground">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for enterprise customers.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">Yes! Pro and Enterprise plans come with a 14-day free trial. No credit card required.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground">Absolutely! You can change your plan at any time. We'll prorate the difference.</p>
            </div>
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

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
        isYearly={isYearly}
      />
    </div>
  );
}
