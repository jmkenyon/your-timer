"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

interface DatePickerTimeProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export function DatePickerTime({ value, onChange }: DatePickerTimeProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [time, setTime] = React.useState<string>("10:30:00");

  React.useEffect(() => {
    if (!value) return;
  
    const dateObj = typeof value === "string" ? new Date(value) : value;
  
    setDate(dateObj);
  
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");
  
    setTime(`${hours}:${minutes}:${seconds}`);
  }, [value]);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);

    // Combine date + time into single Date object
    if (newDate && time) {
      const [hours, minutes, seconds] = time.split(":");
      const combined = new Date(newDate);
      combined.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
      onChange?.(combined);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);

    // Combine date + time
    if (date && newTime) {
      const [hours, minutes, seconds] = newTime.split(":");
      const combined = new Date(date);
      combined.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
      onChange?.(combined);
    }
  };

  return (
    <FieldGroup className="mx-auto max-w-xs flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-32 justify-between font-normal"
            >
              {date ? format(date, "PPP") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32 ">
        <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          value={time}
          onChange={handleTimeChange}
          className="bg-background appearance-none border-black"
        />
      </Field>
    </FieldGroup>
  );
}
