import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SmartImage from "@/components/SmartImage";
import { DynamicIcon } from "@/components/DynamicIcon";
import { addClassToSpan, cn } from "@/lib/utils";
import {
  ArrowRight,
} from "lucide-react";

import {
  Reveal,
  MetaPill,
  ChapterLabel,
  SectionTitle,
  Body,
  cjContainer,
  cjCard,
  cjIconTile,
  cjIconGlyph,
  cjFocus,
} from "@/components/case-studies/simkyc/primitives";
import ChapterNav, { type Chapter } from "@/components/case-studies/simkyc/ChapterNav";
import CaseSnapshot from "@/components/case-studies/simkyc/CaseSnapshot";
import ObjectiveCard from "@/components/case-studies/simkyc/ObjectiveCard";




import {
  BenefitCard,
  DeliverableCard,
} from "@/components/case-studies/simkyc/MetricCard";

import SeoTags from "@/components/SeoTags";

type ChurnImage = { url?: string; alt?: string; title?: string; width?: number; height?: number };
type ChurnCaseStudyData = {
  title: string;
  image?: string;
  content?: any;
  content_new?: any;
  seo?: { title?: string; description?: string; og_image?: string };
  schema?: any;
};
type CustomerChurnProps = { data: ChurnCaseStudyData };

