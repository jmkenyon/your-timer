import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Terms of Service — YourTimer",
  description: "Terms of Service for YourTimer.io",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-neutral-950">
            Terms of Service
          </h1>
          <p className="mt-2 text-neutral-500 text-sm">
            Last updated: February 2026
          </p>

          <div className="mt-10 space-y-8 text-neutral-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                1. Agreement
              </h2>
              <p className="mt-3">
                By using YourTimer.io, you agree to these Terms of Service. If
                you don&apos;t agree, please don&apos;t use the Service. These
                terms apply to all users, including free and paid accounts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                2. The Service
              </h2>
              <p className="mt-3">
                YourTimer provides embeddable countdown timers and shareable
                timer pages for websites, online stores, and marketing
                campaigns. We offer free and paid plans with different feature
                sets and usage limits.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                3. Accounts
              </h2>
              <p className="mt-3">
                You&apos;re responsible for maintaining the security of your
                account and password. YourTimer cannot and will not be liable
                for any loss or damage from your failure to maintain account
                security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                4. Payment and Billing
              </h2>
              <p className="mt-3">
                Paid plans are billed monthly or yearly through Stripe. You can
                cancel at any time — your access continues until the end of the
                current billing period. We don&apos;t offer refunds for partial
                billing periods, but if you&apos;re unhappy within the first 14
                days, email us and we&apos;ll sort it out.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                5. Acceptable Use
              </h2>
              <p className="mt-3">You agree not to use the Service to:</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Violate any laws or regulations
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Distribute malware or malicious code through timer embeds
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Create false urgency that constitutes fraud or deceptive
                  advertising
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  Abuse the Service infrastructure or attempt to circumvent
                  usage limits
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                6. Intellectual Property
              </h2>
              <p className="mt-3">
                You own your content (timer text, settings, branding). We own
                the Service, its design, and underlying code. The timer embeds
                may display &quot;Powered by YourTimer&quot; on free plans —
                this is removed on paid plans.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                7. Availability and Liability
              </h2>
              <p className="mt-3">
                We aim for high uptime but don&apos;t guarantee 100%
                availability. The Service is provided &quot;as is&quot; without
                warranties of any kind. YourTimer&apos;s total liability to you
                for any claims arising from use of the Service is limited to the
                amount you&apos;ve paid us in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                8. Termination
              </h2>
              <p className="mt-3">
                You can delete your account at any time. We may also terminate
                or suspend access if you violate these terms. On termination,
                your timers will stop displaying on your sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                9. Changes
              </h2>
              <p className="mt-3">
                We may update these terms from time to time. Significant changes
                will be communicated via email to registered users. Continued
                use of the Service after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                10. Contact
              </h2>
              <p className="mt-3">
                Questions about these terms? Email{" "}
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
