import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SmartImage from "@/components/SmartImage";
import { addClassToSpan, cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/DynamicIcon";
import he from "he";

import {
  Reveal,
  MetaPill,
  ChapterLabel,
  SectionTitle,
  Body,
  Counter,
  cjContainer,
  cjCard,
  cjFocus,
} from "@/components/case-studies/simkyc/primitives";
import ChapterNav from "@/components/case-studies/simkyc/ChapterNav";
import CaseSnapshot from "@/components/case-studies/simkyc/CaseSnapshot";
import ChallengeCard from "@/components/case-studies/simkyc/ChallengeCard";
import ObjectiveCard from "@/components/case-studies/simkyc/ObjectiveCard";


import TeamMap from "@/components/case-studies/simkyc/TeamMap";
import TestingRail from "@/components/case-studies/simkyc/TestingRail";
import { DeliverableCard } from "@/components/case-studies/simkyc/MetricCard";
import KpiCommandCenter from "@/components/case-studies/KpiCommandCenter";
import PremiumBenefitsGrid from "@/components/case-studies/PremiumBenefitsGrid";

import SeoTags from "@/components/SeoTags";

type CaseStudyImage = { url?: string; large?: string; alt?: string } | string;
type ContentItem = {
  icon?: string;
  text?: string;
  title?: string;
  label?: string;
  content?: string;
  image?: CaseStudyImage;
  button_text?: string;
  button_url?: string;
  number?: string;
};
type CaseStudyData = {
  title?: string;
  image?: string;
  categories?: string[];
  content?: Record<string, unknown>;
  content_new?: Record<string, unknown>;
  seo?: { title?: string; description?: string; og_image?: string };
  schema?: string | object;
};

const contentString = (source: Record<string, unknown>, key: string) =>
  typeof source[key] === "string" ? source[key] as string : "";
const contentItems = (source: Record<string, unknown>, key: string): ContentItem[] =>
  Array.isArray(source[key]) ? source[key] as ContentItem[] : [];
const imageUrl = (image?: CaseStudyImage) =>
  typeof image === "string" ? image : image?.url || image?.large || "";
const imageAlt = (image?: CaseStudyImage) =>
  typeof image === "string" ? "" : image?.alt || "";
const plainText = (html: string) =>
  he.decode(html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "")).trim();
const tagContents = (html: string, tag: string) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))]
    .map((match) => plainText(match[1]))
    .filter(Boolean);
