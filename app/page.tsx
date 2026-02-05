"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-b from-neutral-50 to-neutral-100">
        <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
          <div className="text-center max-w-2xl space-y-8">
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-neutral-950">
              YourTimer
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              Create a timer and get a custom link like{" "}
              <span className="font-medium text-neutral-900">
                yourcompany.yourtimer.io
              </span>
            </p>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="
                bg-orange-600 hover:bg-orange-500
                text-white text-base md:text-lg
                px-10 py-6
                rounded-xl
                shadow-sm hover:shadow-md
                transition-all
              "
              >
                <Link href="/sign-up">Get started</Link>
              </Button>
              <p className="text-sm text-neutral-500 mt-2">
                Free to start · No credit card required
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
