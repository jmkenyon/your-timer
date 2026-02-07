import TimerDisplayView from "@/app/views/TimerDisplayView";
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

  const ownerUserId = session.user.id 

  return (
    <TimerDisplayView ownerUserId={ownerUserId}/>
  )
};

export default page;
