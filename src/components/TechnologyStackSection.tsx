import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { DynamicIcon } from "./DynamicIcon";

interface TechGroup {
  label: string;
  tools: string[];
}

interface Section {
  heading: string;
  items?: string[];
  techGroups?: TechGroup[];
}

interface Subsection {
  subTitle: string;
  sections: Section[];
}

interface Capability {
  id: string;
  iconClass: string;
  title: string;
  image: string;
  tagline?: string;
  sections?: Section[];
  subsections?: Subsection[];
  htmlContent?: string;
}

// Tech chip component
const TechChip = ({ text }: { text: string }) => (
  <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20 whitespace-nowrap transition-all duration-200 hover:bg-accent/20 hover:border-accent/35 hover:shadow-[0_0_12px_rgba(92,200,220,0.25)] hover:-translate-y-0.5 cursor-default">
    {text}
  </span>
);

// Tech group with label
const TechGroupRow = ({ group }: { group: TechGroup }) => (
  <div className="mb-4 last:mb-0">
    <span className="text-xs font-semibold text-secondary block mb-2">
      {group.label}:
    </span>
    <div className="flex flex-wrap gap-2">
      {group.tools.map((tool, i) => (
        <TechChip key={i} text={tool} />
      ))}
    </div>
  </div>
);

// Section block for content
const SectionBlock = ({ section, isFirst = false }: { section: Section; isFirst?: boolean }) => (
  <div className="mb-5 last:mb-0">
    {!isFirst && (
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent mb-5" />
    )}
    
    <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      {section.heading}
    </h5>
    
    {section.techGroups ? (
      <div className="max-h-44 overflow-y-auto pr-2 custom-scrollbar">
        {section.techGroups.map((group, i) => (
          <TechGroupRow key={i} group={group} />
        ))}
      </div>
    ) : section.items ? (
      <div className="flex flex-wrap gap-2">
        {section.items.map((item, i) => (
          <TechChip key={i} text={item} />
        ))}
      </div>
    ) : null}
  </div>
);

// Subsection card for nested content
const SubsectionCard = ({ subsection }: { subsection: Subsection }) => (
  <div className="relative bg-gradient-to-br from-muted/50 via-muted/30 to-transparent rounded-xl border border-border/30 p-4 mb-4 last:mb-0 backdrop-blur-sm transition-all duration-300 hover:border-accent/25">
    <h4 className="text-sm font-semibold text-accent mb-4 flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
      {subsection.subTitle}
    </h4>
    
    {subsection.sections.map((section, i) => (
      <SectionBlock key={i} section={section} isFirst={i === 0} />
    ))}
  </div>
);

