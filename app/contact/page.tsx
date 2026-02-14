// app/contact/page.tsx

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Contact — YourTimer",
  description: "Get in touch with YourTimer support",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-neutral-950">Get in touch</h1>
          <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
            YourTimer is built and supported by a solo developer. No ticket
            queues, no chatbots — just a real person who reads every message.
          </p>

          <div className="mt-12 space-y-8">
            {/* Email */}
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-950">
                    Email
                  </h2>
                  <p className="mt-1 text-neutral-600">
                    Best way to reach me. I reply within 24 hours on weekdays.
                  </p>
                  <a
                    href="mailto:support@yourtimer.io"
                    className="mt-3 inline-block text-orange-600 font-medium hover:underline"
                  >
                    support@yourtimer.io
                  </a>
                </div>
              </div>
            </div>

            {/* Bug reports */}
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <div className="flex items-start gap-4">
                <div className="text-2xl">🐛</div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-950">
                    Bug reports
                  </h2>
                  <p className="mt-1 text-neutral-600">
                    Timer not displaying correctly? Something broken? Email me
                    with a screenshot or your site URL and I&apos;ll look into
                    it immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature requests */}
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <div className="flex items-start gap-4">
                <div className="text-2xl">💡</div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-950">
                    Feature requests
                  </h2>
                  <p className="mt-1 text-neutral-600">
                    Want something YourTimer doesn&apos;t do yet? I build
                    features based on what users actually ask for. Every
                    suggestion gets read.
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <div className="flex items-start gap-4">
                <div className="text-2xl">𝕏</div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-950">
                    Follow the journey
                  </h2>
                  <p className="mt-1 text-neutral-600">
                    I share build updates, revenue numbers, and lessons
                    publicly.
                  </p>
                  <div className="mt-3 flex gap-4">
                    <Link
                      href="https://x.com/joshmkenyon"
                      className="text-orange-600 font-medium hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      X / Twitter →
                    </Link>

                    <Link
                      href="https://joshmkenyon.substack.com/"
                      className="text-orange-600 font-medium hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Substack →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-100">
            <p className="text-sm text-neutral-500">
              Response time: typically under 24 hours on weekdays. If it&apos;s
              urgent and your site is broken, put &quot;URGENT&quot; in the
              subject line and I&apos;ll prioritize it.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
