import { cn } from "@/lib/utils";
import { cjCard } from "./primitives";
import { DynamicIcon } from "@/components/DynamicIcon";

export interface SnapshotItem {
  label: string;
  value: string;
  icon: string;
  tone?: "cyan" | "mint";
}

const CaseSnapshot = ({
  items,
  className,
}: {
  items: SnapshotItem[];
  className?: string;
}) => (
  <dl
    className={cn(
      cjCard,
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-white/[0.07] sm:divide-y-0 sm:[&>div:nth-child(n+3)]:border-t sm:[&>div:nth-child(n+3)]:border-white/[0.07] lg:[&>div:nth-child(n+3)]:border-t-0 lg:divide-x lg:divide-white/[0.07]",
      className
    )}
  >
    {items.map(({ label, value, icon, tone = "cyan" }) => (
      <div key={label} className="flex items-start gap-3.5 p-5 lg:p-6">
        <span
          aria-hidden="true"
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
            tone === "cyan"
              ? "border-[#69D6FF]/25 bg-[#69D6FF]/10 text-[#69D6FF]"
              : "border-[#A9E7C2]/25 bg-[#A9E7C2]/10 text-[#A9E7C2]"
          )}
        >
          <DynamicIcon name={icon} className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0">
          <dt className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#A8B8C7]/70">
            {label}
          </dt>
          <dd className="mt-1.5 text-[14px] font-semibold leading-snug text-[#F7FAFC]">
            {value}
          </dd>
        </div>
      </div>
    ))}
  </dl>
);

export default CaseSnapshot;
