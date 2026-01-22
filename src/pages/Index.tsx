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


const Index = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["homepage"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/homepage`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch homepage data");
      }

      const homepage = await res.json();

      return { homepage };
    },
  });

  const { data: caseStudiesData, isLoading: caseStudiesLoading } = useQuery({
    queryKey: ["caseStudies"],
    queryFn: async () => {
      const res = await fetch(`https://code1tech.page.gd/wp-json/theme/v1/case-studies`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch case studies data");
      }

      return await res.json();
    },
  });

  const homepageData = data?.homepage;

  if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error.message}</div>;

  return (
    <div className="min-h-screen bg-background">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <HeroSection dataBanner={homepageData?.data?.home_page_banner} dataClientLogo={homepageData?.data?.home_client_logo_section} />
          <EnterpriseTechSection dataTrusted={homepageData?.data?.trusted_section} />

          <GrowthStrategies dataGrowth={homepageData?.data?.two_growth_section} />
          <EngineeringServices dataEngineering={homepageData?.data?.engineering_solution_section} />

          <AIAcceleratorsSection dataAiAgent={homepageData?.data?.ai_agent_section} />
          <TechnologyServicesPanel dataSmartTechnology={homepageData?.data?.smart_technology_section} />
          <TechnologyStackSection />
          <IndustriesWeServe dataIndustries={homepageData?.data?.industries_we_section} />
          <CaseStudiesSection dataCaseStudies={caseStudiesData} />
          <WorkWithUs dataWorkWithUs={homepageData?.data?.work_with_us_section} />
          <HiringProcess dataHiring={homepageData?.data?.simple_transparent_hiring_section} />
          <WhyChooseUs dataWhyBusinesses={homepageData?.data?.why_businesses_section} />
          <TestimonialsSection dataTestimonials={homepageData?.data?.testimonial_section}/>
          <RelatedBlogs />
          <ContactSection dataContact={homepageData?.data?.contact_form_fields} />
        </>
      )}
    </div>
  );
};

export default Index;
