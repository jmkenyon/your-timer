
"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  return (
    <nav className="p-4 border-b border-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-semibold text-black cursor-pointer"
        >
          YourTimer.io
        </Link>

        <div className="flex flex-row gap-3">
          {session === null ? (
            <>
              <Button
                asChild
                variant="ghost"
                className=" text-white hover:text-white bg-black hover:bg-black/80 cursor-pointer"
              >
                <Link href="/login"> Login </Link>
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-500 text-white cursor-pointer"
                asChild
              >
                <Link href="/sign-up"> Sign Up </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className=" text-white hover:text-white bg-black hover:bg-black/80 cursor-pointer"
              >
                <Link href="/dashboard"> Dashboard </Link>
              </Button>

              <Button
                className="bg-orange-600 hover:bg-orange-500 text-white cursor-pointer"
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/login"); // redirect to login page
                      },
                    },
                  })
                }
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
