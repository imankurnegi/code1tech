import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import { addClassToSpan } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const TermsConditions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["termsCondition"],
    queryFn: api.getTermsCondition,
  });

  if (isLoading) return null;
  if (error) return null;

  const termsData = data?.data;

  return (
    <main>
      <SeoTags
        title={termsData?.seo?.title}
        description={termsData?.seo?.description}
        ogImage={termsData?.seo?.og_image}
      />
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(termsData?.page_title, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          <p className="text-muted-foreground text-sm">Last updated: {termsData?.last_updated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div dangerouslySetInnerHTML={{ __html: termsData?.page_content }}></div>
        </div>
      </section>
    </main>
  );
};

export default TermsConditions;
