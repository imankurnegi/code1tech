import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Reveal } from "@/components/case-studies/simkyc/primitives";

export type KpiMetric = {
  /** Full original sentence — never altered. Split at the first colon for emphasis. */
  text: string;
  icon: LucideIcon | string;
  accent: string;
};

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  items: KpiMetric[];
  className?: string;
};

const PANEL = "#0B223A";
const BORDER = "rgba(111,196,255,0.14)";
const DOTS = "radial-gradient(rgba(111,196,255,0.09) 1px, transparent 1px)";

function splitMetric(text: string) {
  const i = text.indexOf(":");
  if (i === -1) return { name: "", rest: text };
  return { name: text.slice(0, i), rest: text.slice(i + 1) };
}

/* ---------------------------------- panel --------------------------------- */

function Panel({
  item,
  wide,
}: {
  item: KpiMetric;
  wide?: boolean;
}) {
  const Icon = item.icon;
  const { name, rest } = splitMetric(item.text);

  return (
    <article
      tabIndex={0}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[20px] border",
        "px-6 py-7 sm:px-8 sm:py-8 lg:px-9 lg:py-9",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 focus-visible:outline-none",
        !wide && "lg:min-h-[220px]"
      )}
      style={{ background: PANEL, borderColor: BORDER, backgroundImage: DOTS, backgroundSize: "18px 18px" }}
    >
      {/* left accent strip */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(180deg, ${item.accent}, transparent 80%)` }}
      />
      {/* inner top highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}44, transparent)` }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${item.accent}2E` }}
      />

      <div className="relative">
        {/* head — icon + heading */}
        <div className="flex items-center gap-4">
          <span
            className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border transition-shadow duration-300 group-hover:shadow-[0_0_18px_rgba(0,0,0,0.25)]"
            style={{
              borderColor: `${item.accent}33`,
              background: `${item.accent}14`,
              boxShadow: `0 0 0 1px ${item.accent}0F`,
            }}
          >
            {typeof Icon === "string" ? (
              <DynamicIcon name={Icon} className={`h-6 w-6 ${item.accent}`} />
            ) : (
              <Icon className="h-6 w-6" style={{ color: item.accent }} strokeWidth={1.6} />
            )}
          </span>
          <h3 className="text-[1.32rem] font-semibold leading-snug text-[#F5F8FC]">
            {name}
          </h3>
        </div>
        {/* description below icon + heading */}
        <p className="mt-3 text-[1.02rem] leading-[1.6] text-[#A8BACD]">
          {rest.trim()}
        </p>
      </div>

      {wide && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${item.accent}1F, transparent 70%)` }}
        />
      )}
    </article>
  );
}

export function KpiCommandCenter({
  id = "success-metrics",
  eyebrow = "SUCCESS METRICS",
  title = "Success Metrics",
  items,
  className,
}: Props) {
  const last = items.length - 1;
  return (
    <section id={id} className={cn("relative focus:outline-none", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 15% 0%, rgba(85,199,243,0.06), transparent 70%), radial-gradient(45% 40% at 90% 40%, rgba(130,221,182,0.05), transparent 70%)",
        }}
      />

      {eyebrow && (
        <Reveal delay={30}>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#55C7F3]">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={60}>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F5F8FC] sm:text-4xl lg:text-[2.6rem]">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={90}>
        <div className="mt-5 flex items-center gap-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-[#82DDB6] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#82DDB6]" />
          </span>
          <span className="text-[0.68rem] uppercase tracking-[0.2em] text-[#7188A1]">
            Monitored continuously
          </span>
          <span className="h-px flex-1 bg-[rgba(111,196,255,0.14)]" />
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
        {items.map((item, i) => {
          const wide = i === last;
          return (
            <Reveal
              key={item.text}
              delay={60 + i * 60}
              className={cn("h-full", wide && "sm:col-span-2 lg:col-span-3")}
            >
              <Panel item={item} wide={wide} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default KpiCommandCenter;
