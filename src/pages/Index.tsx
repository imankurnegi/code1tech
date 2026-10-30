import HeroSection from "@/components/HeroSection";
import GrowthStrategies from "@/components/GrowthStrategies";

import EngineeringServices from "@/components/EngineeringServices";
import AIAcceleratorsSection from "@/components/AIAcceleratorsSection";
import EnterpriseTechSection from "@/components/EnterpriseTechSection";
import TechnologyServicesPanel from "@/components/TechnologyServicesPanel";
import TechnologyStackSection from "@/components/TechnologyStackSection";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import WorkWithUs from "@/components/WorkWithUs";
import HiringProcess from "@/components/HiringProcess";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import RelatedBlogs from "@/components/RelatedBlogs";
import ContactSection from "@/components/ContactSection";
import { useQuery } from "@tanstack/react-query";
import SeoTags from "@/components/SeoTags";
import { api } from "@/api";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorFallback from "@/components/ErrorFallback";
import CaseStudiesSection from "@/components/CaseStudiesSection";

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["homepage"],
    queryFn: async () => {
      const [homeData, clientLogos] = await Promise.all([
        api.getHomeData(),
        api.getClientLogos(),
      ]);

      return {
        homeData,
        clientLogos,
      };
    },
  });

  // ACF true/false or checkbox: true, 1, "1", "yes", ["yes"], etc.
  const isChecked = (v: unknown): boolean => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "string") return ["1", "true", "yes", "on"].includes(v.toLowerCase());
    return Boolean(v);
  };

  // ACF taxonomy field: term objects, slugs, or a single value
  const toSlugs = (v: unknown): string[] => {
    if (!v) return [];
    const arr = Array.isArray(v) ? v : [v];
    return arr
      .map((t: any) => (typeof t === "string" ? t : t?.slug))
      .filter(Boolean);
  };

  const homepageData = data?.homeData;
  const clientLogosData = data?.clientLogos?.data ?? [];
  const fields = homepageData?.data;

const showRecent = isChecked(fields?.all);
const showBlogRecent = isChecked(fields?.blog_all);
const categorySlugs = toSlugs(fields?.blog_category);
const caseCategorySlugs = toSlugs(fields?.case_category);

const showBlogs = showBlogRecent || categorySlugs.length > 0;
const showCases = showRecent || caseCategorySlugs.length > 0;

const { data: relatedPostsData } = useQuery({
  queryKey: ["relatedPosts", showBlogRecent ? "recent" : categorySlugs],
  queryFn: () => api.getAllPosts(showBlogRecent ? [] : categorySlugs, 3),
  enabled: !!fields && showBlogs,
});

const { data: relatedCaseData } = useQuery({
  queryKey: ["relatedCase", showRecent ? "recent" : caseCategorySlugs],
  queryFn: () => api.getRelatedCaseStudies(showRecent ? [] : caseCategorySlugs, 3),
  enabled: !!fields && showCases,
});

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorFallback error={error as Error} onRetry={() => window.location.reload()} />;
  return (
    <>
      <SeoTags
        title={homepageData?.data?.seo?.title}
        description={homepageData?.data?.seo?.description}
        canonical={homepageData?.data?.seo?.canonical}
        ogImage={homepageData?.data?.seo?.og_image}
        schema={homepageData?.data?.schema}
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



      <CaseStudiesSection dataCaseStudies={relatedCaseData?.data ?? []} />

      <WorkWithUs dataWorkWithUs={homepageData?.data?.work_with_us_section} />
      <HiringProcess dataHiring={homepageData?.data?.simple_transparent_hiring_section} />
      <WhyChooseUs dataWhyBusinesses={homepageData?.data?.why_businesses_section} />
      <TestimonialsSection dataTestimonials={homepageData?.data?.testimonial_section} />
      <RelatedBlogs dataRelatedBlogs={relatedPostsData?.data ?? []}/>
      <ContactSection dataContact={homepageData?.data?.contact_form_fields} />

    </>
  )
};

export default Index;
