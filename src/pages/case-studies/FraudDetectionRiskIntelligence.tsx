import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SmartImage from "@/components/SmartImage";
import { DynamicIcon } from "@/components/DynamicIcon";
import { addClassToSpan, cn } from "@/lib/utils";
import {
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
import CaseSnapshot, { type SnapshotItem } from "@/components/case-studies/simkyc/CaseSnapshot";
import ObjectiveCard from "@/components/case-studies/simkyc/ObjectiveCard";

import TestingRail from "@/components/case-studies/simkyc/TestingRail";

import { DeliverableCard } from "@/components/case-studies/simkyc/MetricCard";

import PremiumBenefitsGrid from "@/components/case-studies/PremiumBenefitsGrid";
import KpiCommandCenter from "@/components/case-studies/KpiCommandCenter";
import SeoTags from "@/components/SeoTags";

type FraudImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

type FraudCaseStudyData = {
  title: string;
  seo?: { title?: string; description?: string; og_image?: string };
  schema?: any;
  image?: string;
  content: any;
  content_new?: any;
};

type FraudCaseStudyProps = { data: FraudCaseStudyData };

const iconName = (name?: string) => name?.replace(/^lucide-/, "") || "";
const imageUrl = (image?: FraudImage | string, fallback = "") =>
  typeof image === "string" ? image : image?.url || fallback;
const imageAlt = (image?: FraudImage, fallback = "") => image?.alt || fallback;
const jsonIcon = (name?: string): LucideIcon => {
  const JsonIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <span style={style}>
      <DynamicIcon name={name} className={className} />
    </span>
  );
  return JsonIcon as LucideIcon;
};

const extractParagraphs = (html = "") => {
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
  return paragraphs
    .map((match) => match[1].replace(/<[^>]*>/g, "").trim())
    .filter(Boolean);
};

