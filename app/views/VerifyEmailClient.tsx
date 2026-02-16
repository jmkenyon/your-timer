"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setTimeout(() => {
        setStatus("error");
      }, 0);
      return;
    }

    router.push(`/api/auth/verify-email?token=${token}&callbackURL=/dashboard`);
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "loading" && <p>Verifying your email…</p>}
      {status === "error" && <p>Invalid or expired link.</p>}
    </div>
  );
}