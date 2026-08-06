import { addClassToSpan } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { DynamicIcon } from "../DynamicIcon";

export type PremiumBenefitItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

/** Subtle abstract visuals rendered faintly inside each card. */
const CardVisual = ({ variant }: { variant: number }) => {
  const stroke = "rgba(95,194,227,0.55)";
  const soft = "rgba(0,119,182,0.35)";
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 120 80"
      className="absolute right-3 bottom-3 w-24 h-16 opacity-[0.18] group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
    >
      {variant === 0 && (
        <g fill="none" stroke={stroke} strokeWidth="1.4">
          <path d="M8 70 L40 46 L66 56 L110 14" />
          <polyline points="96,14 110,14 110,28" />
          {[[40, 46], [66, 56]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.6" fill={soft} />
          ))}
        </g>
      )}
      {variant === 1 && (
        <g fill="none" stroke={stroke} strokeWidth="1.4">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={10 + i * 26} y={70 - (18 + i * 14)} width="14" height={18 + i * 14} rx="3" fill={soft} />
          ))}
        </g>
      )}
      {variant === 2 && (
        <g fill="none" stroke={stroke} strokeWidth="1.4">
          <path d="M60 8 L96 22 V44 c0 18 -16 26 -36 30 c-20 -4 -36 -12 -36 -30 V22 Z" fill={soft} />
          <path d="M46 42 l10 10 l20 -22" />
        </g>
      )}
      {variant === 3 && (
        <g fill="none" stroke={stroke} strokeWidth="1.4">
          <rect x="10" y="12" width="100" height="56" rx="6" />
          <path d="M10 30 H110" />
          <path d="M22 58 L42 44 L60 52 L84 34" />
          <circle cx="98" cy="44" r="6" fill={soft} />
        </g>
      )}
      {variant === 4 && (
        <g fill="none" stroke={stroke} strokeWidth="1.4">
          <circle cx="60" cy="44" r="8" fill={soft} />
          <circle cx="60" cy="44" r="18" />
          <circle cx="60" cy="44" r="30" opacity="0.6" />
          <path d="M60 6 V16 M60 72 V64" />
        </g>
      )}
      {variant === 5 && (
        <g fill="none" stroke={stroke} strokeWidth="1.4">
          <path d="M22 60 L60 20 L98 60" />
          <path d="M22 60 H98" />
          {[[22, 60], [60, 20], [98, 60], [60, 60]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.4" fill={soft} />
          ))}
        </g>
      )}
      {variant === 6 && (
        <g fill="none" stroke={stroke} strokeWidth="1.4">
          <rect x="12" y="30" width="26" height="20" rx="4" fill={soft} />
          <rect x="50" y="14" width="26" height="20" rx="4" />
          <rect x="50" y="46" width="26" height="20" rx="4" />
          <rect x="88" y="30" width="20" height="20" rx="4" fill={soft} />
          <path d="M38 40 H50 M76 24 H88 M76 56 H88 M50 24 L38 40 L50 56" />
        </g>
      )}
    </svg>
  );
};

/** Visual for the wide card: continuous AI agent optimization loop. */
const AutomationLoopVisual = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 260 150"
    className="relative w-full max-w-[320px] h-auto opacity-85 group-hover:opacity-100 transition-opacity duration-500"
  >
    <defs>
      <linearGradient id="agentLoopStroke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(95,194,227,0.95)" />
        <stop offset="100%" stopColor="rgba(0,119,182,0.75)" />
      </linearGradient>
    </defs>

    {/* Continuous optimization loop */}
    <ellipse
      cx="130"
      cy="75"
      rx="88"
      ry="52"
      fill="none"
      stroke="url(#agentLoopStroke)"
      strokeWidth="1.6"
      strokeDasharray="6 6"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 130 75"
        to="360 130 75"
        dur="24s"
        repeatCount="indefinite"
      />
    </ellipse>

    {/* Central agent core */}
    <circle cx="130" cy="75" r="22" fill="rgba(0,119,182,0.20)" stroke="rgba(95,194,227,0.55)" strokeWidth="1.4" />
    <circle cx="130" cy="75" r="9" fill="rgba(95,194,227,0.35)" stroke="rgba(95,194,227,0.9)" strokeWidth="1.2" />
    <circle cx="130" cy="75" r="30" fill="none" stroke="rgba(95,194,227,0.18)" strokeWidth="1" />

    {/* Workflow stage nodes around the loop */}
    {[
      [130, 23],
      [212, 62],
      [186, 122],
      [74, 122],
      [48, 62],
    ].map(([x, y], i) => (
      <g key={i}>
        <line x1="130" y1="75" x2={x} y2={y} stroke="rgba(95,194,227,0.28)" strokeWidth="1" />
        <rect
          x={x - 11}
          y={y - 8}
          width="22"
          height="16"
          rx="5"
          fill="rgba(9,14,26,0.95)"
          stroke="rgba(95,194,227,0.55)"
          strokeWidth="1.2"
        />
        <circle cx={x} cy={y} r="2.4" fill="rgba(95,194,227,0.95)">
          <animate
            attributeName="opacity"
            values="0.35;1;0.35"
            dur="3s"
            begin={`${i * 0.5}s`}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    ))}

    {/* Improvement arrow on the loop */}
    <path d="M214 52 L222 62 L210 66" fill="none" stroke="rgba(95,194,227,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Visual for the wide card: collaboration / shared MLOps workflow. */
