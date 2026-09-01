import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { cjContainer, cjFocus } from "./primitives";

export interface Chapter {
  id: string;
  label: string;
}

const NAV_OFFSET = 72;

const ChapterNav = ({ chapters }: { chapters: Chapter[] }) => {
  const [activeId, setActiveId] = useState(chapters[0].id);
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sticky = window.scrollY > 360;
      setIsSticky(sticky);
      const h = navRef.current?.getBoundingClientRect().height ?? 0;
      const pos = window.scrollY + NAV_OFFSET + h + 40;
      let current = chapters[0].id;
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (el && el.offsetTop <= pos) current = c.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapters]);

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const h = navRef.current?.getBoundingClientRect().height ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - (NAV_OFFSET + h + 16);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    setOpen(false);
  };

  const activeIndex = chapters.findIndex((c) => c.id === activeId);
  const active = chapters[activeIndex] ?? chapters[0];

  return (
    <div
      ref={navRef}
      className={cn(
        "sticky top-[72px] z-40 w-full transition-colors duration-300",
        isSticky &&
          "bg-[#07111F]/90 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_10px_30px_-20px_#000]"
      )}
    >
      <div className={cn(cjContainer, isSticky ? "py-2.5" : "pt-6 pb-2")}>
        {/* Desktop chapter rail */}
        <nav
          aria-label="Case study chapters"
          className="hidden md:flex items-center gap-1 overflow-x-auto hide-scrollbar"
        >
          {chapters.map((c, i) => {
            const isActive = c.id === activeId;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => jump(e, c.id)}
                className={cn(
                  "group shrink-0 inline-flex items-baseline gap-2.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-200 whitespace-nowrap",
                  cjFocus,
                  isActive
                    ? "text-[#F7FAFC]"
                    : "text-[#A8B8C7] hover:text-[#F7FAFC]"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-numbers text-[11px] tracking-wider transition-colors",
                    isActive ? "text-[#69D6FF]" : "text-[#A8B8C7]/50"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative">
                  {c.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-[#69D6FF] transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </span>
              </a>
            );
          })}
        </nav>

        {/* Mobile dropdown */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="cj-chapter-menu"
            className={cn(
              "flex w-full items-center justify-between rounded-xl border border-white/[0.09] bg-[#102236]/80 px-4 py-3 text-sm font-semibold text-[#F7FAFC]",
              cjFocus
            )}
          >
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="font-numbers text-[11px] text-[#69D6FF]">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              {active.label}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-4 w-4 text-[#A8B8C7] transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>

          <div
            id="cj-chapter-menu"
            className={cn(
              "grid overflow-hidden transition-all duration-300",
              open ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr] mt-0"
            )}
          >
            <nav
              aria-label="Case study chapters"
              className="flex min-h-0 flex-col gap-1 rounded-xl border border-white/[0.07] bg-[#102236]/70 p-2"
            >
              {chapters.map((c, i) => {
                const isActive = c.id === activeId;
                return (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => jump(e, c.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                      cjFocus,
                      isActive
                        ? "bg-[#69D6FF]/10 text-[#F7FAFC]"
                        : "text-[#A8B8C7] hover:text-[#F7FAFC]"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-numbers text-[11px]",
                        isActive ? "text-[#69D6FF]" : "text-[#A8B8C7]/50"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* progress rail */}
        <div
          aria-hidden="true"
          className={cn("relative mt-3 h-px w-full overflow-hidden bg-white/[0.07]")}
        >
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#69D6FF]/40 to-[#69D6FF] transition-all duration-500"
            style={{ width: `${((activeIndex + 1) / chapters.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterNav;
