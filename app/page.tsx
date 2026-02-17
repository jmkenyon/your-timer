"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TimerDisplayView from "./views/TimerDisplayView";
import Footer from "./components/Footer";

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-orange-50/50 to-white" />
          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5 text-sm text-orange-700">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Used by 100+ stores to boost conversions
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 text-center max-w-4xl mx-auto leading-[1.1]">
              Countdown timers that{" "}
              <span className="text-orange-600">actually sell</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-neutral-600 text-center max-w-3xl mx-auto leading-relaxed">
              Add urgency to any page in 2 minutes. Embeddable timers for
              Shopify, WordPress, and any website.
              {/* <span className="block mt-4 text-sm font-semibold text-neutral-900">
                🎁 Founder Offer: First 100 signups get Pro free for life.
              </span> */}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-orange-600 hover:bg-orange-500 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                <Link href="/sign-up">Start free — no credit card needed</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-xl border-neutral-300 w-full sm:w-auto"
              >
                <Link href="/demo.html">See a demo store</Link>
              </Button>
            </div>

            <p className="mt-4 text-sm text-neutral-500 text-center">
              Free plan includes 1 timer & 1,000 views/month. No credit card
              required.
            </p>
          </div>
        </section>

        {/* PROBLEM / PAIN */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-950">
              Most timer apps are broken. You know it.
            </h2>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              {[
                {
                  problem: "Glitchy and unreliable",
                  detail:
                    "Timers that freeze, break on mobile, lag your site, or vanish after a theme update.",
                  solution:
                    "Lightweight, tested on every device and browser. If it breaks, I fix it same day.",
                },
                {
                  problem: "Nothing happens at zero",
                  detail:
                    "Timer hits 00:00:00 and just... sits there. Or resets.",
                  solution:
                    "Redirect, hide product, show message, or trigger webhook",
                },
                {
                  problem: "Support that ghosts you",
                  detail:
                    "Submit a ticket, wait 5 days, get a canned response that doesn't help.",
                  solution: "We guarantee a human response within 24 hours.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
                >
                  <div className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                    The problem
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-neutral-950">
                    {item.problem}
                  </h3>
                  <p className="mt-2 text-neutral-500 text-sm">{item.detail}</p>
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <div className="text-green-600 font-semibold text-sm uppercase tracking-wider">
                      YourTimer
                    </div>
                    <p className="mt-1 text-neutral-700 text-sm font-medium">
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-950">
              Everything you need. Nothing you don&apos;t.
            </h2>

            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "2-minute setup",
                  desc: "Paste one line of code or install the Shopify app. Live in minutes, not hours.",
                },
                {
                  title: "Real human support",
                  desc: "Email directly. We reply within 24 hours — not a chatbot, not a ticket queue. Just someone who cares.",
                },
                {
                  title: "Actions at zero",
                  desc: "Redirect to a new page, hide the product, show a custom message, or trigger a webhook.",
                },
                {
                  title: "Evergreen timers",
                  desc: "Each visitor gets their own personal deadline. Cookie-based. No cheating by refreshing.",
                },
                {
                  title: "Country targeting",
                  desc: "Show different timers to different countries. Run geo-specific promotions.",
                },
                {
                  title: "Conversion tracking",
                  desc: "See impressions, clicks, and conversions. Know if your timer is actually working.",
                },
                {
                  title: "Full customization",
                  desc: "Match your brand. Colors, fonts, position, size. Top bar, bottom bar, or inline on product pages.",
                },
                {
                  title: "Shareable timer pages",
                  desc: "Get a custom link like sale.yourtimer.io. Share on email, social, anywhere.",
                },
                {
                  title: "Works everywhere",
                  desc: "Shopify, WordPress, Wix, Squarespace, or any site. One embed code.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-neutral-100 hover:border-orange-200 hover:bg-orange-50/30 transition-colors"
                >
                  <h3 className="font-semibold text-neutral-950">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-950">
              Live in 3 steps
            </h2>
            <div className="mt-14 grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Create your timer",
                  desc: "Pick a template, set your deadline, customize the look. 60 seconds.",
                },
                {
                  step: "2",
                  title: "Choose where it shows",
                  desc: "Select specific products, pages, or your entire site. Embed with one line of code or install the Shopify app.",
                },
                {
                  step: "3",
                  title: "Watch conversions climb",
                  desc: "Track impressions and clicks. See what happens when urgency meets your offer.",
                },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                    {s.step}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-neutral-950">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-neutral-600 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-950">
              Simple pricing. No surprises.
            </h2>
            <p className="mt-4 text-center text-neutral-600">
              All paid plans include a 14-day free trial. No credit card
              required.
            </p>

            {/* Billing toggle */}
            <div className="flex justify-center mt-8">
              <div className="inline-flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingCycle === "monthly"
                      ? "bg-white shadow-sm text-neutral-950"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingCycle === "yearly"
                      ? "bg-white shadow-sm text-neutral-950"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Yearly{" "}
                  <span className="text-green-600 text-xs ml-1">Save 20%</span>
                </button>
              </div>
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-6 items-start">
              {/* Free */}
              <div className="rounded-2xl border border-neutral-200 p-8">
                <h3 className="text-lg font-semibold text-neutral-950">Free</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-neutral-950">
                    $0
                  </span>
                  <span className="text-neutral-500 ml-1">/forever</span>
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  For testing and small sites.
                </p>
                <Button
                  asChild
                  className="mt-6 w-full bg-neutral-900 hover:bg-neutral-800 rounded-xl py-5"
                >
                  <Link href="/sign-up">Get started</Link>
                </Button>
                <ul className="mt-6 space-y-3">
                  {[
                    "1 timer",
                    "1,000 views/month",
                    "Basic templates",
                    "YourTimer branding",
                    "Shareable timer page",
                  ].map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-neutral-600"
                    >
                      <span className="text-green-600 mt-0.5">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro */}
              <div className="rounded-2xl border-2 border-orange-600 p-8 relative shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most popular
                </div>
                <h3 className="text-lg font-semibold text-neutral-950">Pro</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-neutral-950">
                    ${billingCycle === "monthly" ? "12" : "10"}
                  </span>
                  <span className="text-neutral-500 ml-1">/month</span>
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  For stores running regular promotions.
                </p>
                <Button
                  asChild
                  className="mt-6 w-full bg-orange-600 hover:bg-orange-500 rounded-xl py-5"
                >
                  <Link href="/sign-up">Start 14-day free trial</Link>
                </Button>
                <ul className="mt-6 space-y-3">
                  {[
                    "5 timers",
                    "50,000 views/month",
                    "All templates + customization",
                    "Remove YourTimer branding",

                    "Actions at zero (redirect, hide, message)",
                    "Shopify app + embed code",
                    "Email support (24hr response)",
                  ].map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <span className="text-green-600 mt-0.5">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Business */}
              <div className="rounded-2xl border border-neutral-200 p-8">
                <h3 className="text-lg font-semibold text-neutral-950">
                  Business
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-neutral-950">
                    ${billingCycle === "monthly" ? "39" : "32"}
                  </span>
                  <span className="text-neutral-500 ml-1">/month</span>
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  For agencies and high-traffic stores.
                </p>
                <Button
                  asChild
                  className="mt-6 w-full bg-neutral-900 hover:bg-neutral-800 rounded-xl py-5"
                >
                  <Link href="/sign-up">Start 14-day free trial</Link>
                </Button>
                <ul className="mt-6 space-y-3">
                  {[
                    "Unlimited timers",
                    "500,000 views/month",
                    "Everything in Pro",
                    "Evergreen (cookie-based) timers",
                    "Country targeting",
                    "A/B testing",
                    "Conversion analytics",
                    "API access",
                    "Priority support (same-day)",
                  ].map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <span className="text-green-600 mt-0.5">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Timer Demo */}
        <section className="max-w-5xl m-auto">
          <p className="mt-4 text-lg md:text-xl text-neutral-800 text-center max-w-2xl mx-auto leading-relaxed">
            Plus, get a shareable timer page like{" "}
            <Link
              className="text-orange-500 hover:text-black"
              href={"https://test-company.yourtimer.io"}
            >
              yourstore.yourtimer.io
            </Link>{" "}
            — perfect for email campaigns and social.
          </p>
          <div className="mt-16 mx-auto">
            <div className="bg-neutral-950 rounded-2xl shadow-2xl overflow-hidden">
              <div className="text-center text-neutral-500 text-sm pt-6">
                Live demo — this is what your customers see
              </div>
              <div className="py-8 flex justify-center">
                <TimerDisplayView
                  ownerUserId={process.env.NEXT_PUBLIC_OWNERID!}
                  compact={true}
                  showBranding={false}
                  className="bg-black text-white rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-950">
              Questions? Answered.
            </h2>
            <div className="mt-12 space-y-6">
              {[
                {
                  q: "Does it work with my Shopify theme?",
                  a: "Yes. YourTimer works with every Shopify theme — free and paid. The timer renders as a lightweight overlay, so it doesn't interfere with your theme's CSS or layout. If you ever hit an issue, email and we'll fix it within 24 hours.",
                },
                {
                  q: "Can I show the timer on specific products only?",
                  a: "Yes — this is the #1 reason people switch to YourTimer. Select individual products, entire collections, or filter by tags. No more disabling products one by one across your entire catalog.",
                },
                {
                  q: "What happens when the timer hits zero?",
                  a: "You choose: redirect to another page (great for tripwire funnels), hide the product, show a custom message ('Sale ended — join the waitlist'), or trigger a webhook to your automation stack.",
                },
                {
                  q: "What are evergreen timers?",
                  a: "Each visitor gets their own personal countdown (e.g., '20% off expires in 2 hours' from their first visit). Cookie-based, so refreshing the page doesn't reset it. Available on Business plan.",
                },
                {
                  q: "Do I need to know how to code?",
                  a: "No. Shopify users install the app. Everyone else copies one line of embed code. If you can paste text, you can use YourTimer.",
                },
                {
                  q: "What if I need help?",
                  a: "Email us directly. You will get a human response within 24 hours .",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-xl border border-neutral-100 shadow-sm"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-semibold text-neutral-950">
                      {faq.q}
                    </span>
                    <span className="text-neutral-400 group-open:rotate-45 transition-transform text-xl ml-4 shrink-0">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-950">
              Your next sale is waiting.
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Set up your first timer in 2 minutes. Free forever plan available.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-orange-600 hover:bg-orange-500 text-white text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/sign-up">Start free — add urgency today</Link>
            </Button>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}