const CollaborationVisual = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 260 150"
    className="relative w-full max-w-[320px] h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500"
  >
    {/* connecting lines */}
    <g stroke="rgba(95,194,227,0.45)" strokeWidth="1.4" fill="none">
      <path d="M60 40 L130 75 L200 40" />
      <path d="M60 110 L130 75 L200 110" />
      <path d="M60 40 L60 110 M200 40 L200 110" strokeDasharray="4 5" opacity="0.7" />
    </g>
    {/* central hub */}
    <circle cx="130" cy="75" r="26" fill="rgba(0,119,182,0.22)" stroke="rgba(95,194,227,0.7)" strokeWidth="1.4" />
    <circle cx="130" cy="75" r="38" fill="none" stroke="rgba(95,194,227,0.22)" strokeWidth="1" strokeDasharray="3 6" />
    <path
      d="M120 75 l7 8 l14 -16"
      fill="none"
      stroke="rgba(95,194,227,0.95)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* team nodes */}
    {[
      [60, 40],
      [200, 40],
      [60, 110],
      [200, 110],
    ].map(([x, y], i) => (
      <g key={i}>
        <rect
          x={x - 26}
          y={y - 15}
          width="52"
          height="30"
          rx="10"
          fill="rgba(9,14,26,0.9)"
          stroke="rgba(95,194,227,0.35)"
          strokeWidth="1"
        />
        <circle cx={x - 12} cy={y} r="4.5" fill="rgba(95,194,227,0.85)" />
        <path d={`M${x - 20} ${y + 9} a8 8 0 0 1 16 0`} fill="rgba(95,194,227,0.35)" />
        <line x1={x + 1} y1={y - 4} x2={x + 18} y2={y - 4} stroke="rgba(148,163,184,0.45)" strokeWidth="2" />
        <line x1={x + 1} y1={y + 3} x2={x + 13} y2={y + 3} stroke="rgba(148,163,184,0.3)" strokeWidth="2" />
      </g>
    ))}
  </svg>
);

