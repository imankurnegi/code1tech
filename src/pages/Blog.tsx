import { useState, useEffect, FormEvent } from "react";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Search, Zap, FileText, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useElementParallax } from "@/hooks/use-parallax";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import SeoTags from "@/components/SeoTags";
import { api } from "@/api";
import blogHero   from "@/assets/blog-hero.jpg";
import blogData   from "@/assets/blog-data.jpg";
import blogAi     from "@/assets/blog-ai.jpg";
import blogDevops from "@/assets/blog-devops.jpg";
import blogCloud  from "@/assets/blog-cloud.jpg";
import catFinance      from "@/assets/industry-finance.jpg";
import catHealthcare   from "@/assets/industry-healthcare.jpg";
import catRetail       from "@/assets/industry-retail.jpg";
import catTechnology   from "@/assets/industry-technology.jpg";
import catManufacturing from "@/assets/industry-manufacturing.jpg";

// ── API response types (matching actual response shape) ───────────────────────
interface ApiCategory {
  id: number;
  name: string;
  slug: string;
}

interface ApiAuthor {
  id: number;
  name: string;
  username: string;
  slug: string;
  email: string;
  avatar: string;
  description: string;
  profile_url: string;
}

interface ApiPost {
  id: number;
  title: string;
  slug: string;
  content: string;       // used as excerpt/preview
  date: string;
  link: string;
  image: string | false; // false when no image set
  categories: ApiCategory[];
  author: ApiAuthor;
}

interface ApiCategoryItem {
  id: number;
  name: string;
  slug: string;
  count?: number;
  image?: string;
}

interface ChangeableText {
  default_text?: string;
  second_text?: string;
  third_text?: string;
  fourth_text_copy?: string;
}

interface BlogPageBanner {
  banner_main_heading?: string;
  changeable_text?: ChangeableText;
  banner_paragraph?: string;
  banner_background_image?: string;
}

interface BlogPageData {
  blog_page_banner?: BlogPageBanner;
  seo?: {
    title?: string;
    description?: string;
    og_image?: string;
    keyword?: string;
    noindex?: string;
    nofollow?: string;
  };
  schema?: Record<string, any>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  AI:       "bg-accent/15 text-accent border-accent/30",
  Data:     "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Cloud:    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  DevOps:   "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Security: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

const getCategoryColor = (name: string) =>
  categoryColors[name] ?? "bg-foreground/10 text-foreground/70 border-foreground/20";

const categoryFallbackImages: Record<string, string> = {
  ai:            blogAi,
  data:          blogData,
  cloud:         blogCloud,
  devops:        blogDevops,
  finance:       catFinance,
  healthcare:    catHealthcare,
  retail:        catRetail,
  technology:    catTechnology,
  manufacturing: catManufacturing,
};

// Returns a real image URL or a local fallback based on category slug
const resolveImage = (image: string | false, categorySlug?: string): string => {
  if (image && typeof image === "string") return image;
  return categoryFallbackImages[categorySlug?.toLowerCase() ?? ""] ?? blogHero;
};

// Format "2026-01-16" → "Jan 16, 2026"
const formatDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));
  } catch { return iso; }
};

// Primary category helpers
const primaryCategory    = (post: ApiPost) => post.categories?.[0]?.name ?? "";
const primaryCategorySlug = (post: ApiPost) => post.categories?.[0]?.slug ?? "";

const ARTICLES_PER_PAGE = 6;

