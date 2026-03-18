import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all envs regardless of the `VITE_` prefix if needed.
  const env = loadEnv(mode, process.cwd(), "");

  const basePath = env.VITE_BASE_PATH;

  return {
    base: basePath || "/",

    server: {
      host: "::",
      port: 3000,
    },

    // SSG ke liye build target modern hona chahiye
    build: {
      target: "esnext", 
    },

    ssr: {
      // In libraries ko external nahi rakhna kyunki SSG ke waqt server-side logic chahiye hota hai
      noExternal: ["@tanstack/react-query", "react-router-dom", "react-helmet-async"],
    },

    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },

    // Vite-react-ssg specific configurations
    ssgOptions: {
      script: "async",
      formatting: "none",
      dirStyle: "nested",
      // Build fail hone par debugging asan karne ke liye
      onFinished() { 
        console.log("🚀 SSG Build Completed Successfully!"); 
      },
      // Agar koi route render nahi ho pa raha toh error throw karega (debugging ke liye best)
      onPageRenderError: (route, err) => {
        console.error(`❌ Error rendering route ${route}:`, err);
        return err;
      },
    },
  };
});