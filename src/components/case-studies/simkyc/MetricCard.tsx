import { cn } from "@/lib/utils";
import SmartImage from "@/components/SmartImage";
import { DynamicIcon } from "@/components/DynamicIcon";

import {
  cjCard,
  Counter,
  cjCardPad,
  cjIconTile,
  cjIconGlyph,
  cjCardTitle,
  cjCardBody,
} from "./primitives";

export interface MetricItem {
  value: string;
  label: string;
  icon: string;
  tone?: "cyan" | "mint";
}

export const MetricCard = ({ item }: { item: MetricItem }) => {
  const mint = item.tone === "mint";
  return (
    <div
      className={cn(
        cjCard,
        cjCardPad,
        "group relative flex h-full min-h-[212px] flex-col overflow-hidden transition-colors duration-500",
        mint ? "hover:border-[#A9E7C2]/30" : "hover:border-[#69D6FF]/30"
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-40",
          mint ? "bg-[#A9E7C2]/20" : "bg-[#69D6FF]/20"
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          cjIconTile,
          "relative",
          mint && "border-[#A9E7C2]/25 bg-[#A9E7C2]/10 text-[#A9E7C2]"
        )}
      >
        <DynamicIcon name={item.icon} className={cjIconGlyph} />
      </span>
      <p
        className={cn(
          "relative mt-6 text-[2.2rem] lg:text-[2.75rem] font-bold leading-none tracking-tight",
          mint ? "text-[#A9E7C2]" : "text-[#69D6FF]"
        )}
      >
        <Counter value={item.value} />
      </p>
      <p className={cn(cjCardBody, "relative mt-3")}>
        {item.label}
      </p>
    </div>
  );
};

export const BenefitCard = ({
  item,
}: {
  item: { text: string; icon: string; tone?: "cyan" | "mint" };
}) => {
  const mint = item.tone === "mint";
  return (
    <div
      className={cn(
        cjCardPad,
        "group relative flex h-full min-h-[176px] flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-[#0E1E30]/90 to-[#091420]/90 transition-all duration-500 hover:-translate-y-1 motion-reduce:transform-none",
        mint
          ? "hover:border-[#A9E7C2]/35 hover:shadow-[0_12px_40px_-12px_rgba(169,231,194,0.22)]"
          : "hover:border-[#69D6FF]/35 hover:shadow-[0_12px_40px_-12px_rgba(105,214,255,0.22)]"
      )}
    >
      {/* top accent line */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
          mint ? "bg-[#A9E7C2]" : "bg-[#69D6FF]"
        )}
      />

      {/* soft radial glow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          mint ? "bg-[#A9E7C2]/12" : "bg-[#69D6FF]/12"
        )}
      />

      <span
        aria-hidden="true"
        className={cn(
          cjIconTile,
          "relative group-hover:scale-105",
          mint
            ? "border-[#A9E7C2]/25 bg-[#A9E7C2]/10 text-[#A9E7C2] shadow-[0_0_20px_-6px_rgba(169,231,194,0.25)]"
            : "shadow-[0_0_20px_-6px_rgba(105,214,255,0.25)]"
        )}
      >
        <DynamicIcon name={item.icon} className={cjIconGlyph} />
      </span>

      {/* hairline divider keeps every card's text starting on the same line */}
      <span
        aria-hidden="true"
        className={cn(
          "relative mt-5 h-px w-10 transition-all duration-500 group-hover:w-16",
          mint ? "bg-[#A9E7C2]/50" : "bg-[#69D6FF]/50"
        )}
      />

      <p className={cn(cjCardTitle, "relative mt-4 flex-none font-semibold")}>
        {item.text}
      </p>
    </div>
  );
};


export const DeliverableCard = ({
  item,
  variant = "portrait",
}: {
  item: { title: string; text: string; icon: string; image: string };
  variant?: "portrait" | "landscape";
}) => {
  const isLandscape = variant === "landscape";

  return (
    <article
      className={cn(
        "group relative flex h-full overflow-hidden rounded-[24px] border border-[rgba(100,190,230,0.22)] bg-[#0F2033]/80 shadow-[0_8px_28px_-18px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(100,190,230,0.45)] hover:shadow-[0_20px_50px_-20px_rgba(105,214,255,0.22)] motion-reduce:transform-none",
        isLandscape ? "flex-col lg:flex-row" : "flex-col"
      )}
    >
      {/* image — portrait uses fixed 2:1 header; landscape uses left-side cover */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
          isLandscape
            ? "h-48 w-full lg:h-auto lg:w-[42%]"
            : "aspect-[2/1] w-full"
        )}
      >
        <SmartImage
          src={item.image}
          alt={item.title}
          loading="eager"
          width={1024}
          height={576}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.92] transition-all duration-700 group-hover:scale-[1.03] group-hover:brightness-100 motion-reduce:transition-none"
        />

        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            isLandscape
              ? "bg-gradient-to-r from-[#0F2033] via-[#0F2033]/55 to-transparent lg:bg-gradient-to-r"
              : "bg-gradient-to-t from-[#0F2033] via-[#0F2033]/45 to-transparent"
          )}
        />
      </div>

      {/* content */}
      <div
        className={cn(
          "flex flex-1 flex-col justify-center",
          cjCardPad,
          isLandscape && "lg:py-8 lg:pl-10 lg:pr-8"
        )}
      >
        <div className={cn("mb-4 flex items-start gap-3 sm:gap-4", isLandscape && "lg:items-center")}>
          <span aria-hidden="true" className={cn(cjIconTile, "group-hover:scale-105")}>
            <DynamicIcon name={item.icon} className={cjIconGlyph} />
          </span>
          <h3
            className={cn(
              cjCardTitle,
              isLandscape ? "min-h-0 lg:text-[1.25rem]" : "min-h-[3.4rem] lg:min-h-[3.75rem]"
            )}
          >
            {item.title}
          </h3>
        </div>
        <p className={cn(cjCardBody, isLandscape ? "max-w-[62ch]" : "line-clamp-4")}>{item.text}</p>
      </div>
    </article>
  );
};


