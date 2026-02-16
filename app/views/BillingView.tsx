// app/components/BillingPanel.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface BillingPanelProps {
  userId: string;
  userEmail: string;
  currentPlan: "trial" | "free" | "pro" | "business";
  trialEndsAt: string | null; 
}



const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    description: "For testing and small sites",
    features: [
      "1 timer",
      "1,000 views/month",
      "Basic templates",
      "Shareable timer page",
      "YourTimer branding on embed",
    ],
    cta: "Downgrade to Free",
  },
  {
    id: "pro",
    name: "Pro",
    price: 12,
    yearlyPrice: 10,
    popular: true,
    description: "For stores running regular promotions",
    features: [
      "5 timers",
      "50,000 views/month",
      "All templates + customization",
      "No YourTimer branding",
      "Product-level targeting",
      "Actions at zero (redirect, hide, message)",
      "Shopify + embed code",
      "Email support (24hr response)",
    ],
    cta: "Upgrade to Pro",

    priceIdMonthly: "price_1T0kpsCeahdfjAC6wq1NPYAi",
    priceIdYearly: "price_1T0kpuCeahdfjAC62xubUFhu",
  },
  {
    id: "business",
    name: "Business",
    price: 39,
    yearlyPrice: 32,
    description: "For agencies and high-traffic stores",
    features: [
      "Unlimited timers",
      "500,000 views/month",
      "Everything in Pro",
      "Evergreen (cookie-based) timers",
      "Country targeting",
      "A/B testing",
      "Conversion analytics",
      "API access",
      "Priority support (same-day)",
    ],
    cta: "Upgrade to Business",
    // Replace these with your actual Stripe price IDs
    priceIdMonthly: "price_1T0kprCeahdfjAC6Xcovsb36",
    priceIdYearly: "price_1T0kptCeahdfjAC6f6bjvcuL",
  },
];



const BillingPanel = ({
  userId,
  userEmail,
  currentPlan,
  trialEndsAt,
}: BillingPanelProps) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const isTrialing = currentPlan === "trial";
  const trialDaysLeft =
    trialEndsAt
      ? Math.max(
          0,
          Math.ceil(
            (new Date(trialEndsAt).getTime() - Date.now()) / 86400000
          )
        )
      : 0;

  const handleSelectPlan = async (plan: (typeof plans)[0]) => {
    // If selecting free, just downgrade (no Stripe needed)
    if (plan.id === "free") {
      window.location.href = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL!;
      return;
    }

    // For paid plans, redirect to Stripe Checkout
    const priceId =
      billingCycle === "monthly" ? plan.priceIdMonthly : plan.priceIdYearly;

    if (!priceId) {
      toast.error("Pricing not configured yet");
      return;
    }

    setLoadingPlan(plan.id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/checkout_sessions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            priceId,
            userId,
            userEmail,
          }),
        }
      );
      console.log(priceId, userId, userEmail)
    

      const data = await res.json();

      console.log("Checkout session response:", data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Something went wrong. Email support@yourtimer.io");
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    // Opens Stripe Customer Portal for plan changes / cancellation
    window.location.href = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL!;
    return;
  };

  return (
    <div className="w-full max-w-5xl px-2">
      {/* Trial banner */}
      {isTrialing && (
        <div className="mb-8 rounded-xl bg-orange-50 border border-orange-200 p-5 flex items-start gap-3">
          <Crown className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">
              You&apos;re on your 14-day free trial
              {trialDaysLeft > 0 && (
                <span className="text-orange-600">
                  {" "}
                  — {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} left
                </span>
              )}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              You have access to all Business features. Pick a plan below to
              continue after your trial ends.
            </p>
          </div>
        </div>
      )}

      {/* Current plan indicator (non-trial) */}
      {!isTrialing && currentPlan !== "free" && (
        <div className="mb-8 rounded-xl bg-slate-50 border border-slate-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-orange-600" />
            <div>
              <p className="font-semibold text-slate-900">
                Current plan:{" "}
                <span className="capitalize">{currentPlan}</span>
              </p>
              <p className="text-sm text-slate-500">
                Manage your subscription, update payment method, or cancel.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleManageSubscription}
            disabled={loadingPlan === "manage"}
            className="shrink-0 cursor-pointer"
          >
            {loadingPlan === "manage" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Manage subscription"
            )}
          </Button>
        </div>
      )}

      {/* Billing toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              billingCycle === "monthly"
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              billingCycle === "yearly"
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Yearly{" "}
            <span className="text-green-600 text-xs ml-1">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id;
          const displayPrice =
            billingCycle === "monthly" ? plan.price : plan.yearlyPrice;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 transition ${
                plan.popular
                  ? "border-2 border-orange-600 shadow-lg relative"
                  : "border border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}

              <h3 className="text-lg font-semibold text-slate-900">
                {plan.name}
              </h3>

              <div className="mt-3">
                {displayPrice === 0 ? (
                  <span className="text-4xl font-bold text-slate-900">$0</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-slate-900">
                      ${displayPrice}
                    </span>
                    <span className="text-slate-500 ml-1">/month</span>
                  </>
                )}
              </div>

              <p className="mt-2 text-sm text-slate-500">{plan.description}</p>

              <div className="mt-5">
                {isCurrentPlan ? (
                  <Button
                    disabled
                    className="w-full rounded-xl py-5 bg-slate-100 text-slate-500 cursor-pointer"
                  >
                    Current plan
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={loadingPlan !== null}
                    className={`w-full rounded-xl py-5 cursor-pointer ${
                      plan.popular
                        ? "bg-orange-600 hover:bg-orange-500 text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    {loadingPlan === plan.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      plan.cta
                    )}
                  </Button>
                )}
              </div>

              <ul className="mt-5 space-y-2.5">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BillingPanel;