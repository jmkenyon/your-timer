"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { DatePickerTime } from "../components/DateTimePicker";
import { Button } from "@/components/ui/button";

interface TimerSettingsViewProps {
  ownerUserId: string;
}

const TimerSettingsView = ({ ownerUserId }: TimerSettingsViewProps) => {
  const [companyId, setCompanyId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FieldValues>({
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
    } catch {
      toast.error("Failed to create timer.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const companyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/companies/by_ownerid/${ownerUserId}`
        );
        if (!companyResponse.ok) {
          toast.error("Failed to fetch company data.");
          return;
        }
        const companyData = await companyResponse.json();
        const companyId = companyData[0].id;
        setCompanyId(companyId);
      } catch {
        toast.error("Failed to fetch company data.");
        return;
      }
    };
    getCompanyInfo();
  }, [ownerUserId]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center ">
      <div className="w-full max-w-md space-y-8 rounded-2xl  bg-white p-8  border shadow-2xl">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-semibold text-slate-900">
            Create Timer
          </h1>
          <p className="text-sm text-slate-500">Set up your countdown</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Timer Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Product Launch"
                      className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 ">
                    Countdown End Time
                  </FormLabel>
                  <FormControl>
                    <DatePickerTime
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
            >
              {isLoading ? "Creating timer..." : "Create Timer"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TimerSettingsView;
