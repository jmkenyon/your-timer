
"use client";


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";

export default function SuccessPage() {

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">You&apos;re in!</h1>

          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Your Pro plan is active. You now have access to more timers,
            higher view limits, and no YourTimer branding on your embeds.
          </p>

          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-6 rounded-xl"
            >
              <Link href="/dashboard">Go to your dashboard →</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Questions or issues? Email{" "}
            <Link
              href="mailto:support@yourtimer.io"
              className="text-orange-600 hover:underline"
            >
              support@yourtimer.io
            </Link>{" "}
            — I reply within 24 hours.
          </p>
        </div>
      </div>
    </>
  );
}