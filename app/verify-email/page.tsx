"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      // Defer state update to avoid synchronous setState
      setTimeout(() => setStatus("error"), 0);
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (!res.ok) {
          setStatus("error");
          return;
        }

        setStatus("success");

        // redirect after 2s
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch {
        setStatus("error");
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">

        {status === "loading" && (
          <>
            <h1 className="text-2xl font-semibold mb-4">
              Verifying your email…
            </h1>
            <p className="text-neutral-500 text-sm">
              Please wait a moment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-semibold mb-4">
              Email verified 🎉
            </h1>
            <p className="text-neutral-500 text-sm">
              Redirecting you to your dashboard…
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-semibold mb-4 text-red-600">
              Verification failed
            </h1>
            <p className="text-neutral-500 text-sm">
              This link may be expired or invalid.
            </p>
          </>
        )}
      </div>
    </div>
  );
}