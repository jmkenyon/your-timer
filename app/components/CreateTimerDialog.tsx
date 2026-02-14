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
import { useState } from "react";
import toast from "react-hot-toast";



interface CreateTimerDialogProps {
  companyId: string;
  onTimerCreated: () => void;
  disabled: boolean
}

const CreateTimerDialog = ({ companyId, onTimerCreated,disabled }: CreateTimerDialogProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { register, handleSubmit, control, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      companyId: "",
      targetDateTime: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const { name, targetDateTime } = data;

    if (!companyId) {
      toast.error("Company ID is not available.");
      return;
    }

    if (!targetDateTime) {
      toast.error("Please select a countdown end time.");
      return;
    }
    setIsLoading(true);
    try {
      const timerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/timers`,
        {
          method: "POST",
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
        toast.error("Failed to create timer.");
        return;
      }

      toast.success("Timer created successfully!");
      reset()
      onTimerCreated()
      setOpen(false)
     
    } catch {
      toast.error("Failed to create timer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="max-w-40 cursor-pointer" disabled={disabled}>Create Timer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Create Timer</DialogTitle>
            <DialogDescription>Set up your countdown</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Timer name</Label>
              <Input
                id="name-1"
                {...register("name")}
               
              />
            </Field>
            <Field>
              <Label >Countdown end</Label>
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
            <Button type="submit"  className="cursor-pointer" disabled={isLoading}>
              Create Timer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTimerDialog;
