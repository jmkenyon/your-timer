import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="flex flex-col min-h-[calc(100vh-73px)] justify-center items-center px-4">
        <div className="text-center space-y-6 max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold text-black">
            YourTimer.io
          </h1>
          <p className="text-xl text-muted-foreground">
            Create a timer and get a custom link found at{" "}
            <span className="text-neutral-950">yourcompany.yourtimer.io</span>
          </p>
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="bg-orange-600 hover:bg-orange-500 text-white text-lg px-8 cursor-pointer"
            >
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
