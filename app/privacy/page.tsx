// app/privacy/page.tsx


import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Privacy Policy — YourTimer",
  description: "Privacy Policy for YourTimer.io",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-neutral-950">
            Privacy Policy
          </h1>
          <p className="mt-2 text-neutral-500 text-sm">
            Last updated: February 2026
          </p>

          <div className="mt-10 space-y-8 text-neutral-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                The short version
              </h2>
              <p className="mt-3">
                We collect the minimum data needed to run the service. We don&apos;t
                sell your data. We don&apos;t run ads. We use cookies only for
                authentication and timer functionality (evergreen timers). 
                That&apos;s it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                1. What We Collect
              </h2>

              <h3 className="mt-4 font-semibold text-neutral-900">
                From you (account holders):
              </h3>
              <ul className="mt-2 space-y-1 ml-4">
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Email address (for account and billing)
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Payment information (processed securely by Stripe — we never
                  see or store your card details)
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Timer content and settings you create
                </li>
              </ul>

              <h3 className="mt-4 font-semibold text-neutral-900">
                From visitors who see your timers:
              </h3>
              <ul className="mt-2 space-y-1 ml-4">
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Anonymous page view counts (to track timer impressions)
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  A cookie for evergreen timers only (to maintain a visitor&apos;s
                  personal countdown — no tracking across sites)
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Country-level location data if geo-targeting is enabled (derived
                  from IP, not stored)
                </li>
              </ul>

              <p className="mt-3">
                We do <strong>not</strong> collect names, browsing history,
                device fingerprints, or any personally identifiable information
                from timer viewers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                2. How We Use Your Data
              </h2>
              <ul className="mt-3 space-y-1 ml-4">
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  To provide and improve the Service
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  To process payments
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  To send transactional emails (welcome, billing, important
                  updates)
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  To display anonymous usage metrics in your dashboard
                </li>
              </ul>
              <p className="mt-3">
                We will never sell, rent, or share your personal data with third
                parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                3. Third-Party Services
              </h2>
              <p className="mt-3">We use the following services:</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  <strong>Stripe</strong> — payment processing
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  <strong>Vercel</strong> — hosting
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  <strong>Cloudflare</strong> — CDN and security
                </li>
              </ul>
              <p className="mt-3">
                Each of these services has their own privacy policy. We select
                providers that meet high standards for data protection.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                4. Cookies
              </h2>
              <p className="mt-3">We use cookies for:</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  <strong>Authentication</strong> — keeping you logged in
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  <strong>Evergreen timers</strong> — storing a visitor&apos;s
                  personal countdown so it persists across page loads (only when
                  this feature is enabled by the timer owner)
                </li>
              </ul>
              <p className="mt-3">
                We do not use cookies for advertising or cross-site tracking.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                5. Data Retention
              </h2>
              <p className="mt-3">
                Account data is retained while your account is active. If you
                delete your account, we remove your personal data within 30
                days. Anonymous, aggregated analytics data may be retained
                indefinitely.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                6. Your Rights
              </h2>
              <p className="mt-3">You can:</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Export your data at any time
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Delete your account and all associated data
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Request a copy of all data we hold about you
                </li>
              </ul>
              <p className="mt-3">
                Email{" "}
                <a
                  href="mailto:support@yourtimer.io"
                  className="text-orange-600 hover:underline"
                >
                  support@yourtimer.io
                </a>{" "}
                for any data requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                7. Changes
              </h2>
              <p className="mt-3">
                We may update this policy as the Service evolves. Significant
                changes will be communicated via email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                8. Contact
              </h2>
              <p className="mt-3">
                Privacy questions? Email{" "}
                <a
                  href="mailto:support@yourtimer.io"
                  className="text-orange-600 hover:underline"
                >
                  support@yourtimer.io
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
