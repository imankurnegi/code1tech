import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  return {
    base: "/",
    server: {
      host: "::",
      port: 3000,
    },
    ssr: {
      noExternal: ["@tanstack/react-query", "react-router-dom"],
    },
    esbuild:{
      drop: ["console", "debugger"]
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    }
  };
});