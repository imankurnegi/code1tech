import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Taaki .env files read ho sakein

const BASE_URL = process.env.VITE_API_URL || "";
const TOKEN = process.env.VITE_AUTH_TOKEN || "";

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
  const dataDir = "./src/data";
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  for (const [key, path] of Object.entries(endpoints)) {
    try {
      console.log(`Fetching ${key}...`);
      const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 
            Accept: "application/json",
            Authorization: `Bearer ${TOKEN}` 
        },
      });

      if (!res.ok) throw new Error(`Status: ${res.status}`);
      
      const data = await res.json();
      fs.writeFileSync(`${dataDir}/${key}.json`, JSON.stringify(data, null, 2));
      console.log(`✅ ${key} saved successfully`);
    } catch (err) {
      console.error(`❌ Error fetching ${key}:`, err.message);
      // Fallback: Agar file pehle se exist karti hai toh usse touch mat karo
      if (!fs.existsSync(`${dataDir}/${key}.json`)) {
        fs.writeFileSync(`${dataDir}/${key}.json`, JSON.stringify({}));
      }
    }
  }
}
prefetch();