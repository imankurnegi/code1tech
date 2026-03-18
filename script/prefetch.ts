import fs from "fs";
import fetch from "node-fetch";

const BASE_URL = process.env.VITE_API_URL || "";
const TOKEN = process.env.VITE_AUTH_TOKEN || "";

const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

const endpoints = {
  homepage: "/homepage",
  about: "/about",
  teams: "/teams",
  layout: "/menus/topmenu",
  clientlogos: "/clientlogos",
  contactus: "/contactus",
  contactForm: "/cf7/form-fields/292",
  dataEngineering: "/data-engineering",
  engineerAsAService: "/engineer-as-a-service",
  dataScience: "/data-science",
  aiML: "/ai-ml-solutions",
  privacyPolicy: "/privacy-policy",
  termsCondition: "/terms-conditions",
};

async function prefetch() {
  fs.mkdirSync("./src/data", { recursive: true });

  for (const [key, path] of Object.entries(endpoints)) {
    try {
      const res = await fetch(`${BASE_URL}${path}`, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();

      // Sometimes API returns HTML error page instead of JSON
      const data =
        text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html>")
          ? {}
          : JSON.parse(text);

      fs.writeFileSync(`./src/data/${key}.json`, JSON.stringify(data, null, 2));
      console.log(`✅ ${key} data saved`);
    } catch (err) {
      console.warn(`⚠️ Failed to fetch ${key}:`, err);
      fs.writeFileSync(`./src/data/${key}.json`, "{}");
    }
  }
}

prefetch();