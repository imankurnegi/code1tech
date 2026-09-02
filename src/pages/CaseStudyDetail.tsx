import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import SimKycCaseStudy from "@/pages/case-studies/SimKycCaseStudy";
import OracleDatabricksCaseStudy from "@/pages/case-studies/OracleDatabricksCaseStudy";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorFallback from "@/components/ErrorFallback";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  
  const { data, isLoading, error } = useQuery({
      queryKey: ["case-study-detail", slug],
      queryFn: () => api.getCaseStudyBySlug(slug || ""),
    });
    const pageData = data;


   if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorFallback error={error as Error} onRetry={() => window.location.reload()} />;
  
  if (slug === "seamless-sim-replacement-with-kyc-integration") {
    const simKycData = pageData?.data?.find((item: any) => item?.slug === "seamless-sim-replacement-with-kyc-integration");
    if (simKycData) {
      return <SimKycCaseStudy data={simKycData} />;
    }
  }

  // if (slug === "migration-of-oracle-with-databricks-analytics") {
  //   const oracleDatabricksData = pageData?.data?.find((item: any) => item?.slug === "migration-of-oracle-with-databricks-analytics");
  //   if (oracleDatabricksData) {
  //     return <OracleDatabricksCaseStudy data={oracleDatabricksData} />;
  //   }
  // }

  // if (slug === "seamless-power-bi-deployment") {
  //   const powerBiData = pageData?.data?.find((item: any) => item?.slug === "seamless-power-bi-deployment");
  //   if (powerBiData) {
  //     return <PowerBiCaseStudy data={powerBiData} />;
  //   }
  // }

  const study = pageData?.data?.find((item: any) => item?.slug === slug);

  if (!slug || !study) {
    return <Navigate to="/case-studies" replace />;
  }  
  if(study){
    return <OracleDatabricksCaseStudy data={study} />
  }
};

export default CaseStudyDetail;
