"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import CreateTimerDialog from "../components/CreateTimerDialog";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash2 } from "lucide-react";
import EditTimerDialog from "../components/EditTimerDialog";
import { Timer } from "../types/types";
import DeleteTimerDialog from "../components/DeleteTimerDialog";

interface TimerSettingsViewProps {
  ownerUserId: string;
}

const TimerSettingsView = ({ ownerUserId }: TimerSettingsViewProps) => {
  const [companyId, setCompanyId] = useState<string>("");

  const [timers, setTimers] = useState<Timer[]>([]);

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
        const companyData = await companyResponse.json();
        if (companyData.length === 0) {
          toast.error("No company found for the user.");
          return;
        }
        const companyId = companyData[0].id;
        setCompanyId(companyId);

        const timerResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${companyId}`
        );
        const timerData = await timerResponse.json();
        if (timerData.length > 0) {
          setTimers(timerData);
        }

        // Add this separate useEffect to see the updated state:
      } catch {
        toast.error("Failed to fetch company data.");
        return;
      }
    };
    getInfo();
  }, [ownerUserId]);

  const fetchTimers = async () => {
    const timerResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${companyId}`
    );
    if (!timerResponse.ok) {
      toast.error("Failed to fetch timer data.");
      return;
    }
    const timerData = await timerResponse.json();
    setTimers(timerData);
  };

  const reversedTimers = [...timers].reverse();

  return (
    <div className="w-full max-w-5xl flex flex-col xl:p-0 p-5 pt-10">
      <CreateTimerDialog companyId={companyId} onTimerCreated={fetchTimers} />
      <h2 className="mb-6 text-xl font-semibold text-slate-900 mt-10">
        Your Timers
      </h2>

      {reversedTimers.length === 0 ? (
        <p className="text-sm text-slate-500">No timers created yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reversedTimers.map((timer) => (
            <div
              key={timer.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="space-y-3">
                <h3 className="truncate text-lg font-medium text-slate-900">
                  {timer.name}
                </h3>

                <div className="text-sm text-slate-500">
                  Ends
                  <br />
                  {new Date(timer.target_datetime).toLocaleString()}
                </div>

                <div className="pt-2">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {timer.status}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <EditTimerDialog
                    timerId={timer.id.toString()}
                    onTimerCreated={fetchTimers}
                    companyId={companyId}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                  </EditTimerDialog>
                  <DeleteTimerDialog
                    timerId={timer.id.toString()}
                    onTimerCreated={fetchTimers}
                    companyId={companyId}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
