import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ArrowLeft, Clock, Calendar, User, Share2,
  Linkedin, Twitter, List, Sparkles, CheckCircle2,
  MessageSquare, Phone, ChevronDown, Search
} from "lucide-react";
import SeoTags from "@/components/SeoTags";
import { api } from "@/api";
import blogHero        from "@/assets/blog-hero.jpg";
import blogAi          from "@/assets/blog-ai.jpg";
import blogData        from "@/assets/blog-data.jpg";
import blogCloud       from "@/assets/blog-cloud.jpg";
import blogDevops      from "@/assets/blog-devops.jpg";
import catFinance      from "@/assets/industry-finance.jpg";
import catHealthcare   from "@/assets/industry-healthcare.jpg";
import catRetail       from "@/assets/industry-retail.jpg";
import catTechnology   from "@/assets/industry-technology.jpg";

// ── API types ─────────────────────────────────────────────────────────────────
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
  content: string;
  date: string;
  link: string;
  image: string | false;
  categories: ApiCategory[];
  author: ApiAuthor;
  tags?: string[];
  seo?: { title?: string; description?: string; og_image?: string };
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
  ai: blogAi, data: blogData, cloud: blogCloud, devops: blogDevops,
  finance: catFinance, healthcare: catHealthcare, retail: catRetail, technology: catTechnology,
};

const resolveImage = (image: string | false | undefined, categorySlug?: string): string => {
  if (image && typeof image === "string") return image;
  return categoryFallbackImages[categorySlug?.toLowerCase() ?? ""] ?? blogHero;
};

const formatDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(iso));
  } catch { return iso; }
};

const primaryCategory     = (post: ApiPost) => post.categories?.[0]?.name ?? "";
const primaryCategorySlug = (post: ApiPost) => post.categories?.[0]?.slug ?? "";

