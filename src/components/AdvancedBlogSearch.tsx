import { useState, useEffect, useRef, useMemo, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Clock, TrendingUp, Hash, ArrowRight, CornerDownLeft } from "lucide-react";

// ── API types (mirrored from Blogs.tsx) ──────────────────────────────────────
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
  image: string | false;
  categories: ApiCategory[];
  author: ApiAuthor;
}

interface Props {
  posts: ApiPost[];
  value: string;
  onChange: (v: string) => void;
  getCategoryColor: (name: string) => string;
  onCategorySelect?: (cat: string) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const RECENT_KEY = "blog_recent_searches";
const TRENDING = ["AI Agents", "Data Mesh", "Zero Trust", "Vector DB", "Cloud Migration"];

// Category fallback images (same set as Blogs.tsx)
import blogAi     from "@/assets/blog-ai.jpg";
import blogData   from "@/assets/blog-data.jpg";
import blogCloud  from "@/assets/blog-cloud.jpg";
import blogDevops from "@/assets/blog-devops.jpg";
import blogHero   from "@/assets/blog-hero.jpg";

const categoryFallbackImages: Record<string, string> = {
  ai:      blogAi,
  data:    blogData,
  cloud:   blogCloud,
  devops:  blogDevops,
};

const resolveImage = (image: string | false, categorySlug?: string): string => {
  if (image && typeof image === "string") return image;
  return categoryFallbackImages[categorySlug?.toLowerCase() ?? ""] ?? blogHero;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const primaryCategory     = (post: ApiPost) => post.categories?.[0]?.name ?? "";
const primaryCategorySlug = (post: ApiPost) => post.categories?.[0]?.slug ?? "";

const highlight = (text: string, q: string) => {
  if (!q.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="bg-accent/25 text-accent rounded px-0.5">{p}</mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
const AdvancedBlogSearch = ({ posts, value, onChange, getCategoryColor, onCategorySelect }: Props) => {
  const [open,      setOpen]      = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [recent,    setRecent]    = useState<string[]>([]);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw).slice(0, 5));
    } catch {}
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Build suggestions from dynamic ApiPost data
  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return posts
      .filter(post =>
        post.title?.toLowerCase().includes(q) ||
        post.content?.toLowerCase().includes(q) ||
        primaryCategory(post).toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [value, posts]);

  // Derive unique category names from loaded posts for the Categories section
  const uniqueCategories = useMemo(() => {
    const seen = new Set<string>();
    const result: { name: string; slug: string }[] = [];
    posts.forEach(post => {
      const name = primaryCategory(post);
      const slug = primaryCategorySlug(post);
      if (name && !seen.has(slug)) {
        seen.add(slug);
        result.push({ name, slug });
      }
    });
    return result;
  }, [posts]);

  const saveRecent = (term: string) => {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recent.filter(r => r.toLowerCase() !== t.toLowerCase())].slice(0, 5);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch {}
  };

