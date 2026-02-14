"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TimeBlock from "../components/TimeBlock";
import { Timer } from "../types/types";

interface TimerDisplayViewProps {
  ownerUserId: string;
  className?: string;
  compact?: boolean;
  showBranding: boolean;
  companyName?: string;
}

const TimerDisplayView = ({
  ownerUserId,
  className,
  compact = false,
  showBranding,
  companyName,
}: TimerDisplayViewProps) => {
  const [timer, setTimer] = useState<Timer | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [noLiveTimers, setNoLiveTimers] = useState<boolean>(false);

  const computeSecondsLeft = (target: string) => {
    const now = new Date();
    const targetDate = new Date(target);
    return Math.max(
      0,
      Math.floor((targetDate.getTime() - now.getTime()) / 1000)
    );
  };

  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const companyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/companies/by_ownerid/${ownerUserId}`
        );

        if (!companyResponse.ok) {
          toast.error("Failed to fetch company data.");
          return;
        }

        const companyData = await companyResponse.json();

        if (companyData.length === 0) {
          toast.error("No company found for the user.");
          return;
        }

        const companyId = companyData[0].id;

        const timerResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${companyId}`
        );

        if (!timerResponse.ok) {
          toast.error("Failed to fetch timer data.");
          return;
        }
        const timerData = await timerResponse.json();
        if (timerData.length === 0) {
          toast.error("No timer found for the company.");
          return;
        }
        const activeTimer = timerData.filter(
          (timer: Timer) => timer.status === "running" && timer.is_public
        );

        if (activeTimer === 0) {
          return;
        }
        const selected = activeTimer[0];

        setTimer(selected);
        setTimeRemaining(computeSecondsLeft(selected.target_datetime));
      } catch {
        setNoLiveTimers(true);
      }
    };
    fetchTimer();
  }, [ownerUserId]);

  useEffect(() => {
    if (!timer) return;

    const interval = setInterval(() => {
      setTimeRemaining(computeSecondsLeft(timer.target_datetime));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const days = Math.floor(timeRemaining / 86400);
  const hrs = Math.floor((timeRemaining % 86400) / 3600);
  const mins = Math.floor((timeRemaining % 3600) / 60);
  const secs = Math.floor(timeRemaining % 60);

  if (noLiveTimers || !timer) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center px-6 bg-black">
        {companyName && (
          <h1 className="text-3xl font-semibold text-white mb-6">
            {companyName}
          </h1>
        )}

        <p className="text-slate-400 text-sm tracking-wide uppercase">
          No active countdown
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center",
        compact
          ? "sm:max-w-5xl max-w-sm sm:p-20 p-10 bg-black"
          : "min-h-screen min-w-full pt-60", // Conditional styling
        className
      )}
    >
      {showBranding &&
        !compact && ( // Only show link on full page
          <Link
            href={process.env.NEXT_PUBLIC_URL || "https://yourtimer.io"}
            className="absolute top-5 left-5 text-white"
          >
            YourTimer.io
          </Link>
        )}

      <h1 className={cn("pb-12 xl:text-3xl lg:text-2xl text-xl")}>
        {timer?.name}
      </h1>
      <div className="flex justify-center gap-8 sm:gap-12 md:gap-20">
        {/* Days */}
        {days > 0 && !compact && (
          <TimeBlock
            value={days}
            label={days === 1 ? "Day" : "Days"}
            timeRemaining={timeRemaining}
          />
        )}

        {/* Hours */}
        <TimeBlock
          value={hrs}
          label={hrs === 1 ? "Hour" : "Hours"}
          timeRemaining={timeRemaining}
        />

        {/* Minutes */}
        <TimeBlock
          value={mins}
          label={mins === 1 ? "Minute" : "Minutes"}
          timeRemaining={timeRemaining}
        />

        {/* Seconds */}
        <TimeBlock
          value={secs}
          label={secs === 1 ? "Second" : "Seconds"}
          timeRemaining={timeRemaining}
        />
      </div>
    </div>
  );
};

export default TimerDisplayView;
