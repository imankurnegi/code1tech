import { Brain, Puzzle, Cloud, Database, Network, CloudCog, ShieldCheck, LucideIcon } from "lucide-react";
import { DynamicIcon } from "../DynamicIcon";

export type TechCat = {
  icon: LucideIcon;
  title: string;
  desc: string;
  chips?: string[];
};

function TechCategoryCard({ cat }: { cat: TechCat }) {
  return (
    <div className="group relative rounded-[22px] border border-cyan-400/15 bg-[hsl(220_50%_7%/0.7)] backdrop-blur-xl p-5 lg:p-6 transition-all duration-500 hover:border-cyan-400/45 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_hsl(190_90%_55%/0.35)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity"
        style={{
          backgroundImage:
            "linear-gradient(hsl(190 90% 55% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(190 90% 55% / 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-center gap-3 mb-3">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <DynamicIcon name={typeof cat.icon === 'string' ? cat.icon : ""} className="w-5 h-5 text-cyan-300" />
        </div>
        <h3 className="text-white font-semibold text-[15px] lg:text-base leading-snug">
          {cat.title}
        </h3>
      </div>

      <p className="relative text-[13px] leading-relaxed text-slate-400 mb-4">
        {cat.desc}
      </p>

      {cat.chips && cat.chips.length > 0 && (
        <div className="relative flex flex-wrap gap-1.5">
          {cat.chips.map((c) => (
            <span
              key={c}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-cyan-400/20 bg-cyan-400/5 text-cyan-200/90 transition-colors group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10"
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

interface TechEcosystemProps {
  items?: TechCat[];
}

export default function TechEcosystem({ items }: TechEcosystemProps = {}) {
  const categories = items && items.length > 0 ? items : [];
  const hasWide = categories.length >= 7;
  const top = categories.slice(0, 3);
  const bottom = categories.slice(3, hasWide ? 6 : 6);
  const wide = hasWide ? categories[6] : undefined;
  const overflow = !hasWide ? categories.slice(6) : [];

  return (
    <div className="relative">
      <div className="hidden lg:grid grid-cols-12 gap-5 auto-rows-min">
        {top.map((c) => (
          <div key={c.title} className="col-span-4">
            <TechCategoryCard cat={c} />
          </div>
        ))}

        {bottom.map((c) => (
          <div key={c.title} className="col-span-4">
            <TechCategoryCard cat={c} />
          </div>
        ))}

        {overflow.map((c) => (
          <div key={c.title} className="col-span-4">
            <TechCategoryCard cat={c} />
          </div>
        ))}

        {wide && (
          <div className="col-span-12">
            <div className="group relative rounded-[22px] border border-cyan-400/20 bg-gradient-to-br from-[hsl(220_50%_7%/0.9)] to-[hsl(222_47%_5%/0.9)] backdrop-blur-xl p-6 overflow-hidden transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_50px_-10px_hsl(190_90%_55%/0.35)]">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(190 90% 55% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(190 90% 55% / 0.4) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative grid grid-cols-12 gap-6 items-center">
                <div className={`${wide.chips && wide.chips.length ? "col-span-7" : "col-span-12"} flex items-start gap-4`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/25 to-blue-500/25 border border-cyan-400/40 flex items-center justify-center">
                    <DynamicIcon name={typeof wide.icon === 'string' ? wide.icon : ""} className="w-6 h-6 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{wide.title}</h3>
                    <p className="text-[13px] leading-relaxed text-slate-400">{wide.desc}</p>
                  </div>
                </div>
                {wide.chips && wide.chips.length > 0 && (
                  <div className="col-span-5 flex flex-wrap gap-2 justify-end">
                    {wide.chips.map((c) => (
                      <span
                        key={c}
                        className="text-xs font-medium px-3 py-1.5 rounded-md border border-cyan-400/25 bg-cyan-400/5 text-cyan-200/90"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
        {categories.map((c) => (
          <TechCategoryCard key={c.title} cat={c} />
        ))}
      </div>

      <div className="md:hidden space-y-4">
        {categories.map((c) => (
          <TechCategoryCard key={c.title} cat={c} />
        ))}
      </div>
    </div>
  );
}

