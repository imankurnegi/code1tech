import { useEffect, useState } from "react";
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
  cjFocus,
} from "@/components/case-studies/simkyc/primitives";
import ChapterNav from "@/components/case-studies/simkyc/ChapterNav";
import CaseSnapshot from "@/components/case-studies/simkyc/CaseSnapshot";
import { BenefitCard, DeliverableCard } from "@/components/case-studies/simkyc/MetricCard";
import KpiCommandCenter from "@/components/case-studies/KpiCommandCenter";

import SeoTags from "@/components/SeoTags";

type CaseStudyImage = { url?: string; large?: string; alt?: string; title?: string };
type CaseStudyData = {
  title: string;
  image?: string;
  categories?: string[];
  content?: Record<string, any>;
  content_new?: Record<string, any>;
  seo?: { title?: string; description?: string; og_image?: string };
  schema?: string | object;
};

const iconName = (name?: string) => name?.replace(/^lucide-/, "") || "";
const imageUrl = (image?: CaseStudyImage | string) =>
  typeof image === "string" ? image : image?.url || image?.large || "";
const imageAlt = (image?: CaseStudyImage) => image?.alt || image?.title || "";
const stripHtml = (html = "") => he.decode(html.replace(/<[^>]*>/g, "")).trim();
const extractTagContents = (html = "", tag: string) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))]
    .map((match) => stripHtml(match[1]))
    .filter(Boolean);
const extractSection = (html = "", id: string) =>
  html.match(new RegExp(`<section\\b(?=[^>]*\\bid=["']${id}["'])[^>]*>([\\s\\S]*?)<\\/section>`, "i"))?.[1] || "";
const extractTableRows = (html = "") =>
  [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].slice(1).map((row) =>
    [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => stripHtml(cell[1]))
  );

