import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const basePath = env.VITE_BASE_PATH;

  return {
    base: basePath || "/",

    server: {
      host: "::",
      port: 3000,
    },

    ssr: {
      noExternal: ["@tanstack/react-query", "react-router-dom"],
    },

    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    ssgOptions: {
      script: "async",
      formatting: "none",
      dirStyle: "nested",
    },
  };
});