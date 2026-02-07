"use client";

import { cn } from "@/lib/utils";
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

  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const companyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/companies/by_ownerid/${ownerUserId}`
        );
        const companyData = await companyResponse.json();

        if (companyData.length === 0) {
          toast.error("No company found for the user.");
          return;
        }

        const companyId = companyData[0].id;

        const timerResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${companyId}`
        );
        const timerData = await timerResponse.json();
        if (timerData.length === 0) {
          toast.error("No timer found for the company.");
          return;
        }
        setTimer(timerData[0]);
      } catch {
        toast.error("Failed to fetch timer data.");
      }
    };
    fetchTimer();
  }, [ownerUserId]);

  useEffect(() => {
    if (!timer) return;

    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(timer.target_datetime);
      const secondsLeft = Math.max(
        0,
        Math.floor((target.getTime() - now.getTime()) / 1000)
      );

      setTimeRemaining(secondsLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen min-w-full items-center pt-60",
        className
      )}
    >
      <p className="absolute top-5 left-5 text-white">YourTimer.io</p>
      <h1 className="text-3xl pb-20">{timer?.name}</h1>
      <p className="text-9xl"> {formatTime(timeRemaining)}</p>
    </div>
  );
};

export default TimerDisplayView;
