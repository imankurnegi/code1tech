import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SmartImage from "@/components/SmartImage";
import { DynamicIcon } from "@/components/DynamicIcon";
import { cn, addClassToSpan } from "@/lib/utils";
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
  cjFocus,
} from "@/components/case-studies/simkyc/primitives";
import ChapterNav, { type Chapter } from "@/components/case-studies/simkyc/ChapterNav";
import CaseSnapshot, { type SnapshotItem } from "@/components/case-studies/simkyc/CaseSnapshot";
import ChallengeCard from "@/components/case-studies/simkyc/ChallengeCard";
import ObjectiveCard from "@/components/case-studies/simkyc/ObjectiveCard";
import JourneyDiagram from "@/components/case-studies/simkyc/JourneyDiagram";
import IntegrationLayer from "@/components/case-studies/simkyc/IntegrationLayer";
import TeamMap from "@/components/case-studies/simkyc/TeamMap";
import TestingRail from "@/components/case-studies/simkyc/TestingRail";
import {
  MetricCard,
  BenefitCard,
  DeliverableCard,
} from "@/components/case-studies/simkyc/MetricCard";
import SeoTags from "@/components/SeoTags";

/* ------------------------------------------------------------------ */
/* Type Definitions                                                   */
/* ------------------------------------------------------------------ */

interface CaseStudyData {
  id: number;
  title: string;
  slug: string;
  seo: {
    title: string;
    description: string;
    og_image: string;
  };
  schema: any;
  content: {
    listing_icon: string;
    listing_highlight_text: string;
    listing_highlight_content: string;
    stats: Array<{ value: string; text: string }>;
    category_row: Array<{
      icon: string;
      label: string;
      text: string;
    }>;
    tab_1_text: string;
    tab_1_left_heading: string;
    tab_1_left_content: string;
    tab_1_right_image: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    tab_1_right_heading: string;
    tab_1_right_content: string;
    tab_1_left_image: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    tab_2_text: string;
    tab_2_heading: string;
    tab_2_content: string;
    tab_2_cards: Array<{
      icon: string;
      text: string;
      image: {
        url: string;
        alt: string;
        width: number;
        height: number;
      };
    }>;
    tab_2_second_heading: string;
    tab_2_second_cards: Array<{
      icon: string;
      title: string;
      content: string;
      image: {
        url: string;
        alt: string;
        width: number;
        height: number;
      };
    }>;
    tab_2_text_block: string;
    tab_3_text: string;
    tab_3_first_heading: string;
    tab_3_first_content: string;
    tab_3_first_blocks: Array<{
      icon: string;
      title: string;
    }>;
    tab_3_second_blocks_heading: string;
    tab_3_second_blocks: Array<{
      icon: string;
      title: string;
    }>;
    tab_3_second_components: string;
    tab_3_second_components_cards: Array<{
      icon: string;
      title: string;
      content: string;
    }>;
    tab_3_third_heading: string;
    tab_3_third_content: string;
    tab_3_third_blocks: Array<{
      icon: string;
      title: string;
    }>;
    "tab-3-third-content_2": string;
    tab_3_fourth_heading: string;
    tab_3_fourth_content: string;
    tab_3_fourth_image: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    tab_3_fifth_heading: string;
    tab_3_fifth_image: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    tab_3_fifth_content: string;
    tab_4_text: string;
    tab_4_first_heading: string;
    tab_4_first_left_blocks: Array<{
      icon: string;
      title: string;
    }>;
    tab_4_first_right_content: string;
    tab_4_second_heading: string;
    tab_4_second_left_content: string;
    tab_4_second_right_content: Array<{
      icon: string;
      title: string;
    }>;
    tab_4_second_right_content_label: string;
    tab_4_second_right_content_blocks: Array<{
      text: string;
    }>;
    tab_5_text: string;
    tab_5_first_heading: string;
    tab_5_first_blocks: Array<{
      icon: string;
      value: string;
      content: string;
    }>;
    tab_5_second_heading: string;
    tab_5_second_blocks: Array<{
      icon: string;
      title: string;
    }>;
    tab_5_third_heading: string;
    tab_5_third_blocks: Array<{
      image: {
        url: string;
        alt: string;
        width: number;
        height: number;
      };
      icon: string;
      title: string;
      content: string;
    }>;
    tab_5_fourth_heading: string;
    tab_5_fourth_left_content: string;
    tab_5_fourth_right_image: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    tab_5_fifth_heading: string;
    tab_5_fifth_blocks: Array<{
      value: string;
      content: string;
    }>;
    bottom_banner_heading: string;
    bottom_banner_content: string;
    bottom_banner_buttons: Array<{
      button_text: string;
      button_url: string;
    }>;
    banner_button_text: string;
    banner_button_url: string;
    bottom_banner_image: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
  };
}

