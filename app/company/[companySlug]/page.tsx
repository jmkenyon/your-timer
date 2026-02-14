import TimerDisplayView from "@/app/views/TimerDisplayView";
import { notFound } from "next/navigation";

interface IParams {
  companySlug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companySlug: string }>;
}) {
  const resolvedParams = await params;

  // Fetch company data from your API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/companies/by_slug/${resolvedParams.companySlug}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return {
      title: "Timer not found | YourTimer.io",
      description: "Create countdown timers for your business",
    };
  }

  const company = await response.json();

  if (!company) {
    return {
      title: "YourTimer.io",
      description: "Create countdown timers for your business",
    };
  }



  return {
    title: `${company.name} - Countdown Timer | YourTimer.io`,
    description: `Live countdown timer for ${company.name}.`,
    openGraph: {
      title: `${company.name} Timer | YourTimer.io`,
      description: `Live countdown timer for ${company.name}`,
      type: "website",
    },
  };
}

const CompanyPage = async ({ params }: { params: Promise<IParams> }) => {
  const resolvedParams = await params;

  const companyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/companies/by_slug/${resolvedParams.companySlug}`
  );

  if (!companyResponse.ok) {
    notFound();
  }

  const companyData = await companyResponse.json();

  if (!companyData) {
    notFound();
  }

  const ownerUserId = companyData.owner_user_id;

  const showBranding = companyData.show_branding;

  if (!ownerUserId) {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen">
      <TimerDisplayView
        companyName={companyData.name}
        ownerUserId={ownerUserId}
        className="bg-black text-white"
        showBranding={showBranding}
      />
    </div>
  );
};

export default CompanyPage;