const tableRows = (html: string) =>
  [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((row) => [...row[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => plainText(cell[1])));
const iconName = (name?: string) => name?.replace(/^lucide-/, "") || "";
const itemText = (item: ContentItem) => item.text || item.content || "";

const mapCaseStudyData = (data: CaseStudyData) => {
  const content = data.content || {};
  const newer = data.content_new || {};
  const overviewHtml = contentString(content, "tab_1_left_content");
  const businessHtml = contentString(content, "tab_1_right_content");
  const goldHtml = contentString(newer, "new_tab_3_third_content");
  const predictiveHtml = contentString(newer, "new_tab_3_four_content");
  const dashboardHtml = contentString(newer, "new_tab_3_fifth_content");
  const qualityHtml = contentString(newer, "new_tab_3_eight_content");
  const securityHtml = contentString(newer, "new_tab_3_nine_content");
  const technologyHtml = contentString(newer, "new_tab_3_seven_content");
  const resultHtml = contentString(newer, "new_tab_5_third_content");
  const imageIn = (source: Record<string, unknown>, key: string) =>
    imageUrl(source[key] as CaseStudyImage | undefined);
  const goldCardMatches = [...goldHtml.matchAll(
    /<svg[^>]*class="[^"]*\blucide lucide-([^"\s]+)[^"]*"[\s\S]*?<\/svg>[\s\S]*?<span class="text-\[15px\] font-semibold text-\[#F7FAFC\]">([\s\S]*?)<\/span>[\s\S]*?<p class="mt-3 text-\[14px\] leading-\[1\.6\] text-\[#A8B8C7\]">([\s\S]*?)<\/p>/g
  )];

  return {
    content,
    newer,
    chapters: [
      { id: "chapter-opportunity", label: contentString(content, "tab_1_text") },
      { id: "chapter-friction", label: contentString(content, "tab_2_text") },
      { id: "chapter-solution", label: contentString(newer, "new_tab_3_text") },
      { id: "chapter-delivery", label: contentString(newer, "new_tab_4_text") },
      { id: "chapter-impact", label: contentString(newer, "new_tab_5_text") },
    ],
    snapshot: contentItems(content, "category_row").map((item, index) => ({
      label: item.label || "",
      value: item.text || "",
      icon: iconName(item.icon),
      tone: index === 1 || index === 2 ? "mint" as const : undefined,
    })),
    overviewHeading: contentString(content, "tab_1_left_heading"),
    overviewParagraphs: tagContents(overviewHtml, "p"),
    overviewImage: content.tab_1_right_image as CaseStudyImage | undefined,
    businessHeading: contentString(content, "tab_1_right_heading"),
    businessParagraphs: tagContents(businessHtml, "p"),
    businessImage: content.tab_1_left_image as CaseStudyImage | undefined,
    challengeHeading: contentString(content, "tab_2_heading"),
    challenges: contentItems(content, "tab_2_cards").map((item, index) => ({
      no: String(index + 1).padStart(2, "0"),
      icon: iconName(item.icon),
      img: imageUrl(item.image),
      alt: imageAlt(item.image),
      text: itemText(item),
    })),
    objectivesHeading: contentString(content, "tab_2_second_heading"),
    objectives: contentItems(content, "tab_2_second_cards").map((item, index) => ({
      no: String(index + 1).padStart(2, "0"),
      title: item.title || "",
      text: item.content || "",
      icon: iconName(item.icon),
      img: imageUrl(item.image),
      alt: imageAlt(item.image),
    })),
    ingestionHeading: contentString(newer, "new_tab_3_first_heading"),
    ingestionParagraphs: tagContents(contentString(newer, "new_tab_3_first_content"), "p"),
    ingestionPatterns: contentItems(newer, "new_tab_3_first_content_blocks").map((item) => ({
      text: itemText(item),
      icon: iconName(item.icon),
    })),
    ingestionBottom: contentString(newer, "new_tab_3_first_bottom_content"),
    medallionHeading: contentString(newer, "new_tab_3_second_heading"),
    medallionParagraphs: tagContents(contentString(newer, "new_tab_3_second_content"), "p"),
    medallionHeaders: tableRows(contentString(newer, "new_tab_3_second_content"))[0] || [],
    medallionRows: tableRows(contentString(newer, "new_tab_3_second_content")).slice(1).map((cells) => ({
      layer: cells[0] || "",
      purpose: cells[1] || "",
      examples: cells[2] || "",
    })),
    medallionBottom: tagContents(contentString(newer, "new_tab_3_second_content"), "p").at(-1) || "",
    goldHeading: contentString(newer, "new_tab_3_third_heading"),
    goldParagraphs: tagContents(goldHtml, "p").slice(0, 2),
    goldModels: goldCardMatches.map((match) => ({
      icon: iconName(match[1]),
      title: plainText(match[2]),
      text: plainText(match[3]),
    })),
    goldBottom: tagContents(goldHtml, "p").at(-1) || "",
    goldImage: imageIn(newer, "new_tab_3_third_image"),
    predictiveHeading: contentString(newer, "new_tab_3_four_heading"),
    predictiveParagraphs: tagContents(predictiveHtml, "p"),
    predictiveFeatures: tagContents(predictiveHtml, "span"),
    predictiveImage: imageIn(newer, "new_tab_3_four_image"),
    dashboardHeading: contentString(newer, "new_tab_3_fifth_heading"),
    dashboardParagraphs: tagContents(dashboardHtml, "p"),
    dashboardItems: tagContents(dashboardHtml, "li"),
    dashboardImage: imageIn(newer, "new_tab_3_fifth_image"),
    managedHeading: contentString(newer, "new_tab_3_six_heading"),
    managedParagraphs: tagContents(contentString(newer, "new_tab_3_six_content"), "p"),
    managedOperations: contentItems(newer, "new_tab_3_six_content_blocks").map((item) => ({
      text: itemText(item),
      icon: iconName(item.icon),
    })),
    managedBottom: contentString(newer, "new_tab_3_six_bottom_content"),
    technologyHeading: contentString(newer, "new_tab_3_seven_heading"),
    technologyHeaders: tableRows(technologyHtml)[0] || [],
    techStack: tableRows(technologyHtml).slice(1).map((cells) => ({
      layer: cells[0] || "",
      service: cells[1] || "",
      role: cells[2] || "",
    })),
    qualityHeading: contentString(newer, "new_tab_3_eight_heading"),
    qualityParagraphs: tagContents(qualityHtml, "p"),
    qualityItems: tagContents(qualityHtml, "li"),
    securityHeading: contentString(newer, "new_tab_3_nine_heading"),
    securityParagraphs: tagContents(securityHtml, "p"),
    securityItems: tagContents(securityHtml, "li"),
    operatingHeading: contentString(newer, "new_tab_4_first_heading"),
    platformNodes: contentItems(newer, "new_tab_4_first_left_content").map((item) => ({
      label: itemText(item),
      icon: iconName(item.icon),
    })),
    serviceHeaders: tableRows(contentString(newer, "new_tab_4_first_right_content"))[0] || [],
    serviceTowers: tableRows(contentString(newer, "new_tab_4_first_right_content")).slice(1).map((cells) => ({
      tower: cells[0] || "",
      activities: cells[1] || "",
    })),
    metricsHeading: contentString(newer, "new_tab_4_second_heading"),
    metricsLabel: contentString(newer, "new_tab_4_second_heading_label"),
    successMetrics: contentItems(newer, "new_tab_4_second_content_blocks").map((item) => ({
      text: `${item.title || ""}: ${item.content || ""}`,
      icon: iconName(item.icon),
      accent: "#55C7F3",
    })),
    pipeline: contentItems(newer, "new_tab_4_second_bottom_content").map((item) => ({
      label: itemText(item),
      icon: iconName(item.icon),
    })),
    qaLabel: contentString(newer, "new_tab_4_second_bottom_content_continuous_label"),
    qaLabels: contentItems(newer, "new_tab_4_second_bottom_content_continuous_blocks").map(itemText),
    benefitsHeading: contentString(newer, "new_tab_5_first_heading"),
    benefits: contentItems(newer, "new_tab_5_first_contents").map((item) => ({
      label: itemText(item),
      text: "",
      icon: iconName(item.icon),
    })),
    deliverablesHeading: contentString(newer, "new_tab_5_second_heading"),
    deliverables: contentItems(newer, "new_tab_5_second_contents").map((item) => ({
      icon: iconName(item.icon),
      title: item.title || "",
      text: item.content || "",
      image: imageUrl(item.image),
    })),
    resultHeading: contentString(newer, "new_tab_5_third_heading"),
    resultParagraphs: tagContents(resultHtml, "p"),
    resultImage: imageIn(newer, "new_tab_5_third_image"),
    glanceHeading: contentString(newer, "new_tab_5_four_heading"),
    glanceStats: contentItems(newer, "new_tab_5_four_content_blocks").map((item) => ({
      value: item.number || "",
      label: item.text || "",
    })),
    ctaHeading: contentString(content, "bottom_banner_heading"),
    ctaContent: contentString(content, "bottom_banner_content"),
    ctaImage: imageIn(content, "bottom_banner_image"),
    ctaButtons: contentItems(content, "bottom_banner_buttons"),
    bannerButtonText: contentString(content, "banner_button_text"),
    bannerButtonUrl: contentString(content, "banner_button_url"),
    heroImage: data.image || "",
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
  <div className={cn("mt-6 grid gap-6", cols)}>
    {items.map((k, i) => {
      return (
        <Reveal key={k.text} delay={i * 40}>
          <div className="flex h-full items-start gap-3 rounded-[18px] border border-white/[0.07] bg-[#102236]/60 px-4 py-3.5">
            <DynamicIcon name={k.icon} className="mt-0.5 h-4 w-4 shrink-0 text-[#A9E7C2]" />
            <span className="text-[14px] leading-[1.6] text-[#A8B8C7]">{k.text}</span>
          </div>
        </Reveal>
      );
    })}
  </div>
);

const SmartManufacturingIoT = ({ data }: { data: CaseStudyData }) => {
  const mappedData = useMemo(() => mapCaseStudyData(data), [data]);
  const {
    content,
    newer,
    chapters,
    snapshot,
    overviewHeading,
    overviewParagraphs,
    overviewImage,
    businessHeading,
    businessParagraphs,
    businessImage,
    challengeHeading,
    challenges,
    objectivesHeading,
    objectives,
    ingestionHeading,
    ingestionParagraphs,
    ingestionPatterns,
    ingestionBottom,
    medallionHeading,
    medallionParagraphs,
    medallionHeaders,
    medallionRows,
    medallionBottom,
    goldHeading,
    goldParagraphs,
    goldModels,
    goldBottom,
    goldImage,
    predictiveHeading,
    predictiveParagraphs,
    predictiveFeatures,
    predictiveImage,
    dashboardHeading,
    dashboardParagraphs,
    dashboardItems,
    dashboardImage,
    managedHeading,
    managedParagraphs,
    managedOperations,
    managedBottom,
    technologyHeading,
    technologyHeaders,
    techStack,
    qualityHeading,
    qualityParagraphs,
    qualityItems,
    securityHeading,
    securityParagraphs,
    securityItems,
    operatingHeading,
    platformNodes,
    serviceHeaders,
    serviceTowers,
    metricsHeading,
    metricsLabel,
    successMetrics,
    pipeline,
    qaLabel,
    qaLabels,
    benefitsHeading,
    benefits,
    deliverablesHeading,
    deliverables,
    resultHeading,
    resultParagraphs,
    resultImage,
    glanceHeading,
    glanceStats,
    ctaHeading,
    ctaContent,
    ctaImage,
    ctaButtons,
    bannerButtonText,
    bannerButtonUrl,
    heroImage,
  } = mappedData;
  const [progress, setProgress] = useState(0);
  const titleMarkup = addClassToSpan(
    (data.title || "").replace(/(Predictive Maintenance Platform)$/, "<span>$1</span>"),
    "text-gradient-brand"
  );

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
    <SeoTags title={data.seo?.title} description={data.seo?.description} ogImage={data.seo?.og_image} schema={data.schema} />
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
                      <DynamicIcon name={iconName(contentString(content, "listing_icon"))} className="h-3.5 w-3.5" />
                      {data.categories?.[0] || ""}
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
                    <Link to={bannerButtonUrl}>
                      {bannerButtonText}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </Reveal>
              </div>

              <Reveal delay={180} className="h-full">
                <div className={cn(cjCard, "h-full overflow-hidden")}>
                  <SmartImage
                    src={heroImage}
                    alt={imageAlt(data.image)}
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
              <ChapterLabel>Chapter 01 — {chapters[0]?.label}</ChapterLabel>
            </Reveal>

            <section id="overview" className="focus:outline-none">
              <div className="grid items-stretch gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
                <div>
                  <Reveal delay={60}>
                    <SectionTitle className="mb-6">{overviewHeading}</SectionTitle>
                  </Reveal>
                  <div className="space-y-5">
                    {overviewParagraphs.map((paragraph, index) => (
                      <Reveal key={index} delay={120 + index * 30}>
                        <Body>{paragraph}</Body>
                      </Reveal>
                    ))}
                  </div>
                </div>

                <Reveal delay={160} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={imageUrl(overviewImage)}
                      alt={imageAlt(overviewImage)}
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
                      src={imageUrl(businessImage)}
                      alt={imageAlt(businessImage)}
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
                    <SectionTitle className="mb-6">{businessHeading}</SectionTitle>
                  </Reveal>
                  <div className="space-y-5">
                    {businessParagraphs.map((paragraph, index) => (
                      <Reveal key={index} delay={120 + index * 35}>
                        <Body>{paragraph}</Body>
                      </Reveal>
                    ))}
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
              <ChapterLabel>Chapter 02 — {chapters[1]?.label}</ChapterLabel>
            </Reveal>

            <section id="challenge" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{challengeHeading}</SectionTitle>
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
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{objectivesHeading}</SectionTitle>
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
              <ChapterLabel>Chapter 03 — {chapters[2]?.label}</ChapterLabel>
            </Reveal>

            {/* Ingestion */}
            <section id="solution-ingestion" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{ingestionHeading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                {ingestionParagraphs.map((paragraph, index) => (
                  <Reveal key={index} delay={110 + index * 30}>
                    <Body className="max-w-none">{paragraph}</Body>
                  </Reveal>
                ))}
              </div>

              <ListGrid items={ingestionPatterns} cols="sm:grid-cols-2" />

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">{ingestionBottom}</Body>
                </Reveal>
              </div>

            </section>

            {/* Medallion */}
            <section id="solution-medallion" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{medallionHeading}</SectionTitle>
              </Reveal>

              <Reveal delay={110}>
                <Body className="max-w-none">{medallionParagraphs[0]}</Body>
              </Reveal>

              <Reveal delay={110}>
                <div className={cn(cjCard, "mt-8 overflow-hidden p-0")}>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                          <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F7FAFC] sm:px-6 sm:py-5">
                            {medallionHeaders[0]}
                          </th>
                          <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F7FAFC] sm:px-6 sm:py-5">
                            {medallionHeaders[1]}
                          </th>
                          <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F7FAFC] sm:px-6 sm:py-5">
                            {medallionHeaders[2]}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {medallionRows.map((l, i) => (
                          <tr
                            key={l.layer}
                            className={cn(
                              "border-b border-white/[0.06] last:border-b-0",
                              i % 2 === 1 ? "bg-white/[0.02]" : ""
                            )}
                          >
                            <td className="px-5 py-5 align-top text-[15px] font-semibold text-[#69D6FF] sm:px-6 sm:py-6">
                              {l.layer}
                            </td>
                            <td className="px-5 py-5 align-top text-[14px] leading-[1.7] text-[#A8B8C7] sm:px-6 sm:py-6">
                              {l.purpose}
                            </td>
                            <td className="px-5 py-5 align-top text-[14px] leading-[1.7] text-[#A9E7C2] sm:px-6 sm:py-6">
                              {l.examples}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>

              <div className="mt-8">
                <Reveal delay={240}>
                  <Body className="max-w-none">
                    {medallionBottom}
                  </Body>
                </Reveal>
              </div>

            </section>

            {/* Gold models */}
            <section id="solution-gold" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{goldHeading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  <Reveal delay={110}>
                    <Body>{goldParagraphs[0]}</Body>
                  </Reveal>
                  <Reveal delay={140}>
                    <Body>{goldParagraphs[1]}</Body>
                  </Reveal>
                  <div className="grid gap-6">
                    {goldModels.map((m, i) => {
                      return (
                        <Reveal key={m.title} delay={i * 60}>
                          <div className={cn(cjCard, "p-5 lg:p-6")}>
                            <div className="flex items-center gap-2.5">
                              <DynamicIcon name={m.icon} className="h-4 w-4 shrink-0 text-[#69D6FF]" />
                              <span className="text-[15px] font-semibold text-[#F7FAFC]">{m.title}</span>
                            </div>
                            <p className="mt-3 text-[14px] leading-[1.6] text-[#A8B8C7]">{m.text}</p>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                  <Reveal delay={260}>
                    <Body>
                      {goldBottom}
                    </Body>
                  </Reveal>
                </div>

                <Reveal delay={140} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={goldImage}
                      alt={imageAlt(newer.new_tab_3_third_image as CaseStudyImage | undefined)}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Predictive maintenance */}
            <section id="solution-ml" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{predictiveHeading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  <Reveal delay={110}>
                    <Body>{predictiveParagraphs[0]}</Body>
                  </Reveal>
                  <Reveal delay={150}>
                    <div className="flex flex-wrap gap-2">
                      {predictiveFeatures.map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-white/[0.08] bg-[#102236]/70 px-3 py-1.5 text-[12.5px] text-[#A8B8C7]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                  {predictiveParagraphs.slice(1).map((paragraph, index) => (
                    <Reveal key={index} delay={190 + index * 30}>
                      <Body>{paragraph}</Body>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={140} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={predictiveImage}
                      alt={imageAlt(newer.new_tab_3_four_image as CaseStudyImage | undefined)}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Telemetry visual + dashboard */}
            <section id="solution-dashboard" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{dashboardHeading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <Reveal delay={100} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={imageUrl(dashboardImage)}
                      alt={imageAlt(newer.new_tab_3_fifth_image as CaseStudyImage | undefined)}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>

                <div className="flex flex-col justify-center space-y-5">
                  <Reveal delay={120}>
                    <Body>{dashboardParagraphs[0]}</Body>
                  </Reveal>
                  <Reveal delay={150}>
                    <Body>{dashboardParagraphs[1]}</Body>
                  </Reveal>
                  <Reveal delay={180}>
                    <ul className="space-y-2.5">
                      {dashboardItems.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#A8B8C7]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#69D6FF]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={220}>
                    <Body className="max-w-none">{dashboardParagraphs[2]}</Body>
                  </Reveal>
                </div>
              </div>
            </section>

            {/* Managed services */}
            <section id="solution-managed" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{managedHeading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                {managedParagraphs.map((paragraph, index) => (
                  <Reveal key={index} delay={110 + index * 40}>
                    <Body className="max-w-none">{paragraph}</Body>
                  </Reveal>
                ))}
              </div>

              <ListGrid items={managedOperations} />

              <div className="mt-7">
                <Reveal delay={220}>
                  <Body className="max-w-none">{managedBottom}</Body>
                </Reveal>
              </div>
            </section>

            {/* Tech stack */}
            <section id="tech-stack" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{technologyHeading}</SectionTitle>
              </Reveal>

              <Reveal delay={110}>
                <div className={cn(cjCard, "mt-2 overflow-hidden p-0")}>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                          <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F7FAFC] sm:px-6 sm:py-5">
                            {technologyHeaders[0]}
                          </th>
                          <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F7FAFC] sm:px-6 sm:py-5">
                            {technologyHeaders[1]}
                          </th>
                          <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F7FAFC] sm:px-6 sm:py-5">
                            {technologyHeaders[2]}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {techStack.map((t, i) => (
                          <tr
                            key={t.layer}
                            className={cn(
                              "border-b border-white/[0.06] last:border-b-0",
                              i % 2 === 1 ? "bg-white/[0.02]" : ""
                            )}
                          >
                            <td className="px-5 py-5 align-top text-[15px] font-semibold text-[#69D6FF] sm:px-6 sm:py-6">
                              {t.layer}
                            </td>
                            <td className="px-5 py-5 align-top text-[14px] leading-[1.7] text-[#F7FAFC] sm:px-6 sm:py-6">
                              {t.service}
                            </td>
                            <td className="px-5 py-5 align-top text-[14px] leading-[1.7] text-[#A8B8C7] sm:px-6 sm:py-6">
                              {t.role}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* Data quality */}
            <section id="data-quality" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{qualityHeading}</SectionTitle>
              </Reveal>
              <div className="space-y-5">
                {qualityParagraphs.slice(0, 2).map((paragraph, index) => (
                  <Reveal key={index} delay={110 + index * 40}>
                    <Body className="max-w-none">{paragraph}</Body>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={190}>
                <ul className="mt-6 space-y-3">
                  {qualityItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.7] text-[#A8B8C7]">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-[#69D6FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            {/* Security */}
            <section id="security" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{securityHeading}</SectionTitle>
              </Reveal>
              <div className="space-y-5">
                {securityParagraphs.slice(0, 2).map((paragraph, index) => (
                  <Reveal key={index} delay={110 + index * 40}>
                    <Body className="max-w-none">{paragraph}</Body>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={190}>
                <ul className="mt-6 space-y-3">
                  {securityItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.7] text-[#A8B8C7]">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-[#69D6FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          </div>
        </div>

        {/* ================== CHAPTER 4 — DELIVERY SYSTEM ================== */}
        <div id="chapter-delivery" className={cn("focus:outline-none", chapterSpace)}>
          <div className={cjContainer}>
            <Reveal>
              <ChapterLabel>Chapter 04 — {chapters[3]?.label}</ChapterLabel>
            </Reveal>

            <section id="operating-model" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{operatingHeading}</SectionTitle>
              </Reveal>

              <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
                <Reveal delay={100} className="lg:sticky lg:top-28">
                  <TeamMap hub={data.title || ""} nodes={platformNodes} />
                </Reveal>

                <Reveal delay={100}>
                  <div className={cn(cjCard, "overflow-hidden p-0")}>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[420px] border-collapse text-left">
                        <thead>
                          <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                            <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F7FAFC] sm:px-6 sm:py-5">
                              {serviceHeaders[0]}
                            </th>
                            <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F7FAFC] sm:px-6 sm:py-5">
                              {serviceHeaders[1]}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {serviceTowers.map((t, i) => (
                            <tr
                              key={t.tower}
                              className={cn(
                                "border-b border-white/[0.06] last:border-b-0",
                                i % 2 === 1 ? "bg-white/[0.02]" : ""
                              )}
                            >
                              <td className="px-5 py-5 align-top text-[15px] font-semibold text-[#69D6FF] sm:px-6 sm:py-6">
                                {t.tower}
                              </td>
                              <td className="px-5 py-5 align-top text-[14px] leading-[1.7] text-[#A8B8C7] sm:px-6 sm:py-6">
                                {t.activities}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>

            <KpiCommandCenter
              id="quality-pipeline"
              className={blockSpace}
              eyebrow=""
              title={metricsHeading}
              monitoringLabel={metricsLabel}
              items={successMetrics}
            />

            <Reveal delay={140} className="block">
              <TestingRail stages={pipeline} qaLabels={qaLabels} qaLabel={qaLabel} />
            </Reveal>
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
              <ChapterLabel>Chapter 05 — {chapters[4]?.label}</ChapterLabel>
            </Reveal>

            <PremiumBenefitsGrid
              id="benefits"
              className={blockSpace}
              eyebrow=""
              title={benefitsHeading}
              items={benefits}
            />

            <section id="deliverables" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{deliverablesHeading}</SectionTitle>
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
                      <SectionTitle className="mb-6">{resultHeading}</SectionTitle>
                    </Reveal>
                    <div className="space-y-5">
                      {resultParagraphs.map((paragraph, index) => (
                        <Reveal key={index} delay={110 + index * 30}>
                          <Body>{paragraph}</Body>
                        </Reveal>
                      ))}
                    </div>
                  </div>

                  <Reveal delay={140} className="h-full">
                    <div className="h-full overflow-hidden rounded-[22px] border border-white/[0.08]">
                      <SmartImage
                        src={resultImage}
                        alt={imageAlt(newer.new_tab_5_third_image as CaseStudyImage | undefined)}
                        width={1024}
                        height={576}
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
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{glanceHeading}</SectionTitle>
              </Reveal>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
                {glanceStats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 80} className="h-full">
                    <div className={cn(cjCard, "h-full p-6 lg:p-8")}>
                      <div className="flex items-center gap-4">
                        <div className="max-w-[58%] shrink-0 break-words font-bold leading-[1.15] text-[#69D6FF] [font-size:clamp(1.35rem,1.6vw,1.75rem)]">
                          <Counter value={s.value} />
                        </div>
                        <div className="min-w-0 flex-1 text-[14.5px] leading-snug text-[#A8B8C7]">{s.label}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

            </section>
          </div>
        </div>

        {/* ============================== CTA ============================== */}
        <section id="cta" className="relative overflow-hidden">
          <div className="absolute inset-0">
            <SmartImage
              src={imageUrl(ctaImage)}
              alt=""
              loading="eager"
              width={1600}
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
                  <span className="text-gradient-brand">{ctaHeading}</span>
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#A8B8C7] sm:text-[16px]">
                  {ctaContent}
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
                    <Link to={ctaButtons[0]?.button_url}>
                      {ctaButtons[0]?.button_text || ""}
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
                    <Link to={ctaButtons[1]?.button_url || "/case-studies"}>
                      {ctaButtons[1]?.button_text || ""}
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

export default SmartManufacturingIoT;
