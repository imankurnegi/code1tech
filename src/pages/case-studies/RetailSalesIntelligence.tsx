import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SmartImage from "@/components/SmartImage";
import { DynamicIcon } from "@/components/DynamicIcon";
import { cn } from "@/lib/utils";
import { ArrowRight, Layers } from "lucide-react";

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

import TestingRail from "@/components/case-studies/simkyc/TestingRail";
import { DeliverableCard } from "@/components/case-studies/simkyc/MetricCard";
import KpiCommandCenter from "@/components/case-studies/KpiCommandCenter";
import PremiumBenefitsGrid from "@/components/case-studies/PremiumBenefitsGrid";
import SeoTags from "@/components/SeoTags";

import { addClassToSpan } from "@/lib/utils";

type RetailImage = { url?: string; alt?: string; title?: string; width?: number; height?: number };
type RetailCaseStudyData = { title: string; image?: string; content?: any; content_new?: any; seo?: any; schema?: any };
type RetailCaseStudyProps = { data: RetailCaseStudyData };

const iconName = (name?: string) => name?.replace(/^lucide-/, "") || "";
const imageUrl = (image?: RetailImage | string) => typeof image === "string" ? image : image?.url || "";
const imageAlt = (image?: RetailImage, fallback = "") => image?.alt || image?.title || fallback;
const htmlParagraphs = (html = "") => [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => match[1].replace(/<[^>]*>/g, "").trim()).filter(Boolean);
const htmlTableRows = (html = "") => [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].slice(1).map((row) => [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => cell[1].replace(/<[^>]*>/g, "").trim())).filter((cells) => cells.length >= 2).map(([layer, service]) => ({ layer, service }));

const mapRetailData = (data: RetailCaseStudyData): any => {
  const content = data.content || {};
  const newer = data.content_new || {};
  const blocks = (key: string) => (newer[key] || []).map((item: any) => ({ ...item, icon: iconName(item.icon) }));
  const image = (key: string) => imageUrl(content[key] || newer[key]);
  const alt = (key: string, fallback: string) => imageAlt(content[key] || newer[key], fallback);
  return {
    chapters: [content.tab_1_text, content.tab_2_text, newer.new_tab_3_text, newer.new_tab_4_text, newer.new_tab_5_text].map((label, i) => ({ id: ["chapter-opportunity", "chapter-friction", "chapter-solution", "chapter-delivery", "chapter-impact"][i], label })) as Chapter[],
    snapshot: (content.category_row || []).map((item: any, index: number) => ({ label: item.label, value: item.text, icon: iconName(item.icon), tone: index === 1 || index === 2 ? "mint" : undefined })),
    challenges: (content.tab_2_cards || []).map((item: any, i: number) => ({ no: String(i + 1).padStart(2, "0"), icon: iconName(item.icon), img: imageUrl(item.image), alt: imageAlt(item.image, item.text), text: item.text })),
    objectives: (content.tab_2_second_cards || []).map((item: any, i: number) => ({ no: String(i + 1).padStart(2, "0"), title: item.title, text: item.content, icon: iconName(item.icon), img: imageUrl(item.image), alt: imageAlt(item.image, item.title) })),
    ingestionPatterns: blocks("new_tab_3_first_content_blocks"),
    medallionLayers: blocks("new_tab_3_second_content_blocks").map((item: any) => ({ layer: item.title, purpose: item.content })),
    goldModels: (newer.new_tab_3_third_content_lists || []).map((item: any) => ({ text: item.text })),
    dashboardPerspectives: blocks("new_tab_3_fifth_content_blocks"),
    aiUseCases: (newer.new_tab_3_sixth_content_lists || []).map((item: any) => ({ text: item.text })),
    managedServices: blocks("new_tab_3_seven_content_blocks"),
    qualityControls: blocks("new_tab_3_ten_content_blocks"),
    securityItems: blocks("new_tab_3_ten_2_sub_content_blocks"),
    operationalModel: blocks("new_tab_3_ten_3_sub_content_blocks"),
    techStack: htmlTableRows(newer.new_tab_3_nine_content),
    successMetricsList: blocks("new_tab_4_first_blocks").map((item: any, i: number) => ({ text: item.text, icon: item.icon, accent: ["#55C7F3", "#82DDB6", "#63E6FF", "#82DDB6", "#5AA9F5", "#5FDCD2", "#8178FF"][i] })),
    pipeline: blocks("new_tab_4_first_line_blocks").map((item: any) => ({ label: item.text, icon: item.icon })),
    qaLabels: (newer.new_tab_4_first_qa_blocks || []).map((item: any) => item.text),
    benefits: (newer.new_tab_5_first_content_blocks || []).map((item: any) => ({ label: item.text, text: "", icon: iconName(item.icon) })),
    deliverables: (newer.new_tab_5_second_content_blocks || []).map((item: any) => ({ title: item.text, text: item.content, icon: iconName(item.icon), image: imageUrl(item.image) })),
    glanceStats: (newer.new_tab_5_fourth_content || []).map((item: any) => ({ value: item.col_1, label: item.col_2.trim() })),
    images: { hero: data.image || "", context: image("tab_1_right_image"), business: image("tab_1_left_image"), gold: image("new_tab_3_third_image"), orchestration: image("new_tab_3_fourth_image"), dashboard: image("new_tab_3_fifth_image"), ml: image("new_tab_3_sixth_image"), banner: image("bottom_banner_image") },
    imageAlts: { hero: data.title, context: alt("tab_1_right_image", content.tab_1_right_heading), business: alt("tab_1_left_image", content.tab_1_left_heading), gold: alt("new_tab_3_third_image", newer.new_tab_3_third_heading), orchestration: alt("new_tab_3_fourth_image", newer.new_tab_3_fourth_heading), dashboard: alt("new_tab_3_fifth_image", newer.new_tab_3_fifth_heading), ml: alt("new_tab_3_sixth_image", newer.new_tab_3_sixth_heading), banner: alt("bottom_banner_image", data.title) },
  };
};


