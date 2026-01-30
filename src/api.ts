const BASE_URL = import.meta.env.VITE_BASE_URL || '';
const TOKEN = import.meta.env.VITE_AUTH_TOKEN || '';

const headers = {
  "Accept": "application/json",
  "Authorization": `Bearer ${TOKEN}`
};

export const api = {
  getHomeData: async () => {
    const [homeRes, casesRes] = await Promise.all([
      fetch(`${BASE_URL}/homepage`, { headers }),
      fetch(`${BASE_URL}/case-studies`, { headers })
    ]);
    const homeJson = await homeRes.json();
    return {
      homepage: homeJson?.homepage ?? homeJson,
      caseStudies: await casesRes.json()
    };
  },

  getLayoutData: async () => {
    const [header, nav, footer] = await Promise.all([
      fetch(`${BASE_URL}/header-logo`, { headers }),
      fetch(`${BASE_URL}/menus/topmenu`, { headers }),
      fetch(`${BASE_URL}/footer`, { headers })
    ]);
    return {
      headerLogo: await header.json(),
      navMenus: await nav.json(),
      footerData: await footer.json()
    };
  },
  
  submitContactForm: async (formData: FormData) => {
    const res = await fetch(`${BASE_URL}/cf7/submit`, {
      method: "POST",
      headers,
      body: formData,
    });
    console.log(res, "res");

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