interface OracleDatabricksCaseStudyProps {
  data: CaseStudyData;
}

/* ------------------------------------------------------------------ */
/* Data Mapping Functions                                              */
/* ------------------------------------------------------------------ */

const mapIconName = (iconName: string): string => {
  return iconName.replace("lucide-", "");
};

const mapSnapshot = (categoryRow: CaseStudyData["content"]["category_row"]): SnapshotItem[] => {
  return categoryRow.map((item, index) => ({
    label: item.label,
    value: item.text,
    icon: mapIconName(item.icon),
    tone: index >= 2 ? "mint" : undefined,
  }));
};

const mapChallenges = (cards: CaseStudyData["content"]["tab_2_cards"]) => {
  return cards.map((card, index) => ({
    no: String(index + 1).padStart(2, "0"),
    icon: mapIconName(card.icon),
    img: card.image.url,
    alt: card.image.alt || "",
    text: card.text,
  }));
};

const mapObjectives = (cards: CaseStudyData["content"]["tab_2_second_cards"]) => {
  return cards.map((card, index) => ({
    no: String(index + 1).padStart(2, "0"),
    title: card.title,
    text: card.content,
    icon: mapIconName(card.icon),
    img: card.image.url,
    alt: card.image.alt || "",
  }));
};

const mapArchitectureFlow = (blocks: CaseStudyData["content"]["tab_3_second_blocks"]) => {
  return blocks.map((block, index) => ({
    icon: mapIconName(block.icon),
    label: block.title,
    tone: (index === 2 || index === 5) ? "mint" as const : undefined,
  }));
};

const mapSolutionModules = (cards: CaseStudyData["content"]["tab_3_second_components_cards"]) => {
  return cards.map((card, index) => {
    // Extract items from HTML content using regex
    const liRegex = /<li[^>]*>.*?<\/li>/gs;
    const matches = card.content.match(liRegex) || [];
    
    const items = matches.map(li => {
      // Extract text content from li, removing HTML tags
      const text = li.replace(/<[^>]*>/g, '').trim();
      return { text };
    }).filter(item => item.text);

    return {
      name: card.title,
      icon: mapIconName(card.icon),
      tone: index === 1 ? "mint" as const : undefined,
      items,
    };
  });
};

const mapTeamNodes = (blocks: CaseStudyData["content"]["tab_4_first_left_blocks"]) => {
  return blocks.slice(1).map((block, index) => ({
    label: block.title,
    icon: mapIconName(block.icon),
    tone: (index === 2 || index === 4) ? "mint" as const : undefined,
  }));
};

const mapPipeline = (stages: CaseStudyData["content"]["tab_4_second_right_content"]) => {
  return stages.map((stage) => ({
    label: stage.title,
    icon: mapIconName(stage.icon),
  }));
};

const mapSuccessMetrics = (blocks: CaseStudyData["content"]["tab_5_first_blocks"]) => {
  return blocks.map((block, index) => ({
    value: block.value,
    label: block.content,
    icon: mapIconName(block.icon),
    tone: (index === 0 || index === 3) ? "mint" as const : undefined,
  }));
};

const mapBenefits = (blocks: CaseStudyData["content"]["tab_5_second_blocks"]) => {
  return blocks.map((block, index) => ({
    icon: mapIconName(block.icon),
    text: block.title,
    tone: (index === 1 || index === 3) ? "mint" as const : undefined,
  }));
};

