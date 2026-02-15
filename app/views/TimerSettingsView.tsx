"use client";

import { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";
import CreateTimerDialog from "../components/CreateTimerDialog";
import { Button } from "@/components/ui/button";
import {
  EditIcon,
  Pin,
  PlayCircle,
  StopCircle,
  TimerOff,
  Trash2,
} from "lucide-react";
import EditTimerDialog from "../components/EditTimerDialog";
import { Timer } from "../types/types";
import DeleteTimerDialog from "../components/DeleteTimerDialog";
import { cn, generateTenantURL } from "@/lib/utils";
import Link from "next/link";
import EmbedCode from "../components/EmbedCode";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TimerSettingsViewProps {
  ownerUserId: string;
}

const TimerSettingsView = ({ ownerUserId }: TimerSettingsViewProps) => {
  const [companyId, setCompanyId] = useState<string>("");
  const [companySlug, setCompanySlug] = useState<string>("");

  const [timers, setTimers] = useState<Timer[]>([]);
  const [plan, setPlan] = useState<string>("free");

  const handleStartStop = async (
    timerId: number,
    currentStatus: string,
    is_public: boolean
  ) => {
    if (is_public && currentStatus === "running") {
      toast.error(
        "Cannot stop a timer that is currently public. Please unpin it first."
      );
      return;
    }

    const newStatus = currentStatus === "running" ? "stopped" : "running";

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${timerId}/${
          newStatus === "running" ? "start" : "stop"
        }`,
        { method: "PATCH" }
      );

      if (!response.ok) {
        toast.error(
          `Failed to ${newStatus === "running" ? "start" : "stop"} timer`
        );
        return;
      }

      toast.success(
        `Timer ${newStatus === "running" ? "started" : "stopped"}!`,
        newStatus === "running" ? { icon: "✅" } : { icon: "❌" }
      );

      fetchTimers(); // Refresh list
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const companyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/companies/by_ownerid/${ownerUserId}`
        );
        if (!companyResponse.ok) {
          toast.error("Failed to fetch company data.");
          return;
        }
        console.log(companyResponse)
        const companyData = await companyResponse.json();
        console.log(companyData)
        if (companyData.length === 0) {
          toast.error("No company found for the user.");
          return;
        }
        const companyId = companyData[0].id;
        const companySlug = companyData[0].slug;
        setCompanyId(companyId);
        setCompanySlug(companySlug);

        const companyPlan = companyData[0].plan || "free";
        setPlan(companyPlan);

        const timerResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${companyId}`
        );

        if (!timerResponse.ok) {
          toast.error("Failed to fetch timer data.");
          return;
        }
        const timerData = await timerResponse.json();

        setTimers(timerData);

        // Add this separate useEffect to see the updated state:
      } catch {
        toast.error("Failed to fetch company data.");
        return;
      }
    };
    getInfo();
  }, [ownerUserId]);

  const fetchTimers = useCallback(async () => {
    if (!companyId) return;
    const timerResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${companyId}`
    );
    if (!timerResponse.ok) {
      toast.error("Failed to fetch timer data.");
      return;
    }
    const timerData = await timerResponse.json();
    setTimers(timerData);
  }, [companyId]);

  const sortedTimers = [...timers].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Derive the limit
  const timerLimits: Record<string, number> = {
    free: 1,
    trial: 999,
    pro: 5,
    business: 999,
  };
  const maxTimers = timerLimits[plan] || 1;
  const timerCount = timers.length;

  const handlePin = async (timer: Timer) => {
    if (timer.is_public) {
      // If timer is currently public, confirm before unpinning
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${timer.id}/unpin`,
          { method: "PATCH" }
        );

        if (!response.ok) {
          toast.error("Failed to update timer visibility");
          return;
        }

        toast.success("Timer removed from public link!");
        fetchTimers();
        return;
      } catch {
        toast.error("Something went wrong");
        return;
      }
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${timer.id}/pin`,
        { method: "PATCH" }
      );

      if (!response.ok) {
        toast.error("Failed to update timer visibility");
        return;
      }

      toast.success("Timer set on public link!");
      fetchTimers();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-5xl flex flex-col xl:p-0 p-5 pt-10">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <CreateTimerDialog
            companyId={companyId}
            onTimerCreated={fetchTimers}
            disabled={timerCount >= maxTimers}
          />
          {maxTimers < 999 && (
            <span className="text-sm text-slate-500">
              {timerCount}/{maxTimers} timers
            </span>
          )}
        </div>
        {timers.filter((timer) => timer.is_public).length > 0 ? (
        <Button asChild>
          <Link
            href={generateTenantURL(companySlug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Public Timer
          </Link>
        </Button>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button disabled variant="outline" size="sm">
                  View Public Timer
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                No timers are currently public. Pin a timer to show it on the
                public page.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
        }
      </div>
      <h2 className="mb-6 text-xl font-semibold text-slate-900 mt-10">
        Your Timers
      </h2>

      {sortedTimers.length === 0 ? (
        <p className="text-sm text-slate-500">No timers created yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTimers.map((timer) => (
            <div
              key={timer.id}
              className={cn(
                "rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              )}
            >
              <div className="space-y-3">
                <div className="flex flex-row justify-between align-center">
                  <h3 className="truncate text-lg font-medium text-slate-900">
                    {timer.name}
                  </h3>
                  <div
                    className={cn(
                      "h-2.5 w-2.5 rounded-full ",
                      timer.status === "running" ? "bg-green-600" : "bg-red-600"
                    )}
                  />
                </div>

                <div className="text-sm text-slate-500">
                  {new Date(timer.target_datetime) < new Date()
                    ? "Expired at"
                    : "Ends"}{" "}
                  <br />
                  {new Date(timer.target_datetime).toLocaleString()}
                </div>
               <EmbedCode timerId={timer.id} status={timer.status as "running" | "stopped"}/>

                <div className="pt-2" />
                <div className="flex flex-row justify-between">
                  <EditTimerDialog
                    timerId={timer.id.toString()}
                    onTimerCreated={fetchTimers}
                    companyId={companyId}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                          >
                            <EditIcon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>

                        <TooltipContent>Edit timer</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </EditTimerDialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePin(timer)}
                          className="h-8 w-8 rounded-lg cursor-pointer"
                          title="Show on public link"
                        >
                          <Pin
                            className={cn(
                              "h-4 w-4",
                              timer.is_public
                                ? "text-orange-600 fill-orange-600"
                                : "text-slate-400"
                            )}
                          />
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent>
                        {timer.is_public
                          ? "Remove from public page"
                          : "Show on public page"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStartStop(
                              timer.id,
                              timer.status,
                              timer.is_public
                            )
                          }
                          className="h-8 w-8 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer bg-white"
                          disabled={
                            new Date(timer.target_datetime) < new Date()
                          }
                        >
                          {new Date(timer.target_datetime) > new Date() ? (
                            // NOT expired - show start/stop
                            timer.status === "running" ? (
                              <StopCircle size={16} />
                            ) : (
                              <PlayCircle size={16} />
                            )
                          ) : (
                            // Expired - show disabled icon
                            <TimerOff size={16} />
                          )}
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent>
                        {new Date(timer.target_datetime) > new Date()
                          ? timer.status === "running"
                            ? "Stop timer"
                            : "Start timer"
                          : "Timer expired"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DeleteTimerDialog
                    timerId={timer.id.toString()}
                    onTimerCreated={fetchTimers}
                    companyId={companyId}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete timer</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DeleteTimerDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimerSettingsView;
