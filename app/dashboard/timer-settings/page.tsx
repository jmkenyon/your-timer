import TimerSettingsView from "@/app/views/TimerSettingsView";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }



  return (
  <TimerSettingsView ownerUserId={session.user.id} />
  );
};

export default page;
