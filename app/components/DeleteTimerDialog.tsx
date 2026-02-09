"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Timer } from "../types/types";
import Loading from "@/loading";

interface DeleteTimerDialogProps {
  timerId: string;
  companyId: string;
  onTimerCreated: () => void;
  children: React.ReactNode;
}

const DeleteTimerDialog = ({
  timerId,
  companyId,
  onTimerCreated,
  children,
}: DeleteTimerDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer | null>(null);

  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const timerCompanyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${companyId}`
        );
        if (!timerCompanyResponse.ok) {
          toast.error("Failed to fetch timer data.");
          return;
        }
        const timerCompanyData = await timerCompanyResponse.json();
        const timerData = timerCompanyData.find(
          (timer: Timer) => timer.id === parseInt(timerId)
        );
        if (!timerData) {
          toast.error("Timer not found.");
          return;
        }
        setTimer(timerData);
      } catch {
        toast.error("Failed to fetch timer data.");
      }
    };
    fetchTimer();
  }, [companyId, timerId]);

  const handleDelete = async (timerId: number) => {
    if (!companyId) {
      toast.error("Company ID is not available.");
      return;
    }

    if (!timerId) {
      toast.error("Timer ID is not available.");
      return;
    }

    setIsLoading(true);
    try {
      const timerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${timerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: timerId,
          }),
        }
      );

      if (!timerResponse.ok) {
        toast.error("Failed to delete timer.");
        return;
      }
      toast.success("Timer deleted successfully!");
      onTimerCreated();
    } catch {
      toast.error("Failed to delete timer.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        {!timer ? (
          <Loading />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Delete Timer</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this timer? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(timer.id)}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-500 cursor-pointer"
              >
                Delete
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTimerDialog;
