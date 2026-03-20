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
  ].join("\n");

  const state = JSON.stringify(dehydrate(queryClient));

  return { html, head, state };
}
