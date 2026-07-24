import React from "react";
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
  const jobSlugMatch = url.match(/^\/careers\/([^/?]+)/);
  const jobSlug = jobSlugMatch ? jobSlugMatch[1] : null;

  if (baseUrl) {
    try {
      await Promise.all([
        // Homepage data + client logos + contact form fields
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
        }),

        // Layout/top menu data
        queryClient.prefetchQuery({
          queryKey: ["layout"],
          queryFn: api.getLayoutData,
        }),

        // About page
        queryClient.prefetchQuery({
          queryKey: ["aboutPageData"],
          queryFn: async () => {
            const [aboutData, clientLogos] = await Promise.all([
              api.getAboutData(),
              api.getClientLogos(),
            ]);
            return { aboutData, clientLogos }; // match component structure
          },
        }),

        // Team page
        queryClient.prefetchQuery({
          queryKey: ["team"],
          queryFn: api.getTeamData,
        }),

        // On Demand Engineers page
        queryClient.prefetchQuery({
          queryKey: ["on-demand-engineers"],
          queryFn: api.getOnDemandEngineers,
        }),

        // Data engineering page
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
        }),

        // Data Warehousing page
        queryClient.prefetchQuery({
          queryKey: ["data-warehousing"],
          queryFn: api.getDataWarehousing,
        }),
        queryClient.prefetchQuery({
          queryKey: ["data-advanced-engineers"],
          queryFn: api.getDataAdvancedEngineers,
        }),
        queryClient.prefetchQuery({
          queryKey: ["dataQualityEngineers"],
          queryFn: api.getDataQualityEngineers,
        }),
        queryClient.prefetchQuery({
          queryKey: ["data-ops-engineers"],
          queryFn: api.getDataOpsEngineers,
        }),
        queryClient.prefetchQuery({
          queryKey: ["cloudDataMigrationPageData"],
          queryFn: api.getDataCloudEngineers,
        }),
        queryClient.prefetchQuery({
          queryKey: ["business-intelligence-engineers"],
          queryFn: api.getBusinessIntelligenceEngineers,
        }),
        queryClient.prefetchQuery({
          queryKey: ["predictive-engineers"],
          queryFn: api.getPredictiveEngineers,
        }),
        queryClient.prefetchQuery({
          queryKey: ["big-data-engineers"],
          queryFn: api.getBigDataEngineers,
        }),
        queryClient.prefetchQuery({
          queryKey: ["databricks-engineers"],
          queryFn: api.getDatabricksEngineers,
        }),
        queryClient.prefetchQuery({
          queryKey: ["snowflake-engineers"],
          queryFn: api.getSnowflakeEngineers,
        }),
         queryClient.prefetchQuery({
          queryKey: ["aws-engineers"],
          queryFn: api.getAwsEngineers,
        }),
        queryClient.prefetchQuery({
            queryKey: ["powerbi-engineers"],
            queryFn: api.getPowerBIEngineers,
          }),

          queryClient.prefetchQuery({
              queryKey: ["tableau-engineers"],
              queryFn: api.getTableauEngineers,
            }),

            queryClient.prefetchQuery({
            queryKey: ["n8n-engineers"],
            queryFn: api.getN8NEngineers,
          }),
          queryClient.prefetchQuery({
            queryKey: ["oracle-engineers"],
            queryFn: api.getOracleEngineers,
          }),
          queryClient.prefetchQuery({
            queryKey: ["microsoft-engineers"],
            queryFn: api.getMicrosoftEngineers,
          }),
        queryClient.prefetchQuery({
              queryKey: ["azure-engineers"],
              queryFn: api.getAzureEngineers,
            }),
            queryClient.prefetchQuery({
              queryKey: ["d365-engineers"],
              queryFn: api.getD365Engineers,
            }),
            queryClient.prefetchQuery({
              queryKey: ["powerapps-engineers"],
              queryFn: api.getPowerAppsEngineers,
            }),
            queryClient.prefetchQuery({
              queryKey: ["fintech-engineers"],
              queryFn: api.getFintechEngineers,
            }),
            queryClient.prefetchQuery({
              queryKey: ["banking-engineers"],
              queryFn: api.getBankingEngineers,
            }),
            queryClient.prefetchQuery({
              queryKey: ["healthcare-engineers"],
              queryFn: api.getHealthcareEngineers,
            }),
            queryClient.prefetchQuery({
              queryKey: ["retail-engineers"],
              queryFn: api.getRetailEngineers,
            }),
            queryClient.prefetchQuery({
              queryKey: ["real-estate-engineers"],
              queryFn: api.getRealEstateEngineers,
            }),
            queryClient.prefetchQuery({
              queryKey: ["travel-engineers"],
              queryFn: api.getTravelEngineers,
            }),
            queryClient.prefetchQuery({
              queryKey: ["professional-engineers"],
              queryFn: api.getProfessionalEngineers,
            }),
            queryClient.prefetchQuery({
              queryKey: ["education-engineers"],
              queryFn: api.getEducationEngineers,
            }),

        // Engineer as a Service page
        queryClient.prefetchQuery({
          queryKey: ["engineerServicePage"],
          queryFn: async () => {
            const [serviceData, contactFormFields] = await Promise.all([
              api.getEngineerAsAService(),
              api.getContactFormFields(),
            ]);

            return {
              serviceData,
              contactFormFields,
            };
          },
        }),

        // Data Science page
        queryClient.prefetchQuery({
          queryKey: ["dataSciencePage"],
          queryFn: async () => {
            const [serviceData, contactFormFields] = await Promise.all([
              api.getDataScience(),
              api.getContactFormFields(),
            ]);

            return {
              serviceData,
              contactFormFields,
            };
          },
        }),

        // AI/ML page
        queryClient.prefetchQuery({
          queryKey: ["aiMLPage"],
          queryFn: async () => {
            const [serviceData, contactFormFields] = await Promise.all([
              api.getAIMLData(),
              api.getContactFormFields(),
            ]);

            return {
              serviceData,
              contactFormFields,
            };
          },
        }),

        // Privacy Policy
        queryClient.prefetchQuery({
          queryKey: ["privacyPolicy"],
          queryFn: api.getPrivacyPolicyData,
        }),

        // Terms & Conditions
        queryClient.prefetchQuery({
          queryKey: ["termsCondition"],
          queryFn: api.getTermsCondition,
        }),

        queryClient.prefetchQuery({
          queryKey: ["careers-page"],
          queryFn: api.getCareersData,
        }),

        queryClient.prefetchQuery({
          queryKey: ["job-listings"],
          queryFn: api.getAllJobs,
        }),

        // Contact data (if needed separately)
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
      ]);
      if (jobSlug) {
        await queryClient.prefetchQuery({
          queryKey: ["job-detail", jobSlug],
          queryFn: () => api.getJobsBySlug(jobSlug),
        })
      }
    } catch (e) {
      console.error("SSR Prefetch Error:", e);
    }
  }

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url} basename="/">
          <App />
        </StaticRouter>
      </HelmetProvider>
    </QueryClientProvider>
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
