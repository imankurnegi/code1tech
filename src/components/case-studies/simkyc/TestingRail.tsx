import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { cjCard } from "./primitives";
import { DynamicIcon } from "@/components/DynamicIcon";

export interface RailStage {
  label: string;
  icon: string;
}

const TestingRail = ({
  stages,
  qaLabels,
}: {
  stages: RailStage[];
  qaLabels: string[];
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });

  return (
    <div ref={ref} className={cn(cjCard, "p-6 lg:p-8")}>
      {/* Rail */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-5 right-5 top-6 hidden h-px overflow-hidden bg-white/[0.08] sm:block"
        >
          <span
            className={cn(
              "block h-px bg-gradient-to-r from-[#69D6FF] to-[#A9E7C2] transition-[width] duration-[1400ms] ease-out motion-reduce:duration-0",
              inView ? "w-full" : "w-0"
            )}
          />
        </div>

        <ol className="relative grid grid-cols-2 gap-y-7 sm:grid-cols-4">
          {stages.map((s, i) => (
              <li
                key={s.label}
                className="flex flex-col items-center text-center transition-all duration-700 motion-reduce:transition-none"
                style={{
                  transitionDelay: `${i * 130}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#69D6FF]/25 bg-[#102236] text-[#69D6FF]"
                >
                  <DynamicIcon name={s.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="mt-3 text-[13.5px] font-semibold text-[#F7FAFC]">{s.label}</span>
              </li>
            ))}
        </ol>
      </div>

      {/* Continuous QA band */}
      <div className="mt-7 rounded-2xl border border-[#A9E7C2]/20 bg-[#A9E7C2]/[0.06] p-5">
        <div className="mb-3.5 flex items-center gap-2.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#A9E7C2]" />
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#A9E7C2]">
            Continuous QA
          </span>
        </div>
        <ul className="flex flex-wrap gap-2">
          {qaLabels.map((q) => (
            <li
              key={q}
              className="rounded-full border border-[#A9E7C2]/20 bg-[#07111F]/40 px-3 py-1.5 text-[12.5px] text-[#A8B8C7]"
            >
              {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestingRail;
