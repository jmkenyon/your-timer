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
    { cache: 'no-store' }
  );
  
  if (!response.ok) {
    return { 
      title: "Timer not found | YourTimer.io",
      description: "Create countdown timers for your business"
    };
  }

  const company = await response.json();

  if (!company) {
    return { 
      title: "YourTimer.io",
      description: "Create countdown timers for your business"
    };
  }

  return {
    title: `${company[0].name} - Countdown Timer | YourTimer.io`,
    description: `Live countdown timer for ${company[0].name}.`,
    openGraph: {
      title: `${company[0].name} Timer | YourTimer.io`,
      description: `Live countdown timer for ${company[0].name}`,
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


  const ownerUserId = companyData[0]?.owner_user_id;

  if (!ownerUserId) {
    notFound();
  }


  return <TimerDisplayView ownerUserId={ownerUserId} className="bg-black text-white"/>;
};

export default CompanyPage;
