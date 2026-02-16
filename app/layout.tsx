import type { Metadata } from "next";

import "./globals.css";
import { ToastProvider } from "@/providers/ToastProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourtimer.io"),

  title: {
    default: "YourTimer.io – High-Converting Countdown Timers for E-commerce",
    template: "%s | YourTimer.io",
  },

  description:
    "Boost urgency and increase conversions with high-performance countdown timers. Built for Shopify and modern e-commerce stores. No-code install. Custom branding. Fast embed.",

  keywords: [
    "countdown timer",
    "shopify countdown timer",
    "ecommerce urgency timer",
    "conversion rate optimization",
    "scarcity marketing",
    "sales countdown widget",
    "product launch timer",
    "embedded countdown script",
    "shopify apps",
    "increase conversions",
  ],

  authors: [{ name: "YourTimer.io" }],
  creator: "YourTimer.io",
  publisher: "YourTimer.io",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://yourtimer.io",
    title:
      "Increase E-commerce Conversions with Smart Countdown Timers",
    description:
      "Launch products, run flash sales, and drive urgency with customizable, high-performance countdown timers built for Shopify and modern stores.",
    siteName: "YourTimer.io",
    images: [
      {
        url: "/og-image.png", // create a strong branded OG image
        width: 1200,
        height: 630,
        alt: "YourTimer.io – Countdown Timers for E-commerce",
      },
    ],
    locale: "en_GB",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Smart Countdown Timers for Shopify & E-commerce",
    description:
      "Drive urgency. Increase conversions. Launch faster. No-code install.",
    images: ["/logo.png"],
    creator: "@yourtimer", // change if you create X account
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "technology",
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
