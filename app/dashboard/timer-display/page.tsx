import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";


const page = async () => {
  const { data: session } = await authClient.getSession();

  if (!session) {
    // If there is no session, redirect to the login page
    redirect("/login");
  }
};

export default page;
