"use client";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { slugifyCompanyName } from "@/lib/slugify";

import { RegisterInput, registerSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";

import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

const SignupView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
    },
  });

  const companyName = useWatch({ control: form.control, name: "companyName" });
  const companySlug = companyName ? slugifyCompanyName(companyName) : "";
  const showPreview = companyName && !form.formState.errors.companyName;

  const onSubmit = async (payload: RegisterInput) => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email(
        {
          email: payload.email,
          password: payload.password,
          name: payload.companyName,

        });
      if (error) {
        toast.error(error.message ?? "Something went wrong. Please try again.");
        return;
      }
      if (data) {
        // call fast api and redirect to dashboard
        toast.success(
          "Account created."
        );
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col p-6 lg:p-16 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              YourTimer.io
            </Link>
            <Link href="/login" className="text-sm underline">
              Log in
            </Link>
          </div>

          {/* Hero copy */}
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold">
              Create account
              <br />
              Get your own timer landing page.
            </h1>
          </div>

          {/* Gym name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription
                  className={cn("hidden", showPreview && "block")}
                >
                  Your public timer will be available at:
                  <strong className="ml-1">{companySlug}.yourtimer.io</strong>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black"
                    >
                      {showPassword ? (
                        /* eye-off */
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.3 21.3 0 0 1 5.06-6.94" />
                          <path d="M1 1l22 22" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.3 21.3 0 0 1-5.06 6.94" />
                        </svg>
                      ) : (
                        /* eye */
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CTA */}
          <Button
            disabled={isLoading}
            type="submit"
            size="lg"
            className="bg-orange-600 text-white hover:bg-orange-600/80 cursor-pointer"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default SignupView;
