import { LucideIcon } from "lucide-react";
import { DynamicIcon } from "@/components/DynamicIcon";

export interface EcosystemService {
  icon: LucideIcon | string;
  title: string;
  desc: string;
}

interface Props {
  services: EcosystemService[];
  visible?: boolean;
  lifecycle?: string[];
  stages?: string[];
  ariaLabel?: string;
}



/** Minimal abstract micro-illustrations, cycled per card. */
const MicroVisual = ({ index }: { index: number }) => {
  const common = "absolute right-3 top-3 w-16 h-10 opacity-30 group-hover:opacity-60 transition-opacity duration-500";
  const stroke = "hsl(191 65% 62%)";
  switch (index % 6) {
    case 0:
      return (
        <svg className={common} viewBox="0 0 64 40" fill="none" aria-hidden="true">
          <path d="M2 20h14M28 20h14M56 20h6" stroke={stroke} strokeWidth="1" />
          <circle cx="22" cy="20" r="4" stroke={stroke} strokeWidth="1" />
          <circle cx="48" cy="20" r="4" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case 1:
      return (
        <svg className={common} viewBox="0 0 64 40" fill="none" aria-hidden="true">
          <rect x="8" y="6" width="48" height="8" rx="2" stroke={stroke} strokeWidth="1" />
          <rect x="8" y="18" width="48" height="8" rx="2" stroke={stroke} strokeWidth="1" />
          <rect x="8" y="30" width="48" height="6" rx="2" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case 2:
      return (
        <svg className={common} viewBox="0 0 64 40" fill="none" aria-hidden="true">
          <path d="M4 32l12-10 10 6 12-16 10 8 12-6" stroke={stroke} strokeWidth="1" />
          <circle cx="16" cy="22" r="1.8" fill={stroke} />
          <circle cx="38" cy="12" r="1.8" fill={stroke} />
        </svg>
      );
    case 3:
      return (
        <svg className={common} viewBox="0 0 64 40" fill="none" aria-hidden="true">
          <path d="M32 8a12 12 0 1 1-11 7" stroke={stroke} strokeWidth="1" />
          <path d="M18 6v9h9" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case 4:
      return (
        <svg className={common} viewBox="0 0 64 40" fill="none" aria-hidden="true">
          <path d="M32 4l16 6v10c0 8-7 14-16 16-9-2-16-8-16-16V10l16-6z" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 64 40" fill="none" aria-hidden="true">
          <path d="M6 30h10V16H6v14zM24 30h10V8H24v22zM42 30h10V20H42v10z" stroke={stroke} strokeWidth="1" />
        </svg>
      );
  }
};

const ServiceCard = ({
  service,
  index,
  visible,
  stageLabel,
}: {
  service: EcosystemService;
  index: number;
  visible: boolean;
  stageLabel?: string;
}) => {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] p-5 transition-all duration-500 hover:-translate-y-1 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        background:
          "linear-gradient(150deg, rgba(30,41,59,0.45) 0%, rgba(10,17,32,0.6) 100%)",
        border: "1px solid rgba(95,194,227,0.14)",
        transitionDelay: `${index * 40}ms`,
      }}
      aria-label={service.title}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(95,194,227,0.4), 0 18px 40px -20px rgba(0,140,220,0.55)",
        }}
        aria-hidden="true"
      />
      <MicroVisual index={index} />

      <div
        className="mb-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-105"
        style={{
          background: "linear-gradient(135deg, rgba(0,78,158,0.35) 0%, rgba(95,194,227,0.18) 100%)",
          border: "1px solid rgba(95,194,227,0.28)",
        }}
      >
        <DynamicIcon name={typeof service.icon === 'string' ? service.icon : ''} className="h-5 w-5 text-accent" />
      </div>

      {stageLabel && (
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-accent/60">
          {stageLabel}
        </p>
      )}
      <h3 className="mb-2 min-h-[2.6rem] text-[0.95rem] font-semibold leading-snug text-foreground">
        {service.title}
      </h3>
      <p className="text-[0.8rem] leading-relaxed text-muted-foreground">{service.desc}</p>
    </article>
  );
};

export const MLOpsServicesEcosystem = ({ services, visible = true, lifecycle, stages, ariaLabel }: Props) => {
  const lifecycleToUse = lifecycle && lifecycle.length > 0 ? lifecycle : null;
  const stagesToUse = stages && stages.length > 0 ? stages : null;
  const ariaLabelToUse = ariaLabel || "";

  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: "1450px" }}>
      {/* Lifecycle strip - only show if lifecycle data is provided */}
      {lifecycleToUse && (
        <div className="relative mb-8 overflow-hidden rounded-[22px] px-4 py-5 lg:px-8"
          style={{
            background: "linear-gradient(120deg, rgba(10,20,38,0.75) 0%, rgba(6,12,24,0.85) 100%)",
            border: "1px solid rgba(95,194,227,0.12)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 120% at 50% 50%, rgba(0,120,210,0.22) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <ol
            className="relative z-10 flex items-center gap-0 overflow-x-auto scrollbar-hide"
            aria-label={ariaLabelToUse}
          >
            {lifecycleToUse.map((stage, i) => (
              <li key={stage} className="flex flex-1 min-w-[104px] items-center gap-0">
                <div className="flex flex-col items-center gap-2">
                  <span
                    className="relative flex h-3 w-3 items-center justify-center rounded-full"
                    style={{
                      background: "hsl(191 65% 62%)",
                      boxShadow: "0 0 12px rgba(95,194,227,0.8)",
                    }}
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap text-[11px] font-medium tracking-wide text-muted-foreground">
                    {stage}
                  </span>
                </div>
                {i < lifecycleToUse.length - 1 && (
                  <span
                    className="mx-2 mb-6 h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(95,194,227,0.55) 0%, rgba(0,120,210,0.3) 100%)",
                    }}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Service grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((s, idx) => (
          <ServiceCard key={s.title} service={s} index={idx} visible={visible} stageLabel={stagesToUse ? stagesToUse[idx] : undefined} />
        ))}
      </div>
    </div>
  );
};

export default MLOpsServicesEcosystem;
