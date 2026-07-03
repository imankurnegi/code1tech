const BASE_URL = import.meta.env.VITE_API_URL || '';
const TOKEN = import.meta.env.VITE_AUTH_TOKEN || '';

const headers = {
  "Accept": "application/json",
  "Authorization": `Bearer ${TOKEN}`
};

export const api = {
  getHomeData: async () => {
    const response = await fetch(`${BASE_URL}/homepage`, { headers });
    if (!response.ok) throw new Error("Failed to fetch home page data");
    return response.json();
  },

  getAboutData: async () => {
    const response = await fetch(`${BASE_URL}/about`, { headers });
    if (!response.ok) throw new Error("Failed to fetch about page data");
    return response.json();
  },

  getTeamData: async () => {
    const response = await fetch(`${BASE_URL}/teams`, { headers });
    if (!response.ok) throw new Error("Failed to fetch team data");
    return response.json();
  },

  getLayoutData: async () => {
    const headerRes = await fetch(`${BASE_URL}/menus/topmenu`, { headers });
    if (!headerRes.ok) throw new Error('Layout data fetch failed');
    return headerRes.json();
  },

  getClientLogos: async () => {
    const response = await fetch(`${BASE_URL}/clientlogos`, { headers });
    if (!response.ok) throw new Error("Failed to fetch client logos");
    return response.json();
  },

  getContactData: async () => {
    const response = await fetch(`${BASE_URL}/contactus`, { headers });
    if (!response.ok) throw new Error("Failed to fetch contact data");
    return response.json();
  },

  getContactFormFields: async () => {
    const response = await fetch(`${BASE_URL}/cf7/form-fields/292`, { headers });
    if (!response.ok) throw new Error("Failed to fetch contact form fields");
    return response.json();
  },

  getDataEngineering: async () => {
    const response = await fetch(`${BASE_URL}/data-engineering`, { headers });
    if (!response.ok) throw new Error("Failed to fetch data engineering data");
    return response.json();
  },

  getEngineerAsAService: async () => {
    const response = await fetch(`${BASE_URL}/engineer-as-a-service`, { headers });
    if (!response.ok) throw new Error("Failed to fetch engineer as a service data");
    return response.json();
  },

  getDataScience: async () => {
    const response = await fetch(`${BASE_URL}/data-science`, { headers });
    if (!response.ok) throw new Error("Failed to fetch data science data");
    return response.json();
  },

  getAIMLData: async () => {
    const response = await fetch(`${BASE_URL}/ai-ml-solutions`, { headers });
    if (!response.ok) throw new Error("Failed to fetch AI/ML data");
    return response.json();
  },

  getPrivacyPolicyData: async () => {
    const response = await fetch(`${BASE_URL}/privacy-policy`, { headers });
    if (!response.ok) throw new Error("Failed to fetch Privacy Policy data");
    return response.json();
  },

  getTermsCondition: async () => {
    const response = await fetch(`${BASE_URL}/terms-conditions`, { headers });
    if (!response.ok) throw new Error("Failed to fetch Terms & Conditions data");
    return response.json();
  },

  getOnDemandEngineers: async () => {
    const response = await fetch(`${BASE_URL}/on-demand-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch on demand engineers data");
    return response.json();
  },

  getOffshoreEngineers: async () => {
    const response = await fetch(`${BASE_URL}/offshore-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch offshore data");
    return response.json();
  },

  getTechTeamEngineers: async () => {
    const response = await fetch(`${BASE_URL}/tech-team-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch tech team engineers data");
    return response.json();
  },

  getManagedServices: async () => {
    const response = await fetch(`${BASE_URL}/managed-services-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch managed services engineers data");
    return response.json();
  },

  getDataIngestion: async () => {
    const response = await fetch(`${BASE_URL}/data-ingestion-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch data ingestion engineers data");
    return response.json();
  },

  submitContactForm: async (formData: FormData) => {
    const res = await fetch(`${BASE_URL}/cf7/submit`, {
      method: "POST",
      headers,
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error((json && json.message) || "Failed to send message. Please try again.");
    }
    return json;
  },

  getCareersData: async () => {
    const response = await fetch(`${BASE_URL}/careers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch careers page data");
    return response.json();
  },

  getAllJobs: async () => {
    const response = await fetch(`${BASE_URL}/alljobs`, { headers });
    if (!response.ok) throw new Error("Failed to fetch jobs data");
    return response.json();
  },

  getJobsBySlug: async (slug: string) => {
    const response = await fetch(`${BASE_URL}/alljobs/?slug=${encodeURIComponent(slug)}`, { headers });
    if (!response.ok) throw new Error("Failed to fetch jobs by slug");
    return response.json();
  },

  getJobApplicationFormFields: async () => {
    const response = await fetch(`${BASE_URL}/cf7/form-fields/1000`, { headers });
    if (!response.ok) throw new Error("Failed to fetch job application form fields");
    return response.json();
  },

  // ── Blog endpoints ──────────────────────────────────────────────────────

  getBlogPageData: async () => {
    const response = await fetch(
      `${BASE_URL}/blog-page`,
      { headers }
    );
    if (!response.ok) throw new Error("Failed to fetch blog page data");
    return response.json();
  },

  // GET all posts — https://backend.code1.dev/wp-json/v1/posts
  // GET posts by category — https://backend.code1.dev/wp-json/v1/posts?category=cloud
  getAllPosts: async (categorySlug?: string) => {
    const url = categorySlug
      ? `${BASE_URL}/posts?category=${encodeURIComponent(categorySlug)}`
      : `${BASE_URL}/posts`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  },

  // GET single post by slug — https://backend.code1.dev/wp-json/v1/posts?slug=my-post
  getPostBySlug: async (slug: string) => {
    const response = await fetch(
      `${BASE_URL}/posts?slug=${encodeURIComponent(slug)}`,
      { headers }
    );
    if (!response.ok) throw new Error("Failed to fetch post");
    return response.json();
  },

  // GET all categories — https://backend.code1.dev/wp-json/v1/categories
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/categories`, { headers });
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  getDataWarehousing: async () => {
    const response = await fetch(`${BASE_URL}/data-warehouse-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch data warehousing data");
    return response.json();
  },

  getDataAdvancedEngineers: async () => {
    const response = await fetch(`${BASE_URL}/data-advanced-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch data advanced engineers data");
    return response.json();
  },

  getDataQualityEngineers: async () => {
    const response = await fetch(`${BASE_URL}/data-quality-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch data quality engineers data");
    return response.json();
  },

  getDataOpsEngineers: async () => {
    const response = await fetch(`${BASE_URL}/data-dataops-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch data ops engineers data");
    return response.json();
  },

  getDataCloudEngineers: async () => {
    const response = await fetch(`${BASE_URL}/data-cloud-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch data cloud engineers data");
    return response.json();
  },

  getBusinessIntelligenceEngineers: async () => {
    const response = await fetch(`${BASE_URL}/business-intelligence-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch business intelligence engineers data");
    return response.json();
  },

  getPredictiveEngineers: async () => {
    const response = await fetch(`${BASE_URL}/predictive-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch predictive engineers data");
    return response.json();
  },

  getBigDataEngineers: async () => {
    const response = await fetch(`${BASE_URL}/big-data-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch big data engineers data");
    return response.json();
  },

  getDatabricksEngineers: async () => {
    const response = await fetch(`${BASE_URL}/data-bricks-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch databricks engineers data");
    return response.json();
  },

  getSnowflakeEngineers: async () => {
    const response = await fetch(`${BASE_URL}/snowflake-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch snowflake engineers data");
    return response.json();
  },

  getAwsEngineers: async () => {
    const response = await fetch(`${BASE_URL}/aws-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch AWS engineers data");
    return response.json();
  },

  getPowerBIEngineers: async () => {
    const response = await fetch(`${BASE_URL}/power-bi-engineers`, { headers });
    if (!response.ok) throw new Error("Failed to fetch Power BI engineers data");
    return response.json();
  }

};
