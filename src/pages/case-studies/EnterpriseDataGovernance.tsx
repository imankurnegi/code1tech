import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SmartImage from "@/components/SmartImage";
import { addClassToSpan, cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

import {
  Reveal,
  MetaPill,
  ChapterLabel,
  SectionTitle,
  Body,
  Counter,
  cjContainer,
  cjCard,
  cjIconTile,
  cjIconGlyph,
  cjFocus,
} from "@/components/case-studies/simkyc/primitives";
import ChapterNav, { type Chapter } from "@/components/case-studies/simkyc/ChapterNav";
import CaseSnapshot from "@/components/case-studies/simkyc/CaseSnapshot";
import ChallengeCard from "@/components/case-studies/simkyc/ChallengeCard";
import ObjectiveCard from "@/components/case-studies/simkyc/ObjectiveCard";
import { DeliverableCard } from "@/components/case-studies/simkyc/MetricCard";
import KpiCommandCenter from "@/components/case-studies/KpiCommandCenter";
import PremiumBenefitsGrid from "@/components/case-studies/PremiumBenefitsGrid";

import SeoTags from "@/components/SeoTags";

import { DynamicIcon } from "@/components/DynamicIcon";

type GovernanceImage = { url?: string; alt?: string; title?: string };
type GovernanceCaseStudyData = {
  title: string;
  image?: string;
  categories?: string[];
  content?: Record<string, any>;
  content_new?: Record<string, any>;
  seo?: { title?: string; description?: string; og_image?: string };
  schema?: string | object;
};

const iconName = (name?: string) => name?.replace(/^lucide-/, "") || "";
const imageUrl = (image?: GovernanceImage | string) => typeof image === "string" ? image : image?.url || "";
const imageAlt = (image?: GovernanceImage, fallback = "") => image?.alt || image?.title || fallback;
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
const extractParagraphs = (html = "") => [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => stripHtml(match[1])).filter(Boolean);
const extractRows = (html = "") => [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].slice(1).map((row) => [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => stripHtml(cell[1])));
const extractMedallionLayers = (html = "") => [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].slice(1).map((row) => {
  const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => stripHtml(cell[1]));
  return { layer: cells[0] || "", purpose: cells[1] || "", examples: cells[2] || "", icon: iconName(row[1].match(/lucide-([a-z0-9-]+)/i)?.[1] || "lucide-layers") };
});
const extractCodes = (html = "") => [...html.matchAll(/<code[^>]*>([\s\S]*?)<\/code>/gi)].map((match) => stripHtml(match[1])).filter(Boolean);

