import { cn } from "@/lib/utils";
import { CheckCircle2, ShieldCheck, Smartphone, Activity } from "lucide-react";

/** Abstract three-state mobile product mockup: request → KYC verification → status tracking. */
const HeroMockup = ({ className }: { className?: string }) => (
  <div className={cn("relative", className)} aria-hidden="true">
    {/* ambient glow */}
    <div className="pointer-events-none absolute -inset-10 rounded-full bg-[#69D6FF]/10 blur-[80px]" />

    <div className="relative flex items-end justify-center gap-3 sm:gap-4">
      {/* Screen 1 — request */}
      <div className="w-[30%] max-w-[150px] translate-y-6 rounded-[22px] border border-white/[0.09] bg-[#102236]/85 p-3 shadow-[0_30px_60px_-40px_#000] backdrop-blur-md">
        <div className="mb-3 flex items-center gap-1.5">
          <Smartphone className="h-3 w-3 text-[#69D6FF]" />
          <span className="text-[8.5px] font-semibold uppercase tracking-widest text-[#A8B8C7]">
            Request
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-4/5 rounded-full bg-white/10" />
          <div className="h-2 w-3/5 rounded-full bg-white/[0.07]" />
        </div>
        <div className="mt-3 space-y-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-white/[0.06] bg-[#07111F]/60 px-2 py-2"
            >
              <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
        <div className="mt-3 h-6 rounded-lg bg-[#69D6FF]/20 ring-1 ring-[#69D6FF]/30" />
      </div>

      {/* Screen 2 — KYC verification (front / featured) */}
      <div className="relative z-10 w-[40%] max-w-[210px] rounded-[26px] border border-[#69D6FF]/20 bg-[#102236]/95 p-4 shadow-[0_40px_80px_-40px_#000] backdrop-blur-lg">
        <div className="mx-auto mb-3.5 h-1 w-10 rounded-full bg-white/15" />
        <div className="mb-3 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-[#A9E7C2]" />
          <span className="text-[9px] font-semibold uppercase tracking-widest text-[#A9E7C2]">
            KYC verification
          </span>
        </div>

        <div className="relative mb-3.5 aspect-[4/3] overflow-hidden rounded-xl border border-[#A9E7C2]/20 bg-[#07111F]/70">
          <div className="absolute inset-3 rounded-lg border border-dashed border-[#A9E7C2]/30" />
          <div className="absolute left-3 right-3 top-1/2 h-px bg-gradient-to-r from-transparent via-[#A9E7C2] to-transparent" />
        </div>

        <div className="space-y-2">
          {["Identity captured", "Document matched", "Verification passed"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 shrink-0 text-[#A9E7C2]" />
              <span className="text-[9.5px] text-[#A8B8C7]">{t}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 h-7 rounded-xl bg-[#69D6FF]/25 ring-1 ring-[#69D6FF]/40" />
      </div>

      {/* Screen 3 — status tracking */}
      <div className="w-[30%] max-w-[150px] translate-y-6 rounded-[22px] border border-white/[0.09] bg-[#102236]/85 p-3 shadow-[0_30px_60px_-40px_#000] backdrop-blur-md">
        <div className="mb-3 flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-[#69D6FF]" />
          <span className="text-[8.5px] font-semibold uppercase tracking-widest text-[#A8B8C7]">
            Status
          </span>
        </div>
        <div className="relative space-y-3 pl-3">
          <span className="absolute left-[3px] top-1.5 bottom-2 w-px bg-gradient-to-b from-[#69D6FF] to-[#A9E7C2]/40" />
          {[
            ["#69D6FF", "5/6"],
            ["#69D6FF", "4/6"],
            ["#A9E7C2", "3/6"],
          ].map(([c, w], i) => (
            <div key={i} className="relative">
              <span
                className="absolute -left-3 top-1 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: c }}
              />
              <div
                className="h-1.5 rounded-full bg-white/10"
                style={{ width: w === "5/6" ? "83%" : w === "4/6" ? "66%" : "50%" }}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-[#A9E7C2]/20 bg-[#A9E7C2]/[0.08] px-2 py-2">
          <div className="h-1.5 w-3/4 rounded-full bg-[#A9E7C2]/40" />
        </div>
      </div>
    </div>
  </div>
);

export default HeroMockup;