const chapterSpace = "pt-10 sm:pt-12 md:pt-14 lg:pt-16";
const blockSpace = "py-8 sm:py-9 md:py-10 lg:py-12";

const ListGrid = ({
  items,
  cols = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  items: { text: string; icon: React.ComponentType<{ className?: string }> | string }[];
  cols?: string;
}) => (
  <div className={cn("mt-6 grid items-stretch gap-6", cols)}>
    {items.map((k, i) => {
      return (
        <Reveal key={k.text} delay={i * 40} className="h-full">
          <div className="group flex h-full items-center gap-4 rounded-[18px] border border-white/[0.07] bg-[#102236]/60 p-4 lg:p-5">
            <span className={cn(cjIconTile, "border-[#A9E7C2]/25 text-[#A9E7C2] group-hover:border-[#A9E7C2]/50")}>
              {typeof k.icon === "string" ? <DynamicIcon name={k.icon} className={cjIconGlyph} aria-hidden="true" /> : <k.icon aria-hidden="true" className={cjIconGlyph} />}
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

const RetailSalesIntelligence = ({ data }: RetailCaseStudyProps) => {
  const [progress, setProgress] = useState(0);
  const content = data.content || {};
  const newer = data.content_new || {};
  const mapped = mapRetailData(data);
  const { chapters: jsonChapters, snapshot: jsonSnapshot, challenges: jsonChallenges, objectives: jsonObjectives,
    ingestionPatterns: jsonIngestionPatterns, medallionLayers: jsonMedallionLayers, goldModels: jsonGoldModels,
    dashboardPerspectives: jsonDashboardPerspectives, aiUseCases: jsonAiUseCases, managedServices: jsonManagedServices,
    qualityControls: jsonQualityControls, securityItems: jsonSecurityItems, operationalModel: jsonOperationalModel,
    techStack: jsonTechStack, successMetricsList: jsonSuccessMetricsList, pipeline: jsonPipeline, qaLabels: jsonQaLabels,
    benefits: jsonBenefits, deliverables: jsonDeliverables, glanceStats: jsonGlanceStats, images, imageAlts } = mapped;
  const overviewParagraphs = htmlParagraphs(content.tab_1_left_content);
  const businessParagraphs = htmlParagraphs(content.tab_1_right_content);
  const solutionParagraphs = htmlParagraphs(newer.new_tab_3_first_content);
  const goldParagraphs = htmlParagraphs(newer.new_tab_3_third_content);
  const orchestrationParagraphs = htmlParagraphs(newer.new_tab_3_fourth_content);
  const dashboardParagraphs = htmlParagraphs(newer.new_tab_3_fifth_bottom_content);
  const aiParagraphs = [...htmlParagraphs(newer.new_tab_3_sixth_content), ...htmlParagraphs(newer.new_tab_3_sixth_bottom_content)];
  const managedParagraphs = htmlParagraphs(newer.new_tab_3_seven_content);
  const qualityParagraphs = htmlParagraphs(newer.new_tab_3_ten_content);
  const securityParagraphs = htmlParagraphs(newer.new_tab_3_ten_2_sub_content);
  const resultParagraphs = htmlParagraphs(newer.new_tab_5_third_content);

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
                    <Link to={content.banner_button_url || "/contact"}>
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
              <CaseSnapshot items={jsonSnapshot} className="mt-12 lg:mt-16" />
            </Reveal>
          </div>
        </section>

        <ChapterNav chapters={jsonChapters} />

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
                  <div className="space-y-5">{overviewParagraphs.map((text, i) => <Reveal key={text} delay={120 + i * 30}><Body>{text}</Body></Reveal>)}</div>
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
                    <SectionTitle className="mb-6">{content.tab_1_right_heading}</SectionTitle>
                  </Reveal>
                  <div className="space-y-5">{businessParagraphs.map((text, i) => <Reveal key={text} delay={120 + i * 30}><Body>{text}</Body></Reveal>)}</div>
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
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{content.tab_2_heading}</SectionTitle>
              </Reveal>

              <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {jsonChallenges.map((c, i) => (
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
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{content.tab_2_second_heading}</SectionTitle>
              </Reveal>

              <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-2 lg:gap-8">
                {jsonObjectives.map((o, i) => (
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

            {/* Solution Approach intro */}
            <section id="solution-approach" className="focus:outline-none">
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_first_heading}</SectionTitle>
              </Reveal>
            </section>

            {/* Ingestion */}
            <section id="solution-ingestion" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_first_sub_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">{solutionParagraphs.map((text, i) => <Reveal key={text} delay={110 + i * 30}><Body className="max-w-none">{text}</Body></Reveal>)}</div>

              <ListGrid items={jsonIngestionPatterns} cols="sm:grid-cols-2" />

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
                  {newer.new_tab_3_second_content}
                </Body>
              </Reveal>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {jsonMedallionLayers.map((l, i) => (
                  <Reveal key={l.layer} delay={i * 80} className="h-full">
                    <div className={cn(cjCard, "h-full p-6 lg:p-7")}>
                      <div className="flex items-center gap-2.5">
                        <Layers aria-hidden="true" className="h-4 w-4 text-[#69D6FF]" />
                        <span className="text-[15px] font-semibold text-[#F7FAFC]">{l.layer}</span>
                      </div>
                      <p className="mt-4 text-[14px] leading-[1.6] text-[#A8B8C7]">{l.purpose}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-8">
                <Reveal delay={240}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_second_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            {/* Gold models */}
            <section id="solution-gold" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_third_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  <Reveal delay={110}>
                    <Body>{goldParagraphs[0]}</Body>
                  </Reveal>
                  <Reveal delay={140}>
                    <Body>{goldParagraphs[1]}</Body>
                  </Reveal>
                  <ul className="mt-4 space-y-3">
                    {jsonGoldModels.map((m, i) => (
                      <Reveal key={m.text} delay={160 + i * 40}>
                        <li className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#A8B8C7]">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#69D6FF]"
                            aria-hidden="true"
                          />
                          <span>{m.text}</span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                  <Reveal delay={260}>
                    <Body>
                      {newer.new_tab_3_third_bottom_content}
                    </Body>
                  </Reveal>
                </div>

                <Reveal delay={140} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.gold}
                      alt={imageAlts.gold}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Orchestration */}
            <section id="solution-orchestration" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_fourth_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <Reveal delay={100} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.orchestration}
                      alt={imageAlts.orchestration}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>

                <div className="space-y-5">{orchestrationParagraphs.map((text, i) => <Reveal key={text} delay={120 + i * 30}><Body>{text}</Body></Reveal>)}</div>
              </div>
            </section>

            {/* Dashboards */}
            <section id="solution-dashboard" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_fifth_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={110}><Body className="max-w-none">{dashboardParagraphs[0]}</Body></Reveal>
                <Reveal delay={140}><Body className="max-w-none">{dashboardParagraphs[1]}</Body></Reveal>
              </div>

              <ListGrid items={jsonDashboardPerspectives} cols="grid-cols-2 lg:grid-cols-3" />

              <div className="mt-8 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  {dashboardParagraphs.slice(2).map((text, i) => <Reveal key={text} delay={170 + i * 30}><Body>{text}</Body></Reveal>)}
                </div>

                <Reveal delay={140} className="h-full">
                  <div className={cn(cjCard, "h-full overflow-hidden")}>
                    <SmartImage
                      src={images.dashboard}
                      alt={imageAlts.dashboard}
                      width={1024}
                      height={576}
                      loading="eager"
                      className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
                    />
                  </div>
                </Reveal>
              </div>
            </section>

            {/* AI/ML Readiness */}
            <section id="solution-ml" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_sixth_heading}</SectionTitle>
              </Reveal>

              <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  {aiParagraphs.slice(0, 2).map((text, i) => <Reveal key={text} delay={110 + i * 40}><Body>{text}</Body></Reveal>)}
                  <ul className="mt-4 space-y-3">
                    {jsonAiUseCases.map((m, i) => (
                      <Reveal key={m.text} delay={160 + i * 40}>
                        <li className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#A8B8C7]">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#69D6FF]"
                            aria-hidden="true"
                          />
                          <span>{m.text}</span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                  {aiParagraphs.slice(2).map((text, i) => <Reveal key={text} delay={220 + i * 30}><Body>{text}</Body></Reveal>)}
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

            {/* Managed services */}
            <section id="solution-managed" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_seven_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-5">
                {managedParagraphs.slice(0, 2).map((text, i) => <Reveal key={text} delay={110 + i * 40}><Body className="max-w-none">{text}</Body></Reveal>)}
              </div>

              <ListGrid items={jsonManagedServices} cols="sm:grid-cols-2" />

              <div className="mt-7">
                <Reveal delay={220}>
                  <Body className="max-w-none">
                    {newer.new_tab_3_seven_bottom_content}
                  </Body>
                </Reveal>
              </div>
            </section>

            {/* Architecture */}
            <section id="architecture" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-6">{newer.new_tab_3_eight_heading}</SectionTitle>
              </Reveal>

              {/* <div className="space-y-5">
                {htmlParagraphs(newer.new_tab_3_eight_content).map((text, i) => <Reveal key={text} delay={110 + i * 30}><Body className="max-w-none">{text}</Body></Reveal>)}
              </div> */}


              <div className="mt-8 space-y-4 rounded-[18px] border border-white/[0.07] bg-[#102236]/60 p-6 lg:p-8">
                {htmlParagraphs(newer.new_tab_3_eight_content).slice(1).map((text, i) => <Reveal key={text} delay={150 + i * 30}><p className="text-[15px] leading-[1.75] text-[#A8B8C7]">{text}</p></Reveal>)}
              </div>
            </section>

            {/* Tech stack */}
            <section id="tech-stack" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{newer.new_tab_3_nine_heading}</SectionTitle>
              </Reveal>

              <div className="overflow-hidden rounded-[24px] border border-white/[0.07]">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/[0.07] bg-[#102236]/80">
                      <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#69D6FF]">
                        Layer
                      </th>
                      <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#69D6FF]">
                        GCP Services
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jsonTechStack.map((t, i) => (
                      <tr key={t.layer} className={cn("border-b border-white/[0.05] last:border-b-0", i % 2 === 0 && "bg-[#0A1420]/40")}>
                        <td className="px-6 py-4 text-[15px] font-medium text-[#F7FAFC]">{t.layer}</td>
                        <td className="px-6 py-4 text-[15px] text-[#A8B8C7]">{t.service}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Data Quality, Security & Operations */}
            <section id="data-quality" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{newer.new_tab_3_ten_heading}</SectionTitle>
              </Reveal>

              <div className="space-y-10">
                <div>
                  <Reveal delay={100}>
                    <SectionTitle as="h3" className="mb-4 text-[1.35rem] sm:text-[1.5rem] lg:text-[1.75rem]">{newer.new_tab_3_ten_sub_heading}</SectionTitle>
                  </Reveal>
                  <Reveal delay={140}>
                    <Body className="max-w-none">{qualityParagraphs[0]}</Body>
                  </Reveal>
                  <Reveal delay={180}>
                    <Body className="max-w-none">{qualityParagraphs[1]}</Body>
                  </Reveal>
                  <ListGrid items={jsonQualityControls} cols="sm:grid-cols-2" />
                </div>

                <div>
                  <Reveal delay={210}>
                    <SectionTitle as="h3" className="mb-4 text-[1.35rem] sm:text-[1.5rem] lg:text-[1.75rem]">{newer.new_tab_3_ten_2_sub_heading}</SectionTitle>
                  </Reveal>
                  <Reveal delay={250}>
                    <Body className="max-w-none">
                      {securityParagraphs[0]}
                    </Body>
                  </Reveal>
                  <Reveal delay={290}>
                    <Body className="max-w-none">These include:</Body>
                  </Reveal>
                  <ListGrid items={jsonSecurityItems} cols="sm:grid-cols-2" />
                </div>

                <div>
                  <Reveal delay={320}>
                    <SectionTitle as="h3" className="mb-4 text-[1.35rem] sm:text-[1.5rem] lg:text-[1.75rem]">{newer.new_tab_3_ten_3_sub_heading}</SectionTitle>
                  </Reveal>
                  <Reveal delay={360}>
                    <Body className="max-w-none">The operating model covers:</Body>
                  </Reveal>
                  <ListGrid items={jsonOperationalModel} cols="sm:grid-cols-2 lg:grid-cols-3" />
                  <div className="mt-7">
                    <Reveal delay={400}>
                      <Body className="max-w-none">
                        {newer.new_tab_3_ten_3_sub_bottom_content}
                      </Body>
                    </Reveal>
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

            <KpiCommandCenter
              id="quality-pipeline"
              className={blockSpace}
              eyebrow=""
              title={newer.new_tab_4_first_heading}
              items={jsonSuccessMetricsList}
            />

            <section id="pipeline-rail" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={140}>
                <TestingRail stages={jsonPipeline} qaLabels={jsonQaLabels} />
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
              id="benefits"
              className={blockSpace}
              eyebrow=""
              title={newer.new_tab_5_first_heading}
              items={jsonBenefits}
            />

            <section id="deliverables" className={cn("focus:outline-none", blockSpace)}>
              <Reveal delay={60}>
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{newer.new_tab_5_second_heading}</SectionTitle>
              </Reveal>
              <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
                {jsonDeliverables.map((d, i) => {
                  const isLast = i === jsonDeliverables.length - 1 && jsonDeliverables.length % 3 === 1;
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
                      <SectionTitle className="mb-6">The Result</SectionTitle>
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
                <SectionTitle className="mb-8 md:mb-10 lg:mb-12">{newer.new_tab_5_fourth_heading}</SectionTitle>
              </Reveal>

              <div className="mx-auto w-full max-w-3xl">
                <div className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-2 sm:px-10 sm:py-4">
                  {jsonGlanceStats.map((s, i) => (
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
              alt={imageAlts.banner}
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
                    <Link to={content.bottom_banner_buttons?.[0]?.button_text || "/contact"}>
                      {content.bottom_banner_buttons?.[0]?.button_url}
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
                    <Link to={content.bottom_banner_buttons?.[1]?.button_text || "/case-studies"}>
                      {content.bottom_banner_buttons?.[1]?.button_url}
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

export default RetailSalesIntelligence;
