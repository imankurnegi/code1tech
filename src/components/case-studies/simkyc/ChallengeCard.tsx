import { cn } from "@/lib/utils";
import SmartImage from "@/components/SmartImage";
import { DynamicIcon } from "@/components/DynamicIcon";

import { cjCard, cjCardPad, cjIconTile, cjIconGlyph, cjCardMinH } from "./primitives";

export interface ChallengeItem {
  no: string;
  icon: string;
  img: string;
  alt: string;
  text: string;
}

const ChallengeCard = ({ item }: { item: ChallengeItem }) => {
  return (
    <article
      className={cn(
        cjCard,
        cjCardMinH,
        "group relative flex h-full flex-col overflow-hidden transition-all duration-500 hover:border-[#69D6FF]/40 hover:shadow-[0_0_40px_rgba(105,214,255,0.10)]"
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <SmartImage
          src={item.img}
          alt={item.alt}
          width={1024}
          height={576}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          pictureClassName="block h-full w-full"
          className="h-full w-full object-cover opacity-50 saturate-[0.75] transition-all duration-[900ms] group-hover:scale-[1.06] group-hover:opacity-60 motion-reduce:transition-none"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/80 to-[#07111F]/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#07111F]/60 via-transparent to-transparent"
        />
      </div>

      {/* Cyan accent line */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#69D6FF] via-[#69D6FF]/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Glass icon tile */}
      <div className={cn("relative z-10", cjCardPad)}>
        <span
          aria-hidden="true"
          className={cn(cjIconTile, "shadow-[0_0_24px_rgba(105,214,255,0.18)] group-hover:scale-105")}
        >
          <DynamicIcon name={item.icon} className={cjIconGlyph} />
        </span>
      </div>

      {/* Text anchored at bottom */}
      <div className={cn("relative z-10 mt-auto pt-0", cjCardPad, "pt-0 lg:pt-0")}>
        <p className="text-left text-[1.05rem] font-medium leading-[1.7] text-[#F7FAFC] lg:text-[1.15rem]">
          {item.text}
        </p>
      </div>
    </article>
  );
};

export default ChallengeCard;
