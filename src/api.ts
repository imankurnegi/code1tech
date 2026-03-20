import homepageData from "@/data/homepage.json";
import aboutData from "@/data/about.json";
import teamData from "@/data/teams.json";
import layoutData from "@/data/layout.json";
import clientLogosData from "@/data/clientlogos.json";
import contactData from "@/data/contactus.json";
import contactFormData from "@/data/contactForm.json";
import dataEngineeringData from "@/data/dataEngineering.json";
import engineerData from "@/data/engineerAsAService.json";
import dataScienceData from "@/data/dataScience.json";
import aiMLData from "@/data/aiML.json";
import privacyData from "@/data/privacyPolicy.json";
import termsData from "@/data/termsCondition.json";

const BASE_URL = import.meta.env.VITE_API_URL || "";
const TOKEN = import.meta.env.VITE_AUTH_TOKEN || "";

const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

export const api = {
  getHomeData: async () => homepageData,
  getAboutData: async () => aboutData,
  getTeamData: async () => teamData,
  getLayoutData: async () => layoutData,
  getClientLogos: async () => clientLogosData,
  getContactData: async () => contactData,
  getContactFormFields: async () => contactFormData,
  getDataEngineering: async () => dataEngineeringData,
  getEngineerAsAService: async () => engineerData,
  getDataScience: async () => dataScienceData,
  getAIMLData: async () => aiMLData,
  getPrivacyPolicyData: async () => privacyData,
  getTermsCondition: async () => termsData,

  submitContactForm: async (formData: FormData) => {
    try {
      const res = await fetch(`${BASE_URL}/cf7/submit`, {
        method: "POST",
        headers,
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error((json && json.message) || "Failed to send message");
      }
      return json;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};