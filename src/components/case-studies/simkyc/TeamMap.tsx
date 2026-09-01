import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { cjCard } from "./primitives";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Layers } from "lucide-react";

export interface TeamNode {
  label: string;
  icon: string;
  tone?: "cyan" | "mint";
}

const TeamMap = ({ hub, nodes }: { hub: string; nodes: TeamNode[] }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });

  return (
    <div ref={ref} className={cn(cjCard, "relative overflow-hidden p-6 lg:p-8")}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#69D6FF 1px, transparent 1px), linear-gradient(90deg, #69D6FF 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative">
        {/* Hub */}
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#69D6FF]/25 bg-[#69D6FF]/[0.07] px-5 py-4">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#69D6FF]/30 bg-[#07111F]/60 text-[#69D6FF]"
          >
            <Layers className="h-[18px] w-[18px]" />
          </span>
          <span className="text-[14px] font-semibold leading-snug text-[#F7FAFC]">{hub}</span>
        </div>

        {/* Connected nodes */}
        <ul className="flex flex-col gap-3 sm:grid sm:grid-cols-2">
          {nodes.map((n, i) => {
            const mint = n.tone === "mint";
            return (
              <li
                key={n.label}
                className={cn(
                  "relative flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-[#07111F]/45 px-4 py-4 transition-all duration-700 motion-reduce:transition-none",
                  i === nodes.length - 1 && nodes.length % 2 === 1 && "sm:col-span-2"
                )}
                style={{
                  transitionDelay: `${i * 110}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-10px)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-3 hidden h-px w-3 bg-[#69D6FF]/30 sm:block"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                    mint
                      ? "border-[#A9E7C2]/25 bg-[#A9E7C2]/10 text-[#A9E7C2]"
                      : "border-[#69D6FF]/20 bg-[#69D6FF]/[0.07] text-[#69D6FF]"
                  )}
                >
                  <DynamicIcon name={n.icon} className="h-4 w-4" />
                </span>
                <span className="text-[14px] font-medium text-[#F7FAFC]">{n.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TeamMap;