const BenefitCard = ({
  item,
  index,
  wide,
  shown,
  chips,
  wideVisual = "growth",
}: {
  item: PremiumBenefitItem;
  index: number;
  wide?: boolean;
  shown: boolean;
  chips?: string[];
  wideVisual?: "growth" | "collaboration" | "automation";
}) => {
  return (
    <article
      aria-label={item.title}
      className={`group relative overflow-hidden rounded-[22px] p-7 lg:p-8 h-full flex flex-col items-start justify-start transition-all duration-500 hover:-translate-y-1.5 ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        background:
          "linear-gradient(158deg, rgba(18,28,48,0.82) 0%, rgba(9,14,26,0.92) 100%)",
        border: "1px solid rgba(95,194,227,0.16)",
        boxShadow: "0 10px 34px rgba(0,0,0,0.42)",
        transitionDelay: `${index * 70}ms`,
      }}
    >
      {/* hover glow layer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(420px circle at 12% 0%, rgba(95,194,227,0.14) 0%, transparent 65%)",
          boxShadow: "inset 0 0 0 1px rgba(95,194,227,0.32)",
          borderRadius: "22px",
        }}
      />
      {!wide && <CardVisual variant={index % 7} />}

      {wide ? (
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-10 items-center">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              <span
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:shadow-[0_0_22px_rgba(95,194,227,0.45)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(95,194,227,0.20) 0%, rgba(0,119,182,0.14) 100%)",
                  border: "1px solid rgba(95,194,227,0.32)",
                }}
              >
                <DynamicIcon name={typeof item.icon === 'string' ? item.icon : ''} className="w-6 h-6 text-accent" />
              </span>
              <h3 className="text-lg font-bold text-foreground leading-snug">{item.title}</h3>
            </div>
            <div dangerouslySetInnerHTML={{__html: item.desc}} />
          </div>

          <div className="relative flex items-center justify-center min-h-[150px]">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 60% 50%, rgba(95,194,227,0.16) 0%, transparent 68%)",
              }}
            />
            {wideVisual === "automation" ? (
              <AutomationLoopVisual />
            ) : wideVisual === "collaboration" ? (
              <CollaborationVisual />

            ) : (
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 260 150"
              className="relative w-full max-w-[320px] h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            >
              {[30, 62, 94, 126].map((y) => (
                <line key={y} x1="16" y1={y} x2="244" y2={y} stroke="rgba(148,163,184,0.10)" strokeWidth="1" />
              ))}
              {[
                [40, 96],
                [80, 82],
                [120, 62],
                [160, 46],
                [200, 26],
              ].map(([x, y], i) => (
                <rect
                  key={i}
                  x={x - 9}
                  y={y}
                  width="18"
                  height={126 - y}
                  rx="4"
                  fill="rgba(0,119,182,0.28)"
                  stroke="rgba(95,194,227,0.28)"
                  strokeWidth="1"
                />
              ))}
              <path
                d="M40 92 L80 78 L120 58 L160 42 L200 22"
                fill="none"
                stroke="rgba(95,194,227,0.95)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {[
                [40, 92],
                [80, 78],
                [120, 58],
                [160, 42],
                [200, 22],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3.6" fill="rgba(9,14,26,1)" stroke="rgba(95,194,227,0.95)" strokeWidth="1.5" />
              ))}
              <path d="M200 22 L228 12" stroke="rgba(95,194,227,0.6)" strokeWidth="1.5" strokeDasharray="4 4" />
              <polygon points="234,10 222,8 226,18" fill="rgba(95,194,227,0.9)" />
              <line x1="16" y1="126" x2="244" y2="126" stroke="rgba(95,194,227,0.30)" strokeWidth="1.2" />
            </svg>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="relative z-10 flex items-center gap-4 mb-5">
            <span
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:shadow-[0_0_22px_rgba(95,194,227,0.45)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(95,194,227,0.20) 0%, rgba(0,119,182,0.14) 100%)",
                border: "1px solid rgba(95,194,227,0.32)",
              }}
            >
              <DynamicIcon name={typeof item.icon === 'string' ? item.icon : ''} className="w-6 h-6 text-accent" />
            </span>
            <h3 className="text-lg font-bold text-foreground leading-snug">{item.title}</h3>
          </div>
          <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
        </>
      )}
    </article>
  );
};

export const PremiumBenefitsShowcase = ({
  sectionId,
  pre,
  hi,
  sub,
  items,
  visible,
  setRef,
  wideChips,
  wideVisual,
}: {
  sectionId: string;
  pre?: string;
  hi: string;
  sub?: string;
  items: PremiumBenefitItem[];
  visible: Record<string, boolean>;
  setRef: (key: string) => (el: HTMLElement | null) => void;
  wideChips?: string[];
  wideVisual?: "growth" | "collaboration" | "automation";
}) => {
  const shown = !!visible[sectionId];
  const head = items.slice(0, 6);
  const tail = items.slice(6);

  return (
    <section
      ref={setRef(sectionId)}
      aria-labelledby={`${sectionId}-title`}
      className="relative py-12 lg:py-16 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 4%) 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[820px] h-[520px] pointer-events-none hidden md:block"
        style={{ background: "radial-gradient(circle, rgba(95,194,227,0.10) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <header className="text-center mb-10 lg:mb-12">
          <h2
            id={`${sectionId}-title`}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          dangerouslySetInnerHTML={{ __html: addClassToSpan(hi || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          {sub && (
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mx-auto max-w-[900px]">
              {sub}
            </p>
          )}
          <div
            className="mx-auto mt-7 h-px w-full max-w-[900px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(95,194,227,0.55) 50%, transparent 100%)",
            }}
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {head.map((b, i) => (
            <BenefitCard key={b.title} item={b} index={i} shown={shown} />
          ))}
          {tail.map((b, i) => (
            <div key={b.title} className="md:col-span-2 lg:col-span-3">
              <BenefitCard item={b} index={6 + i} wide shown={shown} chips={wideChips} wideVisual={wideVisual} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumBenefitsShowcase;
