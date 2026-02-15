import BillingPanel from "@/app/views/BillingView";
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

  const userId = session.user.id;
  const userEmail = session.user.email;

  const companyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/companies/by_ownerid/${userId}`
  );

  if (!companyResponse.ok) {
    throw new Error("Failed to fetch company data");
  }

  const companyData = await companyResponse.json();

  if (!companyData || companyData.length === 0) {
    throw new Error("Company not found");
  }
  
  const company = companyData[0];

  return (
    <BillingPanel
      userId={userId}
      userEmail={userEmail}
      currentPlan={company.plan}
      trialEndsAt={company.trial_ends_at}
    />
  );
};

export default page;
