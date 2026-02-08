"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TimerDisplayViewProps {
  ownerUserId: string;
  className?: string;
}

interface Timer {
  id: number;
  name: string;
  target_datetime: string;
  status: string;
  company_id: number;
  started_at: string | null;
  created_at: string;
}

const TimerDisplayView = ({
  ownerUserId,
  className,
}: TimerDisplayViewProps) => {
  const [timer, setTimer] = useState<Timer | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

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

        const timerLenght = timerData.length;
      
        const t = timerData[timerLenght -1 ];
        setTimer(t);
        setTimeRemaining(computeSecondsLeft(t.target_datetime));
      } catch {
        toast.error("Failed to fetch timer data.");
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

  if (!timer) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen min-w-full items-center pt-60",
        className
      )}
    >
      <Link
        href={process.env.NEXT_PUBLIC_URL || "https://yourtimer.io"}
        className="absolute top-5 left-5 text-white"
      >
        YourTimer.io
      </Link>
      <h1 className="text-3xl pb-20">{timer?.name}</h1>
      <div className="flex gap-8 items-center">
        {/* Days */}
        {days > 0 && (
          <div className="flex flex-col items-center mr-10">
            <span
              className={cn(
                "text-[180px] font-mono font-bold transition-colors duration-300",
                timeRemaining === 0 && "text-red-600 animate-pulse",
                timeRemaining < 3600 && timeRemaining > 0 && "text-orange-600"
              )}
            >
              {days.toString().padStart(2, "0")}
            </span>
            <span className="text-sm uppercase tracking-widest text-gray-400">
              {days === 1 ? "Day" : "Days"}
            </span>
          </div>
        )}

        {/* Hours */}
        <div className="flex flex-col items-center">
          <span
            className={cn(
              "text-[180px] font-mono font-bold transition-colors duration-300",
              timeRemaining === 0 && "text-red-600 animate-pulse",
              timeRemaining < 3600 && timeRemaining > 0 && "text-orange-600"
            )}
          >
            {hrs.toString().padStart(2, "0")}
          </span>
          <span className="text-sm uppercase tracking-widest text-gray-400">
            {hrs === 1 ? "Hour" : "Hours"}
          </span>
        </div>

        {/* Separator */}
        <span className="text-[180px] font-mono font-bold">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span
            className={cn(
              "text-[180px] font-mono font-bold transition-colors duration-300",
              timeRemaining === 0 && "text-red-600 animate-pulse",
              timeRemaining < 3600 && timeRemaining > 0 && "text-orange-600"
            )}
          >
            {mins.toString().padStart(2, "0")}
          </span>
          <span className="text-sm uppercase tracking-widest text-gray-400">
            {mins === 1 ? "Minute" : "Minutes"}
          </span>
        </div>

        {/* Separator */}
        <span className="text-[180px] font-mono font-bold">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span
            className={cn(
              "text-[180px] font-mono font-bold transition-colors duration-300",
              timeRemaining === 0 && "text-red-600 animate-pulse",
              timeRemaining < 3600 && timeRemaining > 0 && "text-orange-600"
            )}
          >
            {secs.toString().padStart(2, "0")}
          </span>
          <span className="text-sm uppercase tracking-widest text-gray-400">
           {secs === 1 ? "Second" : "Seconds"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplayView;
