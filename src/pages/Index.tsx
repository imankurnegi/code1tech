import HeroSection from "@/components/HeroSection";
import GrowthStrategies from "@/components/GrowthStrategies";

import EngineeringServices from "@/components/EngineeringServices";
import AIAcceleratorsSection from "@/components/AIAcceleratorsSection";
import EnterpriseTechSection from "@/components/EnterpriseTechSection";
import TechnologyServicesPanel from "@/components/TechnologyServicesPanel";
import TechnologyStackSection from "@/components/TechnologyStackSection";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import WorkWithUs from "@/components/WorkWithUs";
import HiringProcess from "@/components/HiringProcess";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import RelatedBlogs from "@/components/RelatedBlogs";
import ContactSection from "@/components/ContactSection";
import { useQuery } from "@tanstack/react-query";
import SeoTags from "@/components/SeoTags";
import { api } from "@/api";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const [homeData, clientLogos] = await Promise.all([
      api.getHomeData(),
      api.getClientLogos(),
    ]);

    return {
      homeData,
      clientLogos,
    };
  } catch (error) {
    console.error("Failed to load home page SSG data", error);
    return {
      homeData: null,
      clientLogos: { data: [] },
    };
  }
}

const Index = () => {
  const loaderData = useLoaderData() as any;

  // const { isError, error } = useQuery({
  //   queryKey: ["homepage"],
  //   queryFn: async () => {
  //      await Promise.all([
  //       api.getHomeData(),
  //       api.getClientLogos(),
  //     ]);
  //   },
  //   initialData: loaderData,
  //   staleTime: Infinity,
  //   refetchOnMount: false,
  // });

  // if (isError) return <div>{error.message}</div>;

  const homepageData = loaderData?.homeData?.homepage;
  const caseStudiesData = homepageData?.homeData?.caseStudies;
  const clientLogosData = loaderData?.clientLogos?.data ?? [];

  return (
    <>
      <SeoTags
        title={homepageData?.data?.home_page_banner?.banner_main_heading}
        description={homepageData?.data?.home_page_banner?.banner_paragraph}
        ogImage="https://lovable.dev/opengraph-image-p98pqg.png"
      />
        {/* {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            
          </>
        )} */}
        <HeroSection dataBanner={homepageData?.data?.home_page_banner} dataClientLogo={clientLogosData} />
        <EnterpriseTechSection dataTrusted={homepageData?.data?.trusted_section} />

        <GrowthStrategies dataGrowth={homepageData?.data?.two_growth_section} />
        <EngineeringServices dataEngineering={homepageData?.data?.engineering_solution_section} />

        <AIAcceleratorsSection dataAiAgent={homepageData?.data?.ai_agent_section} />
        <TechnologyServicesPanel dataSmartTechnology={homepageData?.data?.smart_technology_section} />
        <TechnologyStackSection dataCapabilities={homepageData?.data?.our_capabilities_section} />
        <IndustriesWeServe dataIndustries={homepageData?.data?.industries_we_section} />
        <CaseStudiesSection dataCaseStudies={caseStudiesData} />
        <WorkWithUs dataWorkWithUs={homepageData?.data?.work_with_us_section} />
        <HiringProcess dataHiring={homepageData?.data?.simple_transparent_hiring_section} />
        <WhyChooseUs dataWhyBusinesses={homepageData?.data?.why_businesses_section} />
        <TestimonialsSection dataTestimonials={homepageData?.data?.testimonial_section} />
        <RelatedBlogs />
        <ContactSection dataContact={homepageData?.data?.contact_form_fields} />
      
    </>
  )
};

export default Index;
