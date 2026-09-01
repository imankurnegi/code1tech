import { cn } from "@/lib/utils";
import { cjCard } from "./primitives";
import { DynamicIcon } from "@/components/DynamicIcon";

export interface LayerModule {
  name: string;
  icon: string;
  tone?: "cyan" | "mint";
  items: { text: string; icon?: string }[];
}

const IntegrationLayer = ({ modules }: { modules: LayerModule[] }) => (
  <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
    {modules.map((m) => {
      const mint = m.tone === "mint";
      return (
        <section
          key={m.name}
          className={cn(cjCard, "flex h-full flex-col p-6 lg:p-7")}
          aria-label={m.name}
        >
          <div className="mb-5 flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl border",
                mint
                  ? "border-[#A9E7C2]/25 bg-[#A9E7C2]/10 text-[#A9E7C2]"
                  : "border-[#69D6FF]/25 bg-[#69D6FF]/10 text-[#69D6FF]"
              )}
            >
              <DynamicIcon name={m.icon} className="h-[18px] w-[18px]" />
            </span>
            <h4 className="text-[1.05rem] font-bold leading-snug text-[#F7FAFC]">{m.name}</h4>
          </div>

          <ul className="flex flex-col gap-2.5">
            {m.items.map((it, i) => (
              <li
                key={`${it.text}-${i}`}
                className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-[#07111F]/40 px-4 py-3"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 shrink-0",
                    mint ? "text-[#A9E7C2]" : "text-[#69D6FF]"
                  )}
                >
                  {it.icon ? (
                    <DynamicIcon name={it.icon} className="h-4 w-4" />
                  ) : (
                    <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </span>
                <span className="text-[14px] leading-[1.6] text-[#A8B8C7]">{it.text}</span>
              </li>
            ))}
          </ul>
        </section>
      );
    })}
  </div>
);

export default IntegrationLayer;
