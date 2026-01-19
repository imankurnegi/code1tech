import Navbar from "@/components/Navbar";
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
import Footer from "@/components/Footer";
import {useQuery} from "@tanstack/react-query";


const Index = () => {
 const { data, isLoading, isError, error } = useQuery({
  queryKey: ["homepage"],
  queryFn: async () => {
    const [homepageRes, headerRes, navRes] = await Promise.all([
      fetch("http://localhost:5000/api/homepage", {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer a3f1c5d9b8e7f2c4d6a1b0e9c3d4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b1ry432",
        },
      }),
      fetch("http://localhost:5000/api/headerlogo", {
        headers: {
          Accept: "application/json",
        },
      }),
      fetch("http://localhost:5000/api/navmenus", {
        headers: {
          Accept: "application/json",
        },
      }),
    ]);

    if (!homepageRes.ok || !headerRes.ok || !navRes) {
      throw new Error("Failed to fetch data");
    }

    const homepage = await homepageRes.json();
    const navMenus = await navRes.json();
    const headerLogo = await headerRes.json();

    return {
      homepage,
      navMenus,
      headerLogo,
    };
  },
});

  
  const homepageData = data?.homepage;
  const navMenus = data?.navMenus;
  const headerpageData = data?.headerLogo;
  return (
    <div className="min-h-screen bg-background">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <Navbar headerLogo={headerpageData?.data} navMenus={navMenus?.data} />
          <main>
            <HeroSection dataBanner={homepageData?.data?.home_page_banner} dataClientLogo = {homepageData?.data?.home_client_logo_section} />
            <EnterpriseTechSection dataTrusted = {homepageData?.data?.trusted_section} />

            <GrowthStrategies />
            <EngineeringServices />

            <AIAcceleratorsSection />
            <TechnologyServicesPanel />
            <TechnologyStackSection />
            <IndustriesWeServe />
            <CaseStudiesSection />
            <WorkWithUs />
            <HiringProcess />
            <WhyChooseUs />
            <TestimonialsSection />
            <RelatedBlogs />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
