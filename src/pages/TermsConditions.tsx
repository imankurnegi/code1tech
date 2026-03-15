import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import { addClassToSpan } from "@/lib/utils";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const data = await api.getTermsCondition();
    return data;
  } catch (error) {
    console.error("Failed to load terms and conditions SSG data", error);
    return {
      data: null
    };
    }
  }

const TermsConditions = () => {
  const loaderData = useLoaderData() as any;
  return (
      <main>
        <SeoTags
        title={loaderData?.data?.seo?.title}
        description={loaderData?.data?.seo?.description}
        ogImage={loaderData?.data?.seo?.og_image}
      />
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{__html : addClassToSpan(loaderData?.data?.page_title, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-sm">Last updated: {loaderData?.data?.last_updated}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div dangerouslySetInnerHTML={{__html : loaderData?.data?.page_content}}></div>
          </div>
        </section>
      </main>
  );
};

export default TermsConditions;
