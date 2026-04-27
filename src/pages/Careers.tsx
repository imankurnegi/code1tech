import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import JobApplicationForm from "@/components/JobApplicationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/api";
import { DynamicIcon } from "@/components/DynamicIcon";
import he from "he";
import {
  Search, MapPin, Briefcase, ArrowRight,
  Code, Database, Brain, BarChart3, Cloud, Rocket, Building2
} from "lucide-react";
import SeoTags from "@/components/SeoTags";

const Careers = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  const { data: careersResponse } = useQuery({
    queryKey: ["careers-page"],
    queryFn: api.getCareersData,
  });

  const { data: jobsResponse, isLoading } = useQuery({
    queryKey: ["job-listings"],
    queryFn: api.getAllJobs,
  });

  const careersData = careersResponse?.data?.careers_data;
  const careersSeo = careersResponse?.data?.seo;
  const jobsRaw = jobsResponse?.data?.jobs ?? [];

  const jobListings = jobsRaw.map((job: any) => ({
    id: job.id,
    slug: job?.slug || "",
    title: he.decode(job.title || ""),
    category: he.decode(job?.job_categories?.[0]?.name || ""),
    location: `${he.decode(job?.job_career_city?.[0]?.name || "")}, ${he.decode(job?.job_career_country?.[0]?.name || "")}`.replace(/,\s*$/, ""),
    city: he.decode(job?.job_career_city?.[0]?.name || ""),
    country: he.decode(job?.job_career_country?.[0]?.name || ""),
    type: he.decode(job?.job_career_hire_type?.[0]?.name || ""),
    department: he.decode(job?.job_career_department?.[0]?.name || ""),
    created_at: job.date ? new Date(job.date).toISOString() : "",
  }));

  const categoryTabs: string[] = ["All", ...Array.from(new Set<string>(jobListings.map((job: any) => job.category)))];

  const filteredJobs = jobListings.filter((job) => {
    const matchCategory = activeCategory === "All" || job.category === activeCategory;
    const matchKeyword = !searchKeyword || job.title.toLowerCase().includes(searchKeyword.toLowerCase()) || job.category.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchLocation = !searchLocation || job.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchCategory && matchKeyword && matchLocation;
  });

  const positions: string[] = [...Array.from(new Set<string>(jobListings.map((j: any) => j.title))), "Other"];
  const locationMap = new Map<string, number>();
  jobListings.forEach((job: any) => {
    const key = job.city || "Remote";
    locationMap.set(key, (locationMap.get(key) || 0) + 1);
  });
  const locations = Array.from(locationMap.entries()).map(([city, roles]) => ({ city, roles }));

  const bannerTags = careersData?.banner_tags ?? [];
  const cultureCards = careersData?.community_cards ?? [];
  const benefits = careersData?.benefits_cards ?? [];


  return (
    <>
    <SeoTags
        title={careersSeo?.title}
        description={careersSeo?.description}
        ogImage={careersSeo?.og_image}
        schema={careersResponse?.data?.schema}
      />
      {/* Global subtle grid texture */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0" style={{
        backgroundImage: 'linear-gradient(rgba(95,194,227,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh] 2xl:min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28" style={{ background: "hsl(222 47% 5%)" }}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
          style={{ backgroundImage: `url(${careersSeo?.og_image})` }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(222 47% 5% / 0.6) 0%, hsl(222 47% 4% / 0.4) 50%, hsl(222 47% 5% / 0.6) 100%)' }} />
        
        {/* Soft vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 150px 60px hsl(222 47% 5% / 0.7)' }} />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />

        {/* Floating particles - hidden on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          {[...Array(12)].map((_, i) => <div key={i} className="absolute w-1 h-1 rounded-full bg-accent/20 animate-float" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }} />)}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">
          <div className={`max-w-4xl 2xl:max-w-5xl mx-auto text-center transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="text-xs sm:text-sm font-semibold text-accent mb-3 sm:mb-4 tracking-wider uppercase animate-pulse">
              {careersData?.top_title}
            </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              <span
                className="text-foreground [&_span]:bg-gradient-to-r [&_span]:from-[#5FC2E3] [&_span]:to-[#0077B6] [&_span]:bg-clip-text [&_span]:text-transparent"
                dangerouslySetInnerHTML={{ __html: he.decode(careersData?.main_title || "") }}
              />
            </h1>
            <p className="text-sm sm:text-base 2xl:text-lg max-w-3xl mx-auto text-muted-foreground leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
              {careersData?.paragraph}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 max-w-sm sm:max-w-none mx-auto">
              {bannerTags.map((stat: any, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 sm:px-4">
                  <DynamicIcon name={stat.icon} className="w-4 h-4 text-accent shrink-0" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="font-bold text-foreground text-sm sm:text-base leading-tight">{stat.number || stat.count}</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{stat.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 pointer-events-none z-[1]" style={{
          background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
        }} />
      </section>


      {/* Join Us Section with Stats */}
      <section className="py-4 lg:py-6" style={{ background: "hsl(222 47% 5%)" }}>
        <div className="container mx-auto px-4 sm:px-6 2xl:px-12 text-center">
          <p className="text-xs font-semibold text-accent mb-3 tracking-wider uppercase">{careersData?.banner_bottom_text}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-5xl font-bold text-foreground mb-4">
            <span
              className="[&_span]:text-gradient"
              dangerouslySetInnerHTML={{ __html: he.decode(careersData?.banner_below_heading || "") }}
            />
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl 2xl:max-w-3xl mx-auto mb-8 sm:mb-12">
            {careersData?.banner_below_paragraph}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl 2xl:max-w-5xl mx-auto">
            {(careersData?.banner_below_tags ?? bannerTags).map((stat: any, i: number) => (
              <div key={i} className="group">
                <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(95,194,227,0.1)] transition-all duration-500">
                  <DynamicIcon name={stat.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.number || stat.count}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-4 lg:py-6" style={{ background: "hsl(222 47% 5%)" }}>
        <div className="container mx-auto px-4 sm:px-6 2xl:px-12">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            <span
              className="[&_span]:text-gradient"
              dangerouslySetInnerHTML={{ __html: he.decode(careersData?.community_heading || "") }}
            />
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">
            {careersData?.community_paragraph}
          </p>

          {/* Full-width culture image banner */}
          <div className="relative rounded-2xl overflow-hidden mb-8 sm:mb-10 group max-w-6xl 2xl:max-w-7xl mx-auto">
            <img
              src={careersData?.community_image?.url}
              alt={careersData?.community_image_text || ""}
              className="w-full h-60 sm:h-72 md:h-80 lg:h-[340px] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              width={1920}
              height={640}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/10" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-10 md:px-12">
              <div>
                <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">{careersData?.community_image_text}</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:whitespace-nowrap">
                  <span
                    className="text-foreground [&_span]:bg-gradient-to-r [&_span]:from-[#5FC2E3] [&_span]:to-[#0077B6] [&_span]:bg-clip-text [&_span]:text-transparent"
                    dangerouslySetInnerHTML={{ __html: he.decode(careersData?.community_image_heading || "") }}
                  />
                </p>
                <p className="text-foreground text-sm sm:text-base sm:whitespace-nowrap">{careersData?.community_image_paragraph}</p>
              </div>
            </div>
          </div>

          {/* 3-column cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl 2xl:max-w-7xl mx-auto">
            {cultureCards.map((card: any, i: number) => (
              <div
                key={i}
                className="group relative rounded-xl bg-gradient-to-br from-card to-card/60 border border-border/40 p-5 sm:p-6 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <DynamicIcon name={card.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">{he.decode(card.title)}</h3>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{he.decode(card.paragraph)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-4 lg:py-6" style={{ background: "hsl(222 47% 5%)" }}>
        <div className="container mx-auto px-4 sm:px-6 2xl:px-12">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            <span
              className="[&_span]:text-gradient"
              dangerouslySetInnerHTML={{ __html: he.decode(careersData?.innovate_heading || "") }}
            />
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">
            {careersData?.paragraph}
          </p>

          {/* Location chips — mobile: stacked, tablet: 3+2 centered, desktop: single row */}
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto">
            {/* Mobile: vertical list */}
            <div className="flex flex-col items-center gap-2.5 sm:hidden">
              {locations.map((loc, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-card/50 border border-border/50 rounded-full px-5 py-3 hover:border-accent/40 transition-all duration-300 w-full max-w-[260px]">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="font-semibold text-foreground text-sm">{loc.city}</span>
                  <span className="ml-auto bg-accent/15 text-accent text-xs font-medium px-2 py-0.5 rounded-full">{loc.roles}</span>
                </div>
              ))}
            </div>
            {/* Tablet: 3+2 centered */}
            <div className="hidden sm:flex lg:hidden flex-col items-center gap-3">
              <div className="flex justify-center gap-3">
                {locations.slice(0, 3).map((loc, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-card/50 border border-border/50 rounded-full px-5 py-3 hover:border-accent/40 transition-all duration-300">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span className="font-semibold text-foreground text-sm">{loc.city}</span>
                    <span className="bg-accent/15 text-accent text-xs font-medium px-2 py-0.5 rounded-full">{loc.roles}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3">
                {locations.slice(3).map((loc, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-card/50 border border-border/50 rounded-full px-5 py-3 hover:border-accent/40 transition-all duration-300">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span className="font-semibold text-foreground text-sm">{loc.city}</span>
                    <span className="bg-accent/15 text-accent text-xs font-medium px-2 py-0.5 rounded-full">{loc.roles}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop: single row */}
            <div className="hidden lg:flex justify-center gap-3">
              {locations.map((loc, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-card/50 border border-border/50 rounded-full px-5 py-3 hover:border-accent/40 transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span className="font-semibold text-foreground text-sm">{loc.city}</span>
                  <span className="bg-accent/15 text-accent text-xs font-medium px-2 py-0.5 rounded-full">{loc.roles}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar — below Innovate section */}
      <section className="py-4 lg:py-6" style={{ background: "hsl(222 47% 5%)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto backdrop-blur-xl bg-[hsl(222_47%_8%/0.9)] border border-[rgba(148,163,184,0.2)] rounded-2xl p-4 sm:p-5 md:p-7 shadow-[0_12px_50px_-12px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="text-[11px] font-semibold text-accent tracking-widest uppercase mb-2 block">Find Jobs For</label>
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <Input placeholder="Job title, skill, or category" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className="pl-11 h-11 sm:h-12 bg-[rgba(255,255,255,0.04)] border-[rgba(148,163,184,0.18)] rounded-xl text-sm placeholder:text-muted-foreground/50 focus:border-accent/50 focus:bg-[rgba(255,255,255,0.06)] transition-all" />
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-[rgba(148,163,184,0.15)]" />
              <div className="flex-1 w-full">
                <label className="text-[11px] font-semibold text-accent tracking-widest uppercase mb-2 block">Where?</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <Input placeholder="City, state, or remote" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="pl-11 h-11 sm:h-12 bg-[rgba(255,255,255,0.04)] border-[rgba(148,163,184,0.18)] rounded-xl text-sm placeholder:text-muted-foreground/50 focus:border-accent/50 focus:bg-[rgba(255,255,255,0.06)] transition-all" />
                </div>
              </div>
              <Button variant="hero" size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 rounded-xl text-sm font-semibold shadow-[0_4px_20px_-4px_hsl(var(--accent)/0.4)] hover:shadow-[0_4px_28px_-4px_hsl(var(--accent)/0.6)] transition-shadow">
                <Search className="w-4 h-4 mr-2" />
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>


      <section className="py-4 lg:py-6" style={{ background: "hsl(222 47% 5%)" }}>
        <div className="container mx-auto px-4 sm:px-6 2xl:px-12">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-8 sm:mb-12">
            <span
              className="[&_span]:text-gradient"
              dangerouslySetInnerHTML={{ __html: he.decode(careersData?.roles_heading || "") }}
            />
          </h2>

          {/* Category Filter Tabs */}
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto mb-8 sm:mb-10">
            <div className="flex flex-wrap justify-center gap-2">
              {categoryTabs.map((cat) => {
                const isActive = activeCategory === cat;
                const iconMap: Record<string, React.ElementType> = {
                  "All": Briefcase,
                  "Engineering": Code,
                  "AI / ML": Brain,
                  "Data Engineering": Database,
                  "Data Science": BarChart3,
                  "Cloud & DevOps": Cloud,
                  "Product Management": Rocket,
                };
                const Icon = iconMap[cat] || Briefcase;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border ${
                      isActive
                        ? "bg-accent/15 text-accent border-accent/30"
                        : "bg-card/50 text-muted-foreground border-border/50 hover:border-accent/30 hover:text-foreground hover:bg-card"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat === "Product Management" ? "Product Mgmt" : cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="max-w-4xl 2xl:max-w-5xl mx-auto space-y-3">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-border/40 rounded-xl animate-pulse p-6">
                  <div className="h-5 bg-muted/30 rounded w-2/3 mb-4" />
                  <div className="flex gap-3">
                    <div className="h-4 bg-muted/20 rounded w-24" />
                    <div className="h-4 bg-muted/20 rounded w-20" />
                    <div className="h-4 bg-muted/20 rounded w-28" />
                  </div>
                </div>
              ))
            ) : filteredJobs.map((job, i) => (
              <Link to={`/careers/${job.slug || job.id}`} key={i} className="block group">
                <div className="relative bg-[rgba(255,255,255,0.02)] border border-border/30 rounded-xl p-5 sm:p-6 hover:bg-[rgba(255,255,255,0.04)] hover:border-accent/30 transition-all duration-500 overflow-hidden">
                  {/* Subtle left accent bar */}
                  <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-accent/0 group-hover:bg-accent/60 transition-all duration-500 rounded-full" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-foreground text-base sm:text-lg group-hover:text-accent transition-colors duration-300 truncate">
                          {job.title}
                        </h3>
                        <span className="hidden sm:inline-flex shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                          {job.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-accent/60" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-accent/60" /> {job.category}
                        </span>
                        {job.department && (
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-accent/60" /> {job.department}
                          </span>
                        )}
                        <span className="text-muted-foreground/50 text-xs">
                          {job.created_at
                            ? new Date(job.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                            : ""}
                        </span>
                      </div>
                      {/* Mobile type badge */}
                      <span className="sm:hidden inline-flex mt-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                        {job.type}
                      </span>
                    </div>
                    <div className="shrink-0 flex items-center">
                      <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors duration-300">
                        View Role <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!isLoading && filteredJobs.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No jobs match your search criteria. Try adjusting your filters.</p>
          )}

        </div>
      </section>

      {/* Benefits */}
      <section className="py-4 lg:py-6" style={{ background: "hsl(222 47% 5%)" }}>
        <div className="container mx-auto px-4 sm:px-6 2xl:px-12">
          <p className="text-xs font-semibold text-accent mb-3 tracking-wider uppercase text-center">{careersData?.benefits_tags}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-8 sm:mb-12">
            <span
              className="[&_span]:text-gradient"
              dangerouslySetInnerHTML={{ __html: he.decode(careersData?.benefits_heading || "") }}
            />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl 2xl:max-w-6xl mx-auto">
            {benefits.map((benefit: any, i: number) => (
              <Card key={i} className="bg-card border-border hover:border-accent/30 hover:-translate-y-1 transition-all duration-500 group">
                <CardContent className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-accent/10 shrink-0 group-hover:bg-accent/20 transition-colors">
                    {"icon" in benefit && typeof benefit.icon === "string" ? (
                      <DynamicIcon name={benefit.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    ) : (
                      <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{he.decode(benefit.title)}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{he.decode(benefit.paragraph || benefit.desc)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-4 lg:py-6" style={{ background: "hsl(222 47% 5%)" }}>
        <div className="container mx-auto px-4 sm:px-6 2xl:px-12">
          <div 
            className="relative overflow-hidden rounded-2xl border border-white/[0.08]"
            style={{
              background: "linear-gradient(135deg, #0E1525 0%, #101428 40%, #12102A 100%)",
            }}
          >
            {/* Background image */}
            <img 
              src={careersData?.bottom_cta_image?.url} 
              alt="" 
              loading="lazy"
              width={800}
              height={512}
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            />
            {/* Decorative glows */}
            <div className="absolute -top-24 -left-24 w-[300px] h-[300px] rounded-full bg-[#7C3AED]/[0.06] blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-[300px] h-[300px] rounded-full bg-[#38BDF8]/[0.06] blur-[100px] pointer-events-none" />
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 sm:px-12 md:px-16 py-10 sm:py-12 md:py-14">
              <div className="text-center md:text-left max-w-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                  {careersData?.bottom_cta_heading}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {careersData?.bottom_cta_paragraph}
                </p>
              </div>
              <div className="flex-shrink-0">
                <JobApplicationForm
                  positions={positions}
                  trigger={
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 transition-all duration-300 px-8 rounded-full"
                    >
                      {careersData?.bottom_cta_button_text} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;