const iconName = (name?: string) => name?.replace(/^lucide-/, "") || "";
const imageUrl = (image?: ChurnImage | string, fallback = "") => typeof image === "string" ? image : image?.url || fallback;
const imageAlt = (image?: ChurnImage, fallback = "") => image?.alt || image?.title || fallback;
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
const extractParagraphs = (html = "") => [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => stripHtml(match[1])).filter(Boolean);
const extractMedallionLayers = (html = "") => {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].slice(1);
  return rows.map((row) => {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => stripHtml(cell[1]));
    const icon = row[1].match(/lucide-([a-z0-9-]+)/i)?.[1] || "layers";
    return { layer: cells[0] || "", purpose: cells[1] || "", examples: cells[2] || "", icon };
  });
};
const extractRiskBands = (html = "") => {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].slice(1);
  return rows.map((row) => {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => stripHtml(cell[1]));
    return { band: cells[0] || "", threshold: cells[1] || "" };
  }).filter((item) => item.band && item.threshold);
};
const extractTableHeaders = (html = "") =>
  [...html.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((match) => stripHtml(match[1])).filter(Boolean);

const mapCustomerChurnData = (data: ChurnCaseStudyData) => {
  const content = data.content || {};
  const newer = data.content_new || {};
  const blocks = (key: string) => newer[key] || [];
  const profileHeading = stripHtml((newer.new_tab_3_sixth_content || "").match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] || "");
  const profileDimensions = blocks("new_tab_3_sixth_content_list").map((item: any) => {
    const title = stripHtml((item.text.match(/<span[^>]*>([^<]+):?<\/span>/i) || ["", ""])[1]).replace(/:$/, "");
    return { title, text: stripHtml(item.text).replace(`${title}:`, "").trim(), icon: "user-check" };
  });

  return {
    chapters: [
      { id: "chapter-opportunity", label: content.tab_1_text },
      { id: "chapter-friction", label: content.tab_2_text },
      { id: "chapter-solution", label: newer.new_tab_3_text },
      { id: "chapter-delivery", label: newer.new_tab_4_text },
      { id: "chapter-impact", label: newer.new_tab_5_text },
    ] as Chapter[],
    snapshot: (content.category_row || []).map((item: any, index: number) => ({ label: item.label, value: item.text, icon: iconName(item.icon), tone: index === 1 || index === 2 ? "mint" : undefined })),
    challenges: (content.tab_2_cards || []).map((card: any, index: number) => ({ no: String(index + 1).padStart(2, "0"), icon: iconName(card.icon), img: imageUrl(card.image), alt: imageAlt(card.image, card.text), text: card.text })),
    objectives: (content.tab_2_second_cards || []).map((card: any, index: number) => ({ no: String(index + 1).padStart(2, "0"), title: card.title, text: card.content, icon: iconName(card.icon), img: imageUrl(card.image), alt: imageAlt(card.image, card.title) })),
    medallionLayers: extractMedallionLayers(newer.new_tab_3_second_content),
    featureSignals: blocks("new_tab_3_third_content_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    mlSteps: blocks("new_tab_3_fourth_content_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    churnInsightOutputs: blocks("new_tab_3_fifth_content_list").map((item: any) => ({ text: item.text, icon: "" })),
    profileHeading,
    profileDimensions,
    riskBands: extractRiskBands(newer.new_tab_3_seven_content),
    medallionHeaders: extractTableHeaders(newer.new_tab_3_second_content),
    riskHeaders: extractTableHeaders(newer.new_tab_3_seven_content),
    nextActions: blocks("new_tab_3_eight_content_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    qualityControls: blocks("new_tab_3_nine_content_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    successMetricsList: blocks("new_tab_4_first_content_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    benefits: blocks("new_tab_5_first_content_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    deliverables: blocks("new_tab_5_second_content_blocks").map((item: any) => ({ title: item.title, text: item.content, icon: iconName(item.icon), image: imageUrl(item.image) })),
    glanceStats: (newer.new_tab_5_fourth_content || []).map((item: any) => ({ value: item.col_1, label: item.col_2 })),
    imageAlts: { hero: data.title, context: imageAlt(content.tab_1_right_image), business: imageAlt(content.tab_1_left_image), ml: imageAlt(newer.new_tab_3_fourth_image), profile: imageAlt(newer.new_tab_3_sixth_image), dashboard: imageAlt(newer.new_tab_5_third_image), banner: imageAlt(content.bottom_banner_image) },
    images: { hero: imageUrl(data.image), context: imageUrl(content.tab_1_right_image), business: imageUrl(content.tab_1_left_image), ml: imageUrl(newer.new_tab_3_fourth_image), profile: imageUrl(newer.new_tab_3_sixth_image), dashboard: imageUrl(newer.new_tab_5_third_image), banner: imageUrl(content.bottom_banner_image) },
    paragraphs: {
      overview: extractParagraphs(content.tab_1_left_content), business: extractParagraphs(content.tab_1_right_content), generated: extractParagraphs(newer.new_tab_3_first_content), medallion: extractParagraphs(newer.new_tab_3_second_content), features: extractParagraphs(newer.new_tab_3_third_content), ml: extractParagraphs(newer.new_tab_3_fourth_content), insights: extractParagraphs(newer.new_tab_3_fifth_content), profile: extractParagraphs(newer.new_tab_3_sixth_content), outputs: extractParagraphs(newer.new_tab_3_seven_content), consent: newer.new_tab_3_eight_content, quality: newer.new_tab_3_nine_content, result: extractParagraphs(newer.new_tab_5_third_content),
    },
    headings: { overview: content.tab_1_left_heading, business: content.tab_1_right_heading, challenge: content.tab_2_heading, objectives: content.tab_2_second_heading, generated: newer.new_tab_3_first_heading, medallion: newer.new_tab_3_second_heading, features: newer.new_tab_3_third_heading, ml: newer.new_tab_3_fourth_heading, insights: newer.new_tab_3_fifth_heading, profile: newer.new_tab_3_sixth_heading, outputs: newer.new_tab_3_sevent_heading, consent: newer.new_tab_3_eight_heading, quality: newer.new_tab_3_nine_heading, success: newer.new_tab_4_first_heading, benefits: newer.new_tab_5_first_heading, deliverables: newer.new_tab_5_second_heading, result: newer.new_tab_5_third_heading, glance: newer.new_tab_5_fourth_heading },
  };
};

const chapterSpace = "pt-10 sm:pt-12 md:pt-14 lg:pt-16";
const blockSpace = "py-8 sm:py-9 md:py-10 lg:py-12";

const ListGrid = ({
  items,
  cols = "sm:grid-cols-2 lg:grid-cols-3",
  lastFullWidth = false,
}: {
  items: { text: string; icon: string }[];
  cols?: string;
  lastFullWidth?: boolean;
}) => (
  <div className={cn("mt-6 grid items-stretch gap-6", cols)}>
    {items.map((k, i) => {
      const isLast = i === items.length - 1;
      return (
        <Reveal key={k.text} delay={i * 40} className={cn("h-full", lastFullWidth && isLast && "col-span-full")}>
          <div className="group flex h-full items-center gap-4 rounded-[18px] border border-white/[0.07] bg-[#102236]/60 p-4 lg:p-5">
            <span className={cn(cjIconTile, "border-[#A9E7C2]/25 text-[#A9E7C2] group-hover:border-[#A9E7C2]/50")}>
              <DynamicIcon name={k.icon} aria-hidden="true" className={cjIconGlyph} />
            </span>
            <span className="min-w-0 flex-1 text-left text-[15px] font-medium leading-snug text-[#A8B8C7]">
              {k.text}
            </span>
          </div>
        </Reveal>
      );
    })}
  </div>
);

const CustomerChurnIntelligence = ({ data }: CustomerChurnProps) => {
  const [progress, setProgress] = useState(0);
  const content = data.content || {};
  const mapped = mapCustomerChurnData(data);
  const { chapters: mappedChapters, snapshot: mappedSnapshot, challenges: mappedChallenges, objectives: mappedObjectives,
    medallionLayers: mappedMedallionLayers, featureSignals: mappedFeatureSignals, mlSteps: mappedMlSteps,
    churnInsightOutputs: mappedChurnInsightOutputs, profileHeading: mappedProfileHeading, profileDimensions: mappedProfileDimensions, riskBands: mappedRiskBands,
    nextActions: mappedNextActions, qualityControls: mappedQualityControls, successMetricsList: mappedSuccessMetricsList,
    benefits: mappedBenefits, deliverables: mappedDeliverables, glanceStats: mappedGlanceStats, medallionHeaders: mappedMedallionHeaders, riskHeaders: mappedRiskHeaders, imageAlts, images, paragraphs, headings } = mapped;
  const newer = data.content_new || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <SeoTags
                    title={data.seo?.title || data.title}
                    description={data.seo?.description || content.listing_highlight_content}
                    ogImage={data.seo?.og_image || data.image}
                    schema={data.schema}
                  />
      <div className="bg-[#07111F]">
        <div className="fixed left-0 right-0 top-0 z-50 h-[3px]" aria-hidden="true">
          <div
            className="h-full bg-gradient-to-r from-[#69D6FF] to-[#A9E7C2] transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ============================= HERO ============================= */}
        <section
          id="hero"
          className="relative overflow-hidden pt-20 pb-10 focus:outline-none lg:pt-24 lg:pb-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 hidden h-[560px] w-[560px] md:block"
            style={{ background: "radial-gradient(circle, rgba(105,214,255,0.09) 0%, transparent 70%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 hidden h-[460px] w-[460px] md:block"
            style={{ background: "radial-gradient(circle, rgba(169,231,194,0.06) 0%, transparent 70%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(105,214,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(105,214,255,0.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 82%)",
            }}
          />

          <div className={cn(cjContainer, "relative z-10")}>
            <div className="grid items-stretch gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
              <div className="text-left">
                <Reveal>
                  <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#A8B8C7]">
                    <Link to="/" className={cn("rounded-sm transition-colors hover:text-[#69D6FF]", cjFocus)}>
                      Home
                    </Link>
                    <span className="mx-2 opacity-50" aria-hidden="true">/</span>
                    <Link to="/case-studies" className={cn("rounded-sm transition-colors hover:text-[#69D6FF]", cjFocus)}>
                      Case Studies
                    </Link>
                  </nav>
                </Reveal>

                <Reveal delay={80}>
                  <div className="mb-6 flex items-center gap-3">
                    <MetaPill>
                      <DynamicIcon name={iconName(content.listing_icon)} className="h-3.5 w-3.5" aria-hidden="true" />
                      {content.category_row?.[0]?.text}
                    </MetaPill>
                  </div>
                </Reveal>

                <Reveal delay={140}>
                  <h1 className="mb-6 text-[2rem] font-bold leading-[1.12] tracking-tight text-[#F7FAFC] sm:text-[2.5rem] lg:text-[3.1rem]">
                    <span dangerouslySetInnerHTML={{ __html: addClassToSpan(data.title, "text-gradient-brand") }} />
                  </h1>
                </Reveal>

                <Reveal delay={220}>
                  <Button
                    size="lg"
                    className={cn(
                      "group rounded-xl bg-gradient-to-r from-[#69D6FF] to-[#3AA6E0] px-8 py-6 font-semibold text-[#07111F] shadow-[0_0_28px_-10px_rgba(105,214,255,0.55)] transition-all duration-300 hover:shadow-[0_0_44px_-8px_rgba(105,214,255,0.75)]",
                      cjFocus
                    )}
                    asChild
                  >
                    <Link to={content.banner_button_url}>
                      {content.banner_button_text}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </Reveal>
              </div>

              <Reveal delay={180} className="h-full">
                <div className={cn(cjCard, "h-full overflow-hidden")}>
                  <SmartImage
                    src={images.hero}
                    alt={imageAlts.hero}
                    width={1200}
                    height={912}
                    loading="eager"
                    fetchPriority="high"
                    className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={260}>
              <CaseSnapshot items={mappedSnapshot} className="mt-12 lg:mt-16" />
            </Reveal>
          </div>
        </section>

        <ChapterNav chapters={mappedChapters} />

        {/* ==================== CHAPTER 1 — OPPORTUNITY ==================== */}
        <div id="chapter-opportunity" className={cn("focus:outline-none", chapterSpace)}>
          <div className={cjContainer}>
            <Reveal>
              <ChapterLabel>Chapter 01 — {content.tab_1_text}</ChapterLabel>
            </Reveal>

            <section id="overview" className="focus:outline-none">
              <div className="grid items-stretch gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
                <div>
                  <Reveal delay={60}>
                    <SectionTitle className="mb-6">{headings.overview}</SectionTitle>
                  </Reveal>
                  <div className="space-y-5">
                    <Reveal delay={120}>
                      <Body>
                        {paragraphs.overview[0]}
                      </Body>
                    </Reveal>
                    <Reveal delay={150}>
                      <Body>
                        {paragraphs.overview[1]}
                      </Body>
                    </Reveal>
                    <Reveal delay={170}>
                    <Body>
                        {paragraphs.overview[2]}
                      </Body>
                    </Reveal>
                  </div>
                </div>

                <Reveal delay={160} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.context}
                      alt={imageAlts.context}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            <section id="business-context" className={cn("focus:outline-none", blockSpace)}>
              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className="h-full">
                  <div className={cn(cjCard, "relative h-full overflow-hidden")}>
                    <SmartImage
                      src={images.business}
                      alt={imageAlts.business}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#07111F]/70 to-transparent" />
                  </div>
                </Reveal>

                <div>
                  <Reveal delay={60}>
                    <SectionTitle className="mb-6">{headings.business}</SectionTitle>
                  </Reveal>
                  <div className="mt-7 space-y-5">
                    <Reveal delay={160}>
                      <Body>
                        {paragraphs.business[0]}
                      </Body>
                    </Reveal>
                    <Reveal delay={190}>
                      <Body>
                        {paragraphs.business[1]}
                      </Body>
                    </Reveal>
                    <Reveal delay={220}>
                      <Body>
                        {paragraphs.business[2]}
                      </Body>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ===================== CHAPTER 2 — FRICTION ===================== */}
        <div id="chapter-friction" className={cn("focus:outline-none", chapterSpace)}>
          <div className={cjContainer}>
            <Reveal>
              <ChapterLabel>Chapter 02 — {content.tab_2_text}</ChapterLabel>
            </Reveal>

            <section id="challenge" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{headings.challenge}</SectionTitle>
              </Reveal>

              <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {mappedChallenges.map((c, i) => (
                  <Reveal key={c.no} delay={i * 50} className="h-full">
                    <article className="group flex h-full min-h-0 flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#102236]/70 transition-all duration-500 hover:border-[#69D6FF]/35 hover:shadow-[0_0_32px_rgba(105,214,255,0.10)]">
                      <div className="relative aspect-[16/9] shrink-0 overflow-hidden">
                        <SmartImage
                          src={c.img}
                          alt={c.alt}
                          loading="eager"
                          fetchPriority="high"
                          width={1024}
                          height={576}
                          pictureClassName="block h-full w-full"
                          className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#102236] via-transparent to-transparent"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5 lg:p-6">
                        <p className="text-left text-[14.5px] font-medium leading-[1.7] text-[#F7FAFC] lg:text-[15px]">
                          {c.text}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

            </section>

            <section id="objectives" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{headings.objectives}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-6 md:grid-cols-2 lg:gap-8">
                {mappedObjectives.map((o, i) => (
                  <Reveal key={o.no} delay={i * 70} className="h-full">
                    <ObjectiveCard item={o} />
                  </Reveal>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ================= CHAPTER 3 — CONNECTED SOLUTION ================ */}
        <div
          id="chapter-solution"
          className={cn("relative overflow-hidden focus:outline-none", chapterSpace)}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(105,214,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(105,214,255,0.4) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 78%)",
            }}
          />
          <div className={cn(cjContainer, "relative z-10")}>
            <Reveal>
              <ChapterLabel>Chapter 03 — {newer.new_tab_3_text}</ChapterLabel>
            </Reveal>

            <section id="solution-data" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.generated}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">
                    {paragraphs.generated[0]}
                  </Body>
                </Reveal>
                <Reveal delay={140}>
                  <Body className="max-w-none">
                    {paragraphs.generated[1]}
                  </Body>
                </Reveal>
                <Reveal delay={170}>
                  <Body className="max-w-none">
                    {paragraphs.generated[2]}
                  </Body>
                </Reveal>
              </div>

            </section>

            <section id="solution-medallion" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.medallion}</SectionTitle>
              </Reveal>

              <Reveal delay={110}>
                <Body className="max-w-none">
                  {paragraphs.medallion[0]}
                </Body>
              </Reveal>

              <Reveal delay={140}>
                <div className={cn(cjCard, "mt-8 overflow-hidden")}>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          {mappedMedallionHeaders[0]}
                        </th>
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          {mappedMedallionHeaders[1]}
                        </th>
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          {mappedMedallionHeaders[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mappedMedallionLayers.map((l, i) => (
                        <tr
                          key={l.layer}
                          className={cn(
                            "transition-colors hover:bg-white/[0.02]",
                            i !== mappedMedallionLayers.length - 1 && "border-b border-white/[0.07]"
                          )}
                        >
                          <td className="px-5 py-4 align-top text-[14.5px] font-semibold text-[#F7FAFC] sm:px-7">
                            <span className="flex items-center gap-2.5">
                              <DynamicIcon name={l.icon} aria-hidden="true" className="h-4 w-4 shrink-0 text-[#69D6FF]" />
                              {l.layer}
                            </span>
                          </td>
                          <td className="px-5 py-4 align-top text-[14px] leading-[1.6] text-[#A8B8C7] sm:px-7">
                            {l.purpose}
                          </td>
                          <td className="px-5 py-4 align-top text-[13px] leading-[1.65] text-[#A9E7C2] sm:px-7">
                            <code className="font-numbers">{l.examples}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>

              <div className="mt-8">
                <Reveal delay={240}>
                  <Body className="max-w-none">
                    {paragraphs.medallion[1]}
                  </Body>
                </Reveal>
              </div>

            </section>

            <section id="solution-features" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.features}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">
                    {paragraphs.features[0]}
                  </Body>
                </Reveal>
                <Reveal delay={140}>
                  <Body className="max-w-none">
                    {paragraphs.features[1]}
                  </Body>
                </Reveal>
              </div>

              <ListGrid items={mappedFeatureSignals} />

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_third_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-ml" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.ml}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  <Reveal delay={110}>
                    <Body>
                      {paragraphs.ml[0]}
                    </Body>
                  </Reveal>
                  <ListGrid items={mappedMlSteps} cols="sm:grid-cols-2" />
                  <Reveal delay={240}>
                    <Body>
                      {newer.new_tab_3_fourth_bottom_content}
                    </Body>
                  </Reveal>
                </div>

                <Reveal delay={140} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.ml}
                      alt={imageAlts.ml}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            <section id="solution-insights" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.insights}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">{paragraphs.insights[0]}</Body>
                </Reveal>
                <Reveal delay={140}>
                  <Body className="max-w-none">{paragraphs.insights[1]}</Body>
                </Reveal>
              </div>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {mappedChurnInsightOutputs.map((item, i) => (
                  <Reveal key={item.text} delay={120 + i * 40}>
                    <li className="flex items-center gap-3 text-[15px] text-[#F7FAFC]">
                      <span className="h-2 w-2 shrink-0 rotate-45 bg-[#69D6FF]" aria-hidden="true" />
                      {item.text}
                    </li>
                  </Reveal>
                ))}
              </ul>

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_fifth_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-360" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.profile}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  <Reveal delay={110}>
                    <h3 className="text-lg font-semibold text-[#F7FAFC] lg:text-xl">{mappedProfileHeading}</h3>
                    <Body className="mt-2">{paragraphs.profile[0]}</Body>
                  </Reveal>
                  <Reveal delay={140}>
                    <Body>{paragraphs.profile[1]}</Body>
                  </Reveal>
                  <ul className="space-y-3.5">
                    {mappedProfileDimensions.map((p, i) => (
                      <Reveal key={p.title} delay={i * 50}>
                        <li className="flex items-start gap-3 text-[15px] leading-[1.65]">
                          <span className="mt-[7px] h-2 w-2 shrink-0 rotate-45 bg-[#69D6FF]" aria-hidden="true" />
                          <span className="text-[#F7FAFC]">
                            <span className="font-semibold text-[#69D6FF]">{p.title}:</span>{" "}
                            <span className="text-[#A8B8C7]">{p.text}</span>
                          </span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                  <Reveal delay={280}>
                    <Body>
                      {newer.new_tab_3_sixth_bottom_content}
                    </Body>
                  </Reveal>
                </div>

                <Reveal delay={140} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.profile}
                      alt={imageAlts.profile}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            <section id="solution-bands" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.outputs}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">
                    {paragraphs.outputs[0]}
                  </Body>
                </Reveal>
                <Reveal delay={140}>
                  <Body className="max-w-none">
                    {paragraphs.outputs[1]}
                  </Body>
                </Reveal>
              </div>

              <Reveal delay={140}>
                <div className={cn(cjCard, "mt-8 max-w-2xl overflow-hidden")}>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.09]">
                        <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#69D6FF] lg:px-8">
                          {mappedRiskHeaders[0]}
                        </th>
                        <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#69D6FF] lg:px-8">
                          {mappedRiskHeaders[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mappedRiskBands.map((r) => (
                        <tr key={r.band} className="border-b border-white/[0.06] last:border-0 transition-colors hover:bg-white/[0.02]">
                          <td className="px-6 py-4 text-[1.0rem] font-semibold text-[#F7FAFC] lg:px-8">{r.band}</td>
                          <td className="px-6 py-4 font-mono text-[14px] text-[#A9E7C2] lg:px-8">{r.threshold}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </section>

            <section id="solution-consent" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.consent}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">
                    {paragraphs.consent}
                  </Body>
                </Reveal>
              </div>

              <ListGrid items={mappedNextActions} cols="grid-cols-2 lg:grid-cols-4" />

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_eight_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            <section id="quality-security" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.quality}</SectionTitle>
              </Reveal>
              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">
                    {paragraphs.quality}
                  </Body>
                </Reveal>
              </div>
              <ListGrid items={mappedQualityControls} cols="grid-cols-1 md:grid-cols-2" lastFullWidth />
            </section>
          </div>
        </div>

        {/* ================== CHAPTER 4 — DELIVERY SYSTEM ================== */}
        <div id="chapter-delivery" className={cn("focus:outline-none", chapterSpace)}>
          <div className={cjContainer}>
            <Reveal>
              <ChapterLabel>Chapter 04 — {newer.new_tab_4_text}</ChapterLabel>
            </Reveal>


            <section id="success-metrics" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{headings.success}</SectionTitle>
              </Reveal>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {mappedSuccessMetricsList.map((m, i) => (
                  <Reveal
                    key={m.text}
                    delay={i * 70}
                    className={cn(
                      "h-full",
                      i === mappedSuccessMetricsList.length - 1 &&
                        mappedSuccessMetricsList.length % 3 === 1 &&
                        "sm:col-span-2 lg:col-span-3"
                    )}
                  >
                    <BenefitCard item={m} />
                  </Reveal>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* ====================== CHAPTER 5 — IMPACT ====================== */}
        <div
          id="chapter-impact"
          className={cn("relative overflow-hidden focus:outline-none", chapterSpace)}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
            style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(105,214,255,0.07), transparent 70%)" }}
          />
          <div className={cn(cjContainer, "relative z-10")}>
            <Reveal>
              <ChapterLabel>Chapter 05 — {newer.new_tab_5_text}</ChapterLabel>
            </Reveal>

            <section id="benefits" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{headings.benefits}</SectionTitle>
              </Reveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
                {mappedBenefits.map((b, i) => {
                  const isLast = i === mappedBenefits.length - 1;
                  const isLastPair = i >= mappedBenefits.length - 2;
                  return (
                    <Reveal
                      key={b.text}
                      delay={i * 70}
                      className={cn(
                        "h-full",
                        isLast
                          ? "col-span-full sm:col-span-2 lg:col-span-3"
                          : isLastPair
                            ? "col-span-full sm:col-span-1 lg:col-span-3"
                            : "col-span-full sm:col-span-1 lg:col-span-2"
                      )}
                    >
                      <BenefitCard item={b} />
                    </Reveal>
                  );
                })}
              </div>
            </section>

            <section id="deliverables" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{headings.deliverables}</SectionTitle>
              </Reveal>
              <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                {mappedDeliverables.map((d, i) => {
                  const isLast = i === mappedDeliverables.length - 1;
                  return (
                    <Reveal key={d.title} delay={i * 70} className={cn("h-full w-full", isLast && "lg:col-span-2")}>
                      <DeliverableCard item={d} variant="portrait" />
                    </Reveal>
                  );
                })}
              </div>
            </section>

            <section id="result" className={cn("focus:outline-none", blockSpace)}>
              <div className={cn(cjCard, "relative overflow-hidden p-7 md:p-10 lg:p-12")}>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#69D6FF]/10 blur-3xl"
                />
                <div className="relative grid items-stretch gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                  <div>
                    <Reveal delay={60}>
                      <SectionTitle className="mb-6">{headings.result}</SectionTitle>
                    </Reveal>
                    <div className="space-y-5">
                      <Reveal delay={110}>
                        <Body>
                          {paragraphs.result[0]}
                        </Body>
                      </Reveal>
                      <Reveal delay={140}>
                        <Body>
                          {paragraphs.result[1]}
                        </Body>
                      </Reveal>
                      <Reveal delay={170}>
                        <Body>
                          {paragraphs.result[2]}
                        </Body>
                      </Reveal>
                      <Reveal delay={200}>
                        <Body>
                          {paragraphs.result[3]}
                        </Body>
                      </Reveal>
                    </div>
                  </div>

                  <Reveal delay={140} className="h-full">
                    <div className="h-full overflow-hidden rounded-[22px] border border-white/[0.08]">
                      <SmartImage
                        src={images.dashboard}
                        alt={imageAlts.dashboard}
                        width={1200}
                        height={675}
                        loading="eager"
                        className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                      />
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>

            <section id="at-a-glance" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{headings.glance}</SectionTitle>
              </Reveal>

              <div className="mx-auto w-full max-w-3xl">
                <div className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-2 sm:px-10 sm:py-4">
                  {mappedGlanceStats.map((s, i) => (
                    <Reveal key={s.label} delay={i * 80}>
                      <div className="grid grid-cols-[80px_1fr] items-center gap-4 py-4 sm:grid-cols-[120px_1fr] sm:gap-8 sm:py-5">
                        <div className="font-mono text-lg font-semibold leading-none text-[#69D6FF] sm:text-xl">
                          {s.value}
                        </div>
                        <div className="text-[15px] leading-snug text-[#F7FAFC] sm:text-base">
                          {s.label}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ============================== CTA ============================== */}
        <section id="cta" className="relative overflow-hidden">
          <div className="absolute inset-0">
            <SmartImage
              src={images.banner}
              alt=""
              loading="eager"
              width={1920}
              height={640}
              className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#07111F]/95 via-[#07111F]/80 to-[#07111F]/60" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-[#07111F]/40" />
          </div>

          <div className={cn(cjContainer, "relative z-10 py-14 lg:py-20")}>
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="text-left text-[1.85rem] font-bold leading-[1.12] tracking-tight sm:text-[2.25rem] lg:text-[2.6rem]">
                  <span className="text-gradient-brand">{content.bottom_banner_heading}</span>
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#A8B8C7] sm:text-[16px]">
                  {content.bottom_banner_content}
                </p>
                <div className="mt-8 flex flex-col justify-start gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className={cn(
                      "group w-full rounded-xl bg-gradient-to-r from-[#69D6FF] to-[#3AA6E0] font-semibold text-[#07111F] sm:w-auto",
                      cjFocus
                    )}
                    asChild
                  >
                    <Link to={content.bottom_banner_buttons?.[0]?.button_url}>
                      {content.bottom_banner_buttons?.[0]?.button_text}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                      "group w-full rounded-xl border-white/20 text-[#F7FAFC] hover:bg-white/5 sm:w-auto",
                      cjFocus
                    )}
                    asChild
                  >
                    <Link to={content.bottom_banner_buttons?.[1]?.button_url}>
                      {content.bottom_banner_buttons?.[1]?.button_text}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomerChurnIntelligence;
