import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Reveal } from "@/components/case-studies/simkyc/primitives";

export type PremiumBenefit = {
  label: string;
  text: string;
  icon: LucideIcon | string;
  accent?: string;
};

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: PremiumBenefit[];
  className?: string;
};

const ACCENTS = ["#52C7FF", "#7EF7C9", "#8B7CFF", "#63E6FF", "#B6F7A8", "#52C7FF"];

const DOTS =
  "radial-gradient(rgba(120,200,255,0.10) 1px, transparent 1px)";

function Card({
  item,
  accent,
  wide,
}: {
  item: PremiumBenefit;
  accent: string;
  wide?: boolean;
}) {
  const Icon = item.icon;
  return (
    <article
      tabIndex={0}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[22px]",
        "border border-[rgba(120,200,255,0.14)] bg-[#0B223A]",
        "p-7 sm:p-8 lg:p-9",
        "shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-[rgba(120,200,255,0.32)]",
        "hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.95)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52C7FF]/50",
        wide && "lg:flex-row lg:items-center lg:gap-10 lg:p-10"
      )}
      style={{ backgroundImage: DOTS, backgroundSize: "18px 18px" }}
    >
      {/* soft inner highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(160,215,255,0.35)] to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${accent}22, transparent 70%)` }}
      />

      {/* accent dot */}
      <span
        aria-hidden="true"
        className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full opacity-50 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
      />

      <div className={cn("relative flex items-center gap-4", wide ? "lg:flex-none" : "mb-6")}>
        <span
          className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl border transition-shadow duration-300"
          style={{
            borderColor: `${accent}33`,
            background: `${accent}14`,
            boxShadow: `0 0 0 0 ${accent}00`,
          }}
        >
          {typeof Icon === "string" ? (
            <DynamicIcon name={Icon} className={`h-[22px] w-[22px] ${accent}`} />
          ) : (
            <Icon className="h-[22px] w-[22px]" style={{ color: accent }} strokeWidth={1.6} />
          )}
        </span>
        {!wide && (
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#AFC0D4]">
            {item.label}
          </span>
        )}
      </div>

      <div className={cn("relative", wide && "lg:flex-1")}>
        {wide && (
          <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#AFC0D4]">
            {item.label}
          </span>
        )}
        <p
          className={cn(
            "max-w-[46ch] text-[0.98rem] leading-[1.6] text-[#F5F8FC]",
            wide && "max-w-[74ch] text-[1.05rem]"
          )}
        >
          {item.text}
        </p>
      </div>
    </article>
  );
}

export function PremiumBenefitsGrid({
  id = "benefits",
  eyebrow = "KEY BENEFITS",
  title = "Benefits",
  subtitle,
  items,
  className,
}: Props) {
  const last = items.length - 1;
  return (
    <section id={id} className={cn("relative focus:outline-none", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, rgba(82,199,255,0.07), transparent 70%), radial-gradient(50% 40% at 90% 30%, rgba(139,124,255,0.06), transparent 70%)",
        }}
      />
      <div className="relative">
        {eyebrow && (
          <Reveal delay={40}>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#63E6FF]">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={70}>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F5F8FC] sm:text-4xl lg:text-[2.6rem]">
            {title}
          </h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={100}>
            <p className="mt-4 text-[1rem] leading-[1.6] text-[#AFC0D4]">{subtitle}</p>
          </Reveal>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {items.map((item, i) => {
            const wide = i === last && items.length % 3 === 1;
            return (
              <Reveal
                key={item.text}
                delay={60 + i * 60}
                className={cn("h-full", wide && "sm:col-span-2 lg:col-span-3")}
              >
                <Card item={item} accent={item.accent ?? ACCENTS[i % ACCENTS.length]} wide={wide} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PremiumBenefitsGrid;
