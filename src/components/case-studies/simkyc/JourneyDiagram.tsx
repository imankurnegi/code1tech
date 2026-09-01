import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";

export interface JourneyNode {
  label: string;
  icon: string;
  tone?: "cyan" | "mint";
}

const JourneyDiagram = ({ nodes }: { nodes: JourneyNode[] }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });

  return (
    <div ref={ref} className="relative">
      {/* Desktop / tablet horizontal rail with line-draw effect */}
      <div className="relative hidden md:block">
        <div
          aria-hidden="true"
          className="absolute left-[8%] right-[8%] top-[46px] h-px overflow-hidden bg-white/[0.08]"
        >
          <span
            className={cn(
              "block h-px bg-gradient-to-r from-[#69D6FF]/30 via-[#69D6FF] to-[#A9E7C2] transition-[width] duration-[1600ms] ease-out motion-reduce:duration-0",
              inView ? "w-full" : "w-0"
            )}
          />
        </div>

        <ol className="relative grid grid-cols-3 gap-x-4 gap-y-10 lg:grid-cols-6">
          {nodes.map((n, i) => {
            const mint = n.tone === "mint";
            return (
              <li
                key={n.label}
                className="flex flex-col items-center text-center transition-all duration-700 motion-reduce:transition-none"
                style={{
                  transitionDelay: `${i * 140}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(14px)",
                }}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 flex h-[92px] w-[92px] items-center justify-center rounded-[26px] border bg-[#102236]",
                    mint
                      ? "border-[#A9E7C2]/30 text-[#A9E7C2] shadow-[0_0_28px_-14px_#A9E7C2]"
                      : "border-[#69D6FF]/25 text-[#69D6FF] shadow-[0_0_28px_-14px_#69D6FF]"
                  )}
                >
                  <DynamicIcon name={n.icon} className="h-6 w-6" />
                </span>
                <span className="mt-6 max-w-[150px] text-[13.5px] font-semibold leading-snug text-[#F7FAFC]">
                  {n.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile vertical stepper */}
      <ol className="relative md:hidden">
        <span
          aria-hidden="true"
          className="absolute left-[27px] top-4 bottom-6 w-px overflow-hidden bg-white/[0.08]"
        >
          <span
            className={cn(
              "block w-px bg-gradient-to-b from-[#69D6FF]/30 via-[#69D6FF] to-[#A9E7C2] transition-[height] duration-[1600ms] ease-out motion-reduce:duration-0",
              inView ? "h-full" : "h-0"
            )}
          />
        </span>
        {nodes.map((n, i) => {
          const mint = n.tone === "mint";
          return (
            <li key={n.label} className="relative flex items-center gap-4 pb-4 last:pb-0">
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border bg-[#102236]",
                  mint
                    ? "border-[#A9E7C2]/30 text-[#A9E7C2]"
                    : "border-[#69D6FF]/25 text-[#69D6FF]"
                )}
              >
                <DynamicIcon name={n.icon} className="h-5 w-5" />
              </span>
              <div className="flex-1 rounded-[18px] border border-white/[0.07] bg-[#102236]/70 px-4 py-3.5">
                <span className="block text-[14px] font-semibold leading-snug text-[#F7FAFC]">
                  {n.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default JourneyDiagram;
