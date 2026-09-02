import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import './index.css';
import { QueryClient, dehydrate, QueryClientProvider } from "@tanstack/react-query";
import { api } from "./api";

export async function render(url: string) {
  const helmetContext: any = {};
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity, // Prevents immediate refetch on client
      },
    },
  });

  const baseUrl = import.meta.env.VITE_API_URL || '';
  const pathname = url.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  const jobSlugMatch = pathname.match(/^\/careers\/([^/]+)$/);
  const jobSlug = jobSlugMatch ? jobSlugMatch[1] : null;
  
  const blogSlugMatch = pathname.match(/^\/blog\/([^/]+)$/);
  const blogSlug = blogSlugMatch ? blogSlugMatch[1] : null;

  const caseStudySlugMatch = pathname.match(/^\/case-studies\/([^/]+)$/);
  const caseStudySlug = caseStudySlugMatch ? caseStudySlugMatch[1] : null;

  const authorSlugMatch = pathname.match(/^\/author\/([^/]+)$/);
  const authorSlug = authorSlugMatch ? authorSlugMatch[1] : null;

  // Extract blog category from URL params
  const searchParams = url.split('?')[1] || '';
  const blogCategory = new URLSearchParams(searchParams).get('category');

  if (baseUrl) {
    try {
      const prefetches: Promise<unknown>[] = [];

      // Layout/top menu data
      prefetches.push(
        queryClient.prefetchQuery({
          queryKey: ["layout"],
          queryFn: api.getLayoutData,
        })
      );

      // Homepage data + client logos + contact form fields
      if (pathname === "/") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["homepage"],
            queryFn: async () => {
              const [homeData, clientLogos, formFields] = await Promise.all([
                api.getHomeData(),
                api.getClientLogos(),
                api.getContactFormFields(),
              ]);
              return { homeData, clientLogos, formFields };
            },
          })
        );
      }

      // About page
      if (pathname === "/about") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["aboutPageData"],
            queryFn: async () => {
              const [aboutData, clientLogos] = await Promise.all([
                api.getAboutData(),
                api.getClientLogos(),
              ]);
              return { aboutData, clientLogos }; // match component structure
            },
          })
        );
      }

      // Team page
      if (pathname === "/team") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["team"],
            queryFn: api.getTeamData,
          })
        );
      }

      // Contact page
      if (pathname === "/contactus") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["contactPageData"],
            queryFn: async () => {
              const [contactData, clientLogos, contactFormFields] = await Promise.all([
                api.getContactData(),
                api.getClientLogos(),
                api.getContactFormFields(),
              ]);
              return { contactData, clientLogos, contactFormFields };
            },
          })
        );
      }

      // Engineer as a Service
      if (pathname === "/services/engineer-as-a-service") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["engineerServicePage"],
            queryFn: async () => {
              const [serviceData, contactFormFields] = await Promise.all([
                api.getEngineerAsAService(),
                api.getContactFormFields(),
              ]);
              return { serviceData, contactFormFields };
            },
          })
        );
      }

      // Data Science
      if (pathname === "/services/data-science") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["dataSciencePage"],
            queryFn: async () => {
              const [serviceData, contactFormFields] = await Promise.all([
                api.getDataScience(),
                api.getContactFormFields(),
              ]);
              return { serviceData, contactFormFields };
            },
          })
        );
      }

      // AI/ML Solutions
      if (pathname === "/services/ai-ml-solutions") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["aiMLPage"],
            queryFn: async () => {
              const [serviceData, contactFormFields] = await Promise.all([
                api.getAIMLData(),
                api.getContactFormFields(),
              ]);
              return { serviceData, contactFormFields };
            },
          })
        );
      }

      // Privacy Policy
      if (pathname === "/privacy-policy") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["privacyPolicy"],
            queryFn: api.getPrivacyPolicyData,
          })
        );
      }

      // Terms & Conditions
      if (pathname === "/terms-conditions") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["termsCondition"],
            queryFn: api.getTermsCondition,
          })
        );
      }

      // Blog
      if (pathname === "/blog") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["blog-page"],
            queryFn: api.getBlogPageData,
          })
        );
        // If category is specified, fetch filtered posts
        const categorySlugs = blogCategory ? [blogCategory] : undefined;
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["posts", blogCategory || "all"],
            queryFn: () => api.getAllPosts(categorySlugs),
          })
        );
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["categories"],
            queryFn: api.getCategories,
          })
        );
      }

      // case-studies
      if (pathname === "/case-studies") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["case-studies"],
            queryFn: api.getCaseStudies,
          })
        );
      }

      // EAAS routes
      if (pathname === "/services/eaas/offshore-nearshore") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["offshore-engineers"],
            queryFn: api.getOffshoreEngineers,
          })
        );
      }

      if (pathname === "/services/eaas/tech-team-building") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["tech-team-engineers"],
            queryFn: api.getTechTeamEngineers,
          })
        );
      }

      if (pathname === "/services/eaas/managed-services") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["managed-services-engineers"],
            queryFn: api.getManagedServices,
          })
        );
      }

      // On Demand Engineers page
      if (pathname === "/services/eaas/on-demand-engineers") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["on-demand-engineers"],
            queryFn: api.getOnDemandEngineers,
          })
        );
      }

      // Data engineering page
      if (pathname === "/services/data-engineering") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["dataEngineeringPage"],
            queryFn: async () => {
              const [serviceData, contactFormFields] = await Promise.all([
                api.getDataEngineering(),
                api.getContactFormFields(),
              ]);

              return {
                serviceData,
                contactFormFields,
              };
            },
          })
        );
      }

      // Data Warehousing page
      if (pathname === "/services/data-engineering/data-warehousing") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["data-warehousing"],
            queryFn: api.getDataWarehousing,
          })
        );
      }

      // Data Ingestion page
      if (pathname === "/services/data-engineering/data-ingestion") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["data-ingestion"],
            queryFn: api.getDataIngestion,
          })
        );
      }

      if (pathname === "/services/data-engineering/data-modelling") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["data-advanced-engineers"],
            queryFn: api.getDataAdvancedEngineers,
          })
        );
      }

      if (pathname === "/services/data-engineering/data-quality-governance") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["dataQualityEngineers"],
            queryFn: api.getDataQualityEngineers,
          })
        );
      }

      if (pathname === "/services/data-engineering/dataops-pipeline-automation") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["data-ops-engineers"],
            queryFn: api.getDataOpsEngineers,
          })
        );
      }

      if (pathname === "/services/data-engineering/cloud-data-migration") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["cloudDataMigrationPageData"],
            queryFn: api.getDataCloudEngineers,
          })
        );
      }

      if (pathname === "/services/data-science/business-intelligence") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["business-intelligence-engineers"],
            queryFn: api.getBusinessIntelligenceEngineers,
          })
        );
      }

      if (pathname === "/services/data-science/predictive-advanced-analytics") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["predictive-engineers"],
            queryFn: api.getPredictiveEngineers,
          })
        );
      }

      if (pathname === "/services/data-science/big-data-solutions") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["big-data-engineers"],
            queryFn: api.getBigDataEngineers,
          })
        );
      }

      if (pathname === "/databricks") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["databricks-engineers"],
            queryFn: api.getDatabricksEngineers,
          })
        );
      }

      if (pathname === "/snowflake") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["snowflake-engineers"],
            queryFn: api.getSnowflakeEngineers,
          })
        );
      }

      if (pathname === "/aws") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["aws-engineers"],
            queryFn: api.getAwsEngineers,
          })
        );
      }

      if (pathname === "/power-bi") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["powerbi-engineers"],
            queryFn: api.getPowerBIEngineers,
          })
        );
      }

      if (pathname === "/tableau") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["tableau-engineers"],
            queryFn: api.getTableauEngineers,
          })
        );
      }

      if (pathname === "/n8n") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["n8n-engineers"],
            queryFn: api.getN8NEngineers,
          })
        );
      }

      if (pathname === "/oracle") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["oracle-engineers"],
            queryFn: api.getOracleEngineers,
          })
        );
      }

      if (pathname === "/microsoft") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["microsoft-engineers"],
            queryFn: api.getMicrosoftEngineers,
          })
        );
      }

      if (pathname === "/azure") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["azure-engineers"],
            queryFn: api.getAzureEngineers,
          })
        );
      }

      if (pathname === "/dynamics-365") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["d365-engineers"],
            queryFn: api.getD365Engineers,
          })
        );
      }

      if (pathname === "/power-apps") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["powerapps-engineers"],
            queryFn: api.getPowerAppsEngineers,
          })
        );
      }

      if (pathname === "/industries/fintech") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["fintech-engineers"],
            queryFn: api.getFintechEngineers,
          })
        );
      }
      if (pathname === "/industries/insurtech") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["insurtech-engineers"],
            queryFn: api.getInsurTechEngineers,
          })
        );
      }
      if (pathname === "/industries/manufacturing") {
        prefetches.push(
          queryClient.prefetchQuery({
             queryKey: ["manufacturing-engineers"],
                queryFn: api.getManufacturingEngineers,
          })
        );
      }

      if (pathname === "/industries/banking-software") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["banking-engineers"],
            queryFn: api.getBankingEngineers,
          })
        );
      }

      if (pathname === "/industries/healthcare") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["healthcare-engineers"],
            queryFn: api.getHealthcareEngineers,
          })
        );
      }

      if (pathname === "/industries/retail-ecommerce") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["retail-engineers"],
            queryFn: api.getRetailEngineers,
          })
        );
      }

      if (pathname === "/industries/real-estate") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["real-estate-engineers"],
            queryFn: api.getRealEstateEngineers,
          })
        );
      }

      if (pathname === "/industries/travel-hospitality") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["travel-engineers"],
            queryFn: api.getTravelEngineers,
          })
        );
      }

      if (pathname === "/industries/professional-services") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["professional-engineers"],
            queryFn: api.getProfessionalEngineers,
          })
        );
      }

      if (pathname === "/industries/education-edtech") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["education-engineers"],
            queryFn: api.getEducationEngineers,
          })
        );
      }

      if (pathname === "/gcp") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["gcp-engineers"],
            queryFn: api.getGCPEngineers,
          })
        );
      }

      if (pathname === "/services/ai-ml/model-fine-tuning") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["modal-fine-engineers"],
            queryFn: api.getModalFineEngineers,
          })
        );
      }

      if (pathname === "/services/ai-ml/computer-vision") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["computer-engineers"],
            queryFn: api.getComputerEngineers,
          })
        );
      }

      if (pathname === "/services/ai-ml/natural-language-processing") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["natural-engineers"],
            queryFn: api.getNaturalEngineers,
          })
        );
      }

      if (pathname === "/services/ai-ml/ai-strategy-consulting") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["strategy-engineers"],
            queryFn: api.getStrategyEngineers,
          })
        );
      }

      if (pathname === "/services/ai-ml/ai-agents-workflow") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["ai-agents-workflow"],
            queryFn: api.getAgentsEngineers,
          })
        );
      }

      if (pathname === "/services/ai-ml/ml-pipeline-mlops") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["mlops-engineers"],
            queryFn: api.getMLOpsEngineers,
          })
        );
      }

      if (pathname === "/careers") {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["careers-page"],
            queryFn: api.getCareersData,
          }),
          queryClient.prefetchQuery({
            queryKey: ["job-listings"],
            queryFn: api.getAllJobs,
          })
        );
      }

      if (jobSlug) {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["job-detail", jobSlug],
            queryFn: () => api.getJobsBySlug(jobSlug),
          })
        );
      }

      // Blog detail prefetching for SEO meta tags
      if (blogSlug) {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["blog-post", blogSlug],
            queryFn: () => api.getPostBySlug(blogSlug),
          })
        );
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["posts"],
            queryFn: () => api.getAllPosts(),
          })
        );
      }

      // Case study detail prefetching for SSR
      if (caseStudySlug) {
        prefetches.push(
          queryClient.prefetchQuery({
            queryKey: ["case-study-detail", caseStudySlug],
            queryFn: () => api.getCaseStudyBySlug(caseStudySlug),
          })
        );
      }

      // Author page fetch data client-side via useEffect
      if (authorSlug) {
        console.log("Author page detected, data will be fetched client-side");
      }

      await Promise.all(prefetches);
    } catch (e) {
      console.error("SSR Prefetch Error:", e);
    }
  }

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url} basename="/">
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  const head = [
    helmet?.title?.toString() || "",
    helmet?.meta?.toString() || "",
    helmet?.link?.toString() || "",
    helmet?.script?.toString() || "",
  ].join("\n");

  const state = JSON.stringify(dehydrate(queryClient));

  return { html, head, state };
}