import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import SimKycCaseStudy from "@/pages/case-studies/SimKycCaseStudy";
import OracleDatabricksCaseStudy from "@/pages/case-studies/OracleDatabricksCaseStudy";
import FraudDetectionRiskIntelligence from "@/pages/case-studies/FraudDetectionRiskIntelligence";
import CustomerChurnIntelligence from "@/pages/case-studies/CustomerChurnIntelligence";
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

  if (slug === "fraud-detection-risk-intelligence-platform") {
    const fraudData = pageData?.data?.find((item: any) => item?.slug === slug);
    if (fraudData) {
      return <FraudDetectionRiskIntelligence data={fraudData} />;
    }
  }

  if (slug === "ai-powered-customer-360-churn-prediction-platform") {
    const churnData = pageData?.data?.find((item: any) => item?.slug === slug);
    if (churnData) {
      return <CustomerChurnIntelligence data={churnData} />;
    }
  }

  const study = pageData?.data?.find((item: any) => item?.slug === slug);

  if (!slug || !study) {
    return <Navigate to="/case-studies" replace />;
  }  
  if(study){
    return <OracleDatabricksCaseStudy data={study} />
  }
};

export default CaseStudyDetail;
