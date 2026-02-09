"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./components/Navbar";
import TimerDisplayView from "./views/TimerDisplayView";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-neutral-50 to-neutral-100 pb-20">
        <div className="flex justify-center px-6">
          <div className="text-center max-w-4xl space-y-8">
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-neutral-950 mt-10">
              YourTimer
            </h1>

            <div className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              <p>Create a timer and get a custom link like{" "}</p>
              <Link href={"https://test-company.yourtimer.io"} className="font-medium hover:text-orange-600 text-black">
                test-company.yourtimer.io
              </Link>
            </div>


            {/* Live Demo Timer */}
            <div className="py-8 flex justify-center">
              <TimerDisplayView
                ownerUserId={process.env.NEXT_PUBLIC_OWNERID!}
                compact={true}
                className="bg-neutral-900 text-white rounded-2xl"
              />
            </div>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="bg-orange-600 hover:bg-orange-500 text-white text-base md:text-lg px-10 py-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <Link href="/sign-up">Get started</Link>
              </Button>
              
              <p className="text-sm text-neutral-500 mt-2">
                Free to start · No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
