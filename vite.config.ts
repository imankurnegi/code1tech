import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const basePath = env.VITE_BASE_PATH || "/";

  return {
    base: basePath,

    server: {
      host: "::",
      port: 3000,
    },

    build: {
      target: "esnext",
      // manualChunks wala block yahan se hata diya hai taaki error na aaye
    },

    ssr: {
      // SSG ke liye in libraries ka bundle hona zaroori hai
      noExternal: [
        "@tanstack/react-query", 
        "react-router-dom", 
        "react-helmet-async"
      ],
    },

    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },

    ssgOptions: {
      script: "async",
      formatting: "none",
      dirStyle: "nested",
      onFinished() { 
        console.log("🚀 SSG Build Completed Successfully!"); 
      },
      onPageRenderError: (route, err) => {
        console.error(`❌ Error rendering route ${route}:`, err);
        return err;
      },
    },
  };
});