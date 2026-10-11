import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SmartImage from "@/components/SmartImage";
import { addClassToSpan, cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import he from "he";
import { DynamicIcon } from "@/components/DynamicIcon";

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


type CaseStudyImage = { url?: string; large?: string; alt?: string; title?: string };
type CaseStudyImageValue = CaseStudyImage | string;
type IconTextItem = { icon?: string; text?: string; content?: string };
type CaseStudyContent = {
  listing_icon?: string;
  tab_1_text?: string;
  tab_1_left_heading?: string;
  tab_1_left_content?: string;
  tab_1_right_heading?: string;
  tab_1_right_content?: string;
  tab_1_right_image?: CaseStudyImageValue;
  tab_1_left_image?: CaseStudyImageValue;
  tab_2_text?: string;
  category_row?: { label?: string; text?: string; icon?: string }[];
  tab_2_heading?: string;
  tab_2_cards?: { icon?: string; text?: string; image?: CaseStudyImage }[];
  tab_2_second_heading?: string;
  tab_2_second_cards?: {
    icon?: string;
    title?: string;
    content?: string;
    image?: CaseStudyImage;
  }[];
  banner_button_text?: string;
  banner_button_url?: string;
  bottom_banner_heading?: string;
  bottom_banner_content?: string;
  bottom_banner_buttons?: { button_text?: string; button_url?: string }[];
  bottom_banner_image?: CaseStudyImageValue;
  [key: string]: unknown;
};
type CaseStudyContentNew = {
  new_tab_3_text?: string;
  new_tab_3_first_heading?: string;
  new_tab_3_first_content?: string;
  new_tab_3_first_content_blocks?: IconTextItem[];
  new_tab_3_first_bottom_content?: string;
  new_tab_3_second_heading?: string;
  new_tab_3_second_content?: string;
  new_tab_3_third_heading?: string;
  new_tab_3_third_content?: string;
  new_tab_3_third_content_blocks?: { icon?: string; text?: string; content?: string }[];
  new_tab_3_fourth_heading?: string;
  new_tab_3_fourth_content?: string;
  new_tab_3_fourth_content_lists?: { text?: string }[];
  new_tab_3_fifth_heading?: string;
  new_tab_3_fifth_content?: string;
  new_tab_3_fifth_image?: CaseStudyImage;
  new_tab_3_fifth_content_blocks?: IconTextItem[];
  new_tab_3_fifth_bottom_content?: string;
  new_tab_3_six_heading?: string;
  new_tab_3_six_content?: string;
  new_tab_3_seven_heading?: string;
  new_tab_3_seven_content?: string;
  new_tab_3_seven_content_lists?: { text?: string }[];
  new_tab_3_eight_heading?: string;
  new_tab_3_eight_content?: string;
  new_tab_3_eight_content_lists?: { text?: string }[];
  new_tab_3_eight_content_second?: string;
  new_tab_3_eight_content_second_lists?: { text?: string }[];
  new_tab_3_nine_heading?: string;
  new_tab_3_nine_sub_heading?: string;
  new_tab_3_nine_content?: string;
  new_tab_3_nine_content_lists?: { text?: string }[];
  new_tab_3_nine_second_sub_heading?: string;
  new_tab_3_nine_second_sub_content?: string;
  new_tab_3_nine_third_sub_heading?: string;
  new_tab_3_nine_third_sub_content?: string;
  new_tab_3_nine_third_sub_content_lists?: { text?: string }[];
  new_tab_4_text?: string;
  new_tab_4_first_heading?: string;
  new_tab_4_first_content?: IconTextItem[];
  new_tab_5_text?: string;
  new_tab_5_first_heading?: string;
  new_tab_5_first_content?: IconTextItem[];
  new_tab_5_second_heading?: string;
  new_tab_5_second_content?: {
    title?: string;
    content?: string;
    icon?: string;
    image?: CaseStudyImage;
  }[];
  new_tab_5_third_heading?: string;
  new_tab_5_third_content?: string;
  new_tab_5_third_image?: CaseStudyImage;
  new_tab_5_fourth_heading?: string;
  new_tab_5_fourth_content?: string;
  [key: string]: unknown;
};
type CaseStudyData = {
  title: string;
  image?: string;
  categories?: string[];
  content?: CaseStudyContent;
  content_new?: CaseStudyContentNew;
  seo?: { title?: string; description?: string; og_image?: string };
  schema?: string | object;
};

const iconName = (name?: string) => name?.replace(/^lucide-/, "") || "";
const imageUrl = (image?: CaseStudyImageValue) =>
  typeof image === "string" ? image : image?.url || image?.large || "";
const imageAlt = (image?: CaseStudyImageValue) =>
  typeof image === "string" ? "" : image?.alt || image?.title || "";
const stripHtml = (html = "") => he.decode(html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "")).trim();
const extractTagContents = (html = "", tag: string) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))]
    .map((match) => stripHtml(match[1]))
    .filter(Boolean);
