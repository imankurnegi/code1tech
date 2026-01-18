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
import { useEffect, useState } from "react";


const Index = () => {
  const [homepageData, setHomepageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log("Test1111111----")
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/homepage", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer a3f1c5d9b8e7f2c4d6a1b0e9c3d4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b1ry432`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        setHomepageData(data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <Navbar />
          <main>
            <HeroSection data={homepageData?.home_page_banner} />
            <EnterpriseTechSection />

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
