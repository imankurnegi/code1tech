import { useEffect, useState } from "react";
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
  cjContainer,
  cjCard,
  cjIconTile,
  cjIconGlyph,
  cjFocus,
} from "@/components/case-studies/simkyc/primitives";
import ChapterNav from "@/components/case-studies/simkyc/ChapterNav";
import CaseSnapshot from "@/components/case-studies/simkyc/CaseSnapshot";
import ChallengeCard from "@/components/case-studies/simkyc/ChallengeCard";
import ObjectiveCard from "@/components/case-studies/simkyc/ObjectiveCard";
import { DeliverableCard } from "@/components/case-studies/simkyc/MetricCard";
import KpiCommandCenter from "@/components/case-studies/KpiCommandCenter";
import PremiumBenefitsGrid from "@/components/case-studies/PremiumBenefitsGrid";

import SeoTags from "@/components/SeoTags";

type CaseStudyImage = { url?: string; large?: string; alt?: string; title?: string } | string;
type ContentItem = {
  icon?: string;
  text?: string;
  title?: string;
  label?: string;
  content?: string;
  button_text?: string;
  button_url?: string;
  image?: CaseStudyImage;
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
const htmlLists = (html: string) =>
  [...html.matchAll(/<ul\b[^>]*>([\s\S]*?)<\/ul>/gi)]
    .map((match) => tagContents(match[1], "li").map((item) => item.replace(/^❖\s*/, "")));
const tableRows = (html: string) =>
  [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((row) => [...row[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => plainText(cell[1])));
const iconName = (name?: string) => name?.replace(/^lucide-/, "") || "";
const htmlIconName = (html: string, fallback: string) =>
  html.match(/class="[^"]*\blucide\s+lucide-([a-z0-9-]+)/i)?.[1] || fallback;
const itemText = (item: ContentItem) => item.text || item.content || "";
const getImage = (source: Record<string, unknown>, key: string) =>
  source[key] as CaseStudyImage | undefined;

const mapCaseStudyData = (data: CaseStudyData) => {
  const content = data.content || {};
  const newer = data.content_new || {};
  const overviewHtml = contentString(content, "tab_1_left_content");
  const businessHtml = contentString(content, "tab_1_right_content");
  const ingestionHtml = contentString(newer, "new_tab_3_first_content");
  const medallionHtml = contentString(newer, "new_tab_3_second_content");
  const technologyHtml = contentString(newer, "new_tab_3_eight_content");
  const operationsHtml = contentString(newer, "new_tab_3_nine_sub_third_content");
  const resultHtml = contentString(newer, "new_tab_5_third_content");
  const glanceHtml = contentString(newer, "new_tab_5_fourth_content");
  const categories = Array.isArray(content.category_row) ? content.category_row as ContentItem[] : [];
  const imageIn = (source: Record<string, unknown>, key: string) => imageUrl(getImage(source, key));

  return {
    content,
    newer,
    chapters: [
      { id: "chapter-opportunity", label: contentString(content, "tab_1_text") },
      { id: "chapter-friction", label: contentString(content, "tab_2_text") },
      { id: "chapter-solution", label: contentString(newer, "new_tab_3_text").trim() },
      { id: "chapter-delivery", label: contentString(newer, "new_tab_4_text") },
      { id: "chapter-impact", label: contentString(newer, "new_tab_5_text") },
    ],
    snapshot: categories.map((item, index) => ({
      label: item.label || "",
      value: item.text || "",
      icon: iconName(item.icon),
      tone: index === 1 || index === 2 ? "mint" as const : undefined,
    })),
    overviewHeading: contentString(content, "tab_1_left_heading"),
    overviewParagraphs: tagContents(overviewHtml, "p"),
    businessHeading: contentString(content, "tab_1_right_heading"),
    businessParagraphs: tagContents(businessHtml, "p"),
    businessLists: htmlLists(businessHtml),
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
    ingestionParagraphs: tagContents(ingestionHtml, "p"),
    ingestionCode: tagContents(ingestionHtml, "code"),
    ingestionImage: imageIn(newer, "new_tab_3_first_image"),
    medallionHeading: contentString(newer, "new_tab_3_second_heading"),
    medallionIcon: htmlIconName(medallionHtml, "layers"),
    medallionParagraphs: tagContents(medallionHtml, "p"),
    medallionHeaders: tableRows(medallionHtml)[0] || [],
    medallionRows: tableRows(medallionHtml).slice(1).map((cells) => ({
      layer: cells[0] || "",
      purpose: cells[1] || "",
      examples: cells[2] || "",
    })),
    goldHeading: contentString(newer, "new_tab_3_third_heading"),
    goldParagraphs: tagContents(contentString(newer, "new_tab_3_third_content"), "p"),
    goldModels: contentItems(newer, "new_tab_3_third_content_blocks").map((item) => ({
      title: item.title || item.text || "",
      text: item.content || "",
      icon: iconName(item.icon),
    })),
    goldBottom: contentString(newer, "new_tab_3_third_bottom_content"),
    geoHeading: contentString(newer, "new_tab_3_fourth_heading"),
    geoParagraphs: tagContents(contentString(newer, "new_tab_3_fourth_content"), "p"),
    geoItems: tagContents(contentString(newer, "new_tab_3_fourth_content"), "li"),
    geoImage: imageIn(newer, "new_tab_3_fourth_image"),
    mlHeading: contentString(newer, "new_tab_3_fifth_heading"),
    mlParagraphs: tagContents(contentString(newer, "new_tab_3_fifth_content"), "p"),
    mlFeatures: tagContents(contentString(newer, "new_tab_3_fifth_content"), "code"),
    mlImage: imageIn(newer, "new_tab_3_fifth_image"),
    dashboardHeading: contentString(newer, "new_tab_3_six_heading"),
    dashboardParagraphs: tagContents(contentString(newer, "new_tab_3_six_content"), "p"),
    dashboardFeatures: contentItems(newer, "new_tab_3_six_content_blocks").map((item) => ({
      text: itemText(item),
      icon: iconName(item.icon),
    })),
    dashboardBottom: contentString(newer, "new_tab_3_six_bottom_content"),
    managedHeading: contentString(newer, "new_tab_3_seven_heading"),
    managedParagraphs: tagContents(contentString(newer, "new_tab_3_seven_content"), "p"),
    managedImage: imageIn(newer, "new_tab_3_seven_content_image"),
    managedItems: contentItems(newer, "new_tab_3_seven_content_blocks").map((item) => ({
      text: itemText(item),
      icon: iconName(item.icon),
    })),
    technologyHeading: contentString(newer, "new_tab_3_eight_heading"),
    technologyIcon: htmlIconName(technologyHtml, "cloud"),
    technologyHeaders: tableRows(technologyHtml)[0] || [],
    technologyRows: tableRows(technologyHtml).slice(1).map((cells) => ({
      layer: cells[0] || "",
      tech: cells[1] || "",
      role: cells[2] || "",
    })),
    qualityHeading: contentString(newer, "new_tab_3_nine_heading"),
    qualitySubheading: contentString(newer, "new_tab_3_nine_sub_heading"),
    qualityIntro: contentString(newer, "new_tab_3_nine_sub_content"),
    qualityItems: contentItems(newer, "new_tab_3_nine_sub_content_blocks").map((item) => ({
      text: itemText(item),
      icon: iconName(item.icon),
    })),
    securityHeading: contentString(newer, "new_tab_3_nine_sub_second_heading"),
    securityIntro: contentString(newer, "new_tab_3_nine_sub_second_content"),
    securityItems: contentItems(newer, "new_tab_3_nine_sub_second_content_blocks").map((item) => ({
      text: item.title || itemText(item),
      icon: iconName(item.icon),
    })),
    operationalRows: tableRows(operationsHtml).slice(1).map((cells) => ({
      layer: cells[0] || "",
      tech: cells[1] || "",
      role: cells[2] || "",
    })),
    operationalIcon: htmlIconName(operationsHtml, "settings"),
    operationalHeaders: tableRows(operationsHtml)[0] || [],
    metricsHeading: contentString(newer, "new_tab_4_first_heading"),
    metricsLabel: contentString(newer, "new_tab_4_first_heading_label"),
    metrics: contentItems(newer, "new_tab_4_first_content_blocks").map((item, index) => ({
      text: itemText(item),
      icon: iconName(item.icon),
      accent: ["#55C7F3", "#82DDB6", "#63E6FF", "#5AA9F5", "#82DDB6", "#5FDCD2", "#8178FF"][index % 7],
    })),
    benefitsHeading: contentString(newer, "new_tab_5_first_heading"),
    benefits: contentItems(newer, "new_tab_5_first_content_blocks").map((item, index) => ({
      label: itemText(item),
      text: "",
      icon: iconName(item.icon),
      accent: ["#52C7FF", "#7EF7C9", "#8B7CFF", "#63E6FF", "#B6F7A8", "#52C7FF", "#7EF7C9"][index % 7],
    })),
    deliverablesHeading: contentString(newer, "new_tab_5_second_heading"),
    deliverables: contentItems(newer, "new_tab_5_second_content_blocks").map((item) => ({
      title: item.title || "",
      text: item.content || "",
      icon: iconName(item.icon),
      image: imageUrl(item.image),
    })),
    resultHeading: contentString(newer, "new_tab_5_third_heading"),
    resultParagraphs: tagContents(resultHtml, "p"),
    resultImage: imageIn(newer, "new_tab_5_third_image"),
    glanceHeading: contentString(newer, "new_tab_5_fourth_heading"),
    glanceHeaders: tableRows(glanceHtml)[0] || [],
    glanceRows: tableRows(glanceHtml).slice(1).map((cells) => ({
      capability: cells[0] || "",
      position: cells[1] || "",
    })),
    ctaHeading: contentString(content, "bottom_banner_heading"),
    ctaContent: contentString(content, "bottom_banner_content"),
    ctaImage: imageIn(content, "bottom_banner_image"),
    ctaButtons: contentItems(content, "bottom_banner_buttons").map((item) => ({
      text: item.button_text || "",
      url: item.button_url || "",
    })),
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
  <div className={cn("mt-6 grid items-stretch gap-6", cols)}>
    {items.map((k, i) => (
        <Reveal key={k.text} delay={i * 40} className="h-full">
          <div className="group flex h-full items-center gap-4 rounded-[18px] border border-white/[0.07] bg-[#102236]/60 p-4 lg:p-5">
            <span className={cn(cjIconTile, "border-[#A9E7C2]/25 text-[#A9E7C2] group-hover:border-[#A9E7C2]/50")}>
              <DynamicIcon name={k.icon} className={cjIconGlyph} />
            </span>
            <span className="min-w-0 flex-1 text-left text-[15px] font-medium leading-snug text-[#A8B8C7]">
              {k.text}
            </span>
          </div>
        </Reveal>
    ))}
  </div>
);

const ThreeColTable = ({
  headers,
  rows,
  icon = "layers",
}: {
  headers: string[];
  rows: { layer: string; tech?: string; purpose?: string; role?: string; examples?: string }[];
  icon?: string;
}) => (
  <div className={cn(cjCard, "mt-6 overflow-hidden overflow-x-auto")}>
    <table className="w-full min-w-[640px] text-left">
      <thead>
        <tr className="border-b border-white/[0.07] bg-white/[0.03]">
          {headers.map((h) => (
            <th
              key={h}
              className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr
            key={r.layer}
            className={cn(
              "transition-colors hover:bg-white/[0.02]",
              i !== rows.length - 1 && "border-b border-white/[0.07]"
            )}
          >
            <td className="px-5 py-4 align-top text-[14.5px] font-semibold text-[#F7FAFC] sm:px-7">
              <span className="flex items-center gap-2.5">
                <DynamicIcon name={icon} className="h-4 w-4 shrink-0 text-[#69D6FF]" />
                {r.layer}
              </span>
            </td>
            <td className="px-5 py-4 align-top text-[14px] leading-[1.6] text-[#A8B8C7] sm:px-7">
              {r.tech ?? r.purpose}
            </td>
            <td className="px-5 py-4 align-top text-[13px] leading-[1.65] text-[#A9E7C2] sm:px-7">
              {r.role || r.examples ? <code className="font-numbers">{r.role ?? r.examples}</code> : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SupplyChainLogisticsControlTower = ({ data }: { data: CaseStudyData }) => {
  const {
    content,
    newer,
    chapters,
    snapshot,
    overviewHeading,
    overviewParagraphs,
    businessHeading,
    businessParagraphs,
    businessLists,
    challengeHeading,
    challenges,
    objectivesHeading,
    objectives,
    ingestionHeading,
    ingestionParagraphs,
    ingestionCode,
    ingestionImage,
    medallionHeading,
    medallionIcon,
    medallionParagraphs,
    medallionHeaders,
    medallionRows,
    goldHeading,
    goldParagraphs,
    goldModels,
    goldBottom,
    geoHeading,
    geoParagraphs,
    geoItems,
    geoImage,
    mlHeading,
    mlParagraphs,
    mlFeatures,
    mlImage,
    dashboardHeading,
    dashboardParagraphs,
    dashboardFeatures,
    dashboardBottom,
    managedHeading,
    managedParagraphs,
    managedImage,
    managedItems,
    technologyHeading,
    technologyIcon,
    technologyHeaders,
    technologyRows,
    qualityHeading,
    qualitySubheading,
    qualityIntro,
    qualityItems,
    securityHeading,
    securityIntro,
    securityItems,
    operationalRows,
    operationalIcon,
    operationalHeaders,
    metricsHeading,
    metricsLabel,
    metrics,
    benefitsHeading,
    benefits,
    deliverablesHeading,
    deliverables,
    resultHeading,
    resultParagraphs,
    resultImage,
    glanceHeading,
    glanceHeaders,
    glanceRows,
    ctaHeading,
    ctaContent,
    ctaImage,
    ctaButtons,
    bannerButtonText,
    bannerButtonUrl,
    heroImage,
  } = mapCaseStudyData(data);
  const [progress, setProgress] = useState(0);
  const titleMarkup = addClassToSpan(
    (data.title || "").replace(/(Control Tower Platform)$/, "<span>$1</span>"),
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
                    <Link to={bannerButtonUrl || "/contact"}>
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
                      src={imageUrl(content.tab_1_right_image as CaseStudyImage | undefined)}
                      alt={imageAlt(content.tab_1_right_image as CaseStudyImage | undefined)}
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
                      src={imageUrl(content.tab_1_left_image as CaseStudyImage | undefined)}
                      alt={imageAlt(content.tab_1_left_image as CaseStudyImage | undefined)}
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
                    <Reveal delay={120}>
                      <Body>{businessParagraphs[0]}</Body>
                    </Reveal>
                    <Reveal delay={150}>
                      <ul className="mt-4 space-y-3">
                        {(businessLists[0] || []).map((question, i) => (
                          <li key={i} className="flex items-start gap-3 text-left text-[15px] leading-relaxed text-[#A8B8C7]">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5CC8DC]" aria-hidden="true" />
                            <span>{question}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                    <Reveal delay={190}>
                      <Body>{businessParagraphs[1]}</Body>
                    </Reveal>
                    <Reveal delay={220}>
                      <Body>{businessParagraphs[2]}</Body>
                    </Reveal>
                    <Reveal delay={240}>
                      <ul className="space-y-3">
                        {(businessLists[1] || []).map((result, index) => (
                          <li key={index} className="flex items-start gap-3 text-left text-[15px] leading-relaxed text-[#A8B8C7]">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5CC8DC]" aria-hidden="true" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                    {businessParagraphs.slice(3).map((paragraph, index) => (
                      <Reveal key={index} delay={250 + index * 30}>
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
              <ChapterLabel>Chapter 03 — {chapters[2]?.label}</ChapterLabel>
            </Reveal>

            <section id="solution-ingest" className="focus:outline-none">
              <div className="grid items-stretch gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
                <div>
                  <Reveal delay={60}>
                    <SectionTitle className="mb-6">{ingestionHeading}</SectionTitle>
                  </Reveal>
                  <div className="space-y-5">
                    <Reveal delay={110}>
                      <Body>{ingestionParagraphs[0]}</Body>
                    </Reveal>
                    <Reveal delay={140}>
                      <Body>{ingestionParagraphs[1]}</Body>
                    </Reveal>
                    <Reveal delay={170}>
                      <div className="space-y-3">
                        {ingestionCode.map((code) => (
                          <div key={code} className="rounded-[18px] border border-white/[0.08] bg-[#102236]/60 px-5 py-4">
                            <code className="font-numbers text-[13.5px] leading-[1.8] text-[#A9E7C2]">{code}</code>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                    <Reveal delay={200}>
                      <Body>{ingestionParagraphs[2]}</Body>
                    </Reveal>
                  </div>
                </div>

                <Reveal delay={160} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={ingestionImage}
                      alt={imageAlt(getImage(newer, "new_tab_3_first_image"))}
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
                <SectionTitle className="mb-6">{medallionHeading}</SectionTitle>
              </Reveal>

              <Reveal delay={100}>
                <Body className="max-w-none">{medallionParagraphs[0]}</Body>
              </Reveal>

              <Reveal delay={140}>
                <ThreeColTable
                  headers={medallionHeaders}
                  rows={medallionRows}
                  icon={medallionIcon}
                />
              </Reveal>

              <div className="mt-7">
                <Reveal delay={180}>
                  <Body className="max-w-none">{medallionParagraphs[1]}</Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-gold" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{goldHeading}</SectionTitle>
              </Reveal>
              <Reveal delay={100}>
                <Body className="max-w-none">{goldParagraphs[0]}</Body>
              </Reveal>
              {goldParagraphs[1] && <Reveal delay={130}><Body className="max-w-none">{goldParagraphs[1]}</Body></Reveal>}

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {goldModels.map((m, i) => (
                  <Reveal key={m.title} delay={i * 70} className="h-full">
                    <div className={cn(cjCard, "h-full p-6 lg:p-7")}>
                      <span aria-hidden="true" className={cjIconTile}>
                        <DynamicIcon name={m.icon} className={cjIconGlyph} />
                      </span>
                      <h4 className="mt-4 text-[1.05rem] font-bold leading-snug text-[#F7FAFC]">{m.title}</h4>
                      <p className="mt-3 text-[14.5px] leading-[1.65] text-[#A8B8C7]">{m.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {goldBottom}
                  </Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-geo" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{geoHeading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
                <div className="flex flex-col justify-center space-y-5">
                  <Reveal delay={100}>
                    <Body>{geoParagraphs[0]}</Body>
                  </Reveal>
                  <Reveal delay={130}>
                    <Body>{geoParagraphs[1]}</Body>
                  </Reveal>
                  <Reveal delay={160}>
                    <ul className="space-y-2.5">
                      {geoItems.map((item, index) => (
                        <li
                          key={`${item}-${index}`}
                          className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#A8B8C7]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#69D6FF]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>

                <Reveal delay={150} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={geoImage}
                      alt={imageAlt(getImage(newer, "new_tab_3_fourth_image"))}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            <section id="solution-ml" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{mlHeading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
                <div className="space-y-5">
                  <Reveal delay={100}>
                    <Body>{mlParagraphs[0]}</Body>
                  </Reveal>
                  <Reveal delay={130}>
                    <Body>{mlParagraphs[1]}</Body>
                  </Reveal>
                  <Reveal delay={160}>
                    <div className="flex flex-wrap gap-2.5">
                      {mlFeatures.filter((feature) => feature !== mlParagraphs[2]).map((f) => (
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
                    <Body>{mlParagraphs[2]}</Body>
                  </Reveal>
                </div>

                <Reveal delay={150} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={mlImage}
                      alt={imageAlt(getImage(newer, "new_tab_3_fifth_image"))}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            <section id="solution-dashboard" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{dashboardHeading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={100}>
                  <Body className="max-w-none">{dashboardParagraphs[0]}</Body>
                </Reveal>
                <Reveal delay={130}>
                  <Body className="max-w-none">{dashboardParagraphs[1]}</Body>
                </Reveal>
              </div>

              <ListGrid items={dashboardFeatures} cols="sm:grid-cols-2 lg:grid-cols-3" />

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">{dashboardBottom}</Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-managed" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{managedHeading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={100}>
                  <Body className="max-w-none">{managedParagraphs[0]}</Body>
                </Reveal>
                <Reveal delay={130}>
                  <Body className="max-w-none">{managedParagraphs[1]}</Body>
                </Reveal>
              </div>

              <Reveal delay={150}>
                <div className={cn(cjCard, "mt-7 overflow-hidden")}>
                  <SmartImage
                    src={managedImage}
                    alt={imageAlt(getImage(newer, "new_tab_3_seven_content_image"))}
                    width={1024}
                    height={576}
                    loading="eager"
                    className="h-[220px] w-full object-cover sm:h-[280px] lg:h-[360px]"
                  />
                </div>
              </Reveal>

              <ListGrid items={managedItems} />
            </section>

            <section id="tech-stack" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{technologyHeading}</SectionTitle>
              </Reveal>
              <ThreeColTable headers={technologyHeaders} rows={technologyRows} icon={technologyIcon} />
            </section>

            <section id="quality-security" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{qualityHeading}</SectionTitle>
              </Reveal>

              <Reveal delay={100}>
                <h3 className="text-lg font-semibold text-[#F7FAFC] lg:text-xl">{qualitySubheading}</h3>
              </Reveal>
              <Reveal delay={120}>
                <Body className="mt-3 max-w-none">{qualityIntro}</Body>
              </Reveal>
              <ListGrid items={qualityItems} />

              <div className="mt-10">
                <Reveal delay={100}>
                  <h3 className="text-lg font-semibold text-[#F7FAFC] lg:text-xl">{securityHeading}</h3>
                </Reveal>
                <Reveal delay={120}>
                  <Body className="mt-3 max-w-none">{securityIntro}</Body>
                </Reveal>
                <ListGrid items={securityItems} cols="sm:grid-cols-2 lg:grid-cols-4" />
              </div>

              <div className="mt-10">
                <Reveal delay={100}>
                  <h3 className="text-lg font-semibold text-[#F7FAFC] lg:text-xl">{contentString(newer, "new_tab_3_nine_sub_third_heading")}</h3>
                </Reveal>
                <Reveal delay={120}>
                  <ThreeColTable
                    headers={operationalHeaders}
                    rows={operationalRows}
                    icon={operationalIcon}
                  />
                </Reveal>
              </div>
            </section>
          </div>
        </div>

        {/* ================== CHAPTER 4 — DELIVERY SYSTEM ================== */}
        <div id="chapter-delivery" className={cn("focus:outline-none", chapterSpace)}>
          <div className={cjContainer}>
            <Reveal>
              <ChapterLabel>Chapter 04 — {chapters[3]?.label}</ChapterLabel>
            </Reveal>

            <KpiCommandCenter
              id="success-metrics"
              className={blockSpace}
              eyebrow=""
              title={metricsHeading}
              monitoringLabel={metricsLabel}
              items={metrics}
            />
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
                        alt={imageAlt(getImage(newer, "new_tab_5_third_image"))}
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
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{glanceHeading}</SectionTitle>
              </Reveal>

              <Reveal delay={100}>
                <div className={cn(cjCard, "overflow-hidden overflow-x-auto")}>
                  <table className="w-full min-w-[560px] text-left">
                    <thead>
                      <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                        {glanceHeaders.map((header) => (
                          <th key={header} className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {glanceRows.map((r, i) => (
                        <tr
                          key={r.capability}
                          className={cn(
                            "transition-colors hover:bg-white/[0.02]",
                            i !== glanceRows.length - 1 && "border-b border-white/[0.07]"
                          )}
                        >
                          <td className="px-5 py-4 align-top text-[14.5px] font-semibold text-[#F7FAFC] sm:px-7">
                            {r.capability}
                          </td>
                          <td className="px-5 py-4 align-top text-[14px] leading-[1.6] text-[#A9E7C2] sm:px-7">
                            {r.position}
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
              src={ctaImage}
              alt={imageAlt(getImage(content, "bottom_banner_image"))}
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
                  <span className="text-gradient-brand">{ctaHeading}</span>
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#A8B8C7] sm:text-[16px]">
                  {ctaContent}
                </p>
                <div className="mt-8 flex flex-col justify-start gap-4 sm:flex-row">
                  {ctaButtons.map((button, index) => (
                    <Button
                      key={button.text}
                      variant={index === 0 ? "default" : "outline"}
                      size="lg"
                      className={cn(
                        index === 0
                          ? "group w-full rounded-xl bg-gradient-to-r from-[#69D6FF] to-[#3AA6E0] font-semibold text-[#07111F] sm:w-auto"
                          : "group w-full rounded-xl border-white/20 text-[#F7FAFC] hover:bg-white/5 sm:w-auto",
                        cjFocus
                      )}
                      asChild
                    >
                      <Link to={button.url}>
                        {button.text}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default SupplyChainLogisticsControlTower;