// Content panel for selected capability - now supports HTML from API
const ContentPanel = ({ capability, isAnimating, allCapabilities }: { capability: Capability; isAnimating: boolean; allCapabilities: Capability[] }) => {
  return (
    <div className={`h-full transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
      {/* Image banner with all images preloaded - wider aspect ratio */}
      <div className="relative h-28 sm:h-32 lg:h-36 rounded-xl overflow-hidden mb-6">
        {/* Render all images, only show active one */}
        {allCapabilities.map((cap) => (
          <img 
            key={cap.id}
            src={cap.image} 
            alt={cap.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              cap.id === capability.id ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        
        {/* Subtle bottom vignette for text contrast */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
        
        {/* Title overlay on image */}
        <div className="absolute bottom-4 left-4 right-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-background/80 backdrop-blur-md border border-accent/40 flex items-center justify-center shadow-xl">
              <DynamicIcon name={capability.iconClass} className="w-5 h-5 text-accent drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{capability.title}</h3>
              {capability.tagline && (
                <p className="text-xs text-white/90">{capability.tagline}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="max-h-[400px] lg:max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
        {capability.htmlContent ? (
          // HTML content coming directly from API (already includes its own layout and styles)
          <div
            className="h-full"
            dangerouslySetInnerHTML={{ __html: capability.htmlContent }}
          />
        ) : capability.subsections ? (
          capability.subsections.map((sub, i) => (
            <SubsectionCard key={i} subsection={sub} />
          ))
        ) : capability.sections ? (
          <div className="bg-gradient-to-br from-muted/40 via-muted/20 to-transparent rounded-xl border border-border/25 p-4 backdrop-blur-sm">
            {capability.sections.map((section, i) => (
              <SectionBlock key={i} section={section} isFirst={i === 0} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Navigation item for left column
const NavItem = ({ 
  capability, 
  isActive, 
  onClick 
}: { 
  capability: Capability; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 group flex items-center gap-3 ${
        isActive 
          ? 'bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 shadow-[0_0_20px_rgba(92,200,220,0.1)]' 
          : 'border border-transparent hover:bg-muted/40 hover:border-border/40'
      }`}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
        isActive 
          ? 'bg-accent/20 border border-accent/40' 
          : 'bg-muted/50 border border-border/30 group-hover:bg-muted/70 group-hover:border-accent/20'
      }`}>
        <DynamicIcon name={capability.iconClass} className={`w-4 h-4 transition-colors duration-200 ${
            isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-accent/80'
          }`} />
      </div>
      
      <span className={`flex-1 text-sm font-medium transition-colors duration-200 ${
        isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
      }`}>
        {capability.title}
      </span>
      
      <ChevronRight className={`w-4 h-4 transition-all duration-200 ${
        isActive 
          ? 'text-accent opacity-100 translate-x-0' 
          : 'text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'
      }`} />
    </button>
  );
};

// Mobile horizontal tabs
const MobileTabBar = ({
  capabilities,
  activeId,
  onSelect
}: {
  capabilities: Capability[];
  activeId: string;
  onSelect: (id: string) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll active tab into view
    const container = scrollRef.current;
    const activeTab = container?.querySelector(`[data-id="${activeId}"]`);
    if (activeTab && container) {
      const tabRect = (activeTab as HTMLElement).getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrollLeft = (activeTab as HTMLElement).offsetLeft - containerRect.width / 2 + tabRect.width / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeId]);
  
  return (
    <div 
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-3 mb-4 hide-scrollbar"
    >
      {capabilities.map((cap) => {
        const isActive = activeId === cap.id;
        return (
          <button
            key={cap.id}
            data-id={cap.id}
            onClick={() => onSelect(cap.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
              isActive 
                ? 'bg-accent/15 border-accent/40 text-accent' 
                : 'bg-muted/30 border-border/40 text-muted-foreground hover:border-accent/30'
            }`}
          >
            <DynamicIcon name={cap.iconClass} className="w-4 h-4" />
            <span className="text-xs font-medium whitespace-nowrap">
              {cap.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const TechnologyStackSection = ({ dataCapabilities }: { dataCapabilities: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Map API data into internal capabilities structure (left nav + right panel)
  const dynamicCapabilities: Capability[] | null = useMemo(() => {
    if (!dataCapabilities || !Array.isArray(dataCapabilities.section_content)) {
      return null;
    }

    return dataCapabilities.section_content.map((item: any) => {
      const slug = item.post_name || item.ID?.toString();
      const iconClass = item.acf?.class;
      return {
        id: slug,
        iconClass: iconClass || "",
        title: item.post_title || "",
        image: item.acf?.box_image?.url || "",
        tagline: item.acf?.sub_heading || undefined,
        htmlContent: item.acf?.box_data || "",
      } as Capability;
    });
  }, [dataCapabilities]);

  const effectiveCapabilities = dynamicCapabilities || [];

  // Set initial activeId when capabilities are loaded
  useEffect(() => {
    if (effectiveCapabilities.length > 0 && !activeId) {
      setActiveId(effectiveCapabilities[0].id);
    }
  }, [effectiveCapabilities, activeId]);

  const activeCapability = useMemo(
    () => effectiveCapabilities.find(c => c.id === activeId) || effectiveCapabilities[0],
    [activeId, effectiveCapabilities]
  );

  const handleSelect = (id: string) => {
    if (id === activeId) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveId(id);
      setTimeout(() => setIsAnimating(false), 50);
    }, 150);
  };

  // Don't render if no data is available
  if (!effectiveCapabilities || effectiveCapabilities.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="technology-stack"
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(222,47%,7%)] to-[hsl(222,47%,5%)]" />
      
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,194,227,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(95,194,227,0.012)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-10 md:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {dataCapabilities?.section_heading}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            {dataCapabilities?.short_description}
          </p>
        </div>

        {/* Desktop: Split Column Layout */}
        <div
          className={`hidden md:block transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column - Navigator */}
            <div className="col-span-4 lg:col-span-3 flex">
              <div className="flex-1 bg-gradient-to-br from-muted/30 via-muted/15 to-transparent backdrop-blur-sm border border-border/30 rounded-2xl p-4 overflow-hidden relative">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/5 to-transparent rounded-tr-2xl pointer-events-none" />
                
                <div className="space-y-1.5 relative z-10">
                  {effectiveCapabilities.map((cap) => (
                    <NavItem
                      key={cap.id}
                      capability={cap as Capability}
                      isActive={activeId === cap.id}
                      onClick={() => handleSelect(cap.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Content Panel */}
            <div className="col-span-8 lg:col-span-9 flex">
              <div className="flex-1 relative bg-gradient-to-br from-muted/25 via-muted/15 to-muted/5 backdrop-blur-md border border-border/30 rounded-2xl p-6 lg:p-8 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/8 to-transparent rounded-tr-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/6 to-transparent rounded-bl-2xl pointer-events-none" />
                
                {/* Inner border glow */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none border border-accent/5" />
                
                <div className="relative z-10 h-full">
                  <ContentPanel 
                    capability={activeCapability as Capability} 
                    isAnimating={isAnimating}
                    allCapabilities={effectiveCapabilities as Capability[]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Horizontal Tabs + Content */}
        <div
          className={`md:hidden transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <MobileTabBar
            capabilities={effectiveCapabilities as Capability[]}
            activeId={activeId}
            onSelect={handleSelect}
          />
          
          <div className="relative bg-gradient-to-br from-muted/30 via-muted/15 to-transparent backdrop-blur-sm border border-border/30 rounded-xl p-4 overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/5 to-transparent rounded-tr-xl pointer-events-none" />
            
            <div className="relative z-10">
              <ContentPanel 
                capability={activeCapability as Capability} 
                isAnimating={isAnimating}
                allCapabilities={effectiveCapabilities as Capability[]}
              />
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div
          className={`text-center mt-12 md:mt-16 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto italic">
            {dataCapabilities?.bottom_description}
          </p>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted) / 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--accent) / 0.35);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--accent) / 0.5);
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TechnologyStackSection;
