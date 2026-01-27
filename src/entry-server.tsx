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

  const baseUrl = import.meta.env.VITE_BASE_URL || '';
  
  if (baseUrl) {
  try {
    await Promise.all([
      queryClient.prefetchQuery({ 
        queryKey: ["homepage"], 
        queryFn: api.getHomeData 
      }),

      queryClient.prefetchQuery({ 
        queryKey: ["layout"], 
        queryFn: api.getLayoutData 
      }),
    ]);
  } catch (e) {
    console.error('SSR Prefetch Error:', e);
  }
}

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url} basename="/frontend">
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