const mapCaseStudyData = (data: CaseStudyData) => {
  const content = data.content || {};
  const newer = data.content_new || {};
  const solutionHtml = newer.new_tab_3_first_content || "";
  const section = (id: string) => extractSection(solutionHtml, id);
  const sectionParagraphs = (id: string) => extractTagContents(section(id), "p");
  const sectionHeadings = (id: string) => extractTagContents(section(id), "h3");
  const overviewParagraphs = extractTagContents(content.tab_1_left_content, "p");
  const resultHtml = newer.new_tab_5_third_content || "";
  const qualityHtml = section("solution-quality");
  const conversationHtml = section("solution-conversation");
  const qualityItems = [...qualityHtml.matchAll(/<div class="flex items-center gap-2\.5 rounded-lg[^>]*>([\s\S]*?)<\/div>/gi)]
    .map((match) => ({
      text: extractTagContents(match[1], "span")[0] || "",
      icon: match[1].match(/class="lucide lucide-([a-z0-9-]+)/i)?.[1] || "",
    }))
    .filter((item) => item.text);
  const medallionHtml = section("solution-medallion");
  const medallionLabels = extractTagContents(medallionHtml, "span");
  const medallionParagraphs = extractTagContents(medallionHtml, "p");
  const conversationQuestions = [...conversationHtml.matchAll(/<div class="flex items-start gap-4 rounded-lg[^>]*>([\s\S]*?)<\/div>/gi)]
    .map((match) => extractTagContents(match[1], "span")[1] || "")
    .filter(Boolean);
  const progressionHtml = conversationHtml.match(/<div class="flex flex-wrap items-center gap-2">([\s\S]*?)<\/div>/i)?.[1] || "";
  const tableHtml = newer.new_tab_5_fourth_content || "";

  return {
    content,
    newer,
    chapters: [
      { id: "chapter-opportunity", label: content.tab_1_text },
      { id: "chapter-friction", label: content.tab_2_text },
      { id: "chapter-solution", label: newer.new_tab_3_text },
      { id: "chapter-delivery", label: newer.new_tab_4_text },
      { id: "chapter-impact", label: newer.new_tab_5_text },
    ],
    snapshot: (content.category_row || []).map((item: any, index: number) => ({
      label: item.label,
      value: item.text,
      icon: iconName(item.icon),
      tone: index === 1 || index === 2 ? "mint" : undefined,
    })),
    overviewParagraphs,
    businessParagraphs: extractTagContents(content.tab_1_right_content, "p"),
    challengeCards: (content.tab_2_cards || []).map((item: any, index: number) => ({
      no: String(index + 1).padStart(2, "0"),
      icon: iconName(item.icon),
      img: imageUrl(item.image),
      alt: imageAlt(item.image),
      text: item.text,
    })),
    challengeIntro: extractTagContents(content.tab_2_content, "p")[0] || content.tab_2_content || "",
    challengeFollowup: extractTagContents(content.tab_2_text_block, "p"),
    solution: {
      overviewHeading: extractTagContents(solutionHtml, "h2")[0] || "",
      overviewText: extractTagContents(solutionHtml, "p")[0] || "",
      sourcesHeading: sectionHeadings("solution-overview")[0] || "",
      sourcesText: sectionParagraphs("solution-overview")[0] || "",
      foundationHeading: sectionHeadings("solution-foundation")[0] || "",
      foundationText: sectionParagraphs("solution-foundation")[0] || "",
      medallionHeading: sectionHeadings("solution-medallion")[0] || "",
      medallionIntro: medallionParagraphs[0] || "",
      medallionLayers: medallionLabels.map((layer: string, index: number) => ({
        layer,
        purpose: medallionParagraphs[index + 1] || "",
      })),
      medallionCode: extractTagContents(medallionHtml, "code")[0] || "",
      semanticHeading: sectionHeadings("solution-semantic-genai")[0] || "",
      semanticText: sectionParagraphs("solution-semantic-genai")[0] || "",
      genAiHeading: sectionHeadings("solution-semantic-genai")[1] || "",
      genAiText: sectionParagraphs("solution-semantic-genai")[1] || "",
      conversationHeading: sectionHeadings("solution-conversation")[0] || "",
      conversationIntro: extractTagContents(conversationHtml, "p")[0] || "",
      firstQuestion: extractTagContents(conversationHtml, "p")[1] || "",
      conversationQuestions,
      progression: extractTagContents(progressionHtml, "span"),
      qualityHeading: sectionHeadings("solution-quality")[0] || "",
      qualityIntro: sectionParagraphs("solution-quality")[0] || "",
      qualityLead: sectionParagraphs("solution-quality")[1] || "",
      qualityItems,
      qualityClosing: sectionParagraphs("solution-quality")[2] || "",
    },
    successMetrics: (newer.new_tab_4_first_content_blocks || []).map((item: any, index: number) => ({
      text: `${item.title}: ${item.content}`,
      icon: iconName(item.icon),
      accent: ["#55C7F3", "#82DDB6", "#63E6FF", "#5AA9F5", "#82DDB6", "#5FDCD2", "#8178FF", "#82DDB6", "#55C7F3", "#63E6FF"][index % 10],
    })),
    benefits: (newer.new_tab_5_first_content_blocks || []).map((item: any, index: number) => ({
      text: item.text,
      icon: iconName(item.icon),
      tone: index === 1 || index === 4 ? "mint" : "cyan",
    })),
    deliverables: (newer.new_tab_5_second_content_blocks || []).map((item: any) => ({
      title: item.title,
      text: item.content,
      icon: iconName(item.icon),
      image: imageUrl(item.image),
    })),
    resultParagraphs: extractTagContents(resultHtml, "p"),
    resultCode: extractTagContents(resultHtml, "code")[0] || "",
    resultImage: imageUrl(newer.new_tab_5_third_image),
    glanceHeaders: extractTagContents(tableHtml, "th"),
    glanceStats: extractTableRows(tableHtml).map((cells) => ({ capability: cells[0] || "", position: cells[1] || "" })),
    bannerButtons: content.bottom_banner_buttons || [],
  };
};

const chapterSpace = "pt-10 sm:pt-12 md:pt-14 lg:pt-16";
const blockSpace = "py-8 sm:py-9 md:py-10 lg:py-12";

const ConversationalAnalyticsAssistant = ({ data }: { data: CaseStudyData }) => {
  const [progress, setProgress] = useState(0);
  const { content, newer, chapters, snapshot, overviewParagraphs, businessParagraphs, challengeCards, challengeIntro, challengeFollowup, solution, successMetrics, benefits, deliverables, resultParagraphs, resultCode, resultImage, glanceHeaders, glanceStats, bannerButtons } = mapCaseStudyData(data);
  const titleMarkup = addClassToSpan(data.title.replace(/(Conversational Analytics Assistant)$/, "<span>$1</span>"), "text-gradient-brand");

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
                      <DynamicIcon name={iconName(content.listing_icon)} className="h-3.5 w-3.5" aria-hidden="true" />
                      {data.categories?.[0]}
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
                    src={imageUrl(data.image)}
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
                      <Body>{overviewParagraphs[0]}</Body>
                    </Reveal>
                    <Reveal delay={150}>
                      <Body>{overviewParagraphs[1]}</Body>
                    </Reveal>
                    <Reveal delay={180}>
                      <p className="border-l-2 border-[#69D6FF]/50 pl-5 text-[15px] italic leading-[1.7] text-[#A8B8C7] sm:text-[16px]">
                        {overviewParagraphs[2]}
                      </p>
                    </Reveal>
                    <Reveal delay={210}>
                      <Body>{overviewParagraphs[3]}</Body>
                    </Reveal>
                    <Reveal delay={240}>
                      <Body>{overviewParagraphs[4]}</Body>
                    </Reveal>
                    <Reveal delay={270}>
                      <Body>{overviewParagraphs[5]}</Body>
                    </Reveal>
                  </div>
                </div>

                <Reveal delay={160} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={imageUrl(content.tab_1_right_image)}
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

            <section id="business-objectives" className={cn("focus:outline-none", blockSpace)}>
              <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
                <Reveal className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}> 
                    <SmartImage
                      src={imageUrl(content.tab_1_left_image)}
                      alt={imageAlt(content.tab_1_left_image)}
                      width={1024}
                      height={1024}
                      loading="eager"
                      className="h-full min-h-[320px] w-full object-cover sm:min-h-[420px] lg:min-h-[620px]"
                    />
                  </div>
                </Reveal>

                <Reveal delay={80} className="flex h-full flex-col justify-center">
                  <SectionTitle className="mb-7">{content.tab_1_right_heading}</SectionTitle>
                  <div className="space-y-6">
                    <Body className="max-w-none">
                      {businessParagraphs[0]}
                    </Body>
                    <Body className="max-w-none">
                      {businessParagraphs[1]}
                    </Body>
                    <Body className="max-w-none">
                      {businessParagraphs[2]}
                    </Body>
                  </div>
                </Reveal>
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
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{content.tab_2_heading}</SectionTitle>
              </Reveal>

              <Reveal delay={100}>
                <Body className="mb-8 max-w-none">
                  {challengeIntro}
                </Body>
              </Reveal>

              <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {challengeCards.map((c: any, i: number) => (
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

              <div className="mt-8 space-y-5">
                <Reveal delay={120}>
                  <Body className="max-w-none">{challengeFollowup[0]}</Body>
                </Reveal>
                <Reveal delay={150}>
                  <Body className="max-w-none">{challengeFollowup[1]}</Body>
                </Reveal>
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
              <ChapterLabel>Chapter 03 — {newer.new_tab_3_text}</ChapterLabel>
            </Reveal>

            {/* Integrated Architectural Narrative */}
            <div className="relative mt-8 group">
              {/* Background glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-[#69D6FF]/20 to-[#A9E7C2]/20 opacity-50 blur-3xl"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111F]/60 backdrop-blur-xl shadow-2xl">
                {/* Header */}
                <div className="border-b border-white/5 p-8 pb-6 md:p-12 md:pb-8">
                  <Reveal delay={60}>
                    <SectionTitle className="mb-6">{solution.overviewHeading}</SectionTitle>
                  </Reveal>
                  <Reveal delay={100}>
                    <Body className="max-w-2xl text-lg">
                      {solution.overviewText}
                    </Body>
                  </Reveal>
                </div>

                {/* Content flow */}
                <div className="relative px-8 py-10 md:px-12 md:py-12">
                  {/* Connecting spine */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[2.75rem] top-10 bottom-10 hidden w-px bg-gradient-to-b from-[#69D6FF]/50 via-white/10 to-[#A9E7C2]/50 md:left-[4.75rem] md:block"
                  />

                  <div className="space-y-14 md:space-y-16">
                    {/* Enterprise Sources */}
                    <section id="solution-overview" className="relative pl-12 md:pl-16 focus:outline-none">
                      <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#69D6FF] bg-[#07111F] shadow-[0_0_10px_rgba(105,214,255,0.4)] md:top-1.5 md:h-6 md:w-6">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#69D6FF]" />
                      </div>
                      <Reveal delay={80}>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F7FAFC] md:text-base">
                          {solution.sourcesHeading}
                        </h3>
                      </Reveal>
                      <Reveal delay={120}>
                        <Body className="max-w-3xl">
                          {solution.sourcesText}
                        </Body>
                      </Reveal>
                    </section>

                    {/* Data Foundation */}
                    <section id="solution-foundation" className="relative pl-12 md:pl-16 focus:outline-none">
                      <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/20 bg-[#07111F] md:top-1.5 md:h-6 md:w-6">
                        <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      </div>
                      <Reveal delay={80}>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F7FAFC] md:text-base">
                          {solution.foundationHeading}
                        </h3>
                      </Reveal>
                      <Reveal delay={120}>
                        <Body className="max-w-3xl">
                          {solution.foundationText}
                        </Body>
                      </Reveal>
                    </section>

                    {/* Medallion Architecture */}
                    <section id="solution-medallion" className="relative pl-12 md:pl-16 focus:outline-none">
                      <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/20 bg-[#07111F] md:top-1.5 md:h-6 md:w-6">
                        <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      </div>
                      <Reveal delay={80}>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F7FAFC] md:text-base">
                          {solution.medallionHeading}
                        </h3>
                      </Reveal>
                      <Reveal delay={120}>
                        <Body className="mb-5 max-w-3xl">{solution.medallionIntro}</Body>
                      </Reveal>

                      <Reveal delay={160}>
                        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                          {solution.medallionLayers.map((l: any) => (
                            <div
                              key={l.layer}
                              className="rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:border-[#A9E7C2]/20 hover:bg-white/[0.05]"
                            >
                              <span className="mb-2 block text-xs font-bold uppercase tracking-tighter text-[#A9E7C2]">
                                {l.layer}
                              </span>
                              <p className="text-sm leading-relaxed text-[#A8B8C7]">{l.purpose}</p>
                            </div>
                          ))}
                        </div>
                      </Reveal>

                      <Reveal delay={200}>
                        <code className="font-numbers block text-[14px] text-[#A9E7C2]">{solution.medallionCode}</code>
                      </Reveal>
                    </section>

                    {/* Semantic & GenAI Layers */}
                    <section id="solution-semantic-genai" className="relative pl-12 md:pl-16 focus:outline-none">
                      <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/20 bg-[#07111F] md:top-1.5 md:h-6 md:w-6">
                        <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      </div>
                      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
                        <div id="solution-semantic">
                          <Reveal delay={80}>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F7FAFC] md:text-base">
                              {solution.semanticHeading}
                            </h3>
                          </Reveal>
                          <Reveal delay={120}>
                            <Body>
                              {solution.semanticText}
                            </Body>
                          </Reveal>
                        </div>
                        <div id="solution-genai">
                          <Reveal delay={80}>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F7FAFC] md:text-base">
                              {solution.genAiHeading}
                            </h3>
                          </Reveal>
                          <Reveal delay={120}>
                            <Body>
                              {solution.genAiText}
                            </Body>
                          </Reveal>
                        </div>
                      </div>
                    </section>

                    {/* Conversational Analytics */}
                    <section id="solution-conversation" className="relative pl-12 md:pl-16 focus:outline-none">
                      <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#A9E7C2] bg-[#07111F] shadow-[0_0_10px_rgba(169,231,194,0.4)] md:top-1.5 md:h-6 md:w-6">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#A9E7C2]" />
                      </div>
                      <Reveal delay={80}>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#F7FAFC] md:text-base">
                          {solution.conversationHeading}
                        </h3>
                      </Reveal>

                      <Reveal delay={120}>
                        <div className="rounded-2xl border border-white/5 bg-[#0B1A2F]/70 p-6 md:p-8">
                          <Body className="mb-5 max-w-none">
                            {solution.conversationIntro}
                          </Body>

                          <p className="mb-5 text-[15px] italic leading-relaxed text-[#A8B8C7]">
                            {solution.firstQuestion}
                          </p>

                          <div className="space-y-3">
                            {solution.conversationQuestions.map((question: string, i: number) => (
                              <div
                                key={question}
                                className="flex items-start gap-4 rounded-lg border border-white/[0.05] bg-white/[0.02] px-4 py-3 text-sm text-[#A8B8C7]"
                              >
                                <span className="shrink-0 font-mono text-[#69D6FF]">Q{i + 2}</span>
                                <span>{question}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-8 flex flex-wrap items-center gap-3">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8B8C7]">
                                Progression
                              </span>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-[#69D6FF]/20 bg-[#69D6FF]/10 px-3 py-1 text-xs text-[#69D6FF]">
                                {solution.progression[0]}
                              </span>
                              <span className="text-[#A8B8C7]">&rarr;</span>
                              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#F7FAFC]">
                                {solution.progression[2]}
                              </span>
                              <span className="text-[#A8B8C7]">&rarr;</span>
                              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#F7FAFC]">
                                {solution.progression[4]}
                              </span>
                              <span className="text-[#A8B8C7]">&rarr;</span>
                              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#F7FAFC]">
                                {solution.progression[6]}
                              </span>
                              <span className="text-[#A8B8C7]">&rarr;</span>
                              <span className="rounded-full border border-[#A9E7C2]/20 bg-[#A9E7C2]/10 px-3 py-1 text-xs text-[#A9E7C2]">
                                {solution.progression[8]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    </section>

                    {/* Data Quality Framework */}
                    <section id="solution-quality" className="relative pl-12 md:pl-16 focus:outline-none">
                      <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/20 bg-[#07111F] md:top-1.5 md:h-6 md:w-6">
                        <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      </div>
                      <Reveal delay={80}>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F7FAFC] md:text-base">
                          {solution.qualityHeading}
                        </h3>
                      </Reveal>
                      <Reveal delay={120}>
                        <Body className="mb-4 max-w-3xl">
                          {solution.qualityIntro}
                        </Body>
                      </Reveal>
                      <Reveal delay={140}>
                        <Body className="mb-5 max-w-3xl">{solution.qualityLead}</Body>
                      </Reveal>

                      <Reveal delay={180}>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
                          {solution.qualityItems.map((q: any) => {
                            return (
                              <div
                                key={q.text}
                                className="flex items-center gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.02] p-3"
                              >
                                <DynamicIcon name={q.icon} className="h-4 w-4 shrink-0 text-[#A9E7C2]" aria-hidden="true" />
                                <span className="text-left text-[13px] leading-snug text-[#A8B8C7]">{q.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </Reveal>

                      <Reveal delay={220}>
                        <Body className="mt-5 max-w-3xl">
                          {solution.qualityClosing}
                        </Body>
                      </Reveal>
                    </section>
                  </div>
                </div>

                {/* Footer gradient */}
                <div
                  aria-hidden="true"
                  className="h-2 bg-gradient-to-r from-[#69D6FF] via-[#A9E7C2] to-[#69D6FF]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================== CHAPTER 4 — DELIVERY SYSTEM ================== */}
        <div id="chapter-delivery" className={cn("focus:outline-none", chapterSpace)}>
          <div className={cjContainer}>
            <Reveal>
              <ChapterLabel>Chapter 04 — {newer.new_tab_4_text}</ChapterLabel>
            </Reveal>

            <KpiCommandCenter
              id="success-metrics"
              className={blockSpace}
              eyebrow=""
              title={newer.new_tab_4_first_heading}
              subtitle={newer.new_tab_4_first_sub_heading}
              items={successMetrics}
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
              <ChapterLabel>Chapter 05 — {newer.new_tab_5_text}</ChapterLabel>
            </Reveal>

            <section id="benefits" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{newer.new_tab_5_first_heading}</SectionTitle>
              </Reveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {benefits.map((b, i) => (
                  <Reveal
                    key={b.text}
                    delay={i * 70}
                    className={cn(
                      "h-full",
                      i === benefits.length - 1 && benefits.length % 3 === 1 && "col-span-full"
                    )}
                  >
                    <BenefitCard item={b} />
                  </Reveal>
                ))}
              </div>
            </section>

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
                        <div className="rounded-[18px] border border-white/[0.08] bg-[#102236]/60 px-5 py-4">
                          <code className="font-numbers text-[13.5px] leading-[1.8] text-[#A9E7C2]">
                            {resultCode}
                          </code>
                        </div>
                      </Reveal>
                      <Reveal delay={230}>
                        <Body>
                          {resultParagraphs[3]}
                        </Body>
                      </Reveal>
                      <Reveal delay={260}>
                        <Body>
                          {resultParagraphs[4]}
                        </Body>
                      </Reveal>
                      <Reveal delay={290}>
                        <Body>
                          {resultParagraphs[5]}
                        </Body>
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

              <Reveal delay={120}>
                <div className={cn(cjCard, "overflow-hidden")}>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.08]">
                        <th
                          scope="col"
                          className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#69D6FF] lg:px-8"
                        >
                          {glanceHeaders[0]}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#69D6FF] lg:px-8"
                        >
                          {glanceHeaders[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {glanceStats.map((s) => (
                        <tr key={s.capability} className="transition-colors hover:bg-white/[0.03]">
                          <td className="px-6 py-4 text-[14.5px] font-semibold text-[#F7FAFC] lg:px-8">
                            {s.capability}
                          </td>
                          <td className="px-6 py-4 text-[14px] leading-relaxed text-[#A9E7C2] lg:px-8">
                            {s.position}
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
                    <Link to={bannerButtons[0]?.button_url || "/contactus"}>
                      {bannerButtons[0]?.button_text || "Schedule a Strategy Call"}
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
                    <Link to={bannerButtons[1]?.button_url || "/case-studies"}>
                      {bannerButtons[1]?.button_text || "View More Case Studies"}
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

export default ConversationalAnalyticsAssistant;
