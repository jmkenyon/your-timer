
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });



  if (!session) {
    // If there is no session, redirect to the login page
    redirect("/login");
  }

  return <div>page</div>;
};

export default DashboardPage;
