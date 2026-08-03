import { Brain, type LucideIcon } from "lucide-react";
import { DynamicIcon } from "../DynamicIcon";

export type Challenge = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

// 7 evenly distributed anchor angles (starting from top, going clockwise)
const ANGLES = Array.from({ length: 7 }).map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / 7);

// Anchor position for each panel on a normalized 0..100 canvas
const CENTER = { x: 50, y: 50 };
const RX = 40; // horizontal radius in %
const RY = 34; // vertical radius in %

const panelAnchors = ANGLES.map((a) => ({
  angle: a,
  x: CENTER.x + RX * Math.cos(a),
  y: CENTER.y + RY * Math.sin(a),
}));

const ChallengeItem = ({
  challenge,
  index,
  className = "",
  style,
}: {
  challenge: Challenge;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <article
      className={`group relative rounded-2xl p-4 xl:p-5 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 ${className}`}
      style={{
        background: "linear-gradient(160deg, rgba(19,42,74,0.82), rgba(19,42,74,0.42))",
        border: "1px solid rgba(95,194,227,0.22)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        ...style,
      }}
      aria-labelledby={`challenge-${index}-title`}
    >

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
          style={{
            background: "linear-gradient(135deg, rgba(95,194,227,0.28), rgba(0,119,182,0.28))",
            border: "1px solid rgba(95,194,227,0.45)",
            boxShadow: "0 0 18px rgba(95,194,227,0.28)",
          }}
        >
          <DynamicIcon name={typeof challenge.icon === 'string' ? challenge.icon : ''} className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
        </div>
        <h3
          id={`challenge-${index}-title`}
          className="text-[13px] xl:text-sm font-semibold text-foreground leading-snug m-0"
        >
          {challenge.title}
        </h3>
      </div>

      <p className="mt-3 text-[12px] xl:text-[12.5px] text-muted-foreground leading-relaxed">
        {challenge.desc}
      </p>

      {/* hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at 20% 0%, rgba(95,194,227,0.14), transparent 60%)",
        }}
      />
    </article>
  );
};

const ChallengeHub = ({
  items,
  centerIcon: CenterIcon = Brain,
  centerLabel = (
    <>
      AI Fine-Tuning
      <br />
      Solutions
    </>
  ),
  centerTagline = "AI Hub",
}: {
  items: Challenge[];
  centerIcon?: LucideIcon;
  centerLabel?: React.ReactNode;
  centerTagline?: string;
}) => {
  // Take up to 7 items for the radial layout
  const radial = items.slice(0, 7);

  // Split 7 items: 3 left column, 3 right column, 1 bottom-center under hub
  const leftItems = radial.slice(0, 3);
  const rightItems = radial.slice(3, 6);
  const bottomItem = radial[6];

  return (
    <div className="relative">
      {/* ================= DESKTOP: DENSE BENTO HUB ================= */}
      <div className="hidden lg:block relative">
        {/* subtle grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] rounded-3xl"
          style={{
            backgroundImage:
              "linear-gradient(rgba(95,194,227,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)",
            WebkitBackdropFilter: "blur(0px)",
          }}
        />
        {/* radial glow behind core */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            width: 560,
            height: 560,
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(circle, rgba(0,119,182,0.30) 0%, rgba(95,194,227,0.12) 30%, transparent 65%)",
            filter: "blur(10px)",
          }}
        />

        <div className="relative grid grid-cols-3 gap-5 xl:gap-6 items-stretch">
          {/* LEFT column */}
          <div className="flex flex-col gap-5 xl:gap-6">
            {leftItems.map((c, i) => (
              <ChallengeItem key={i} challenge={c} index={i} className="h-full" />
            ))}
          </div>

          {/* CENTER column: hub (spans natural height) + optional bottom card */}
          <div className="flex flex-col gap-5 xl:gap-6">
            <div
              className="relative rounded-2xl flex items-center justify-center flex-1 min-h-[360px]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(19,42,74,0.55), rgba(10,20,38,0.55))",
                border: "1px solid rgba(95,194,227,0.28)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div className="relative w-52 h-52 xl:w-60 xl:h-60 flex items-center justify-center">
                {/* orbit rings */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(95,194,227,0.22)", animation: "spin 42s linear infinite" }}
                />
                <div
                  className="absolute inset-4 rounded-full"
                  style={{ border: "1px dashed rgba(95,194,227,0.35)", animation: "spin 28s linear infinite reverse" }}
                />
                <div
                  className="absolute inset-8 rounded-full"
                  style={{ border: "1px solid rgba(95,194,227,0.15)", animation: "spin 60s linear infinite" }}
                />
                {/* floating particles */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const a = (i * Math.PI) / 3;
                  const r = 96 + (i % 2) * 14;
                  return (
                    <span
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{
                        left: `calc(50% + ${Math.cos(a) * r}px)`,
                        top: `calc(50% + ${Math.sin(a) * r}px)`,
                        transform: "translate(-50%,-50%)",
                        background: "rgba(95,194,227,0.9)",
                        boxShadow: "0 0 10px rgba(95,194,227,0.9)",
                        animationDelay: `${i * 0.35}s`,
                      }}
                    />
                  );
                })}
                {/* core */}
                <div
                  className="relative w-32 h-32 xl:w-36 xl:h-36 flex flex-col items-center justify-center"
                  style={{
                    clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                    background: "linear-gradient(135deg, rgba(95,194,227,0.45), rgba(0,119,182,0.55))",
                    boxShadow: "0 0 80px rgba(0,119,182,0.55), inset 0 0 40px rgba(95,194,227,0.35)",
                  }}
                >
                  <div
                    className="absolute inset-[2px]"
                    style={{
                      clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                      background: "linear-gradient(160deg, rgba(19,42,74,0.9), rgba(15,32,60,0.9))",
                    }}
                  />
                  <div className="relative flex flex-col items-center px-4 text-center">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-2"
                      style={{
                        background: "linear-gradient(135deg, rgba(95,194,227,0.55), rgba(0,119,182,0.55))",
                        border: "1px solid rgba(95,194,227,0.55)",
                        boxShadow: "0 0 20px rgba(95,194,227,0.5)",
                      }}
                    >
                      <CenterIcon className="w-6 h-6 text-white" strokeWidth={1.6} />
                    </div>
                    <p className="mt-1 text-[13px] xl:text-sm font-semibold text-foreground leading-tight">
                      {centerLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {bottomItem && <ChallengeItem challenge={bottomItem} index={6} />}
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col gap-5 xl:gap-6">
            {rightItems.map((c, i) => (
              <ChallengeItem key={i + 3} challenge={c} index={i + 3} className="h-full" />
            ))}
          </div>
        </div>
      </div>

      {/* ================= TABLET: 2 columns with center on top ================= */}
      <div className="hidden md:block lg:hidden">
        <div className="flex justify-center mb-8">
          <div
            className="relative w-40 h-40 flex items-center justify-center"
            style={{
              clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              background: "linear-gradient(135deg, rgba(95,194,227,0.45), rgba(0,119,182,0.55))",
              boxShadow: "0 0 60px rgba(0,119,182,0.5)",
            }}
          >
            <div
              className="absolute inset-[2px]"
              style={{
                clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                background: "linear-gradient(160deg, rgba(19,42,74,0.9), rgba(15,32,60,0.9))",
              }}
            />
            <div className="relative flex flex-col items-center text-center px-3">
              <CenterIcon className="w-8 h-8 text-white mb-1" strokeWidth={1.6} />
              <p className="text-[9px] font-mono uppercase tracking-widest text-accent">{centerTagline}</p>
              <p className="mt-0.5 text-xs font-semibold text-foreground">{centerLabel}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {items.map((c, i) => (
            <ChallengeItem key={i} challenge={c} index={i} />
          ))}
        </div>
      </div>

      {/* ================= MOBILE: stacked list with hub on top ================= */}
      <div className="md:hidden">
        <div className="flex justify-center mb-6">
          <div
            className="relative w-32 h-32 flex items-center justify-center"
            style={{
              clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              background: "linear-gradient(135deg, rgba(95,194,227,0.45), rgba(0,119,182,0.55))",
              boxShadow: "0 0 40px rgba(0,119,182,0.5)",
            }}
          >
            <div
              className="absolute inset-[2px]"
              style={{
                clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                background: "linear-gradient(160deg, rgba(19,42,74,0.9), rgba(15,32,60,0.9))",
              }}
            />
            <div className="relative flex flex-col items-center text-center px-2">
              <CenterIcon className="w-7 h-7 text-white mb-1" strokeWidth={1.6} />
              <p className="text-[9px] font-mono uppercase tracking-widest text-accent">{centerTagline}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-foreground leading-tight">{centerLabel}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {items.map((c, i) => (
            <ChallengeItem key={i} challenge={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeHub;
