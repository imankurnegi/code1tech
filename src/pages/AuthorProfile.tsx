import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ArrowLeft, Clock, Calendar,
  BookOpen, Mail, Linkedin, Twitter, MessageSquare
} from "lucide-react";
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import blogHero        from "@/assets/blog-hero.jpg";
import blogAi          from "@/assets/blog-ai.jpg";
import blogData        from "@/assets/blog-data.jpg";
import blogCloud       from "@/assets/blog-cloud.jpg";
import blogDevops      from "@/assets/blog-devops.jpg";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ApiCategory { id: number; name: string; slug: string; }
interface ApiAuthor {
  id: number; name: string; username: string; slug: string;
  email: string; avatar: string; description: string; profile_url: string;
}
interface ApiPost {
  id: number; title: string; slug: string; content: string;
  date: string; link: string; image: string | false;
  categories: ApiCategory[]; author: ApiAuthor;
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
  categoryColors[name] ?? "bg-muted/30 text-muted-foreground border-border/40";

const fallbackImages: Record<string, string> = {
  ai: blogAi, data: blogData, cloud: blogCloud, devops: blogDevops,
};

const resolveImage = (image: string | false, categorySlug?: string): string => {
  if (image && typeof image === "string") return image;
  return fallbackImages[categorySlug?.toLowerCase() ?? ""] ?? blogHero;
};

const formatDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" })
      .format(new Date(iso));
  } catch { return iso; }
};

const primaryCategory     = (p: ApiPost) => p.categories?.[0]?.name ?? "";
const primaryCategorySlug = (p: ApiPost) => p.categories?.[0]?.slug ?? "";

// ── Component ─────────────────────────────────────────────────────────────────
const AuthorProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate  = useNavigate();

  const [posts,   setPosts]   = useState<ApiPost[]>([]);
  const [author,  setAuthor]  = useState<ApiAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!slug) { navigate("/blogs", { replace: true }); return; }

    setLoading(true);
    setError(null);

    api.getAllPosts()
      .then(res => {
        const all: ApiPost[] = res?.data ?? [];

        // Filter posts written by this author slug
        const authorPosts = all.filter(p => p.author?.slug === slug);

        if (authorPosts.length === 0) {
          navigate("/blogs", { replace: true });
          return;
        }

        // Author info from first matching post
        setAuthor(authorPosts[0].author);
        setPosts(authorPosts);
      })
      .catch(() => setError("Failed to load author data."))
      .finally(() => setLoading(false));
  }, [slug]);

  // Unique categories this author has written in
  const categories = useMemo(
    () => Array.from(new Map(
      posts.flatMap(p => p.categories).map(c => [c.slug, c])
    ).values()),
    [posts]
  );

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (

        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin mx-auto" />
            <p className="text-muted-foreground text-sm">Loading author profile…</p>
          </div>
        </div>

    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error || !author) {
    return (

        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <p className="text-rose-400">{error ?? "Author not found."}</p>
            <Link to="/blogs">
              <Button variant="outline" className="mt-2">← Back to Blog</Button>
            </Link>
          </div>
        </div>

    );
  }

  const firstName = author.name.split(" ")[0];
  const seoTitle  = `${author.name} — Author at Code1 Tech`;
  const seoDesc   = author.description
    ? author.description
    : `Read all ${posts.length} ${posts.length === 1 ? "article" : "articles"} by ${author.name} on Code1 Tech.`;
  const seoImage  = author.avatar || blogHero;

  return (
    <>
      <SeoTags
        title={seoTitle}
        description={seoDesc}
        ogImage={seoImage}
      />


      {/* Back link */}
      <section className="pt-8 pb-2">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
        </div>
      </section>

      {/* ── Author hero ──────────────────────────────────────────────────────── */}
      <section className="pt-8 pb-12 md:pt-12 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,80%,12%)]/40 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-4xl mx-auto rounded-3xl border border-border/40 bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-sm p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">

              {/* Avatar */}
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl object-cover ring-2 ring-accent/30 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground text-4xl md:text-5xl font-bold">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}

              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.18em] text-accent mb-2 font-semibold">Author Profile</p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {author.name}
                </h1>

                {/* Description / bio */}
                {author.description && (
                  <p className="text-muted-foreground text-sm md:text-base mt-3 leading-relaxed max-w-2xl">
                    {author.description}
                  </p>
                )}

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span>{posts.length} {posts.length === 1 ? "article" : "articles"}</span>
                  </div>

                  {/* Category badges */}
                  {categories.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      {categories.map(c => (
                        <Link
                          key={c.slug}
                          to={`/blogs?category=${encodeURIComponent(c.slug)}`}
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-all hover:scale-[1.04] ${getCategoryColor(c.name)}`}
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social links */}
                <div className="flex items-center gap-2 mt-5">
                  {author.profile_url && (
                    <a
                      href={author.profile_url}
                      target="_blank" rel="noopener noreferrer"
                      className="p-2 bg-muted/40 hover:bg-accent/20 rounded-lg transition-colors"
                      aria-label="Author profile"
                    >
                      <BookOpen className="w-4 h-4 text-muted-foreground hover:text-accent" />
                    </a>
                  )}
                  {author.email && (
                    <a
                      href={`mailto:${author.email}`}
                      className="p-2 bg-muted/40 hover:bg-accent/20 rounded-lg transition-colors"
                      aria-label="Email author"
                    >
                      <Mail className="w-4 h-4 text-muted-foreground hover:text-accent" />
                    </a>
                  )}
                  {/* Placeholders — wire up when social links added to API */}
                  <button className="p-2 bg-muted/40 hover:bg-accent/20 rounded-lg transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4 text-muted-foreground hover:text-accent" />
                  </button>
                  <button className="p-2 bg-muted/40 hover:bg-accent/20 rounded-lg transition-colors" aria-label="Twitter">
                    <Twitter className="w-4 h-4 text-muted-foreground hover:text-accent" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Articles grid ─────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Articles by {firstName}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Insights, deep dives, and field notes.
                </p>
              </div>
              <span className="font-mono text-xs text-muted-foreground/70 px-3 py-1.5 rounded-full border border-border/40 bg-[rgba(255,255,255,0.02)]">
                {String(posts.length).padStart(2, "0")} articles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => {
                const catName  = primaryCategory(post);
                const catSlug  = primaryCategorySlug(post);
                const imgSrc   = resolveImage(post.image, catSlug);

                return (
                  <Link
                    key={post.id}
                    to={`/blogs/${post.slug}`}
                    className="group relative block rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 hover:border-accent/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300"
                  >
                    {/* Hover glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/20 via-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10" />

                    {/* Thumbnail */}
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={imgSrc}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5">
                      {/* Category badge */}
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getCategoryColor(catName)}`}>
                        {catName}
                      </span>

                      <h3 className="mt-3 text-lg font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {post.content}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.date)}
                        </span>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-1.5 text-accent text-sm font-medium">
                        Read article
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto rounded-3xl border border-accent/30 bg-gradient-to-br from-[hsl(222,47%,8%)] via-[hsl(210,80%,12%)] to-[hsl(222,47%,8%)] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent/20 rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  Want to work with experts like {firstName}?
                </h3>
                <p className="text-muted-foreground mt-2 max-w-xl">
                  Get a free 30-minute strategy session with our team and turn your toughest challenges into shipped outcomes.
                </p>
              </div>
              <Link to="/contact" className="shrink-0">
                <Button variant="hero" size="lg" className="group">
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthorProfile;