const extractListItems = (html = "") =>
  [...html.matchAll(/<span class="text[^>]*>([\s\S]*?)<\/span>/gi)]
    .map((match) => match[1].replace(/<[^>]*>/g, "").trim())
    .filter(Boolean);

const extractMedallionLayers = (html = "") => {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].slice(1);
  return rows.map((row) => {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) =>
      cell[1].replace(/<[^>]*>/g, "").trim()
    );
    const icon = row[1].match(/lucide-([a-z0-9-]+)/i)?.[1] || "";
    return { layer: cells[0] || "", purpose: cells[1] || "", examples: cells[2] || "", icon };
  });
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
    {items.map((k, i) => {
      return (
        <Reveal key={k.text} delay={i * 40} className="h-full">
          <div className="group flex h-full items-center gap-4 rounded-[18px] border border-white/[0.07] bg-[#102236]/60 p-4 lg:p-5">
            <span className={cn(cjIconTile, "border-[#A9E7C2]/25 text-[#A9E7C2] group-hover:border-[#A9E7C2]/50")}>
              <DynamicIcon name={k.icon} className={cjIconGlyph} aria-hidden="true" />
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

const BulletList = ({
  items,
}: {
  items: { text: string; icon?: string }[];
}) => (
  <ul className="mt-5 space-y-3">
    {items.map((item, i) => (
      <Reveal key={item.text} delay={i * 40}>
        <li className="flex items-start gap-3.5">
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 flex-none rotate-45 rounded-[1px] bg-[#69D6FF]"
          />
          <span className="text-[15px] leading-relaxed text-[#A8B8C7]">
            {item.text}
          </span>
        </li>
      </Reveal>
    ))}
  </ul>
);

const DocumentBulletList = ({
  items,
}: {
  items: { text: string; icon?: string }[];
}) => (
  <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item, i) => (
      <Reveal key={item.text} delay={i * 40}>
        <li className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 rounded-[1px] bg-[#55C7F3]"
          />
          <span className="text-[15px] leading-relaxed text-[#A8B8C7]">
            {item.text}
          </span>
        </li>
      </Reveal>
    ))}
  </ul>
);

const mapFraudData = (data: FraudCaseStudyData) => {
  const content = data.content || {};
  const newer = data.content_new || {};
  const categories = content.category_row || [];
  const challengeCards = content.tab_2_cards || [];
  const objectiveCards = content.tab_2_second_cards || [];
  const blocks = (key: string) => newer[key] || [];

  return {
    chapters: [
      { id: "chapter-opportunity", label: content.tab_1_text },
      { id: "chapter-friction", label: content.tab_2_text },
      { id: "chapter-solution", label: newer.new_tab_3_text },
      { id: "chapter-delivery", label: newer.new_tab_4_text },
      { id: "chapter-impact", label: newer.new_tab_5_text },
    ] as Chapter[],
    snapshot: categories.map((item: any, index: number) => ({
      label: item.label,
      value: item.text,
      icon: iconName(item.icon),
      tone: index === 1 || index === 2 ? "mint" : undefined,
    })),
    challenges: challengeCards.map((card: any, index: number) => ({
      no: String(index + 1).padStart(2, "0"),
      icon: iconName(card.icon),
      img: imageUrl(card.image),
      alt: imageAlt(card.image, card.text),
      text: card.text,
    })),
    objectives: objectiveCards.map((card: any, index: number) => ({
      no: String(index + 1).padStart(2, "0"),
      title: card.title,
      text: card.content,
      icon: iconName(card.icon),
      img: imageUrl(card.image),
      alt: imageAlt(card.image, card.title),
    })),
    eventFlow: blocks("new_tab_3_first_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    medallionLayers: extractMedallionLayers(newer.new_tab_3_second_content),
    reasonCodes: blocks("new_tab_3_third_content_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    goldModels: blocks("new_tab_3_fourth_content_blocks").map((item: any) => ({ title: item.text, text: "", icon: iconName(item.icon) })),
    queuePriorities: blocks("new_tab_3_fifth_content_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    futureDecisions: blocks("new_tab_3_sixth_content_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    managedServices: blocks("new_tab_3_eight_content_blocks").map((item: any) => ({ text: item.text, icon: iconName(item.icon) })),
    qualityControls: extractListItems(newer.new_tab_3_nine_content?.[0]?.content).map((text) => ({ text })),
    securityItems: extractListItems(newer.new_tab_3_nine_content?.[1]?.content).map((text) => ({ text })),
    operationalModel: extractListItems(newer.new_tab_3_nine_content?.[2]?.content).map((text) => ({ text })),
    successMetricsList: (newer.new_tab_4_first_content || []).map((item: any) => ({ text: `${item.title}: ${item.content}`, icon: jsonIcon(item.icon), accent: "#55C7F3" })),
    pipeline: (newer.new_tab_4_first_bottom_content || []).map((item: any) => ({ label: item.text, icon: iconName(item.icon) })),
    qaLabels: (newer.new_tab_4_first_bottom_continuous_block || []).map((item: any) => item.text),
    benefits: (newer.new_tab_5_first_content_block || []).map((item: any) => ({ label: item.title, text: item.content, icon: jsonIcon(item.icon) })),
    deliverables: (newer.new_tab_5_second_content || []).map((item: any) => ({ title: item.title, text: item.content, icon: iconName(item.icon), image: imageUrl(item.image) })),
    glanceStats: (newer.new_tab_5_fourth_content || []).map((item: any) => ({ value: item.col_first, label: item.col_second })),
  };
};


const FraudDetectionRiskIntelligence = ({ data }: FraudCaseStudyProps) => {
  const [progress, setProgress] = useState(0);
  const { content } = data;
  const newer = data.content_new || {};
  const mapped = mapFraudData(data);
  const { chapters, snapshot, challenges, objectives, eventFlow, medallionLayers, reasonCodes, goldModels,
    queuePriorities, futureDecisions, managedServices, qualityControls, securityItems, operationalModel,
    successMetricsList, pipeline, qaLabels, benefits, deliverables, glanceStats } = mapped;
  const overviewParagraphs = extractParagraphs(content.tab_1_left_content);
  const businessParagraphs = extractParagraphs(content.tab_1_right_content);
  const solutionParagraphs = extractParagraphs(newer.new_tab_3_first_content);
  const scoringParagraphs = extractParagraphs(newer.new_tab_3_third_content);
  const queueParagraphs = extractParagraphs(newer.new_tab_3_fifth_bottom_content);
  const actionParagraphs = extractParagraphs(newer.new_tab_3_sixth_content);
  const medallionParagraphs = extractParagraphs(newer.new_tab_3_second_content);
  const goldParagraphs = extractParagraphs(newer.new_tab_3_fourth_content);
  const mlParagraphs = extractParagraphs(newer.new_tab_3_seventh_content);
  const resultParagraphs = extractParagraphs(newer.new_tab_5_third_content);
  const qualitySections = newer.new_tab_3_nine_content || [];

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
                title={data.seo.title}
                description={data.seo.description}
                ogImage={data.seo.og_image}
                schema={data.schema}
              />
      <div className="bg-[#07111F]">
        {/* Reading progress */}
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
                    src={data.image || ""}
                    alt="Fraud detection command center monitoring real-time payment risk"
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
                    <SectionTitle className="mb-6">{content.tab_1_left_heading}</SectionTitle>
                  </Reveal>
                  <div className="space-y-5">
                    <Reveal delay={120}>
                      <Body>
                        {overviewParagraphs[0]}
                      </Body>
                    </Reveal>
                    <Reveal delay={150}>
                      <Body>
                        {overviewParagraphs[1]}
                      </Body>
                    </Reveal>
                    <Reveal delay={180}>
                      <Body>
                        {overviewParagraphs[2]}
                      </Body>
                    </Reveal>
                    <Reveal delay={210}>
                      <Body>
                        {overviewParagraphs[3]}
                      </Body>
                    </Reveal>
                  </div>
                </div>

                <Reveal delay={160} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={imageUrl(content.tab_1_right_image)}
                      alt="Digital payment network with fraud risk nodes highlighted"
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
                      src={imageUrl(content.tab_1_left_image)}
                      alt="Fraud team reviewing risk KPIs and investigation dashboards"
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
                    <SectionTitle className="mb-6">{content.tab_1_right_heading}</SectionTitle>
                  </Reveal>
                  <div className="mt-7 space-y-5">
                    <Reveal delay={160}>
                      <Body>
                        {businessParagraphs[0]}
                      </Body>
                    </Reveal>
                    <Reveal delay={220}>
                      <Body>
                        {businessParagraphs[1]}
                      </Body>
                    </Reveal>
                    <Reveal delay={280}>
                      <Body>
                        {businessParagraphs[2]}
                      </Body>
                    </Reveal>
                    <Reveal delay={340}>
                      <Body>
                        {businessParagraphs[3]}
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
                <SectionTitle className="mb-8 md:mb-10">{content.tab_2_heading}</SectionTitle>
              </Reveal>

              <Reveal delay={110}>
                <Body className="mb-8 max-w-none">
                  {content.tab_2_content}
                </Body>
              </Reveal>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {challenges.map((c, i) => {
                  const isLast = i === challenges.length - 1;

                  return (
                  <Reveal
                    key={c.no}
                    delay={i * 50}
                    className={cn(!isLast && "h-full", isLast && "sm:col-span-2 lg:col-span-4")}
                  >
                    <article
                      className={cn(
                        "group flex min-h-0 flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#102236]/70 transition-all duration-500 hover:border-[#69D6FF]/35 hover:shadow-[0_0_32px_rgba(105,214,255,0.10)]",
                        isLast ? "lg:h-[150px] lg:flex-row" : "h-full"
                      )}
                    >
                      <div
                        className={cn(
                          "relative aspect-[16/9] shrink-0 overflow-hidden",
                          isLast && "aspect-[16/7] sm:aspect-[21/9] lg:aspect-auto lg:w-[34%] lg:max-h-[150px]"
                        )}
                      >
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
                      <div className={cn("flex flex-1 flex-col p-4 lg:p-5", isLast && "justify-center lg:px-8")}>
                        <p className="text-left text-[14.5px] font-medium leading-[1.7] text-[#F7FAFC] lg:text-[15px]">
                          {c.text}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                  );
                })}
              </div>

              <Reveal delay={200} className="mt-8">
                <Body className="max-w-none">
                  {content.tab_2_text_block}
                </Body>
              </Reveal>
            </section>

            <section id="objectives" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10">{content.tab_2_second_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-6 md:grid-cols-2 lg:gap-8">
                {objectives.map((o, i) => (
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

            {/* Streaming ingestion */}
            <section id="solution-ingestion" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_first_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">
                    {solutionParagraphs[0]}
                  </Body>
                </Reveal>
                <Reveal delay={140}>
                  <Body className="max-w-none">
                    {solutionParagraphs[1]}
                  </Body>
                </Reveal>
                <Reveal delay={170}>
                  <Body className="max-w-none">
                    {solutionParagraphs[2]}
                  </Body>
                </Reveal>
              </div>

              <ListGrid items={eventFlow} cols="sm:grid-cols-2" />

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_first_bottom_content}
                  </Body>
                </Reveal>
              </div>

            </section>

            {/* Medallion */}
            <section id="solution-medallion" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_second_heading}</SectionTitle>
              </Reveal>

              <Reveal delay={110}>
                <Body className="max-w-none">
                  {medallionParagraphs[0]}
                </Body>
              </Reveal>

              <Reveal delay={140}>
                <div className={cn(cjCard, "mt-8 overflow-hidden")}>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          Layer
                        </th>
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          Purpose
                        </th>
                        <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                          Examples
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

              <div className="mt-8">
                <Reveal delay={240}>
                  <Body className="max-w-none">
                    {medallionParagraphs[1]}
                  </Body>
                </Reveal>
              </div>

            </section>

            {/* Explainable scoring */}
            <section id="solution-scoring" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_third_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">
                    {scoringParagraphs[0]}
                  </Body>
                </Reveal>
                <Reveal delay={140}>
                  <Body className="max-w-none">{extractParagraphs(newer.new_tab_3_third_content)[1]}</Body>
                </Reveal>
              </div>

              <ListGrid items={reasonCodes} cols="grid-cols-2 lg:grid-cols-4" />

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_third_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            {/* Gold models */}
            <section id="solution-gold" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_fourth_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  <Reveal delay={110}>
                    <Body>
                      {goldParagraphs[0]}
                    </Body>
                  </Reveal>
                  <Reveal delay={140}><Body>{goldParagraphs[1]}</Body></Reveal>
                  <div className="grid gap-6">
                    {goldModels.map((m, i) => {
                      return (
                        <Reveal key={m.title} delay={i * 60}>
                          <div className={cn(cjCard, "p-5 lg:p-6")}>
                            <div className="flex items-center gap-2.5">
                              <DynamicIcon name={m.icon} className="h-4 w-4 shrink-0 text-[#69D6FF]" aria-hidden="true" />
                              <span className="text-[15px] font-semibold text-[#F7FAFC]">{m.title}</span>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                  <Reveal delay={260}>
                    <Body>
                      {newer.new_tab_3_fourth_bottom_content}
                    </Body>
                  </Reveal>
                </div>

                <Reveal delay={140} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={imageUrl(newer.new_tab_3_fourth_right_image)}
                      alt="Bronze Silver Gold fraud data layers refining events into investigation models"
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Investigation queue */}
            <section id="solution-queue" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_fifth_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_fifth_content}
                  </Body>
                </Reveal>
              </div>

              <ListGrid items={queuePriorities} />

              <div className="mt-7 space-y-5">
                <Reveal delay={180}>
                  <Body className="max-w-none">
                    {queueParagraphs[0]}
                  </Body>
                </Reveal>
                <Reveal delay={210}>
                  <Body className="max-w-none">
                    {queueParagraphs[1]}
                  </Body>
                </Reveal>
              </div>
            </section>

            {/* Recommended actions */}
            <section id="solution-actions" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_sixth_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">
                    {actionParagraphs[0]}
                  </Body>
                </Reveal>
                <Reveal delay={140}>
                  <Body className="max-w-none">{extractParagraphs(newer.new_tab_3_sixth_content)[1]}</Body>
                </Reveal>
              </div>

              <ListGrid items={futureDecisions} cols="grid-cols-2 lg:grid-cols-4" />

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_sixth_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            {/* AI/ML layer */}
            <section id="solution-ml" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_seventh_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  <Reveal delay={110}>
                    <Body>
                      {mlParagraphs[0]}
                    </Body>
                  </Reveal>
                  <Reveal delay={140}>
                    <Body>
                      {mlParagraphs[1]}
                    </Body>
                  </Reveal>
                  <Reveal delay={170}>
                    <Body>
                      {mlParagraphs[2]}
                    </Body>
                  </Reveal>
                  <Reveal delay={220}>
                    <Body>
                      {mlParagraphs[3]}
                    </Body>
                  </Reveal>
                </div>


                <Reveal delay={140} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={imageUrl(newer.new_tab_3_seventh_image)}
                      alt="AI model training pipeline learning from labeled fraud events"
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Managed services */}
            <section id="solution-managed" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_eight_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_eight_content}
                  </Body>
                </Reveal>
              </div>

              <ListGrid items={managedServices} cols="sm:grid-cols-2" />

              <div className="mt-7">
                <Reveal delay={220}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_eight_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>


            {/* Data Quality, Security & Operations */}
            <section id="data-quality" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_nine_heading}</SectionTitle>
              </Reveal>

              <div className={cn(cjCard, "px-6 pt-10 pb-14 sm:px-10 sm:pt-12 sm:pb-16 lg:px-16 lg:pt-14 lg:pb-20")}>
                <div className="space-y-14 lg:space-y-16">
                  {/* Data Quality */}
                  <div>
                    <Reveal delay={80}>
                      <h3 className="text-left text-[1.35rem] font-semibold leading-[1.2] tracking-tight text-[#F7FAFC] sm:text-[1.5rem]">
                        {qualitySections[0]?.heading}
                      </h3>
                    </Reveal>
                    <div className="mt-5 space-y-4">
                      <Reveal delay={110}>
                        <p className="max-w-[760px] text-left text-[16px] leading-[1.7] text-[#A8B8C7] sm:text-[17px]">
                          {extractParagraphs(qualitySections[0]?.content)[0]}
                        </p>
                      </Reveal>
                      <Reveal delay={140}>
                        <p className="max-w-[760px] text-left text-[16px] leading-[1.7] text-[#A8B8C7] sm:text-[17px]">
                          {extractParagraphs(qualitySections[0]?.content)[1]}
                        </p>
                      </Reveal>
                    </div>
                    <DocumentBulletList items={qualityControls} />
                  </div>

                  {/* Security & Governance */}
                  <div>
                    <Reveal delay={80}>
                      <h3 className="text-left text-[1.35rem] font-semibold leading-[1.2] tracking-tight text-[#F7FAFC] sm:text-[1.5rem]">
                        {qualitySections[1]?.heading}
                      </h3>
                    </Reveal>
                    <Reveal delay={110}>
                      <p className="mt-5 max-w-[760px] text-left text-[16px] leading-[1.7] text-[#A8B8C7] sm:text-[17px]">
                        {extractParagraphs(qualitySections[1]?.content)[0]}
                      </p>
                    </Reveal>
                    <DocumentBulletList items={securityItems} />
                  </div>

                  {/* Operational Model */}
                  <div>
                    <Reveal delay={80}>
                      <h3 className="text-left text-[1.35rem] font-semibold leading-[1.2] tracking-tight text-[#F7FAFC] sm:text-[1.5rem]">
                        {qualitySections[2]?.heading}
                      </h3>
                    </Reveal>
                    <Reveal delay={110}>
                      <p className="mt-5 max-w-[760px] text-left text-[16px] leading-[1.7] text-[#A8B8C7] sm:text-[17px]">
                        {extractParagraphs(qualitySections[2]?.content)[0]}
                      </p>
                    </Reveal>
                    <DocumentBulletList items={operationalModel} />
                  </div>
                </div>
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


            <section id="quality-pipeline" className={cn("focus:outline-none", blockSpace)}>
              <KpiCommandCenter items={successMetricsList} id="success-metrics-grid" eyebrow="" />

              <Reveal delay={140} className="mt-8 block">
                <TestingRail stages={pipeline} qaLabels={qaLabels} />
              </Reveal>
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


            <PremiumBenefitsGrid
              items={benefits}
              eyebrow=""
              subtitle={newer.new_tab_5_first_content}
              className={blockSpace}
            />

            <section id="deliverables" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10">{newer.new_tab_5_second_heading}</SectionTitle>
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
                      <SectionTitle className="mb-6">{newer.new_tab_5_third_heading}</SectionTitle>
                    </Reveal>
                    <div className="space-y-5">
                      <Reveal delay={110}>
                        <Body>
                          {resultParagraphs[0]}
                        </Body>
                      </Reveal>
                      <Reveal delay={140}>
                        <Body>
                          {resultParagraphs[1]}
                        </Body>
                      </Reveal>
                      <Reveal delay={170}>
                        <Body>
                          {resultParagraphs[2]}
                        </Body>
                      </Reveal>
                      <Reveal delay={200}>
                        <Body>
                          {resultParagraphs[3]}
                        </Body>
                      </Reveal>
                      <Reveal delay={230}>
                        <Body>
                          {resultParagraphs[4]}
                        </Body>
                      </Reveal>
                      <Reveal delay={260}>
                        <Body>
                          {resultParagraphs[5]}
                        </Body>
                      </Reveal>
                    </div>
                  </div>

                  <Reveal delay={140} className="h-full">
                    <div className="h-full overflow-hidden rounded-[22px] border border-white/[0.08]">
                      <SmartImage
                        src={imageUrl(newer.new_tab_5_third_image)}
                        alt="Fraud risk dashboard wall with KPIs, risk bands, and investigation queue"
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
                <SectionTitle className="mb-8 md:mb-10">{newer.new_tab_5_fourth_heading}</SectionTitle>
              </Reveal>

              <div className="mx-auto w-full max-w-3xl">
                <div className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-2 sm:px-10 sm:py-4">
                  {glanceStats.map((s, i) => (
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
              src={imageUrl(content.bottom_banner_image)}
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

export default FraudDetectionRiskIntelligence;
