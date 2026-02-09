import type { Metadata } from "next";

import "./globals.css";
import { ToastProvider } from "@/providers/ToastProvider";

export const metadata: Metadata = {
  title: "YourTimer.io - Business Countdown Timers",
  description: "Create professional countdown timers for your business. Track launches, goals, and milestones with custom branded timers.",
  openGraph: {
    title: "YourTimer.io - Business Countdown Timers",
    description: "Professional countdown timers for your business",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