// ── Component ─────────────────────────────────────────────────────────────────
const Blogs = () => {
  const [heroVisible,     setHeroVisible]    = useState(false);
  const [searchParams,    setSearchParams]   = useSearchParams();
  const [activeCategory,  setActiveCategoryState] = useState(searchParams.get("category") || "all");
  const [searchQuery,     setSearchQuery]    = useState(searchParams.get("search") || "");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing,   setIsSubscribing]  = useState(false);
  const [visibleCount,    setVisibleCount]   = useState(ARTICLES_PER_PAGE);

  const [posts,        setPosts]        = useState<ApiPost[]>([]);
  const [categories,   setCategories]   = useState<ApiCategoryItem[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [catsLoading,  setCatsLoading]  = useState(true);
  const [postsError,   setPostsError]   = useState<string | null>(null);
  const [pageMeta,     setPageMeta]     = useState<BlogPageData | null>(null);

  const featuredImageRef = useElementParallax(0.18) as React.RefObject<HTMLDivElement>;

  // Derive phrases inline — no useMemo needed, safe when pageMeta is null
  const rotatingPhrases: string[] = pageMeta?.blog_page_banner?.changeable_text
    ? [
        pageMeta.blog_page_banner.changeable_text.default_text,
        pageMeta.blog_page_banner.changeable_text.second_text,
        pageMeta.blog_page_banner.changeable_text.third_text,
        pageMeta.blog_page_banner.changeable_text.fourth_text_copy,
      ].filter((t): t is string => typeof t === "string" && t.length > 0)
    : ["Insights.", "Stories.", "Deep-dives.", "Playbooks."];

  const { displayText: rotatingWord, isComplete: rotatingComplete } = useTypingAnimation({
    phrases: rotatingPhrases,
    typingSpeed: 90,
    deletingSpeed: 45,
    pauseDuration: 1600,
  });

  // ── Sync URL ────────────────────────────────────────────────────────────────
  const setActiveCategory = (cat: string) => {
    setActiveCategoryState(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === "all") next.delete("category");
    else next.set("category", cat);
    setSearchParams(next, { replace: true });
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  useEffect(() => {
    setActiveCategoryState(searchParams.get("category") || "all");
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => { setHeroVisible(true); }, []);

  useEffect(() => {
    setVisibleCount(ARTICLES_PER_PAGE);
  }, [activeCategory, searchQuery]);

  // ── Fetch blog page meta ────────────────────────────────────────────────────
  useEffect(() => {
    api.getBlogPageData()
      .then(res => setPageMeta(res?.data ?? null))
      .catch(() => {});
  }, []);

  // ── Fetch categories ────────────────────────────────────────────────────────
  useEffect(() => {
    setCatsLoading(true);
    api.getCategories()
      .then(res => setCategories(res?.data ?? res ?? []))
      .catch(() => setCategories([]))
      .finally(() => setCatsLoading(false));
  }, []);

  // ── Fetch posts (server-side category filter) ───────────────────────────────
  useEffect(() => {
    setPostsLoading(true);
    setPostsError(null);
    const slug = activeCategory === "all" ? undefined : activeCategory;
    api.getAllPosts(slug)
      .then(res => {
        // API returns { status, count, data: [...] }
        setPosts(res?.data ?? []);
      })
      .catch(err => setPostsError(err.message ?? "Failed to load posts"))
      .finally(() => setPostsLoading(false));
  }, [activeCategory]);

  // ── Client-side search on top of server filter ──────────────────────────────
  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      post.title?.toLowerCase().includes(q) ||
      post.content?.toLowerCase().includes(q)
    );
  });

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore      = filteredPosts.length > visibleCount;

  // ── Newsletter ──────────────────────────────────────────────────────────────
  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubscribing(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      toast.success("Successfully subscribed! 🎉");
      setNewsletterEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  // ── Skeleton ────────────────────────────────────────────────────────────────
  const PostSkeleton = () => (
    <div className="rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.02)] border border-border/40 animate-pulse">
      <div className="aspect-[16/10] bg-foreground/10" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-foreground/10 rounded w-1/4" />
        <div className="h-4 bg-foreground/10 rounded w-3/4" />
        <div className="h-3 bg-foreground/10 rounded w-full" />
        <div className="h-3 bg-foreground/10 rounded w-2/3" />
      </div>
    </div>
  );

  return (
    <>
      <SeoTags
        title={pageMeta?.seo?.title || "Blog — Code1 Tech"}
        description={pageMeta?.seo?.description || pageMeta?.blog_page_banner?.banner_paragraph || "Thought leadership, technical deep-dives, and industry insights from our team of experts."}
        ogImage={pageMeta?.seo?.og_image || pageMeta?.blog_page_banner?.banner_background_image || blogHero}
      />

      <ServicePageLayout>
        {/* Grid texture */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0" style={{
          backgroundImage: 'linear-gradient(rgba(95,194,227,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-[42vh] sm:min-h-[45vh] lg:min-h-[48vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-10 lg:pb-12"
          style={{ background: "hsl(222 47% 5%)" }}
        >
          <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: `url(${pageMeta?.blog_page_banner?.banner_background_image ?? blogHero})` }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(222 47% 5% / 0.6) 0%, hsl(222 47% 4% / 0.4) 50%, hsl(222 47% 5% / 0.6) 100%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 150px 60px hsl(222 47% 5% / 0.7)' }} />
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                {pageMeta?.acf?.hero_heading ? (
                  <span className="text-foreground">{pageMeta.acf.hero_heading}</span>
                ) : (
                  <>
                    <span className="text-foreground">Our Blog of </span>
                    <span className="inline-block min-w-[6ch] text-left bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">
                      {rotatingWord}
                    </span>
                    <span className={`inline-block w-[2px] sm:w-[3px] h-[0.85em] bg-accent ml-1 align-middle transition-opacity duration-100 ${rotatingComplete ? "opacity-0" : "animate-pulse"}`} />
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-base max-w-3xl mx-auto text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                {pageMeta?.acf?.hero_subtitle ?? pageMeta?.description ?? "Thought leadership, technical deep-dives, and industry insights from our team of experts."}
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[1]" style={{ background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)' }} />
        </section>

        {/* ── Search ───────────────────────────────────────────────────────── */}
        <section className="py-4 lg:py-6" style={{ background: "hsl(222 47% 5%)" }}>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto backdrop-blur-xl bg-[hsl(222_47%_8%/0.9)] border border-[rgba(148,163,184,0.2)] rounded-2xl p-4 sm:p-7 shadow-[0_12px_50px_-12px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-end">
                <div className="flex-1 w-full">
                  <label className="text-[11px] font-semibold text-accent tracking-widest uppercase mb-2 block">Search Articles</label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                    <input
                      type="text"
                      placeholder="Search by title or topic..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 h-11 sm:h-12 bg-[rgba(255,255,255,0.04)] border border-[rgba(148,163,184,0.18)] rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:bg-[rgba(255,255,255,0.06)] transition-all"
                    />
                  </div>
                </div>
                <Button variant="hero" size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 rounded-xl text-sm font-semibold">
                  <Search className="w-4 h-4 mr-2" /> Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Category pill filters ─────────────────────────────────────────── */}
        <section className="py-4" style={{ background: "hsl(222 47% 5%)" }}>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  activeCategory === "all"
                    ? "bg-accent text-background border-accent"
                    : "bg-transparent text-foreground/70 border-border/40 hover:border-accent/50 hover:text-foreground"
                }`}
              >
                All
              </button>
              {!catsLoading && categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    activeCategory === cat.slug
                      ? "bg-accent text-background border-accent"
                      : "bg-transparent text-foreground/70 border-border/40 hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {cat.name}
                  {(cat.count ?? 0) > 0 && (
                    <span className="ml-1.5 text-[10px] opacity-60">({cat.count})</span>
                  )}
                </button>
              ))}
              {catsLoading && [1,2,3,4].map(i => (
                <div key={i} className="h-8 w-20 rounded-full bg-foreground/10 animate-pulse" />
              ))}
            </div>
          </div>
        </section>

        {/* ── Top Categories mosaic ─────────────────────────────────────────── */}
        {!catsLoading && categories.length > 0 && (
          <section className="py-8 lg:py-14 relative overflow-hidden" style={{ background: "hsl(222 47% 5%)" }}>
            <div className="pointer-events-none absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-accent/[0.05] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full bg-primary/[0.06] blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 2xl:px-12 relative">
              <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8 sm:mb-10 gap-6">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.05]">
                    Top{" "}
                    <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent italic">Categories</span>
                    <span className="text-accent">.</span>
                  </h3>
                  <div className="hidden md:block h-px flex-1 max-w-[280px] bg-gradient-to-r from-accent/40 to-transparent" />
                </div>

                <div className={`grid gap-3 sm:gap-4 ${
                  categories.length <= 4
                    ? "grid-cols-2 sm:grid-cols-4"
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
                }`}>
                  {categories.slice(0, 7).map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setActiveCategory(cat.slug)}
                      className="group block transition-transform duration-300 hover:-translate-y-1 text-left"
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-white/[0.03] transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_15px_40px_-15px_rgba(92,200,220,0.45)]">
                        <img
                          src={cat.image ?? resolveImage(false, cat.slug)}
                          alt={cat.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_47%_5%/0.35)] to-transparent" />
                        {(cat.count ?? 0) > 0 && (
                          <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-background/60 backdrop-blur-md border border-white/10 text-foreground">
                            <span className="w-1 h-1 rounded-full bg-accent" />
                            {cat.count}
                          </span>
                        )}
                      </div>
                      <h4 className="mt-3 text-foreground text-sm font-bold leading-tight group-hover:text-accent transition-colors text-left">
                        {cat.name}
                      </h4>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Latest / hero post + reading list ────────────────────────────── */}
        <section className="py-8 lg:py-14 relative overflow-hidden" style={{ background: "hsl(222 47% 5%)" }}>
          <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-accent/[0.06] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full bg-primary/[0.08] blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 2xl:px-12 relative">
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
              {/* Section header */}
              <div className="flex items-end justify-between mb-8 sm:mb-10">
                <div className="flex items-end gap-4 sm:gap-5">
                  <div className="hidden sm:flex flex-col items-center gap-2 pb-2">
                    <span className="w-px h-10 bg-gradient-to-b from-transparent via-accent/60 to-transparent" />
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-px w-8 bg-accent" />
                      <p className="text-[11px] font-bold text-accent tracking-[0.25em] uppercase">The Latest</p>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05] tracking-tight">
                      Fresh{" "}
                      <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent italic">insights</span>
                      <span className="text-accent">.</span>
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors group px-4 py-2 rounded-full border border-border/50 hover:border-accent/50 backdrop-blur-sm"
                >
                  View all
                  <span className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Loading */}
              {postsLoading && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  <div className="lg:col-span-7 rounded-3xl bg-foreground/5 animate-pulse aspect-[16/10] lg:min-h-[520px]" />
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    {[1,2,3,4].map(i => <div key={i} className="h-24 rounded-xl bg-foreground/5 animate-pulse" />)}
                  </div>
                </div>
              )}

              {/* Error */}
              {postsError && !postsLoading && (
                <div className="text-center py-12">
                  <p className="text-rose-400 text-sm">{postsError}</p>
                  <button onClick={() => setActiveCategory(activeCategory)} className="mt-4 text-accent text-sm underline">
                    Try again
                  </button>
                </div>
              )}

              {/* Empty */}
              {!postsLoading && !postsError && filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found matching your criteria.</p>
                </div>
              )}

              {/* Hero + reading list */}
              {!postsLoading && !postsError && filteredPosts.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                  {/* Hero card */}
                  <Link to={`/blog/${filteredPosts[0].slug}`} className="lg:col-span-7 group block relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/40 via-primary/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                    <div className="relative h-full rounded-3xl overflow-hidden border border-border/40 group-hover:border-accent/50 transition-all duration-500 bg-[rgba(255,255,255,0.02)]">
                      <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[520px] overflow-hidden">
                        <div ref={featuredImageRef} className="absolute -inset-y-[12%] inset-x-0 will-change-transform">
                          <img
                            src={resolveImage(filteredPosts[0].image, primaryCategorySlug(filteredPosts[0]))}
                            alt={filteredPosts[0].title}
                            className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_47%_5%)]/60 sm:from-[hsl(222_47%_5%)] via-[hsl(222_47%_5%/0.3)] sm:via-[hsl(222_47%_5%/0.7)] to-transparent" />
                        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[hsl(222_47%_5%/0.5)] to-transparent" />

                        {/* Top badges */}
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold border backdrop-blur-md ${getCategoryColor(primaryCategory(filteredPosts[0]))}`}>
                              {primaryCategory(filteredPosts[0])}
                            </span>
                          </div>
                        </div>

                        {/* Bottom overlay (desktop) */}
                        <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                          <h3 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-foreground group-hover:text-accent transition-colors duration-300 leading-[1.15] tracking-tight mb-3 line-clamp-3">
                            {filteredPosts[0].title}
                          </h3>
                          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5 line-clamp-2 text-left max-w-2xl">
                            {filteredPosts[0].content}
                          </p>
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={filteredPosts[0].author.avatar}
                                alt={filteredPosts[0].author.name}
                                className="w-10 h-10 rounded-full ring-2 ring-background/60 object-cover"
                              />
                              <div>
                                <p className="text-foreground text-sm font-semibold leading-tight">{filteredPosts[0].author.name}</p>
                                <p className="text-muted-foreground text-[11px]">{formatDate(filteredPosts[0].date)}</p>
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                              Read story <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Mobile content */}
                      <div className="sm:hidden p-5">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 leading-[1.2] tracking-tight mb-3">
                          {filteredPosts[0].title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 text-left">
                          {filteredPosts[0].content}
                        </p>
                        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/20">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={filteredPosts[0].author.avatar}
                              alt={filteredPosts[0].author.name}
                              className="w-9 h-9 rounded-full ring-2 ring-background/60 object-cover flex-shrink-0"
                            />
                            <p className="text-foreground text-xs font-semibold truncate">{filteredPosts[0].author.name}</p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent flex-shrink-0">
                            Read <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Reading list */}
                  <div className="lg:col-span-5 flex flex-col">
                    <div className="flex items-center justify-between mb-4 px-1">
                      <p className="text-[11px] font-bold text-muted-foreground tracking-[0.2em] uppercase">Reading list</p>
                      <span className="text-[11px] text-muted-foreground/70 font-mono">
                        {Math.min(4, filteredPosts.length - 1).toString().padStart(2, "0")} / {(filteredPosts.length - 1).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      {filteredPosts.slice(1, 5).map((post, idx) => (
                        <Link
                          key={post.id}
                          to={`/blog/${post.slug}`}
                          className="group relative flex gap-4 p-3 sm:p-4 rounded-xl border border-border/30 bg-[rgba(255,255,255,0.015)] hover:bg-[rgba(255,255,255,0.04)] hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                        >
                          <span className="absolute left-0 top-4 bottom-4 w-0.5 bg-accent rounded-r scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />

                          {/* Number */}
                          <div className="flex flex-col items-center pt-1 flex-shrink-0">
                            <span className="font-mono text-base sm:text-lg font-bold bg-gradient-to-b from-accent to-primary bg-clip-text text-transparent leading-none">
                              {String(idx + 2).padStart(2, "0")}
                            </span>
                            <span className="w-px flex-1 bg-border/40 mt-2" />
                          </div>

                          {/* Thumbnail */}
                          <div className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 border border-border/30">
                            <img
                              src={resolveImage(post.image, primaryCategorySlug(post))}
                              alt={post.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                            <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getCategoryColor(primaryCategory(post))}`}>
                                  {primaryCategory(post)}
                                </span>
                              </div>
                              <h4 className="font-bold text-foreground text-sm sm:text-[15px] leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
                                {post.title}
                              </h4>
                            </div>
                            <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground mt-2">
                              <span className="truncate">By <span className="text-foreground/80 font-medium">{post.author.name}</span></span>
                              <span className="font-mono text-muted-foreground/60 flex-shrink-0">{formatDate(post.date)}</span>
                            </div>
                          </div>
                        </Link>
                      ))}

                      {filteredPosts.length <= 1 && (
                        <div className="p-6 text-center text-sm text-muted-foreground border border-dashed border-border/40 rounded-xl">
                          More articles coming soon.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── All articles grid ─────────────────────────────────────────────── */}
        {!postsLoading && !postsError && filteredPosts.length > 0 && (
          <section className="py-8 lg:py-14 relative overflow-hidden" style={{ background: "hsl(222 47% 5%)" }}>
            <div className="pointer-events-none absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-accent/[0.05] blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-primary/[0.06] blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 2xl:px-12 relative">
              <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-8 sm:mb-10 gap-4 flex-wrap">
                  <div className="flex items-end gap-4 sm:gap-5">
                    <div className="hidden sm:flex flex-col items-center gap-2 pb-2">
                      <span className="w-px h-10 bg-gradient-to-b from-transparent via-accent/60 to-transparent" />
                      <FileText className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="h-px w-8 bg-accent" />
                        <p className="text-[11px] font-bold text-accent tracking-[0.25em] uppercase">More Stories</p>
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05] tracking-tight">
                        All{" "}
                        <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent italic">articles</span>
                        <span className="text-accent">.</span>
                      </h2>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/70 tracking-wider px-3 py-1.5 rounded-full border border-border/40 bg-[rgba(255,255,255,0.02)]">
                    {filteredPosts.length.toString().padStart(2, "0")} stories
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {visiblePosts.map((post, index) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className={`group block transition-all duration-500 relative ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                      style={{ transitionDelay: `${(index % ARTICLES_PER_PAGE) * 60}ms` }}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/30 via-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                      <div className="relative rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.02)] border border-border/40 group-hover:border-accent/50 group-hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                        <span className="absolute left-0 top-6 bottom-6 w-0.5 bg-accent rounded-r scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500 z-10" />

                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={resolveImage(post.image, primaryCategorySlug(post))}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[800ms] ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_47%_5%)] via-[hsl(222_47%_5%/0.3)] to-transparent" />
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-md ${getCategoryColor(primaryCategory(post))}`}>
                              {primaryCategory(post)}
                            </span>
                            <span className="font-mono text-[11px] font-bold text-foreground/90 bg-background/50 backdrop-blur-md px-2 py-1 rounded-md border border-border/40">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-foreground text-base sm:text-lg group-hover:text-accent transition-colors duration-300 leading-snug mb-2 line-clamp-2 tracking-tight">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 text-left flex-1">
                            {post.content}
                          </p>
                          <div className="flex items-center justify-between pt-3 border-t border-border/20 mt-auto gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-7 h-7 rounded-full object-cover flex-shrink-0 ring-1 ring-background/40"
                              />
                              <span className="text-xs text-muted-foreground truncate">
                                By <span className="text-foreground/80 font-medium">{post.author.name}</span>
                              </span>
                            </div>
                            <span className="text-[11px] text-muted-foreground font-mono flex-shrink-0">
                              {formatDate(post.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load more / progress */}
                {filteredPosts.length > ARTICLES_PER_PAGE && (
                  <div className="flex flex-col items-center gap-4 mt-10 sm:mt-12">
                    <div className="flex items-center gap-3 w-full max-w-xs">
                      <span className="font-mono text-[11px] text-foreground font-semibold tracking-wider">
                        {visiblePosts.length.toString().padStart(2, "0")}
                      </span>
                      <div className="flex-1 h-px bg-border/40 relative overflow-hidden rounded-full">
                        <span
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500"
                          style={{ width: `${(visiblePosts.length / filteredPosts.length) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground/70 tracking-wider">
                        {filteredPosts.length.toString().padStart(2, "0")}
                      </span>
                    </div>
                    {hasMore ? (
                      <Button
                        onClick={() => setVisibleCount(c => c + ARTICLES_PER_PAGE)}
                        variant="outline"
                        size="lg"
                        className="rounded-full border-accent/30 bg-[rgba(255,255,255,0.03)] hover:bg-accent/10 hover:border-accent/60 text-foreground font-semibold px-8 transition-all group"
                      >
                        Load more stories
                        <span className="ml-2 w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all">
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setVisibleCount(ARTICLES_PER_PAGE)}
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-accent rounded-full"
                      >
                        Show less
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Newsletter CTA ────────────────────────────────────────────────── */}
        <section className="py-6 lg:py-10" style={{ background: "hsl(222 47% 5%)" }}>
          <div className="container mx-auto px-4 sm:px-6 2xl:px-12">
            <div
              className="relative overflow-hidden rounded-3xl border border-white/[0.08]"
              style={{ background: "radial-gradient(120% 140% at 0% 0%, rgba(56,189,248,0.10) 0%, transparent 55%), radial-gradient(120% 140% at 100% 100%, rgba(124,58,237,0.10) 0%, transparent 55%), linear-gradient(135deg, #0B1222 0%, #0E1428 50%, #11102B 100%)" }}
            >
              <img src={blogData} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none mix-blend-luminosity" />
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
              <div className="absolute -top-32 -left-24 w-[360px] h-[360px] rounded-full bg-[#7C3AED]/[0.10] blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-32 -right-24 w-[360px] h-[360px] rounded-full bg-[#38BDF8]/[0.10] blur-[120px] pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

              <div className="relative z-10 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 px-6 sm:px-10 md:px-14 py-10 sm:py-12 md:py-14 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                    Stay Ahead of the{" "}
                    <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Curve</span>
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                    Get the latest insights on AI, data engineering, and cloud technologies delivered to your inbox.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-[13px] text-muted-foreground/90">
                    <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Monthly, never spammy</span>
                    <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-accent" /> Unsubscribe anytime</span>
                    <span className="inline-flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-accent" /> Curated by engineers</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative rounded-2xl border border-white/[0.10] p-5 sm:p-6 backdrop-blur-md" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)" }}>
                    <label htmlFor="newsletter-email" className="block text-xs font-medium text-muted-foreground mb-2 tracking-wide">Your work email</label>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
                        <input
                          id="newsletter-email"
                          type="email"
                          placeholder="you@company.com"
                          value={newsletterEmail}
                          onChange={e => setNewsletterEmail(e.target.value)}
                          required
                          className="w-full h-12 pl-10 pr-4 bg-[rgba(255,255,255,0.04)] border border-[rgba(148,163,184,0.18)] rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubscribing}
                        className="group h-12 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#2563EB] text-white font-semibold rounded-xl px-6 disabled:opacity-50"
                      >
                        {isSubscribing ? "Subscribing..." : "Subscribe"}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </form>
                    <p className="mt-3 text-[11px] text-muted-foreground/70 text-center sm:text-left">
                      Join 2,000+ engineering & data leaders. We respect your inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
};

export default Blog;
