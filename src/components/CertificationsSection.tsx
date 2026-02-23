import { RefObject } from "react";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "./DynamicIcon";

interface CertificationBlock {
  certification_image: {
    large: string;
    alt: string;
  };
  certification_validity: string;
  certification_label: string;
}

interface CertificationsSectionProps {
  certificationData?: {
    certification_content: string;
    certification_heading: string;
    certification_icon_class: string;
    certification_label: string;
    certifications_blocks: CertificationBlock[];
  };
  sectionRef: RefObject<HTMLElement>;
  isVisible: boolean;
}

const CertificationsSection = ({certificationData, sectionRef, isVisible }: CertificationsSectionProps) => {
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)",
      }}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top/Bottom fades */}
      <div
        className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to bottom, hsl(222 47% 5%), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to top, hsl(222 47% 5%), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Section label pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-5">
            <DynamicIcon name={certificationData?.certification_icon_class} className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {certificationData?.certification_label}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(certificationData?.certification_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}>
          </h2>

          {/* Subtitle */}
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: certificationData?.certification_content }}>
          </p>

          {/* Certification Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
            {certificationData?.certifications_blocks?.length > 0 && certificationData?.certifications_blocks.map((cert, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm p-6 lg:p-8 text-center hover:border-accent/40 hover:bg-card/50 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,78,158,0.18)] hover:-translate-y-2"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Badge Image */}
                <div className="w-24 h-24 mx-auto mb-5 bg-white rounded-xl p-2 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(92,200,220,0.15)]">
                  <img
                    src={cert.certification_image.large}
                    alt={cert.certification_image.alt}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-1">{cert.certification_validity}</h3>

                {/* Subtitle */}
                <p className="text-sm font-medium text-accent mb-3">{cert.certification_label}</p>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
