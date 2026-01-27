import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
  hydrate,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const rawState = (window as any).__REACT_QUERY_STATE__;

const dehydratedState = typeof rawState === 'string' ? JSON.parse(rawState) : rawState;

if (dehydratedState) {
  hydrate(queryClient, dehydratedState);
}

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <HelmetProvider>
    <BrowserRouter basename="/frontend">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </HelmetProvider>
);
