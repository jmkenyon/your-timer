import TimerDisplayView from "@/app/views/TimerDisplayView";

interface IParams {
  companySlug: string;
}

const CompanyPage = async ({ params }: { params: Promise<IParams> }) => {
  const resolvedParams = await params;



  const companyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/companies/by_slug/${resolvedParams.companySlug}`
  );

  const companyData = await companyResponse.json();


  const ownerUserId = companyData[0]?.owner_user_id;


  return <TimerDisplayView ownerUserId={ownerUserId} className="bg-black text-white"/>;
};

export default CompanyPage;
