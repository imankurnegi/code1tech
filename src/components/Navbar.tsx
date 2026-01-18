import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, ChevronDown, Brain, Cloud, Database, Shield, Cpu, BarChart3, Workflow, Users, Building2, Landmark, HeartPulse, Factory } from "lucide-react";

const servicesMenu = [{
  icon: Brain,
  label: "AI & Machine Learning",
  description: "Intelligent automation solutions"
}, {
  icon: Cloud,
  label: "Cloud Services",
  description: "Scalable cloud infrastructure"
}, {
  icon: Database,
  label: "Data Engineering",
  description: "Enterprise data pipelines"
}, {
  icon: Shield,
  label: "Cybersecurity",
  description: "Advanced threat protection"
}, {
  icon: Cpu,
  label: "Custom Development",
  description: "Tailored software solutions"
}, {
  icon: Workflow,
  label: "Process Automation",
  description: "Workflow optimization"
}];

const solutionsMenu = [{
  icon: BarChart3,
  label: "Business Intelligence",
  description: "Data-driven insights"
}, {
  icon: Users,
  label: "Customer Analytics",
  description: "360° customer view"
}, {
  icon: Building2,
  label: "Enterprise AI",
  description: "AI at scale"
}, {
  icon: Landmark,
  label: "Financial Services",
  description: "Fintech solutions"
}, {
  icon: HeartPulse,
  label: "Healthcare Tech",
  description: "Digital health platforms"
}, {
  icon: Factory,
  label: "Manufacturing AI",
  description: "Smart factory solutions"
}];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["services", "solutions", "industries", "about"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [{
    label: "Services",
    href: "#services",
    hasDropdown: true,
    menu: servicesMenu
  }, {
    label: "Solutions",
    href: "#solutions",
    hasDropdown: true,
    menu: solutionsMenu
  }, {
    label: "Industries",
    href: "#industries"
  }, {
    label: "About",
    href: "#about"
  }];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? "h-16 bg-[hsl(222_47%_6%/0.98)] backdrop-blur-xl border-b border-accent/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" 
          : "h-20 bg-gradient-to-b from-[hsl(222_47%_5%)] via-[hsl(222_47%_5%/0.95)] to-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a href="#" className="flex items-center group shrink-0">
            <img 
              alt="Code1 Tech Systems" 
              className="h-10 w-auto transition-all duration-300 group-hover:brightness-110 brightness-110 contrast-110" 
              src="/lovable-uploads/be96b161-1e7c-4c4a-8065-54051cbd349b.png" 
            />
          </a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-10">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace("#", "");
              const hasDropdown = link.hasDropdown;
              const isDropdownOpen = activeDropdown === link.label;
              
              return (
                <div 
                  key={link.label} 
                  className="relative" 
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)} 
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a 
                    href={link.href} 
                    onClick={e => handleNavClick(e, link.href)} 
                    className={`relative flex items-center gap-1 text-sm font-semibold tracking-wide transition-all duration-300 py-2 px-3 rounded-lg ${
                      isActive 
                        ? "text-accent shadow-[0_0_20px_rgba(0,194,255,0.3)]" 
                        : isDropdownOpen
                          ? "text-accent/90"
                          : "text-foreground hover:text-accent"
                    }`}
                  >
                    {link.label}
                    {hasDropdown && (
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`} 
                      />
                    )}
                  </a>

                  {/* Mega Dropdown */}
                  {hasDropdown && link.menu && (
                    <div 
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                        isDropdownOpen 
                          ? "opacity-100 visible translate-y-0" 
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="bg-background/95 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-5 min-w-[420px]">
                        {/* Dropdown arrow */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/95 rotate-45" />
                        
                        <div className="grid grid-cols-2 gap-2 relative">
                          {link.menu.map(item => (
                            <a 
                              key={item.label} 
                              href={link.href} 
                              onClick={e => handleNavClick(e, link.href)} 
                              className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-accent/10 transition-all duration-300"
                            >
                              <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover/item:bg-accent/20 group-hover/item:shadow-[0_0_15px_rgba(0,194,255,0.2)] transition-all duration-300">
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-foreground group-hover/item:text-accent transition-colors duration-300">
                                  {item.label}
                                </div>
                                <div className="text-xs text-foreground/50 mt-0.5">
                                  {item.description}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                        
                        {/* View All link */}
                        <div className="mt-4 pt-4 border-t border-border/10">
                          <a 
                            href={link.href} 
                            onClick={e => handleNavClick(e, link.href)} 
                            className="flex items-center justify-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-300 group/all"
                          >
                            View All {link.label}
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/all:translate-x-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <a 
              href="#contact" 
              onClick={e => handleNavClick(e, "#contact")} 
              className="text-sm font-semibold text-foreground hover:text-accent transition-colors duration-300"
            >
              Contact Us
            </a>
            <Button 
              size="sm" 
              className="group relative bg-gradient-to-r from-accent to-primary text-accent-foreground font-medium px-5 py-2 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.15)] hover:shadow-[0_0_25px_rgba(0,194,255,0.3)] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 text-primary-foreground">
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-foreground/80 hover:text-foreground p-2 transition-colors duration-300" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`} 
                size={24} 
              />
              <X 
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`} 
                size={24} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl transition-all duration-400 ease-out overflow-hidden ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <div key={link.label}>
                  <a 
                    href={link.href} 
                    onClick={e => handleNavClick(e, link.href)} 
                    className={`relative py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-between ${
                      isActive 
                        ? "text-accent bg-accent/10 shadow-[0_0_15px_rgba(0,194,255,0.2)]" 
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </a>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-border/10">
            <a 
              href="#contact" 
              onClick={e => handleNavClick(e, "#contact")} 
              className="py-3 px-4 text-base font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Contact Us
            </a>
            <Button 
              className="w-full bg-gradient-to-r from-accent to-primary text-accent-foreground font-medium py-3 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.2)] flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;