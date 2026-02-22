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

  getLayoutData: async () => {
    const [headerRes, navRes, footerRes] = await Promise.all([
      fetch(`${BASE_URL}/header-logo`, { headers }),
      fetch(`${BASE_URL}/menus/topmenu`, { headers }),
      fetch(`${BASE_URL}/footer`, { headers }),
    ]);

    if (!headerRes.ok || !navRes.ok || !footerRes.ok) {
      throw new Error('Layout data fetch failed');
    }

    const [headerLogo, navMenus, footerData] = await Promise.all([
      headerRes.json(),
      navRes.json(),
      footerRes.json(),
    ]);

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
