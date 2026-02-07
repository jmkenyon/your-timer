import TimerDisplayView from "@/app/views/TimerDisplayView";
import { notFound } from "next/navigation";

interface IParams {
  companySlug: string;
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