const mapDeliverables = (blocks: CaseStudyData["content"]["tab_5_third_blocks"]) => {
  return blocks.map((block) => ({
    icon: mapIconName(block.icon),
    title: block.title,
    text: block.content,
    image: block.image.url,
  }));
};

const mapAtAGlanceStats = (blocks: CaseStudyData["content"]["tab_5_fifth_blocks"]) => {
  return blocks.map((block) => ({
    value: block.value,
    label: block.content,
  }));
};

const extractParagraphs = (htmlContent: string): string[] => {
  const divRegex = /<div[^>]*>.*?<\/div>/gs;
  const matches = htmlContent.match(divRegex) || [];
  return matches.map((match) => {
    const textMatch = match.match(/<p[^>]*>(.*?)<\/p>/s);
    return textMatch ? textMatch[1].replace(/<[^>]*>/g, "") : "";
  }).filter(Boolean);
};

const extractQALabels = (blocks: CaseStudyData["content"]["tab_4_second_right_content_blocks"]) => {
  return blocks.map((block) => block.text);
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const chapterSpace = "pt-10 sm:pt-12 md:pt-14 lg:pt-16";
const blockSpace = "py-8 sm:py-9 md:py-10 lg:py-12;";


const OracleDatabricksCaseStudy = ({ data }: OracleDatabricksCaseStudyProps) => {
  const [progress, setProgress] = useState(0);
  const { content } = data;

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

  // Preload above-the-fold challenge images so they render instantly
  useEffect(() => {
    const preloadImages = content.tab_2_cards.map(card => card.image.url);
    const links: HTMLLinkElement[] = [];
    preloadImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.fetchPriority = "high";
      document.head.appendChild(link);
      links.push(link);
    });
    return () => {
      links.forEach((link) => link.remove());
    };
  }, [content.tab_2_cards]);

  // Map data from JSON to component structures
  const chapters: Chapter[] = [
    { id: "chapter-opportunity", label: content.tab_1_text },
    { id: "chapter-friction", label: content.tab_2_text },
    { id: "chapter-solution", label: content.tab_3_text },
    { id: "chapter-delivery", label: content.tab_4_text },
    { id: "chapter-impact", label: content.tab_5_text },
  ];

  const snapshot = mapSnapshot(content.category_row);
  const challenges = mapChallenges(content.tab_2_cards);
  const objectives = mapObjectives(content.tab_2_second_cards);
  const architectureFlow = mapArchitectureFlow(content.tab_3_second_blocks);
  const solutionModules = mapSolutionModules(content.tab_3_second_components_cards);
  const teamNodes = mapTeamNodes(content.tab_4_first_left_blocks);
  const pipeline = mapPipeline(content.tab_4_second_right_content);
  const qaLabels = extractQALabels(content.tab_4_second_right_content_blocks);
  const successMetrics = mapSuccessMetrics(content.tab_5_first_blocks);
  const benefits = mapBenefits(content.tab_5_second_blocks);
  const deliverables = mapDeliverables(content.tab_5_third_blocks);
  const atAGlanceStats = mapAtAGlanceStats(content.tab_5_fifth_blocks);
  const teamParagraphs = extractParagraphs(content.tab_4_first_right_content);
  const overviewParagraphs = extractParagraphs(content.tab_1_left_content);
  const businessContextParagraphs = extractParagraphs(content.tab_1_right_content);
  const solutionParagraphs = extractParagraphs(content.tab_3_first_content);
  const qualityParagraphs = extractParagraphs(content.tab_3_third_content);
  const testingParagraphs = extractParagraphs(content.tab_4_second_left_content);
  const resultParagraphs = extractParagraphs(content.tab_5_fourth_left_content);
  const orchestrationParagraphs = extractParagraphs(content.tab_3_fourth_content);
  const powerBIParagraphs = extractParagraphs(content.tab_3_fifth_content);

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
            style={{
              background: "radial-gradient(circle, rgba(105,214,255,0.09) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 hidden h-[460px] w-[460px] md:block"
            style={{
              background: "radial-gradient(circle, rgba(169,231,194,0.06) 0%, transparent 70%)",
            }}
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
              {/* LEFT — content */}
              <div className="text-left">
                <Reveal>
                  <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#A8B8C7]">
                    <Link
                      to="/"
                      className={cn("rounded-sm transition-colors hover:text-[#69D6FF]", cjFocus)}
                    >
                      Home
                    </Link>
                    <span className="mx-2 opacity-50" aria-hidden="true">
                      /
                    </span>
                    <Link
                      to="/case-studies"
                      className={cn("rounded-sm transition-colors hover:text-[#69D6FF]", cjFocus)}
                    >
                      Case Studies
                    </Link>
                  </nav>
                </Reveal>

                <Reveal delay={80}>
                  <div className="mb-6 flex items-center gap-3">
                    <MetaPill>
                      <DynamicIcon name={mapIconName(content.listing_icon)} className="h-3.5 w-3.5" aria-hidden="true" />
                      {content.category_row[0].text}
                    </MetaPill>
                  </div>
                </Reveal>

                <Reveal delay={140}>
                  <h1 className="mb-6 text-[2rem] font-bold leading-[1.12] tracking-tight text-[#F7FAFC] sm:text-[2.5rem] lg:text-[3.1rem]">
                    <span dangerouslySetInnerHTML={{ __html: addClassToSpan(data.title, 'bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent') }} />
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
                      <ArrowRight
                        className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </Reveal>
              </div>

              {/* RIGHT — visual */}
              <Reveal delay={180} className="h-full">
                <div className={cn(cjCard, "h-full overflow-hidden")}>
                  <SmartImage
                    src={content.tab_1_right_image.url}
                    alt={content.tab_1_right_image.alt || ""}
                    width={content.tab_1_right_image.width}
                    height={content.tab_1_right_image.height}
                    loading="eager"
                    fetchPriority="high"
                    className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                  />
                </div>
              </Reveal>
            </div>

            {/* Case snapshot */}
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

            {/* Overview */}
            <section id="overview" className="focus:outline-none">
              <div className="grid items-stretch gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
                <div>
                  <Reveal delay={60}>
                    <SectionTitle className="mb-6">{content.tab_1_left_heading}</SectionTitle>
                  </Reveal>
                  <div className="space-y-5">
                    {overviewParagraphs.map((paragraph, i) => (
                      <Reveal key={i} delay={120 + i * 50}>
                        <Body>{paragraph}</Body>
                      </Reveal>
                    ))}
                  </div>
                </div>

                <Reveal delay={160}>
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={content.tab_1_right_image.url}
                      alt={content.tab_1_right_image.alt || ""}
                      width={content.tab_1_right_image.width}
                      height={content.tab_1_right_image.height}
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Business Context */}
            <section id="business-context" className={cn("focus:outline-none", blockSpace)}>
              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal>
                  <div className={cn(cjCard, "relative h-full overflow-hidden")}>
                    <SmartImage
                      src={content.tab_1_left_image.url}
                      alt={content.tab_1_left_image.alt || ""}
                      width={content.tab_1_left_image.width}
                      height={content.tab_1_left_image.height}
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#07111F]/70 to-transparent"
                    />
                  </div>
                </Reveal>

                <div>
                  <Reveal delay={60}>
                    <SectionTitle className="mb-6">{content.tab_1_right_heading}</SectionTitle>
                  </Reveal>
                  <div className="space-y-5">
                    {businessContextParagraphs.map((paragraph, i) => (
                      <Reveal key={i} delay={120 + i * 50}>
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
              <ChapterLabel>Chapter 02 — {content.tab_2_text}</ChapterLabel>
            </Reveal>

            {/* Challenge */}
            <section id="challenge" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-5">{content.tab_2_heading}</SectionTitle>
              </Reveal>
              <Reveal delay={110}>
                <Body className="mb-[2.25rem]">{content.tab_2_content}</Body>
              </Reveal>

              <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
                {challenges.map((c, i) => (
                  <Reveal key={c.no} delay={i * 80} className="h-full">
                    <ChallengeCard item={c} />
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Objectives */}
            <section id="objectives" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-[2.25rem]">{content.tab_2_second_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-5 md:grid-cols-2 lg:gap-6">
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
              <ChapterLabel>Chapter 03 — {content.tab_3_text}</ChapterLabel>
            </Reveal>

            {/* Solution */}
            <section id="solution-ingestion" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{content.tab_3_first_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                {solutionParagraphs.map((paragraph, i) => (
                  <Reveal key={i} delay={120 + i * 50}>
                    <Body className="max-w-none">{paragraph}</Body>
                  </Reveal>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {content.tab_3_first_blocks.map((block, i) => (
                  <Reveal key={i} delay={220 + i * 50}>
                    <div className="flex h-full items-start gap-3 rounded-[18px] border border-white/[0.07] bg-[#102236]/60 px-4 py-3.5">
                      <DynamicIcon
                        name={mapIconName(block.icon)}
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#A9E7C2]"
                      />
                      <span className="text-[14px] leading-[1.6] text-[#A8B8C7]">{block.title}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* <Reveal delay={300}>
                <div className="mt-7 flex max-w-[680px] items-start gap-4 rounded-[20px] border border-[#A9E7C2]/25 bg-[#A9E7C2]/[0.06] px-5 py-4">
                  <DynamicIcon
                    name="sparkles"
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#A9E7C2]"
                  />
                  <p className="text-left text-[15px] leading-[1.7] text-[#F7FAFC]">
                    This provided a consistent mechanism for bringing Oracle Fusion data into the Databricks environment.
                  </p>
                </div>
              </Reveal> */}
            </section>

            <section id="solution-medallion" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">Databricks Medallion Architecture</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                {solutionParagraphs.map((paragraph, i) => (
                  <Reveal key={i} delay={120 + i * 50}>
                    <Body className="max-w-none">{paragraph}</Body>
                  </Reveal>
                ))}
              </div>

              <div className={cn(cjCard, "mt-10 p-6 md:p-8 lg:p-10")}>
                <Reveal>
                  <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A8B8C7]">
                    {content.tab_3_second_blocks_heading}
                  </p>
                </Reveal>
                <JourneyDiagram nodes={architectureFlow} />
              </div>

              <Reveal delay={120}>
                <Body className="mb-6 mt-12">{content.tab_3_second_components}</Body>
              </Reveal>
              <IntegrationLayer modules={solutionModules} />
            </section>

            {/* Data Quality */}
            <section id="solution-quality" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{content.tab_3_third_heading}</SectionTitle>
              </Reveal>
              <div className="space-y-5">
                {qualityParagraphs.map((paragraph, i) => (
                  <Reveal key={i} delay={110 + i * 40}>
                    <Body className="max-w-none">{paragraph}</Body>
                  </Reveal>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {content.tab_3_third_blocks.map((block, i) => (
                  <Reveal key={`${block.title}-${i}`} delay={i * 40}>
                    <div className="flex h-full items-start gap-3 rounded-[18px] border border-white/[0.07] bg-[#102236]/60 px-4 py-3.5">
                      <DynamicIcon name={mapIconName(block.icon)} aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#A9E7C2]" />
                      <span className="text-[14px] leading-[1.6] text-[#A8B8C7]">{block.title}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={360}>
                <Body className="mt-7 max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: content["tab-3-third-content_2"] }}></div>
                </Body>
              </Reveal>
            </section>

            {/* Orchestration */}
            <section id="solution-orchestration" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{content.tab_3_fourth_heading}</SectionTitle>
              </Reveal>
              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
              <Reveal delay={110}>
                <Body className="max-w-none">
                  {extractParagraphs(content.tab_3_fourth_content)[0]}
                </Body>
                </Reveal>
                <Reveal delay={160}>
                <Body className="mt-8">{extractParagraphs(content.tab_3_fourth_content)[1] || ""}</Body>
              </Reveal>
              </div>
              
              <Reveal delay={140} className="h-full">
                <div className={cn(cjCard, "h-full overflow-hidden")}>
                <SmartImage
                  src={content.tab_3_fourth_image.url}
                  alt={content.tab_3_fourth_image.alt || ""}
                  width={content.tab_3_fourth_image.width}
                  height={content.tab_3_fourth_image.height}
                  loading="eager"
                  className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                />
              </div>
              </Reveal>
              </div>
            </section>

            {/* Power BI */}
            <section id="solution-powerbi" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{content.tab_3_fifth_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <Reveal delay={100} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={content.tab_3_fifth_image.url}
                      alt={content.tab_3_fifth_image.alt || ""}
                      width={content.tab_3_fifth_image.width}
                      height={content.tab_3_fifth_image.height}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>

                <div className="space-y-5">
                  {powerBIParagraphs.map((paragraph, i) => (
                    <Reveal key={i} delay={120 + i * 50}>
                      <Body>{paragraph}</Body>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ================== CHAPTER 4 — DELIVERY SYSTEM ================== */}
        <div id="chapter-delivery" className={cn("focus:outline-none", chapterSpace)}>
          <div className={cjContainer}>
            <Reveal>
              <ChapterLabel>Chapter 04 — {content.tab_4_text}</ChapterLabel>
            </Reveal>

            {/* Teams */}
            <section id="delivery-platform" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-[2.25rem]">{content.tab_4_first_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
                <Reveal delay={100}>
                  <TeamMap
                    hub={content.tab_4_first_left_blocks[0].title}
                    nodes={teamNodes}
                  />
                </Reveal>

                <div className="space-y-5">
                  {teamParagraphs.map((paragraph, i) => (
                    <Reveal key={i} delay={80 + i * 50}>
                      {i === 0 ? (
                        <p className="max-w-[680px] text-left text-[1.15rem] font-semibold leading-snug text-[#F7FAFC] lg:text-[1.35rem]">
                          {paragraph}
                        </p>
                      ) : (
                        <Body>{paragraph}</Body>
                      )}
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Testing */}
            <section id="delivery-validation" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-[2.25rem]">{content.tab_4_second_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  {testingParagraphs.map((paragraph, i) => (
                    <Reveal key={i} delay={100 + i * 60}>
                      <Body>{paragraph}</Body>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={140}>
                  <TestingRail stages={pipeline} qaLabels={qaLabels} />
                </Reveal>
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
            style={{
              background: "radial-gradient(60% 100% at 50% 0%, rgba(105,214,255,0.07), transparent 70%)",
            }}
          />
          <div className={cn(cjContainer, "relative z-10")}>
            <Reveal>
              <ChapterLabel>Chapter 05 — {content.tab_5_text}</ChapterLabel>
            </Reveal>

            {/* Success Metrics */}
            <section id="success-metrics" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-[2.25rem]">{content.tab_5_first_heading}</SectionTitle>
              </Reveal>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {successMetrics.map((m, i) => (
                  <Reveal key={m.label} delay={i * 80} className="h-full">
                    <MetricCard item={m} />
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section id="benefits" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-[2.25rem]">{content.tab_5_second_heading}</SectionTitle>
              </Reveal>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {benefits.map((b, i) => (
                  <Reveal
                    key={b.text}
                    delay={i * 70}
                    className="h-full"
                  >
                    <BenefitCard item={b} />
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Deliverables */}
            <section id="deliverables" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-[2.25rem]">{content.tab_5_third_heading}</SectionTitle>
              </Reveal>
               <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                              {deliverables.map((d, i) => {
                                const isLast = i === deliverables.length - 1;
                                const isLandscape = isLast && deliverables.length % 3 === 1;
                                return (
                                  <Reveal
                                    key={d.title}
                                    delay={i * 70}
                                    className={cn(
                                      "h-full w-full",
                                      isLandscape && "sm:col-span-2 xl:col-span-3"
                                    )}
                                  >
                                    <DeliverableCard item={d} variant={isLandscape ? "landscape" : "portrait"} />
                                  </Reveal>
                                );
                              })}
                            </div>
            </section>

            {/* Result */}
             <section id="result" className={cn("focus:outline-none", blockSpace)}>
              <div className={cn(cjCard, "relative overflow-hidden p-7 md:p-10 lg:p-12")}>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#69D6FF]/10 blur-3xl"
                />
                <div className="relative grid items-stretch gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                  <div>
                    <Reveal delay={60}>
                      <SectionTitle className="mb-6">{content.tab_5_fourth_heading}</SectionTitle>
                    </Reveal>
                    <div className="space-y-5">
                      {resultParagraphs.map((paragraph, i) => (
                        <Reveal key={i} delay={110 + i * 40}>
                          <Body>{paragraph}</Body>
                        </Reveal>
                      ))}
                    </div>
                  </div>

                  <Reveal delay={140} className="h-full">
                    <div className="h-full overflow-hidden rounded-[22px] border border-white/[0.08]">
                      <SmartImage
                        src={content.tab_5_fourth_right_image.url}
                        alt={content.tab_5_fourth_right_image.alt || ""}
                        width={content.tab_5_fourth_right_image.width}
                        height={content.tab_5_fourth_right_image.height}
                        loading="eager"
                        className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                      />
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>

            {/* At a Glance */}
            <section id="at-a-glance" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-[2.25rem]">{content.tab_5_fifth_heading}</SectionTitle>
              </Reveal>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
                {atAGlanceStats.slice(0, 3).map((s, i) => (
                  <Reveal key={s.label} delay={i * 80} className="h-full">
                    <div className={cn(cjCard, "h-full p-6 lg:p-8")}>
                      <div className="text-[2.4rem] font-bold leading-none text-[#69D6FF] lg:text-[3rem]">
                        <Counter value={s.value} />
                      </div>
                      <div className="mt-3.5 text-[14.5px] text-[#A8B8C7]">{s.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
                {atAGlanceStats.slice(3).map((s, i) => (
                  <Reveal key={s.label} delay={i * 80} className="h-full">
                    <div className="h-full rounded-[24px] border border-[#A9E7C2]/20 bg-[#A9E7C2]/[0.05] p-6 lg:p-8">
                      <div className="text-[1.9rem] font-bold leading-none text-[#A9E7C2] lg:text-[2.3rem]">
                        {s.value}
                      </div>
                      <div className="mt-3.5 max-w-[46ch] text-[14.5px] text-[#A8B8C7]">{s.label}</div>
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
              src={content.bottom_banner_image.url}
              alt={content.bottom_banner_image.alt || ""}
              loading="eager"
              width={content.bottom_banner_image.width}
              height={content.bottom_banner_image.height}
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#07111F]/95 via-[#07111F]/80 to-[#07111F]/60"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-[#07111F]/40"
            />
          </div>

          <div className={cn(cjContainer, "relative z-10 py-14 lg:py-20")}>
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="text-[1.85rem] font-bold leading-[1.12] tracking-tight text-left sm:text-[2.25rem] lg:text-[2.6rem]">
                  <span className="text-gradient-brand">
                    {content.bottom_banner_heading}
                  </span>
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#A8B8C7] sm:text-[16px]">
                  {content.bottom_banner_content}
                </p>
                <div className="mt-8 flex flex-col justify-start gap-4 sm:flex-row">
                  {content.bottom_banner_buttons.map((button, i) => (
                    <Button
                      key={i}
                      size="lg"
                      variant={i === 0 ? "default" : "outline"}
                      className={cn(
                        i === 0
                          ? "group w-full rounded-xl bg-gradient-to-r from-[#69D6FF] to-[#3AA6E0] font-semibold text-[#07111F] sm:w-auto"
                          : "w-full rounded-xl border-white/20 bg-white/[0.04] text-[#F7FAFC] backdrop-blur-sm hover:bg-white/[0.08] hover:text-[#F7FAFC] sm:w-auto",
                        cjFocus
                      )}
                      asChild
                    >
                      <Link to={button.button_url}>
                        {button.button_text}
                        {i === 0 && (
                          <ArrowRight
                            className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5"
                            aria-hidden="true"
                          />
                        )}
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

export default OracleDatabricksCaseStudy;