const extractListItems = (html = "") => extractTagContents(html, "li");
const extractLists = (html = "") =>
  [...html.matchAll(/<ul\b[^>]*>[\s\S]*?<\/ul>/gi)].map((match) => extractListItems(match[0]));
const extractTableRows = (html = "") =>
  [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].slice(1).map((row) =>
    [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => stripHtml(cell[1]))
  );
const mapIconItems = (items: IconTextItem[] = []) =>
  items.map((item) => ({ text: item.text || item.content || "", icon: iconName(item.icon) }));

const mapCaseStudyData = (data: CaseStudyData) => {
  const content: CaseStudyContent = data.content || {};
  const newer: CaseStudyContentNew = data.content_new || {};
  const businessParagraphs = extractTagContents(content.tab_1_right_content, "p");
  const stockoutContent = newer.new_tab_3_six_content || "";
  const qualityContent = newer.new_tab_3_nine_second_sub_content || "";
  const glanceRows = extractTableRows(newer.new_tab_5_fourth_content || "");
  const resultParagraphs = extractTagContents(newer.new_tab_5_third_content || "", "p");
  const businessLists = extractLists(content.tab_1_right_content || "");

  return {
    content,
    newer,
    chapters: [
      { id: "chapter-opportunity", label: content.tab_1_text || "" },
      { id: "chapter-friction", label: content.tab_2_text || "" },
      { id: "chapter-solution", label: newer.new_tab_3_text || "" },
      { id: "chapter-delivery", label: newer.new_tab_4_text || "" },
      { id: "chapter-impact", label: (newer.new_tab_5_text || "").trim() },
    ],
    snapshot: (content.category_row || []).map((item, index) => ({
      label: item.label || "",
      value: item.text || "",
      icon: iconName(item.icon),
      tone: index === 1 || index === 2 ? ("mint" as const) : undefined,
    })),
    overviewParagraphs: extractTagContents(content.tab_1_left_content, "p"),
    overviewHeading: content.tab_1_left_heading || "",
    businessHeading: content.tab_1_right_heading || "",
    businessIntro: businessParagraphs[0] || "",
    contextQuestions: businessLists[0] || [],
    businessFollowup: businessParagraphs[1] || "",
    businessResultsHeading: businessParagraphs[2] || "",
    contextResults: businessLists[1] || [],
    businessClosing: businessParagraphs.slice(3),
    challengesHeading: content.tab_2_heading || "",
    challenges: (content.tab_2_cards || []).map((item, index) => ({
      no: String(index + 1).padStart(2, "0"),
      icon: iconName(item.icon),
      img: imageUrl(item.image),
      alt: imageAlt(item.image),
      text: item.text || "",
    })),
    objectivesHeading: content.tab_2_second_heading || "",
    objectives: (content.tab_2_second_cards || []).map((item, index) => ({
      no: String(index + 1).padStart(2, "0"),
      title: item.title || "",
      text: item.content || "",
      icon: iconName(item.icon),
      img: imageUrl(item.image),
      alt: imageAlt(item.image),
    })),
    generatedEntities: mapIconItems(newer.new_tab_3_first_content_blocks),
    medallionHeaders: extractTagContents(newer.new_tab_3_second_content || "", "th"),
    medallionLayers: extractTableRows(newer.new_tab_3_second_content || "").map((cells) => ({
      layer: cells[0] || "",
      purpose: cells[1] || "",
      examples: cells[2] || "",
      icon: iconName(
        (newer.new_tab_3_second_content || "").match(/class="lucide lucide-([a-z0-9-]+)/i)?.[1]
      ),
    })),
    featureGroups: (newer.new_tab_3_third_content_blocks || []).map((item) => ({
      title: item.text || "",
      icon: iconName(item.icon),
      items: extractTagContents(item.content || "", "code"),
    })),
    record360: (newer.new_tab_3_fourth_content_lists || []).map((item) => ({ text: item.text || "" })),
    forecastConsiderations: mapIconItems(newer.new_tab_3_fifth_content_blocks),
    forecastContent: extractTagContents(newer.new_tab_3_fifth_content || "", "p"),
    forecastCode: extractTagContents(newer.new_tab_3_fifth_content || "", "code")[0] || "",
    stockoutContent: extractTagContents(stockoutContent, "p"),
    stockoutFormula: extractTagContents(stockoutContent, "code")[0] || "",
    stockoutHeaders: extractTagContents(stockoutContent, "th"),
    supplierHeadingContent: extractTagContents(newer.new_tab_3_seven_content || "", "p"),
    insightHeadingContent: extractTagContents(newer.new_tab_3_eight_content || "", "p"),
    solution360Content: extractTagContents(newer.new_tab_3_fourth_content || "", "p"),
    reconciliationParagraphs: extractTagContents(qualityContent, "p"),
    reconciliationCode: extractTagContents(qualityContent, "code")[0] || "",
    riskBands: extractTableRows(stockoutContent).map((cells) => ({
      band: cells[0] || "",
      condition: cells[1] || "",
    })),
    supplierMeasures: (newer.new_tab_3_seven_content_lists || []).map((item) => ({ text: item.text || "" })),
    insightFields: (newer.new_tab_3_eight_content_lists || []).map((item) => ({ text: item.text || "" })),
    recommendedActions: (newer.new_tab_3_eight_content_second_lists || []).map((item) => ({ text: item.text || "" })),
    qualityControls: (newer.new_tab_3_nine_content_lists || []).map((item) => ({ text: item.text || "" })),
    reconciliationItems: extractListItems(qualityContent),
    securityItems: (newer.new_tab_3_nine_third_sub_content_lists || []).map((item) => ({ text: item.text || "" })),
    successMetricsList: (newer.new_tab_4_first_content || []).map((item) => ({
      text: item.content || "",
      icon: iconName(item.icon),
    })),
    benefits: (newer.new_tab_5_first_content || []).map((item, index) => ({
      text: item.content || "",
      icon: iconName(item.icon),
      tone: index === 1 || index === 4 ? "mint" : "cyan",
    })),
    deliverables: (newer.new_tab_5_second_content || []).map((item) => ({
      title: item.title || "",
      text: item.content || "",
      icon: iconName(item.icon),
      image: imageUrl(item.image),
    })),
    glanceStats: glanceRows.map((cells) => ({ label: cells[0] || "", value: cells[1] || "" })),
    resultParagraphs,
    resultCode: extractTagContents(newer.new_tab_5_third_content || "", "code")[0] || "",
    resultImage: imageUrl(newer.new_tab_5_third_image),
    glanceHeaders: extractTagContents(newer.new_tab_5_fourth_content || "", "th"),
    heroImage: imageUrl(data.image),
    contextImage: imageUrl(content.tab_1_right_image),
    businessImage: imageUrl(content.tab_1_left_image),
    mlImage: imageUrl(newer.new_tab_3_fifth_image),
    ctaImage: imageUrl(content.bottom_banner_image),
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

const SupplyChainControlTower = ({ data }: { data: CaseStudyData }) => {
  const [progress, setProgress] = useState(0);
  const {
    content,
    newer,
    chapters,
    snapshot,
    overviewParagraphs,
    overviewHeading,
    businessHeading,
    businessIntro,
    contextQuestions,
    businessFollowup,
    businessResultsHeading,
    contextResults,
    businessClosing,
    challengesHeading,
    challenges,
    objectivesHeading,
    objectives,
    generatedEntities,
    medallionHeaders,
    medallionLayers,
    featureGroups,
    record360,
    forecastConsiderations,
    forecastContent,
    forecastCode,
    solution360Content,
    riskBands,
    stockoutContent,
    stockoutFormula,
    stockoutHeaders,
    supplierHeadingContent,
    insightHeadingContent,
    supplierMeasures,
    insightFields,
    recommendedActions,
    qualityControls,
    reconciliationItems,
    securityItems,
    reconciliationParagraphs,
    reconciliationCode,
    successMetricsList,
    benefits,
    deliverables,
    glanceStats,
    resultParagraphs,
    resultCode,
    resultImage,
    glanceHeaders,
    heroImage,
    contextImage,
    businessImage,
    mlImage,
    ctaImage,
  } = mapCaseStudyData(data);
  const titleMarkup = addClassToSpan(
    data.title.replace(/(Demand Forecasting Platform)$/, "<span>$1</span>"),
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
                      <DynamicIcon name={iconName(content.listing_icon)} className="h-3.5 w-3.5" />
                      {data.categories?.[0] || snapshot[0]?.value}
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
                    <Link to={content.banner_button_url}>
                      {content.banner_button_text || "Discuss a Similar Project"}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </Reveal>
              </div>

              <Reveal delay={180} className="h-full">
                <div className={cn(cjCard, "h-full overflow-hidden")}>
                  <SmartImage
                    src={heroImage}
                    alt={data.title}
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
                    <Reveal delay={120}>
                      <Body>{overviewParagraphs[0]}</Body>
                    </Reveal>
                    <Reveal delay={150}>
                      <Body>{overviewParagraphs[1]}</Body>
                    </Reveal>
                    <Reveal delay={170}>
                      <Body>{overviewParagraphs[2]}</Body>
                    </Reveal>
                    <Reveal delay={190}>
                      <Body>{overviewParagraphs[3]}</Body>
                    </Reveal>
                  </div>
                </div>

                <Reveal delay={160} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={contextImage}
                      alt={imageAlt(content.tab_1_right_image)}
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
                      src={businessImage}
                      alt={imageAlt(content.tab_1_left_image)}
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
                  <div className="mt-7 space-y-5">
                    <Reveal delay={120}>
                      <Body>{businessIntro}</Body>
                    </Reveal>
                    <Reveal delay={160}>
                      <ul className="mt-4 space-y-3">
                        {contextQuestions.map((q, i) => (
                          <li key={i} className="flex items-start gap-3 text-[15px] leading-snug text-[#A8B8C7]">
                            <span className="mt-1 shrink-0 text-[#5CC8DC]" aria-hidden="true">❖</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                    <Reveal delay={220}>
                      <Body className="max-w-none">
                        {businessFollowup}
                      </Body>
                    </Reveal>
                    <Reveal delay={280}>
                      <Body className="max-w-none font-semibold text-[#F7FAFC]">{businessResultsHeading}</Body>
                    </Reveal>
                    <Reveal delay={310}>
                      <ul className="space-y-3">
                        {contextResults.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-[15px] leading-snug text-[#A8B8C7]">
                            <span className="mt-1 shrink-0 text-[#5CC8DC]" aria-hidden="true">❖</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                    <Reveal delay={340}>
                      <Body className="max-w-none">
                        {businessClosing[0]}
                      </Body>
                    </Reveal>
                    <Reveal delay={370}>
                      <Body className="max-w-none">
                        {businessClosing[1]}
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
              <ChapterLabel>Chapter 02 — {chapters[1]?.label}</ChapterLabel>
            </Reveal>

            <section id="challenge" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{challengesHeading}</SectionTitle>
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

            <section id="solution-data" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_first_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">{newer.new_tab_3_first_content}</Body>
                </Reveal>
              </div>

              <ListGrid items={generatedEntities} />

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">{newer.new_tab_3_first_bottom_content}</Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-medallion" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_second_heading}</SectionTitle>
              </Reveal>

              <Reveal delay={140}>
                <div className={cn(cjCard, "mt-2 overflow-hidden")}>
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
                              <DynamicIcon name={l.icon} className="h-4 w-4 shrink-0 text-[#69D6FF]" />
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
            </section>

            <section id="solution-features" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_third_heading}</SectionTitle>
              </Reveal>

              <Reveal delay={110}>
                <Body className="max-w-none">
                  {newer.new_tab_3_third_content}
                </Body>
              </Reveal>

              <div className="mt-8 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {featureGroups.map((g, i) => {
                  return (
                    <Reveal key={g.title} delay={i * 70} className="h-full">
                      <div className={cn(cjCard, "h-full p-6 lg:p-7")}>
                        <div className="flex items-center gap-3">
                          <span className={cn(cjIconTile, "border-[#69D6FF]/25 text-[#69D6FF]")}>
                            <DynamicIcon name={g.icon} className={cjIconGlyph} />
                          </span>
                          <h3 className="text-[16px] font-semibold text-[#F7FAFC]">{g.title}</h3>
                        </div>
                        <ul className="mt-5 space-y-2.5">
                          {g.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#A9E7C2]" />
                              <code className="font-numbers text-[13.5px] leading-[1.6] text-[#A8B8C7]">{item}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>

            <section id="solution-360" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_fourth_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body>{solution360Content[0]}</Body>
                </Reveal>
                <Reveal delay={140}>
                  <Body>{solution360Content[1]}</Body>
                </Reveal>
                <Reveal delay={240}>
                  <Body>{solution360Content[2]}</Body>
                </Reveal>
              </div>

              <Reveal delay={180}>
                <div className={cn(cjCard, "mt-6 px-6 py-6 lg:px-7 lg:py-7")}>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {record360.map((item, i) => (
                      <li key={item.text} className="flex items-start gap-3 text-left">
                        <span className="mt-1.5 shrink-0 text-[11px] text-[#5CC8DC]" aria-hidden="true">❖</span>
                        <span className="text-[15px] leading-snug text-[#A8B8C7]">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </section>

            <section id="solution-ml" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_fifth_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  <Reveal delay={110}>
                    <Body>{forecastContent[0]}</Body>
                  </Reveal>
                  <Reveal delay={130}>
                    <Body>{forecastContent[1]}</Body>
                  </Reveal>
                  <Reveal delay={150}>
                    <div className={cn(cjCard, "px-5 py-4")}>
                      <code className="font-numbers text-[14px] text-[#A9E7C2]">{forecastCode}</code>
                    </div>
                  </Reveal>
                  <Reveal delay={170}>
                    <Body>{forecastContent[2]}</Body>
                  </Reveal>
                  <Reveal delay={190}>
                    <Body>{forecastContent[3]}</Body>
                  </Reveal>
                </div>

                <Reveal delay={140} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={mlImage}
                      alt={imageAlt(newer.new_tab_3_fifth_image)}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>

              <ListGrid items={forecastConsiderations} cols="sm:grid-cols-2 lg:grid-cols-4" />

              <div className="mt-7">
                <Reveal delay={200}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_fifth_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-stockout" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_six_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">{stockoutContent[0]}</Body>
                </Reveal>
                <Reveal delay={130}>
                  <Body className="max-w-none">{stockoutContent[1]}</Body>
                </Reveal>
                <Reveal delay={150}>
                  <div className={cn(cjCard, "px-6 py-5")}>
                    <code className="font-numbers text-[14px] leading-[1.9] text-[#A9E7C2]">
                      {stockoutFormula.split("\n").map((line, index) => (
                        <Fragment key={`${line}-${index}`}>
                          {index > 0 && <br />}
                          {line}
                        </Fragment>
                      ))}
                    </code>
                  </div>
                </Reveal>
                <Reveal delay={170}>
                  <Body className="max-w-none">{stockoutContent[2]}</Body>
                </Reveal>
                <Reveal delay={190}>
                  <Body className="max-w-none">{stockoutContent[3]}</Body>
                </Reveal>
              </div>

              <Reveal delay={210}>
                <div className={cn(cjCard, "mt-6 max-w-3xl overflow-hidden")}>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.09]">
                        <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#69D6FF] lg:px-8">
                          {stockoutHeaders[0]}
                        </th>
                        <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#69D6FF] lg:px-8">
                          {stockoutHeaders[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskBands.map((r) => (
                        <tr
                          key={r.band}
                          className="border-b border-white/[0.06] transition-colors last:border-0 hover:bg-white/[0.02]"
                        >
                          <td className="px-6 py-4 text-[1.0rem] font-semibold text-[#F7FAFC] lg:px-8">{r.band}</td>
                          <td className="px-6 py-4 text-[14px] leading-[1.6] text-[#A8B8C7] lg:px-8">{r.condition}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>

              <div className="mt-7">
                <Reveal delay={240}>
                  <Body className="max-w-none">{stockoutContent[4]}</Body>
                </Reveal>
              </div>
            </section>

            <section id="solution-supplier" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_seven_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body>{supplierHeadingContent[0]}</Body>
                </Reveal>
                <Reveal delay={130}>
                  <Body>{supplierHeadingContent[1]}</Body>
                </Reveal>
                <Reveal delay={240}>
                  <Body>{supplierHeadingContent[2]}</Body>
                </Reveal>
              </div>

              <Reveal delay={160}>
                <div className={cn(cjCard, "mt-6 px-6 py-5")}>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {supplierMeasures.map((measure) => (
                      <li key={measure.text} className="flex items-start gap-3 text-left text-[15px] text-[#A8B8C7]">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rotate-45 bg-[#5CC8DC]" aria-hidden="true" />
                        <span>{measure.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </section>

            <section id="solution-insights" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_eight_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}>
                  <Body className="max-w-none">{insightHeadingContent[0]}</Body>
                </Reveal>
                <Reveal delay={140}>
                  <Body className="max-w-none">{insightHeadingContent[1]}</Body>
                </Reveal>
              </div>

              <Reveal delay={140}>
                <div className={cn(cjCard, "mt-5 px-6 py-5")}>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {insightFields.map((field) => (
                      <li key={field.text} className="flex items-start gap-3 text-left text-[15px] text-[#A8B8C7]">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rotate-45 bg-[#5CC8DC]" aria-hidden="true" />
                        <span>{field.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <div className="mt-8">
                <Reveal delay={200}>
                  <Body className="max-w-none">{newer.new_tab_3_eight_content_second}</Body>
                </Reveal>
              </div>

              <Reveal delay={160}>
                <div className={cn(cjCard, "mt-5 px-6 py-5")}>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {recommendedActions.map((action) => (
                      <li key={action.text} className="flex items-start gap-3 text-left text-[15px] text-[#A8B8C7]">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rotate-45 bg-[#5CC8DC]" aria-hidden="true" />
                        <span>{action.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </section>

            <section id="quality-security" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_nine_heading}</SectionTitle>
              </Reveal>

              <Reveal delay={100}>
                <h3 className="text-lg font-semibold text-[#F7FAFC] lg:text-xl">{newer.new_tab_3_nine_sub_heading}</h3>
              </Reveal>
              <Reveal delay={120}>
                <Body className="mt-3 max-w-none">{newer.new_tab_3_nine_content}</Body>
              </Reveal>
              <Reveal delay={160}>
                <div className={cn(cjCard, "mt-4 px-6 py-5")}>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {qualityControls.map((item) => (
                      <li key={item.text} className="flex items-start gap-3 text-left text-[15px] text-[#A8B8C7]">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rotate-45 bg-[#5CC8DC]" aria-hidden="true" />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <div className="mt-10">
                <Reveal delay={100}>
                  <h3 className="text-lg font-semibold text-[#F7FAFC] lg:text-xl">{newer.new_tab_3_nine_second_sub_heading}</h3>
                </Reveal>
                <Reveal delay={120}>
                  <Body className="mt-3 max-w-none">{reconciliationParagraphs[0]}</Body>
                </Reveal>
                <Reveal delay={140}>
                  <div className={cn(cjCard, "mt-5 px-6 py-4")}>
                    <code className="font-numbers text-[14px] text-[#A9E7C2]">{reconciliationCode}</code>
                  </div>
                </Reveal>
                <Reveal delay={160}>
                  <Body className="mt-5 max-w-none">{reconciliationParagraphs[1]}</Body>
                </Reveal>
                <Reveal delay={180}>
                  <div className={cn(cjCard, "mt-4 px-6 py-5")}>
                    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {reconciliationItems.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-left text-[15px] text-[#A8B8C7]">
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 rotate-45 bg-[#5CC8DC]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <div className="mt-10">
                <Reveal delay={100}>
                  <h3 className="text-lg font-semibold text-[#F7FAFC] lg:text-xl">{newer.new_tab_3_nine_third_sub_heading}</h3>
                </Reveal>
                <Reveal delay={120}>
                  <Body className="mt-3 max-w-none">{newer.new_tab_3_nine_third_sub_content}</Body>
                </Reveal>
                <Reveal delay={160}>
                  <div className={cn(cjCard, "mt-4 px-6 py-5")}>
                    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {securityItems.map((item) => (
                        <li key={item.text} className="flex items-start gap-3 text-left text-[15px] text-[#A8B8C7]">
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 rotate-45 bg-[#5CC8DC]" aria-hidden="true" />
                          <span>{item.text}</span>
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
              <ChapterLabel>Chapter 04 — {chapters[3]?.label}</ChapterLabel>
            </Reveal>

            <KpiCommandCenter
              id="success-metrics"
              className={blockSpace}
              eyebrow=""
              title={newer.new_tab_4_first_heading}
              items={successMetricsList.map((m, i) => ({
                text: m.text,
                icon: m.icon,
                accent: ["#55C7F3", "#82DDB6", "#63E6FF", "#5AA9F5", "#82DDB6", "#5FDCD2", "#8178FF", "#55C7F3", "#82DDB6"][i % 9],
              }))}
            />

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
              title={newer.new_tab_5_first_heading}
              items={benefits.map((b, i) => ({
                label: b.text,
                text: "",
                icon: b.icon,
                accent: ["#52C7FF", "#7EF7C9", "#8B7CFF", "#63E6FF", "#B6F7A8", "#52C7FF", "#7EF7C9"][i % 7],
              }))}
            />


            <section id="deliverables" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{newer.new_tab_5_second_heading}</SectionTitle>
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
                        <Body>{resultParagraphs[0]}</Body>
                      </Reveal>
                      <Reveal delay={130}>
                        <Body>{resultParagraphs[1]}</Body>
                      </Reveal>
                      <Reveal delay={150}>
                        <div className="rounded-[18px] border border-white/[0.08] bg-[#102236]/60 px-5 py-4">
                          <code className="font-numbers text-[13.5px] leading-[1.8] text-[#A9E7C2]">
                            {resultCode}
                          </code>
                        </div>
                      </Reveal>
                      <Reveal delay={170}>
                        <Body>{resultParagraphs[2]}</Body>
                      </Reveal>
                      <Reveal delay={190}>
                        <Body>{resultParagraphs[3]}</Body>
                      </Reveal>
                      <Reveal delay={210}>
                        <Body>{resultParagraphs[4]}</Body>
                      </Reveal>
                      <Reveal delay={220}>
                        <p className="border-l-2 border-[#69D6FF]/50 pl-5 text-[15px] italic leading-[1.7] text-[#A8B8C7] sm:text-[16px]">
                          {resultParagraphs[5]}
                        </p>
                      </Reveal>
                      <Reveal delay={230}>
                        <Body>{resultParagraphs[6]}</Body>
                      </Reveal>
                      <Reveal delay={240}>
                        <p className="border-l-2 border-[#A9E7C2]/50 pl-5 text-[15px] italic leading-[1.7] text-[#A8B8C7] sm:text-[16px]">
                          {resultParagraphs[7]}
                        </p>
                      </Reveal>
                      <Reveal delay={250}>
                        <Body>{resultParagraphs[8]}</Body>
                      </Reveal>
                    </div>
                  </div>

                  <Reveal delay={140} className="h-full">
                    <div className="h-full overflow-hidden rounded-[22px] border border-white/[0.08]">
                      <SmartImage
                        src={resultImage}
                        alt={imageAlt(newer.new_tab_5_third_image)}
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
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{newer.new_tab_5_fourth_heading}</SectionTitle>
              </Reveal>

              <Reveal delay={100}>
                <div className={cn(cjCard, "overflow-hidden overflow-x-auto")}>
                  <table className="w-full min-w-[640px] text-left">
                    <thead>
                      <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                        <th className="w-[34%] px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#69D6FF] sm:px-7">
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
                            i !== glanceStats.length - 1 && "border-b border-white/[0.07]"
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
              src={ctaImage}
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

export default SupplyChainControlTower;
