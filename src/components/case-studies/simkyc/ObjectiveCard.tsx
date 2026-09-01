import { cn } from "@/lib/utils";
import SmartImage from "@/components/SmartImage";
import { DynamicIcon } from "@/components/DynamicIcon";

import {
  cjCard,
  cjCardPad,
  cjIconTile,
  cjIconGlyph,
  cjIconRow,
  cjCardTitle,
  cjCardBody,

} from "./primitives";

export interface ObjectiveItem {
  no: string;
  title: string;
  text: string;
  icon: string;
  img: string;
  alt: string;
}

const ObjectiveCard = ({
  item,
  featured = false,
}: {
  item: ObjectiveItem;
  featured?: boolean;
}) => {
  return (
    <article
      className={cn(
        cjCard,
        "group relative flex h-full min-h-[204px] flex-col overflow-hidden p-0 transition-all duration-500 md:min-h-[218px] lg:min-h-[228px]",
        "hover:border-[#69D6FF]/35 hover:-translate-y-[3px] motion-reduce:transform-none motion-reduce:transition-none"
      )}
    >
      {/* image backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <SmartImage
          src={item.img}
          alt=""
          aria-hidden="true"
          width={1024}
          height={576}
          loading="eager"
          decoding="async"
          pictureClassName="block h-full w-full"
          className={cn(
            "h-full w-full object-cover transition-all duration-[1200ms] motion-reduce:transition-none",
            featured
              ? "opacity-[0.24] group-hover:opacity-[0.3]"
              : "opacity-[0.12] group-hover:opacity-[0.18]"
          )}
        />

        <div
          className={cn(
            "absolute inset-0",
            featured
              ? "bg-gradient-to-r from-[#07111F] via-[#07111F]/92 to-[#102236]/80"
              : "bg-gradient-to-b from-[#0B1828]/94 via-[#0B1828]/96 to-[#102236]/96"
          )}
        />
      </div>

      {/* top accent hairline */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#69D6FF]/50 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        className={cn(
          "relative z-10 flex h-full flex-col",
          featured ? "p-7 lg:p-9" : cjCardPad
        )}
      >
        <div className={cn(cjIconRow, "mb-0 items-start")}>
          <span aria-hidden="true" className={cjIconTile}>
            <DynamicIcon name={item.icon} className={cjIconGlyph} />
          </span>

          <h4
            className={cn(
              cjCardTitle,
              "min-h-[2.75rem]",
              featured && "lg:text-[1.35rem]"
            )}
          >
            {item.title}
          </h4>
        </div>

        <p className={cn(cjCardBody, "mt-4 max-w-[52ch]")}>
          {item.text}
        </p>
      </div>
    </article>
  );
};


export default ObjectiveCard;
