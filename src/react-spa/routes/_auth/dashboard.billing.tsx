import { createFileRoute } from '@tanstack/react-router';
import { DashboardPageContentLayout } from '@/components/layouts';
import { Card, CardContent } from '@/components/ui/layout';
import { Button } from '@/components/ui/atoms/buttons/button';
import { Badge } from '@/components/ui/atoms';
import { WaitlistForm } from '@/features/landing/components';

const BillingHeader = () => {
  return (
    <>
      <h2>Plans & Usage</h2>
      <div className={'flex items-center justify-between'}>
        <p className={'text-muted-foreground'}>Manage billing and usage </p>
      </div>
    </>
  );
};

function BillingPage() {
  // Currently all users are on the Free plan
  const currentPlan = 'free';
  const productsUsed = 1; // This would come from actual data
  const productsLimit = 3;

  return (
    <DashboardPageContentLayout header={<BillingHeader />}>
      <div className="flex flex-col gap-xl">
        {/* Current Plan Details */}
        <Card>
          <CardContent className="card-padding">
            <div className="grid gap-lg md:grid-cols-3 md:divide-x">
              <div className="flex flex-col gap-sm">
                <p className="text-muted-foreground">Cost per month:</p>
                <h4 className="text-4xl">$0.00</h4>
              </div>
              <div className="flex flex-col gap-sm md:pl-lg">
                <p className="text-muted-foreground">Your plan:</p>
                <h5>Free Plan</h5>
              </div>
              <div className="flex flex-col gap-sm md:pl-lg">
                <p className="text-muted-foreground">Usage:</p>
                <h5>
                  {productsUsed} out of {productsLimit} products tracked
                </h5>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <section className="flex w-full flex-col gap-lg">
          <div className="flex flex-col gap-sm text-center">
            <h3>Ready to save more?</h3>
            <p className="text-muted-foreground">
              Upgrade to track more products, more frequent price checks, and multi-channel
              notifications
            </p>
          </div>
          <div className="grid gap-lg md:grid-cols-2">
            {/* Free Plan Card */}
            <div className="relative">
              {currentPlan === 'free' && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <span>👇</span>
                    <span>You are here</span>
                  </div>
                </div>
              )}
              <div className="bg-surface rounded-2xl border text-center h-full">
                <div className="flex flex-col gap-xl p-8 h-full">
                  <div className="flex flex-col gap-sm">
                    <h3>$0/month</h3>
                    <p className="text-muted-foreground">Free Plan</p>
                  </div>
                  <div className="flex flex-col gap-md flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🎯</span>
                      <p>Track up to 3 products</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🏪</span>
                      <p>Basic store coverage</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">⏰</span>
                      <p>Daily price checks</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🔔</span>
                      <p>Instant email notifications</p>
                    </div>
                  </div>
                  <Button size="lg" className="w-full gap-2 text-lg font-semibold" disabled>
                    Currently active
                  </Button>
                </div>
              </div>
            </div>

            {/* Pro Plan Card */}
            <div className="scale-y-105">
              <div className="relative overflow-hidden rounded-2xl border text-center h-full bg-[var(--green-2)] border-[var(--green-6)] shadow-[0_10px_15px_-3px_var(--green-4)]">
                <div className="flex flex-col gap-xl p-8 h-full">
                  <div className="flex flex-col gap-sm justify-center items-center">
                    <Badge variant={'success'}>Coming soon</Badge>
                    <h3>$25/month</h3>
                    <p className="text-muted-foreground">Pro Plan</p>
                  </div>
                  <div className="flex flex-col gap-md flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🚀</span>
                      <p>Track up to 25 products</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🏪</span>
                      <p>Much wider store coverage</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">⏰</span>
                      <p>More frequent price checks</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🔔</span>
                      <p>Email, SMS, Discord, Telegram</p>
                    </div>
                  </div>
                  <WaitlistForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardPageContentLayout>
  );
}

export const Route = createFileRoute('/_auth/dashboard/billing')({
  component: BillingPage,
});