// ── Content renderer ─────────────────────────────────────────────────────────
// Parses basic Markdown-like syntax in the content string
const renderContent = (block: string, index: number) => {
  // H2 heading
  if (block.startsWith("## ")) {
    return (
      <h2
        key={index}
        id={`section-${index}`}
        className="scroll-mt-28 text-2xl md:text-3xl font-bold text-foreground mt-12 mb-5 tracking-tight"
      >
        <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">
          {block.replace("## ", "")}
        </span>
      </h2>
    );
  }
  // Bold title + body separated by \n
  if (block.startsWith("**") && block.includes("**\n")) {
    const [title, ...rest] = block.split("\n");
    return (
      <div key={index} className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
          {title.replace(/\*\*/g, "")}
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed text-left">
          {rest.join("\n")}
        </p>
      </div>
    );
  }
  // Bullet list
  if (block.startsWith("- ")) {
    const items = block.split("\n").filter(l => l.startsWith("- "));
    return (
      <ul key={index} className="space-y-3 mb-6">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-muted-foreground text-base leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <span>{item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}</span>
          </li>
        ))}
      </ul>
    );
  }
  // Numbered list
  if (block.match(/^\d\./)) {
    const items = block.split("\n").filter(l => l.match(/^\d\./));
    return (
      <ol key={index} className="space-y-3 mb-6">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-muted-foreground text-base leading-relaxed">
            <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-accent to-primary text-primary-foreground text-sm font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span>{item.replace(/^\d\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}</span>
          </li>
        ))}
      </ol>
    );
  }
  // Plain paragraph (may contain basic HTML from WP)
  return (
    <p
      key={index}
      className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5 text-left"
      dangerouslySetInnerHTML={{ __html: block }}
    />
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
const BlogDetail = () => {
  const { id: slug } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post,        setPost]        = useState<ApiPost | null>(null);
  const [latestPosts, setLatestPosts] = useState<ApiPost[]>([]);
  const [allPosts,    setAllPosts]    = useState<ApiPost[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);

  const [isVisible,      setIsVisible]      = useState(false);
  const [mobileTocOpen,  setMobileTocOpen]  = useState(false);
  const [readProgress,   setReadProgress]   = useState(0);
  const [sidebarSearch,  setSidebarSearch]  = useState("");

  // ── Fetch post by slug ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!slug) { navigate("/blog", { replace: true }); return; }
    setLoading(true);
    setError(null);
    setIsVisible(false);
    window.scrollTo(0, 0);

    api.getPostBySlug(slug)
      .then(res => {
        // API may return array or single object — handle both
        const data = res?.data;
        const found: ApiPost | null = Array.isArray(data)
          ? (data.find((p: ApiPost) => p.slug === slug) ?? data[0] ?? null)
          : (data ?? null);

        if (!found) {
          navigate("/blog", { replace: true });
          return;
        }
        setPost(found);
        setTimeout(() => setIsVisible(true), 50);
      })
      .catch(() => setError("Failed to load article. Please try again."))
      .finally(() => setLoading(false));
  }, [slug]);

  // ── Fetch all posts for sidebar latest + prev/next ──────────────────────────
  useEffect(() => {
    api.getAllPosts()
      .then(res => {
        const data: ApiPost[] = res?.data ?? [];
        setAllPosts(data);
        setLatestPosts(data.filter(p => p.slug !== slug).slice(0, 4));
      })
      .catch(() => {});
  }, [slug]);

  // ── Read progress ───────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  // ── TOC — built from "## " headings in content ──────────────────────────────
  const contentBlocks = useMemo<string[]>(() => {
    if (!post?.content) return [];
    // Split on double newlines or treat as one block if no newlines
    return post.content.split(/\n\n+/).filter(Boolean);
  }, [post]);

  const toc = useMemo(() => {
    return contentBlocks
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => c.startsWith("## "))
      .map(({ c, i }) => ({ id: `section-${i}`, title: c.replace("## ", "") }));
  }, [contentBlocks]);

  // Midpoint for inline CTA
  const midCtaAfterIndex = useMemo(() => {
    const headingIdxs = contentBlocks.map((c, i) => (c.startsWith("## ") ? i : -1)).filter(i => i >= 0);
    return headingIdxs.length >= 2 ? headingIdxs[Math.floor(headingIdxs.length / 2)] : -1;
  }, [contentBlocks]);

  // Prev / next from allPosts
  const { prevPost, nextPost } = useMemo(() => {
    const idx = allPosts.findIndex(p => p.slug === slug);
    return {
      prevPost: idx > 0 ? allPosts[idx - 1] : null,
      nextPost: idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
    };
  }, [allPosts, slug]);

  // Related posts: same category, exclude current
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter(p => p.slug !== slug && primaryCategorySlug(p) === primaryCategorySlug(post))
      .slice(0, 3);
  }, [allPosts, post, slug]);

  // Unique categories for sidebar
  const sidebarCategories = useMemo(() => {
    const seen = new Set<string>();
    return allPosts
      .flatMap(p => p.categories ?? [])
      .filter(c => { if (seen.has(c.slug)) return false; seen.add(c.slug); return true; });
  }, [allPosts]);

  const handleSidebarSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = sidebarSearch.trim().slice(0, 100);
    navigate(q ? `/blog?search=${encodeURIComponent(q)}` : "/blog");
  };

  // ── Inline CTA ──────────────────────────────────────────────────────────────
  const InlineCTA = () => (
    <div className="my-12 relative rounded-2xl overflow-hidden border border-accent/30 bg-gradient-to-br from-[hsl(222,47%,8%)] via-[hsl(210,80%,10%)] to-[hsl(222,47%,8%)] p-6 md:p-8">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-6">
        <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg md:text-xl font-bold text-foreground mb-1">
            Need expert guidance on {primaryCategory(post!).toLowerCase()}?
          </h4>
          <p className="text-sm text-muted-foreground">
            Talk to our team — get a tailored roadmap for your enterprise.
          </p>
        </div>
        <Link to="/contact" className="shrink-0">
          <Button variant="hero" size="lg" className="group w-full md:w-auto">
            Book a Free Consult
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );

  // ── Loading state ────────────────────────────────────────────────────────────
  if (loading) {
    return (

        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin mx-auto" />
            <p className="text-muted-foreground text-sm">Loading article…</p>
          </div>
        </div>

    );
  }

  // ── Error state ──────────────────────────────────────────────────────────────
  if (error || !post) {
    return (

        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-4 max-w-md">
            <p className="text-rose-400">{error ?? "Article not found."}</p>
            <Link to="/blog">
              <Button variant="outline" className="mt-2">← Back to Blog</Button>
            </Link>
          </div>
        </div>
    );
  }

  const heroImage   = resolveImage(post.image, primaryCategorySlug(post));
  const authorName  = post.author?.name ?? "Code1 Team";
  const authorAvatar = post.author?.avatar;
  const postDate    = formatDate(post.date);
  const catName     = primaryCategory(post);
  const catColor    = getCategoryColor(catName);

  return (
    <>
      <SeoTags
        title={post.seo?.title ?? post.title}
        description={post.seo?.description ?? post.content?.slice(0, 160)}
        ogImage={post.seo?.og_image ?? (post.image || heroImage)}
      />


        {/* Reading progress bar */}
        <div
          className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none"
          role="progressbar"
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(readProgress)}
        >
          <div
            className="h-full bg-gradient-to-r from-[hsl(var(--accent))] via-primary to-[hsl(var(--accent))] shadow-[0_0_12px_hsl(var(--accent)/0.6)] transition-[width] duration-150 ease-out"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative pt-24 pb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,8%)] via-[hsl(222,47%,6%)] to-[hsl(222,47%,5%)]" />
          <div className="absolute inset-0">
            <img src={heroImage} alt={post.title} className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
          </div>

          <div className="container max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-5 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <div className={`max-w-5xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${catColor}`}>
                {catName}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-[1.15] tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  {authorAvatar
                    ? <img src={authorAvatar} alt={authorName} className="w-5 h-5 rounded-full object-cover" />
                    : <User className="w-4 h-4 text-accent" />
                  }
                  <span>{authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>{postDate}</span>
                </div>
                {post.categories?.length > 1 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {post.categories.slice(1).map(c => (
                      <span key={c.id} className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getCategoryColor(c.name)}`}>
                        {c.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured image */}
        <section className="relative pt-2">
          <div className="container max-w-7xl mx-auto px-4 lg:px-8">
            <div className={`max-w-7xl mx-auto rounded-2xl overflow-hidden border border-border/40 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <img src={heroImage} alt={post.title} className="w-full h-[240px] md:h-[400px] object-cover" />
            </div>
          </div>
        </section>

        {/* ── Main content + sidebar ──────────────────────────────────────── */}
        <section className="py-12 md:py-16 relative">
          <div className="container max-w-7xl mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-12">

              {/* Article */}
              <article className={`min-w-0 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

                {/* Mobile TOC */}
                {toc.length > 0 && (
                  <div className="lg:hidden mb-8 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMobileTocOpen(v => !v)}
                      aria-expanded={mobileTocOpen}
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                    >
                      <span className="flex items-center gap-2">
                        <List className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Table of Content</span>
                        <span className="text-xs text-muted-foreground">({toc.length})</span>
                      </span>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${mobileTocOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ease-out ${mobileTocOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <nav className="px-5 pb-4 pt-1 border-t border-border/30">
                          <ul className="space-y-2.5">
                            {toc.map((item, i) => (
                              <li key={item.id}>
                                <a
                                  href={`#${item.id}`}
                                  onClick={() => setMobileTocOpen(false)}
                                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-accent transition-colors py-1.5"
                                >
                                  <span className="shrink-0 text-xs text-accent/70 font-mono mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                                  <span className="leading-snug">{item.title}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content blocks */}
                {contentBlocks.map((block, index) => (
                  <div key={index}>
                    {renderContent(block, index)}
                    {index === midCtaAfterIndex && <InlineCTA />}
                  </div>
                ))}

                {/* Tags */}
                {(post.tags ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/30">
                    {post.tags!.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-muted/50 border border-border/30 rounded-full text-sm text-muted-foreground hover:border-accent/40 hover:text-accent transition-colors cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Share */}
                <div className="flex items-center gap-4 mt-8 pb-2">
                  <span className="text-muted-foreground text-sm">Share this article:</span>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.link)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-muted/50 hover:bg-accent/20 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground hover:text-accent" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(post.link)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-muted/50 hover:bg-accent/20 rounded-lg transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground hover:text-accent" />
                  </a>
                  <button
                    onClick={() => { navigator.clipboard?.writeText(post.link); }}
                    className="p-2 bg-muted/50 hover:bg-accent/20 rounded-lg transition-colors"
                    title="Copy link"
                  >
                    <Share2 className="w-4 h-4 text-muted-foreground hover:text-accent" />
                  </button>
                </div>

                {/* Prev / Next navigation */}
                {(prevPost || nextPost) && (
                  <nav aria-label="Article navigation" className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prevPost ? (
                      <Link
                        to={`/blog/${prevPost.slug}`}
                        className="group p-5 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:bg-card/50 transition-all"
                      >
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2 group-hover:text-accent transition-colors">
                          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                          Previous Article
                        </div>
                        <h4 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                          {prevPost.title}
                        </h4>
                      </Link>
                    ) : <div className="hidden md:block" />}

                    {nextPost ? (
                      <Link
                        to={`/blog/${nextPost.slug}`}
                        className="group p-5 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:bg-card/50 transition-all md:text-right"
                      >
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2 group-hover:text-accent transition-colors md:justify-end">
                          Next Article
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h4 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                          {nextPost.title}
                        </h4>
                      </Link>
                    ) : <div className="hidden md:block" />}
                  </nav>
                )}

                {/* Author box */}
                <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-card/50 to-card/20 border border-border/40 rounded-2xl">
                  <div className="flex items-start gap-5">
                    {authorAvatar ? (
                      <img
                        src={authorAvatar}
                        alt={authorName}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shrink-0 ring-2 ring-background/60"
                      />
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shrink-0">
                        <span className="text-primary-foreground text-2xl font-bold">{authorName.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Written by</p>
                      <h3 className="text-xl font-bold text-foreground">{authorName}</h3>
                      {post.author?.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed mt-2">{post.author.description}</p>
                      )}
                      {post.author?.profile_url && (
                        <a
                          href={post.author.profile_url}
                          target="_blank" rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-2 transition-all"
                        >
                          View profile
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>

              {/* ── Sidebar ──────────────────────────────────────────────── */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">

                  {/* Search */}
                  <form
                    onSubmit={handleSidebarSearch}
                    className="p-5 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm"
                    role="search"
                  >
                    <label htmlFor="sidebar-blog-search" className="flex items-center gap-2 mb-3">
                      <Search className="w-4 h-4 text-accent" />
                      <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Search Articles</span>
                    </label>
                    <div className="relative">
                      <input
                        id="sidebar-blog-search"
                        type="search"
                        value={sidebarSearch}
                        onChange={e => setSidebarSearch(e.target.value)}
                        maxLength={100}
                        placeholder="Search by keyword..."
                        className="w-full bg-background/60 border border-border/50 rounded-lg pl-3 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/40 transition-colors"
                      />
                      <button
                        type="submit"
                        aria-label="Search"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-accent/15 text-accent hover:bg-accent hover:text-primary-foreground transition-colors"
                      >
                        <Search className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>

                  {/* TOC */}
                  {toc.length > 0 && (
                    <div className="p-5 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
                        <List className="w-4 h-4 text-accent" />
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Table of Content</h4>
                      </div>
                      <nav>
                        <ul className="space-y-2.5">
                          {toc.map(item => (
                            <li key={item.id}>
                              <a
                                href={`#${item.id}`}
                                className="text-sm text-muted-foreground hover:text-accent transition-colors block leading-snug border-l-2 border-transparent hover:border-accent pl-3 -ml-px"
                              >
                                {item.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  )}

                  {/* Browse by Category */}
                  {sidebarCategories.length > 0 && (
                    <div className="p-5 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
                        <List className="w-4 h-4 text-accent" />
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Browse by Category</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sidebarCategories.map(cat => {
                          const isActive = cat.name === catName;
                          return (
                            <Link
                              key={cat.id}
                              to={`/blog?category=${encodeURIComponent(cat.slug)}`}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-[1.03] ${
                                isActive
                                  ? getCategoryColor(cat.name)
                                  : "bg-muted/40 text-muted-foreground border-border/40 hover:text-accent hover:border-accent/40"
                              }`}
                            >
                              {cat.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Latest Blogs */}
                  {latestPosts.length > 0 && (
                    <div className="p-5 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Latest Blogs</h4>
                      </div>
                      <ul className="space-y-4">
                        {latestPosts.map(lp => (
                          <li key={lp.id}>
                            <Link to={`/blog/${lp.slug}`} className="group flex gap-3 items-start">
                              <img
                                src={resolveImage(lp.image, primaryCategorySlug(lp))}
                                alt={lp.title}
                                loading="lazy"
                                className="w-16 h-16 rounded-lg object-cover shrink-0 border border-border/30 group-hover:border-accent/40 transition-colors"
                              />
                              <div className="min-w-0">
                                <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">
                                  {primaryCategory(lp)}
                                </span>
                                <h5 className="text-sm font-medium text-foreground leading-snug mt-1 line-clamp-2 group-hover:text-accent transition-colors">
                                  {lp.title}
                                </h5>
                                <p className="text-[11px] text-muted-foreground mt-1">
                                  {formatDate(lp.date)}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/blog"
                        className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs font-medium text-accent hover:text-foreground transition-colors group"
                      >
                        <span>View all articles</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/contact"
                        className="mt-4 group flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-accent to-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.6)] hover:shadow-[0_12px_28px_-8px_hsl(var(--accent)/0.8)] transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Discuss Your Use Case
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}

                  {/* Sidebar CTA */}
                  <div className="p-6 rounded-2xl border border-accent/30 bg-gradient-to-br from-[hsl(210,80%,12%)] to-[hsl(222,47%,8%)] relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-3">
                        <MessageSquare className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h4 className="text-base font-bold text-foreground mb-2 leading-tight">Have a project in mind?</h4>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        Get a free 30-minute strategy session with our experts.
                      </p>
                      <Link to="/contact" className="block">
                        <Button variant="hero" size="sm" className="w-full group">
                          Get in Touch
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Related Articles ─────────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="py-16 md:py-20 relative overflow-hidden border-t border-border/30">
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] to-[hsl(222,47%,6%)]" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">Continue Reading</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                      Related{" "}
                      <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Articles</span>
                    </h2>
                  </div>
                  <Link to="/blog" className="group inline-flex items-center text-accent text-sm font-medium hover:text-foreground transition-colors">
                    View All Articles
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {relatedPosts.map(related => (
                    <Link
                      key={related.id}
                      to={`/blog/${related.slug}`}
                      className="group relative block rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 hover:border-accent/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={resolveImage(related.image, primaryCategorySlug(related))}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                      </div>
                      <div className="relative p-5 md:p-6">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getCategoryColor(primaryCategory(related))}`}>
                          {primaryCategory(related)}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold mb-3 leading-tight text-foreground group-hover:text-accent transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5 text-left line-clamp-2">
                          {related.content}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border/20">
                          <span className="text-muted-foreground text-xs">{formatDate(related.date)}</span>
                          <div className="flex items-center gap-1 text-accent text-sm font-medium">
                            Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Bottom CTA banner */}
                <div className="mt-12 relative rounded-2xl overflow-hidden border border-accent/30 bg-gradient-to-br from-[hsl(222,47%,8%)] via-[hsl(210,80%,12%)] to-[hsl(222,47%,8%)] p-8 md:p-10">
                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                        <MessageSquare className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
                          Want to discuss your specific use case?
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                          Our experts are ready to help you turn these insights into measurable business outcomes.
                        </p>
                      </div>
                    </div>
                    <Link to="/contact" className="shrink-0">
                      <Button variant="hero" size="lg" className="group w-full md:w-auto">
                        <Phone className="w-4 h-4" />
                        Contact Us
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Final CTA ─────────────────────────────────────────────────────── */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">Let's Build Together</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Ready to Implement{" "}
                <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">These Ideas?</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help you apply these concepts to drive real business outcomes for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                    <Phone className="w-4 h-4" />
                    Schedule Strategy Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Read More Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default BlogDetail;
