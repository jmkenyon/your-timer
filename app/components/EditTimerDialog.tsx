"use client";

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { DatePickerTime } from "../components/DateTimePicker";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Timer } from "../types/types";

interface EditTimerDialogProps {
  timerId: string;
  companyId: string;
  onTimerCreated: () => void;
  children: React.ReactNode;
}

const EditTimerDialog = ({
  timerId,
  companyId,
  onTimerCreated,
  children,
}: EditTimerDialogProps) => {
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

  const { register, handleSubmit, control, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      companyId: "",
      targetDateTime: null,
    },
  });

  useEffect(() => {
    if (!timer) return;

    reset({
      name: timer.name,
      targetDateTime: new Date(timer.target_datetime),
    });
  }, [timer, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { name, targetDateTime } = data;



    if (!companyId) {
      toast.error("Company ID is not available.");
      return;
    }

    if (!timerId) {
      toast.error("Timer ID is not available.");
      return;
    }

    if (!targetDateTime) {
      toast.error("Please select a countdown end time.");
      return;
    }

    setIsLoading(true);
    try {
      const timerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/timers/${timerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            company_id: companyId,
            target_datetime: targetDateTime,
          }),
        }
      );

      if (!timerResponse.ok) {
        const errorData = await timerResponse.json();
        console.log("Error data:", errorData);
        toast.error("Failed to update timer.");
        return;
      }
      toast.success("Timer updated successfully!");
      onTimerCreated();
    } catch {
      toast.error("Failed to update timer.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Create Timer</DialogTitle>
            <DialogDescription>Set up your countdown</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Timer name</Label>
              <Input id="name-1" {...register("name")} />
            </Field>
            <Field>
              <Label>Countdown end</Label>
              <Controller
                name="targetDateTime"
                control={control}
                rules={{ required: "Countdown end time required" }}
                render={({ field }) => (
                  <DatePickerTime
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              Edit Timer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTimerDialog;
