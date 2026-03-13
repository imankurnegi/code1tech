const BASE_URL = import.meta.env.VITE_BASE_URL || '';
const TOKEN = import.meta.env.VITE_AUTH_TOKEN || '';

const headers = {
  "Accept": "application/json",
  "Authorization": `Bearer ${TOKEN}`,
};

export const api = {
  getHomeData: async () => {
    const response = await fetch(`${BASE_URL}/homepage`, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch home page data");
    }

    return response.json();
  },

  getAboutData: async () => {
    const response = await fetch(`${BASE_URL}/about`, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch about page data");
    }
    return response.json();
  },

  getTeamData: async () => {
    const response = await fetch(`${BASE_URL}/teams`, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch team data");
    }
    return response.json();
  },

  getLayoutData: async () => {
    const headerRes = await fetch(`${BASE_URL}/header-logo`, { headers });
    const navRes = await fetch(`${BASE_URL}/menus/topmenu`, { headers });
    const footerRes = await fetch(`${BASE_URL}/footer`, { headers });

    if (!headerRes.ok || !navRes.ok || !footerRes.ok) {
      throw new Error('Layout data fetch failed');
    }

    const headerLogo = await headerRes.json();
    const navMenus = await navRes.json();
    const footerData = await footerRes.json();

    return {
      headerLogo,
      navMenus,
      footerData,
    };
  },

  getClientLogos: async () => {
    const response = await fetch(`${BASE_URL}/clientlogos`, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch client logos");
    }
    return response.json();
  },

  getContactData: async () => {
    const response = await fetch(`${BASE_URL}/contactus`, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch contact data");
    }
    return await response.json();
  },

  getContactFormFields: async () => {
    const response = await fetch(`${BASE_URL}/cf7/form-fields/292`, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch contact form fields");
    }
    return await response.json();
  },

  getDataEngineering: async () => {
    const response = await fetch(`${BASE_URL}/data-engineering`, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch data engineering data");
    }

    return response.json();
  },

  getEngineerAsAService: async () => {
    const response = await fetch(`${BASE_URL}/engineer-as-a-service`, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch engineer as a service data");
    }

    return response.json();
  },

  getDataScience: async () => {
    const response = await fetch(`${BASE_URL}/data-science`, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch data science data");
    }

    return response.json();
  },

  getAIMLData: async () => {
    const response = await fetch(`${BASE_URL}/ai-ml-solutions`, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch AI/ML data");
    }

    return response.json();
  },

  submitContactForm: async (formData: FormData) => {
    const res = await fetch(`${BASE_URL}/cf7/submit`, {
      method: "POST",
      headers,
      body: formData,
    });

    const json = await res.json();
    console.log(json, "json");
    if (!res.ok) {
      const msg =
        (json && json.message) || "Failed to send message. Please try again.";
      throw new Error(msg);
    }
    return json;
  },
};
