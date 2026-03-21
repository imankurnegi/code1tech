// src/pages/PrivacyPolicy.tsx
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import { addClassToSpan } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const PrivacyPolicy = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["privacyPolicy"],
    queryFn: api.getPrivacyPolicyData,
  });

  if (isLoading) return null;
  if (error) return null;

  const privacyData = data?.data;

  return (
    <main>
      {/* ✅ SEO tags */}
      <SeoTags
        title={privacyData?.seo?.title}
        description={privacyData?.seo?.description}
        ogImage={privacyData?.seo?.og_image}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
            dangerouslySetInnerHTML={{
              __html: addClassToSpan(
                privacyData?.page_title,
                "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
              ),
            }}
          />
          <p className="text-muted-foreground text-sm">
            Last updated: {privacyData?.last_updated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div
            dangerouslySetInnerHTML={{
              __html: privacyData?.page_content,
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;