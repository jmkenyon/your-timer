"use client";

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Timer } from "../types/types";

interface EditTimerDialogProps {
  timerId: string;
  companyId: string;
  onTimerCreated: () => void;
  children: React.ReactNode;
}

const TIMER_PRESETS = [
  {
    name: "Midnight",
    bgColor: "#111111",
    textColor: "#ffffff",
    accentColor: "#ea580c",
  },
  {
    name: "Ocean",
    bgColor: "#0f172a",
    textColor: "#e2e8f0",
    accentColor: "#38bdf8",
  },
  {
    name: "Forest",
    bgColor: "#14532d",
    textColor: "#dcfce7",
    accentColor: "#4ade80",
  },
  {
    name: "Sunset",
    bgColor: "#431407",
    textColor: "#fed7aa",
    accentColor: "#fb923c",
  },
  {
    name: "Minimal",
    bgColor: "#ffffff",
    textColor: "#1e293b",
    accentColor: "#6366f1",
  },
  {
    name: "Neon",
    bgColor: "#0a0a0a",
    textColor: "#f0abfc",
    accentColor: "#e879f9",
  },
];

const EditTimerDialog = ({
  timerId,
  companyId,
  onTimerCreated,
  children,
}: EditTimerDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showFade, setShowFade] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
  
    const handleScroll = () => {
      const isAtBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight <= 2;
  
      setShowFade(!isAtBottom);
    };
  
    el.addEventListener("scroll", handleScroll);
    handleScroll();
  
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!companyId || !timerId) return;
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

  const { register, handleSubmit, control, reset, setValue } =
    useForm<FieldValues>({
      defaultValues: {
        name: "",
        companyId: "",
        targetDateTime: null,
        bgColor: "#111111",
        textColor: "#ffffff",
        accentColor: "#ea580c",
        position: "inline",
        onCompleteAction: "message",
        onCompleteValue: "Time's up!",
      },
    });

  useEffect(() => {
    if (!timer) return;

    reset({
      name: timer.name,
      targetDateTime: new Date(timer.target_datetime),
      bgColor: timer.style?.bgColor || "#111111",
      textColor: timer.style?.textColor || "#ffffff",
      accentColor: timer.style?.accentColor || "#ea580c",
      position: timer.style?.position || "inline",
      onCompleteAction: timer.on_complete?.action || "message",
      onCompleteValue: timer.on_complete?.value || "Time's up!",
    });
  }, [timer, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const {
      name,
      targetDateTime,
      bgColor,
      textColor,
      accentColor,
      position,
      onCompleteAction,
      onCompleteValue,
    } = data;

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
            style: { bgColor, textColor, accentColor, position },
            on_complete: { action: onCompleteAction, value: onCompleteValue },
          }),
        }
      );

      if (!timerResponse.ok) {
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>{children}</DialogTrigger>
          </TooltipTrigger>

          <TooltipContent>Edit timer</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-sm max-h-[90vh] h-[90vh] flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          {" "}
          <DialogHeader className="shrink-0">
            <DialogTitle>Edit Timer</DialogTitle>
            <DialogDescription>Update your countdown</DialogDescription>
          </DialogHeader>
          <div className="relative flex-1 min-h-0">
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 pt-4 pb-12"
            >
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

                {/* Presets — above the color pickers */}
                <div className="pt-2 border-t border-slate-100">
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">
                    Theme
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {TIMER_PRESETS.map((preset) => (
                      <Button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setValue("bgColor", preset.bgColor);
                          setValue("textColor", preset.textColor);
                          setValue("accentColor", preset.accentColor);
                        }}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-left hover:border-slate-400 transition-colors"
                      >
                        <div
                          className="h-6 w-6 rounded-full shrink-0 border border-slate-200"
                          style={{
                            background: `linear-gradient(135deg, ${preset.bgColor} 50%, ${preset.accentColor} 50%)`,
                          }}
                        />
                        <span className="text-xs text-slate-700">
                          {preset.name}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Then your existing color pickers below with label "Custom colors" */}

                {/* Styling */}
                <div className="pt-2 border-t border-slate-100">
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">
                    Appearance
                  </Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <Field>
                      <Label htmlFor="bgColor" className="text-xs">
                        Background
                      </Label>
                      <Input
                        id="bgColor"
                        type="color"
                        {...register("bgColor")}
                        className="h-10 p-1 cursor-pointer"
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="textColor" className="text-xs">
                        Text
                      </Label>
                      <Input
                        id="textColor"
                        type="color"
                        {...register("textColor")}
                        className="h-10 p-1 cursor-pointer"
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="accentColor" className="text-xs">
                        Accent
                      </Label>
                      <Input
                        id="accentColor"
                        type="color"
                        {...register("accentColor")}
                        className="h-10 p-1 cursor-pointer"
                      />
                    </Field>
                  </div>
                </div>

                {/* Position */}
                <Field>
                  <Label htmlFor="position" className="text-xs">
                    Position
                  </Label>
                  <select
                    id="position"
                    {...register("position")}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  >
                    <option value="inline">
                      Inline (where code is placed)
                    </option>
                    <option value="top-bar">Fixed bar — top of page</option>
                    <option value="bottom-bar">
                      Fixed bar — bottom of page
                    </option>
                  </select>
                </Field>

                {/* On complete */}
                <div className="pt-2 border-t border-slate-100">
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">
                    When timer ends
                  </Label>
                  <Field className="mt-2">
                    <select
                      {...register("onCompleteAction")}
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                    >
                      <option value="message">Show a message</option>
                      <option value="redirect">Redirect to URL</option>
                      <option value="hide">Hide the timer</option>
                    </select>
                  </Field>
                  {/* Only show value input for message and redirect */}
                  <Controller
                    name="onCompleteAction"
                    control={control}
                    render={({ field: actionField }) =>
                      actionField.value !== "hide" ? (
                        <Field className="mt-2">
                          <Input
                            {...register("onCompleteValue")}
                            placeholder={
                              actionField.value === "redirect"
                                ? "https://yoursite.com/sale-ended"
                                : "Time's up!"
                            }
                          />
                        </Field>
                      ) : (
                        <></>
                      )
                    }
                  />
                </div>
              </FieldGroup>
            </div>

            {/* Fade is OUTSIDE the scroll div, INSIDE the relative wrapper */}
            {showFade && (
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent transition-opacity duration-200" />
            )}
          </div>
          <DialogFooter className="shrink-0 mt-4">
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