const mapGovernanceData = (data: GovernanceCaseStudyData) => {
  const content = data.content || {};
  const newer = data.content_new || {};
  const list = (key: string) => Array.isArray(newer[key]) ? newer[key] : [];
  const textItems = (items: any[] = []) => items.map((item) => ({ text: item.text, icon: iconName(item.icon) }));
  const paragraphs = {
    overview: extractParagraphs(content.tab_1_left_content),
    business: extractParagraphs(content.tab_1_right_content),
    ingest: extractParagraphs(newer.new_tab_3_first_content),
    medallion: extractParagraphs(newer.new_tab_3_second_content),
    quality: extractParagraphs(newer.new_tab_3_third_content),
    incident: extractParagraphs(newer.new_tab_3_fourth_content),
    metadata: extractParagraphs(newer.new_tab_3_fifth_content),
    security: extractParagraphs(newer.new_tab_3_sixth_content),
    analytics: extractParagraphs(newer.new_tab_3_seven_content),
    ai: extractParagraphs(newer.new_tab_3_eight_content),
    managed: extractParagraphs(newer.new_tab_3_nine_content),
    result: extractParagraphs(newer.new_tab_5_third_content),
    operations: extractParagraphs(newer.new_tab_3_ten_second_sub_content),
  };
  const htmlTable = newer.new_tab_5_fourth_content || "";
  return {
    chapters: [
      { id: "chapter-opportunity", label: content.tab_1_text },
      { id: "chapter-friction", label: content.tab_2_text },
      { id: "chapter-solution", label: newer.new_tab_3_text },
      { id: "chapter-delivery", label: newer.new_tab_4_text },
      { id: "chapter-impact", label: newer.new_tab_5_text },
    ] as Chapter[],
    snapshot: (content.category_row || []).map((item: any, index: number) => ({ label: item.label, value: item.text, icon: iconName(item.icon), tone: index === 1 || index === 2 ? "mint" : undefined })),
    challenges: (content.tab_2_cards || []).map((item: any, index: number) => ({ no: String(index + 1).padStart(2, "0"), icon: iconName(item.icon), img: imageUrl(item.image), alt: imageAlt(item.image, item.text), text: item.text })),
    objectives: (content.tab_2_second_cards || []).map((item: any, index: number) => ({ no: String(index + 1).padStart(2, "0"), title: item.title, text: item.content, icon: iconName(item.icon), img: imageUrl(item.image), alt: imageAlt(item.image, item.title) })),
    outcomes: textItems(list("new_tab_2_third_content")),
    medallionLayers: extractMedallionLayers(newer.new_tab_3_second_content || ""),
    medallionHeaders: [...(newer.new_tab_3_second_content || "").matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((match) => stripHtml(match[1])),
    validationExamples: textItems(list("new_tab_3_third_content_blocks")),
    incidentSignals: list("new_tab_3_fourth_content_blocks").map((item: any) => ({ value: item.col_1, label: item.col_2 })),
    metadataCapabilities: textItems(list("new_tab_3_fifth_content_lists")),
    sensitiveControls: textItems(list("new_tab_3_sixth_content_lists")),
    governanceAnalytics: textItems(list("new_tab_3_seven_content_lists")),
    featureLayer: extractCodes(newer.new_tab_3_eight_content || ""),
    ingestExamples: extractCodes(newer.new_tab_3_first_content || ""),
    managedServices: textItems(list("new_tab_3_nine_content_lists")),
    securityItems: textItems(list("new_tab_3_ten_content_lists")),
    operationalItems: textItems(list("new_tab_3_ten_second_sub_content_lists")),
    successMetricsList: list("new_tab_4_first_content_blocks").map((item: any, index: number) => ({ text: `${item.title}: ${item.content}`, icon: iconName(item.icon), accent: index === 1 || index === 4 ? "#A9E7C2" : "#69D6FF" })),
    benefits: list("new_tab_5_first_content_blocks").map((item: any) => ({ text: item.content, icon: iconName(item.icon) })),
    deliverables: list("new_tab_5_second_content_blocks").map((item: any) => ({ title: item.title, text: item.content, icon: iconName(item.icon), image: imageUrl(item.image) })),
    glanceStats: extractRows(htmlTable).map((cells) => ({ label: cells[0] || "", value: cells[1] || "" })),
    glanceHeaders: [...htmlTable.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((match) => stripHtml(match[1])),
    paragraphs,
    headings: {
      overview: content.tab_1_left_heading, business: content.tab_1_right_heading,
      challenge: content.tab_2_heading, objectives: content.tab_2_second_heading, outcomes: newer.new_tab_2_third_heading,
      ingest: newer.new_tab_3_first_heading, medallion: newer.new_tab_3_second_heading,
      quality: newer.new_tab_3_third_heading, incident: newer.new_tab_3_fourth_heading,
      metadata: newer.new_tab_3_fifth_heading, security: newer.new_tab_3_sixth_heading,
      analytics: newer.new_tab_3_seven_heading, ai: newer.new_tab_3_eight_heading,
      managed: newer.new_tab_3_nine_heading, operations: newer.new_tab_3_ten_heading,
      delivery: newer.new_tab_4_first_heading, benefits: newer.new_tab_5_first_heading,
      deliverables: newer.new_tab_5_second_heading, result: newer.new_tab_5_third_heading,
      glance: newer.new_tab_5_fourth_heading,
    },
    images: {
      hero: imageUrl(data.image), context: imageUrl(content.tab_1_right_image), business: imageUrl(content.tab_1_left_image),
      ingest: imageUrl(newer.new_tab_3_first_image), incident: imageUrl(newer.new_tab_3_fourth_image),
      metadata: imageUrl(newer.new_tab_3_fifth_image),
      managed: imageUrl(newer.new_tab_3_nine_image), result: imageUrl(newer.new_tab_5_third_image),
      banner: imageUrl(content.bottom_banner_image),
    },
  };
};

const chapterSpace = "pt-10 sm:pt-12 md:pt-14 lg:pt-16";
const blockSpace = "py-8 sm:py-9 md:py-10 lg:py-12";

const ListGrid = ({
  items,
  cols = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  items: { text: string; icon: string }[];
  cols?: string;
}) => (
  <div className={cn("mt-6 grid items-stretch gap-6", cols)}>
    {items.map((item, index) => (
      <Reveal key={item.text} delay={index * 40} className="h-full">
        <div className="group flex h-full items-center gap-4 rounded-[18px] border border-white/[0.07] bg-[#102236]/60 p-4 lg:p-5">
          <span className={cn(cjIconTile, "border-[#A9E7C2]/25 text-[#A9E7C2] group-hover:border-[#A9E7C2]/50")}>
            <DynamicIcon name={item.icon} aria-hidden="true" className={cjIconGlyph} />
          </span>
          <span className="min-w-0 flex-1 text-left text-[15px] font-medium leading-snug text-[#A8B8C7]">
            {item.text}
          </span>
        </div>
      </Reveal>
    ))}
  </div>
);

const EnterpriseDataGovernance = ({ data }: { data: GovernanceCaseStudyData }) => {
  const [progress, setProgress] = useState(0);
  const content = data.content || {};
  const newer = data.content_new || {};
  const mapped = mapGovernanceData(data);
  const {
    chapters,
    snapshot,
    challenges,
    objectives,
    outcomes: businessOutcomes,
    medallionLayers,
    medallionHeaders,
    validationExamples,
    incidentSignals,
    metadataCapabilities,
    sensitiveControls,
    governanceAnalytics,
    featureLayer,
    ingestExamples,
    managedServices,
    securityItems,
    operationalItems,
    successMetricsList,
    benefits,
    deliverables,
    glanceStats,
    glanceHeaders,
    paragraphs,
    headings,
    images,
  } = mapped;
  const titleMarkup = addClassToSpan(data.title.replace(/(Data Quality Accelerator)$/, "<span>$1</span>"), "text-gradient-brand");

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
        title={data.seo?.title}
        description={data.seo?.description}
        ogImage={data.seo?.og_image}
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
        <section id="hero" className="relative overflow-hidden pt-20 pb-10 focus:outline-none lg:pt-24 lg:pb-12">
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
                      {content.category_row?.[0]?.text || data.categories?.[0]}
                    </MetaPill>
                  </div>
                </Reveal>

                <Reveal delay={140}>
                  <h1
                    className="mb-6 text-[2rem] font-bold leading-[1.12] tracking-tight text-[#F7FAFC] sm:text-[2.5rem] lg:text-[3.1rem]"
                    dangerouslySetInnerHTML={{ __html: titleMarkup }}
                  />
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
                    <Link to={content.banner_button_url || "/contactus"}>
                      {content.banner_button_text || "Discuss a Similar Project"}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </Reveal>
              </div>

              <Reveal delay={180} className="h-full">
                <div className={cn(cjCard, "h-full overflow-hidden")}>
                  <SmartImage
                    src={images.hero}
                    alt={imageAlt({ title: data.title }, data.title)}
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
              <CaseSnapshot items={snapshot} className="mt-12 lg:mt-16" />
            </Reveal>
          </div>
        </section>

        <ChapterNav chapters={chapters} />

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
                    <Reveal delay={190}>
                      <Body>
                        {paragraphs.overview[3]}
                      </Body>
                    </Reveal>
                  </div>
                </div>

                <Reveal delay={160} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.context}
                      alt={imageAlt(content.tab_1_right_image, data.title)}
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
                      alt={imageAlt(content.tab_1_left_image, data.title)}
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
                  <div className="space-y-5">
                    <Reveal delay={120}>
                      <Body>
                        {paragraphs.business[0]}
                      </Body>
                    </Reveal>
                    <Reveal delay={150}>
                      <Body>
                        {paragraphs.business[1]}
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

              <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                {challenges.map((c, i) => (
                  <Reveal key={c.no} delay={i * 70} className="h-full">
                    <ChallengeCard item={c} />
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="objectives" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{headings.objectives}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-6 md:grid-cols-2 lg:gap-8">
                {objectives.map((o, i) => (
                  <Reveal key={o.no} delay={i * 70} className="h-full">
                    <ObjectiveCard item={o} />
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="business-outcomes" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.outcomes}</SectionTitle>
              </Reveal>
              <Reveal delay={100}>
                <div className={cn(cjCard, "p-6 lg:p-7")}>
                  <ul className="space-y-4">
                    {businessOutcomes.map((o, i) => (
                      <li
                        key={o.text}
                        className="flex items-start gap-3 text-left text-[15px] leading-[1.7] text-[#A8B8C7]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5CC8DC]"
                        />
                        <span>{o.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </section>
          </div>
        </div>

        {/* ================= CHAPTER 3 — CONNECTED SOLUTION ================ */}
        <div id="chapter-solution" className={cn("relative overflow-hidden focus:outline-none", chapterSpace)}>
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

            <section id="solution-ingest" className="focus:outline-none">
              <div className="grid items-stretch gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
                <div>
                  <Reveal delay={60}>
                    <SectionTitle className="mb-6">{headings.ingest}</SectionTitle>
                  </Reveal>
                  <div className="space-y-5">
                    <Reveal delay={110}>
                      <Body>
                        {paragraphs.ingest[0]}
                      </Body>
                    </Reveal>
                    <Reveal delay={140}>
                      <Body>
                        {paragraphs.ingest[1]}
                      </Body>
                    </Reveal>
                    <Reveal delay={170}>
                      <div className="space-y-3">
                        <div className="rounded-[18px] border border-white/[0.08] bg-[#102236]/60 px-5 py-4">
                          <code className="font-numbers text-[13.5px] leading-[1.8] text-[#A9E7C2]">
                            {ingestExamples[0]}
                          </code>
                        </div>
                        <div className="rounded-[18px] border border-white/[0.08] bg-[#102236]/60 px-5 py-4">
                          <code className="font-numbers text-[13.5px] leading-[1.8] text-[#A9E7C2]">
                            {ingestExamples[1]}
                          </code>
                        </div>
                      </div>
                    </Reveal>
                    <Reveal delay={200}>
                      <Body>
                        {paragraphs.ingest[2]}
                      </Body>
                    </Reveal>
                  </div>
                </div>

                <Reveal delay={160} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.ingest}
                      alt={imageAlt(newer.new_tab_3_first_image, data.title)}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            <section id="solution-medallion" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.medallion}</SectionTitle>
              </Reveal>

              <Reveal delay={100}>
                <Body className="max-w-none">
                  {paragraphs.medallion[0]}
                </Body>
              </Reveal>

              <Reveal delay={140}>
                <div className={cn(cjCard, "mt-6 overflow-hidden")}>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          {medallionHeaders[0]}
                        </th>
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          {medallionHeaders[1]}
                        </th>
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          {medallionHeaders[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {medallionLayers.map((l, i) => (
                        <tr
                          key={l.layer}
                          className={cn(
                            "transition-colors hover:bg-white/[0.02]",
                            i !== medallionLayers.length - 1 && "border-b border-white/[0.07]"
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

              <div className="mt-7">
                <Reveal delay={180}>
                  <Body className="max-w-none">
                    {paragraphs.medallion[1]}
                  </Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-quality" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.quality}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={100}>
                  <Body className="max-w-none">{paragraphs.quality[0]}</Body>
                </Reveal>
                <Reveal delay={130}>
                  <Body className="max-w-none">{paragraphs.quality[1]}</Body>
                </Reveal>
                <Reveal delay={160}>
                  <Body className="max-w-none">{paragraphs.quality[2]}</Body>
                </Reveal>
              </div>

              <ListGrid items={validationExamples} />

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_third_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-incident" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.incident}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-5">
                  <Reveal delay={100}>
                    <Body>{paragraphs.incident[0]}</Body>
                  </Reveal>
                  <Reveal delay={130}>
                    <Body>{paragraphs.incident[1]}</Body>
                  </Reveal>
                  <Reveal delay={160}>
                    <Body>{paragraphs.incident[2]}</Body>
                  </Reveal>
                </div>

                <Reveal delay={140} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.incident}
                      alt={imageAlt(newer.new_tab_3_fourth_image, data.title)}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
                {incidentSignals.map((s, i) => (
                  <Reveal key={s.label} delay={i * 70} className="h-full">
                    <div className={cn(cjCard, "h-full p-6 lg:p-7")}>
                      <div className="flex items-center gap-4">
                        <div className="max-w-[48%] shrink-0 break-words font-bold leading-[1.15] text-[#69D6FF] [font-size:clamp(1.1rem,1.3vw,1.5rem)]">
                          <Counter value={s.value} />
                        </div>
                        <div className="min-w-0 flex-1 text-[13.5px] leading-snug text-[#A8B8C7]">{s.label}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="solution-metadata" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.metadata}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
                <div className="space-y-5">
                  <Reveal delay={100}>
                    <Body>{paragraphs.metadata[0]}</Body>
                  </Reveal>
                  <Reveal delay={130}>
                    <Body>{paragraphs.metadata[1]}</Body>
                  </Reveal>
                  <Reveal delay={160}>
                    <div className={cn(cjCard, "p-6 lg:p-7")}>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {metadataCapabilities.map((m) => (
                          <li
                            key={m.text}
                            className="flex items-start gap-3 text-left text-[15px] leading-[1.7] text-[#A8B8C7]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5CC8DC]"
                            />
                            <span>{m.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={150} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.metadata}
                      alt={imageAlt(newer.new_tab_3_fifth_image, data.title)}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_fifth_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-security" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.security}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={100}>
                  <Body className="max-w-none">{paragraphs.security[0]}</Body>
                </Reveal>
                <Reveal delay={130}>
                  <Body className="max-w-none">{paragraphs.security[1]}</Body>
                </Reveal>
                <Reveal delay={160}>
                  <div className={cn(cjCard, "p-6 lg:p-7")}>
                    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {sensitiveControls.map((s) => (
                        <li
                          key={s.text}
                          className="flex items-start gap-3 text-left text-[15px] leading-[1.7] text-[#A8B8C7]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5CC8DC]"
                          />
                          <span>{s.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_sixth_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-analytics" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.analytics}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={100}>
                  <Body className="max-w-none">{paragraphs.analytics[0]}</Body>
                </Reveal>
                <Reveal delay={130}>
                  <Body className="max-w-none">{paragraphs.analytics[1]}</Body>
                </Reveal>
                <Reveal delay={160}>
                  <div className={cn(cjCard, "p-6 lg:p-7")}>
                    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {governanceAnalytics.map((g) => (
                        <li
                          key={g.text}
                          className="flex items-start gap-3 text-left text-[15px] leading-[1.7] text-[#A8B8C7]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5CC8DC]"
                          />
                          <span>{g.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_seven_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-ai" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.ai}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
                <div className="space-y-5">
                  <Reveal delay={100}>
                    <Body>{paragraphs.ai[0]}</Body>
                  </Reveal>
                  <Reveal delay={130}>
                    <Body>{paragraphs.ai[1]}</Body>
                  </Reveal>
                  <Reveal delay={160}>
                    <div className="flex flex-wrap gap-2.5">
                      {featureLayer.map((f) => (
                        <code
                          key={f}
                          className="font-numbers rounded-lg border border-white/[0.08] bg-[#102236]/60 px-3 py-2 text-[12.5px] text-[#A9E7C2]"
                        >
                          {f}
                        </code>
                      ))}
                    </div>
                  </Reveal>
                  <Reveal delay={190}>
                    <Body>{paragraphs.ai[2]}</Body>
                  </Reveal>
                </div>

                <Reveal delay={150} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={imageUrl(newer.new_tab_3_eight_image)}
                      alt={imageAlt(newer.new_tab_3_eight_image, data.title)}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            <section id="solution-managed" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.managed}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
                <div className="space-y-5">
                  <Reveal delay={100}>
                    <Body>{paragraphs.managed[0]}</Body>
                  </Reveal>
                  <Reveal delay={130}>
                    <Body>{paragraphs.managed[1]}</Body>
                  </Reveal>
                  <Reveal delay={160}>
                    <div className={cn(cjCard, "p-6 lg:p-7")}>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {managedServices.map((m) => (
                          <li
                            key={m.text}
                            className="flex items-start gap-3 text-left text-[15px] leading-[1.7] text-[#A8B8C7]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5CC8DC]"
                            />
                            <span>{m.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={150} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.managed}
                      alt={imageAlt(newer.new_tab_3_nine_image, data.title)}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            <section id="quality-security" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{headings.operations}</SectionTitle>
              </Reveal>

              <Reveal delay={100}>
                <h3 className="text-lg font-semibold text-[#F7FAFC] lg:text-xl">{newer.new_tab_3_ten_sub_heading}</h3>
              </Reveal>
              <Reveal delay={120}>
                <Body className="mt-3 max-w-none">{newer.new_tab_3_ten_content}</Body>
              </Reveal>
              <Reveal delay={140}>
                <div className={cn(cjCard, "p-6 lg:p-7")}>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {securityItems.map((s) => (
                      <li
                        key={s.text}
                        className="flex items-start gap-3 text-left text-[15px] leading-[1.7] text-[#A8B8C7]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5CC8DC]"
                        />
                        <span>{s.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <div className="mt-10">
                <Reveal delay={100}>
                  <h3 className="text-lg font-semibold text-[#F7FAFC] lg:text-xl">{newer.new_tab_3_ten_second_sub_heading}</h3>
                </Reveal>
                <Reveal delay={120}>
                  <Body className="mt-3 max-w-none">
                    {paragraphs.operations[0]}
                  </Body>
                </Reveal>
                <Reveal delay={140}>
                  <Body className="mt-4 max-w-none">{paragraphs.operations[1]}</Body>
                </Reveal>
                <Reveal delay={160}>
                  <div className={cn(cjCard, "p-6 lg:p-7")}>
                    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {operationalItems.map((o) => (
                        <li
                          key={o.text}
                          className="flex items-start gap-3 text-left text-[15px] leading-[1.7] text-[#A8B8C7]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5CC8DC]"
                          />
                          <span>{o.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
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
              <KpiCommandCenter
                id="success-metrics-grid"
                eyebrow=""
                title={headings.delivery}
                subtitle={newer.new_tab_4_first_content}
                monitoringLabel={newer.new_tab_4_first_content_qa_label}
                items={successMetricsList}
              />
            </section>
          </div>
        </div>

        {/* ====================== CHAPTER 5 — IMPACT ====================== */}
        <div id="chapter-impact" className={cn("relative overflow-hidden focus:outline-none", chapterSpace)}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
            style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(105,214,255,0.07), transparent 70%)" }}
          />
          <div className={cn(cjContainer, "relative z-10")}>
            <Reveal>
              <ChapterLabel>Chapter 05 — {newer.new_tab_5_text}</ChapterLabel>
            </Reveal>

            <PremiumBenefitsGrid
              id="benefits"
              className={blockSpace}
              eyebrow=""
              title={headings.benefits}
              items={benefits.map((b) => ({
                label: b.text,
                text: "",
                icon: b.icon,
              }))}
            />

            <section id="deliverables" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{headings.deliverables}</SectionTitle>
              </Reveal>
              <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
                {deliverables.map((d, i) => {
                  const isLast = i === deliverables.length - 1 && deliverables.length % 3 === 1;
                  return (
                    <Reveal
                      key={d.title}
                      delay={i * 70}
                      className={cn("h-full w-full", isLast && "sm:col-span-2 xl:col-span-3")}
                    >
                      <DeliverableCard item={d} variant={isLast ? "landscape" : "portrait"} />
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
                      <Reveal delay={230}>
                        <Body>
                          {paragraphs.result[4]}
                        </Body>
                      </Reveal>
                    </div>
                  </div>

                  <Reveal delay={140} className="h-full">
                    <div className="h-full overflow-hidden rounded-[22px] border border-white/[0.08]">
                      <SmartImage
                        src={images.result}
                        alt={imageAlt(newer.new_tab_5_third_image, data.title)}
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

              <Reveal delay={100}>
                <div className={cn(cjCard, "overflow-hidden overflow-x-auto")}>
                  <table className="w-full min-w-[560px] text-left">
                    <thead>
                      <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          {glanceHeaders[0]}
                        </th>
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          {glanceHeaders[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {glanceStats.map((s, i) => (
                        <tr
                          key={s.label}
                          className={cn(
                            "transition-colors hover:bg-white/[0.02]",
                            i !== glanceStats.length - 1 && "border-b border-white/[0.07]",
                          )}
                        >
                          <td className="px-5 py-4 align-top text-[14.5px] font-semibold text-[#F7FAFC] sm:px-7">
                            {s.label}
                          </td>
                          <td className="px-5 py-4 align-top text-[14px] leading-[1.6] text-[#A9E7C2] sm:px-7">
                            {s.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </section>
          </div>
        </div>

        {/* ============================== CTA ============================== */}
        <section id="cta" className="relative overflow-hidden">
          <div className="absolute inset-0">
            <SmartImage
              src={images.banner}
              alt={imageAlt(content.bottom_banner_image)}
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
                    <Link to={content.bottom_banner_buttons?.[0]?.button_url || "/contactus"}>
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
                    <Link to={content.bottom_banner_buttons?.[1]?.button_url || "/case-studies"}>
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

export default EnterpriseDataGovernance;