  const clearRecent = () => {
    setRecent([]);
    try { localStorage.removeItem(RECENT_KEY); } catch {}
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && suggestions[activeIdx]) {
        saveRecent(value);
        navigate(`/blog/${suggestions[activeIdx].slug}`);
        setOpen(false);
      } else if (value.trim()) {
        saveRecent(value);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const showDropdown = open && (value.trim() ? true : recent.length > 0 || TRENDING.length > 0);

  return (
    <div ref={wrapRef} className="relative">
      <label className="text-[11px] font-semibold text-accent tracking-widest uppercase mb-2 block">
        Search Articles
      </label>

      {/* Input */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by title, topic, or category…"
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); setActiveIdx(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          aria-label="Search articles"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          className="w-full pl-11 pr-24 h-12 bg-[rgba(255,255,255,0.04)] border border-[rgba(148,163,184,0.18)] rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:bg-[rgba(255,255,255,0.06)] transition-all"
        />
        {value && (
          <button
            type="button"
            onClick={() => { onChange(""); inputRef.current?.focus(); }}
            aria-label="Clear search"
            className="absolute right-14 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-6 sm:h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition"
          >
            <X className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          </button>
        )}
        <kbd className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-muted-foreground">
          <CornerDownLeft className="w-3 h-3" /> Enter
        </kbd>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 left-0 right-0 mt-2 rounded-xl border border-[rgba(148,163,184,0.2)] bg-[hsl(222_47%_7%/0.98)] backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">

          {/* ── Suggestions (when query is active) ── */}
          {value.trim() ? (
            suggestions.length > 0 ? (
              <ul role="listbox" className="max-h-[380px] overflow-y-auto py-1">
                <li className="px-4 py-2.5 sm:py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                  {suggestions.length} match{suggestions.length === 1 ? "" : "es"}
                </li>
                {suggestions.map((post, i) => (
                  <li key={post.id} role="option" aria-selected={activeIdx === i}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => {
                        saveRecent(value);
                        navigate(`/blog/${post.slug}`);
                        setOpen(false);
                      }}
                      className={`w-full text-left flex items-center gap-3.5 sm:gap-3 px-3 py-4 sm:py-2.5 transition-colors min-h-[56px] sm:min-h-0 ${
                        activeIdx === i ? "bg-accent/10" : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <img
                        src={resolveImage(post.image, primaryCategorySlug(post))}
                        alt=""
                        loading="lazy"
                        className="w-14 h-14 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0 border border-white/5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 sm:mb-0.5">
                          <span className={`text-[10px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-1 sm:px-1.5 sm:py-0.5 rounded border ${getCategoryColor(primaryCategory(post))}`}>
                            {primaryCategory(post)}
                          </span>
                          <span className="text-[11px] sm:text-[10px] text-muted-foreground/60 font-mono">
                            {post.author?.name}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-foreground truncate">
                          {highlight(post.title, value)}
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0 transition-all ${
                        activeIdx === i ? "text-accent translate-x-0.5" : "text-muted-foreground/40"
                      }`} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              /* No results */
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-foreground font-medium mb-1">No matches for "{value}"</p>
                <p className="text-xs text-muted-foreground">Try a different keyword or browse trending tags below.</p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-1.5 mt-4">
                  {TRENDING.slice(0, 4).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => { onChange(t); inputRef.current?.focus(); }}
                      className="text-xs px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-full bg-white/[0.04] hover:bg-accent/10 border border-white/10 hover:border-accent/40 text-muted-foreground hover:text-accent transition min-h-[36px] sm:min-h-0"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            /* ── Empty query: recent + trending + categories ── */
            <div className="py-2">

              {/* Recent searches */}
              {recent.length > 0 && (
                <div className="px-3 pt-1 pb-2">
                  <div className="flex items-center justify-between px-1 mb-2 sm:mb-1.5">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                      <Clock className="w-3 h-3" /> Recent
                    </span>
                    <button
                      type="button"
                      onClick={clearRecent}
                      className="text-[10px] text-muted-foreground hover:text-accent transition px-2 py-1 -mr-2"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-1.5">
                    {recent.map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => { onChange(r); inputRef.current?.focus(); }}
                        className="text-xs px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-full bg-white/[0.04] hover:bg-accent/10 border border-white/10 hover:border-accent/40 text-foreground/80 hover:text-accent transition min-h-[36px] sm:min-h-0"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending */}
              <div className="px-3 pt-1 pb-2">
                <span className="flex items-center gap-1.5 px-1 mb-2 sm:mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                  <TrendingUp className="w-3 h-3" /> Trending
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-1.5">
                  {TRENDING.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => { onChange(t); inputRef.current?.focus(); }}
                      className="text-xs px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-full bg-white/[0.04] hover:bg-accent/10 border border-white/10 hover:border-accent/40 text-foreground/80 hover:text-accent transition min-h-[36px] sm:min-h-0"
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories — derived from live API posts */}
              {onCategorySelect && uniqueCategories.length > 0 && (
                <div className="px-3 pt-1 pb-3 border-t border-white/5 mt-1">
                  <span className="flex items-center gap-1.5 px-1 mb-2 sm:mb-1.5 mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                    <Hash className="w-3 h-3" /> Categories
                  </span>
                  <div className="flex flex-wrap gap-2 sm:gap-1.5">
                    {uniqueCategories.map(cat => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => { onCategorySelect(cat.slug); setOpen(false); }}
                        className={`text-xs px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-full border transition min-h-[36px] sm:min-h-0 ${getCategoryColor(cat.name)} hover:opacity-80`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedBlogSearch;
