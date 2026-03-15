import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { DynamicIcon } from "./DynamicIcon";
import { useLocation } from "react-router-dom";

interface NavMenuItem {
  id: number;
  title: string;
  url: string;
  icon: string;
  class: any;
  subtitle: string;
  children?: NavMenuItem[];
}

interface HeaderProps {
  headerLogo: {
    logo_id: number;
    full: string;
    medium: string;
  };
  navMenus: {
    primary_menu: NavMenuItem[];
    secondary_menu: NavMenuItem[];
  };
}

const Navbar = ({ headerLogo, navMenus }: HeaderProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const mainNavMenus = navMenus?.primary_menu || [];
  const ctaMenus = navMenus?.secondary_menu || [];

  // const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  //   e.preventDefault();
  //   const target = document.querySelector(href);
  //   if (target) {
  //     target.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start"
  //     });
  //   }
  //   setIsOpen(false);
  //   setActiveDropdown(null);
  // };

  // Scroll-spy: track all major sections on homepage
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled
          ? "h-16 bg-[hsl(222_47%_6%/0.98)] backdrop-blur-xl border-b border-accent/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "h-20 bg-gradient-to-b from-[hsl(222_47%_5%)] via-[hsl(222_47%_5%/0.95)] to-transparent"
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a href="/" className="flex items-center group shrink-0">
            <img
              alt="Code1 Tech Systems"
              className="h-10 w-auto transition-all duration-300 group-hover:brightness-110 brightness-110 contrast-110"
              src={headerLogo?.full}
            />
          </a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-10">
            {mainNavMenus?.map(link => {

              const isActive = activeSection === link.url.replace("#", "");
              const hasDropdown = link.children.length > 0;
              const isDropdownOpen = activeDropdown === link.title;

              return (
                <div
                  key={link.title}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={`${import.meta.env.BASE_URL}${link.url}`}
                    className="relative flex items-center gap-1 text-sm font-semibold tracking-wide transition-all duration-300 py-2 px-3 rounded-lg text-foreground hover:text-accent"
                  >
                    {link.title}
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </a>

                  {/* Mega Dropdown */}
                  {hasDropdown && link.children && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${isDropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                        }`}
                    >
                      <div className="bg-background/95 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-5 min-w-[320px]">
                        {/* Dropdown arrow */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/95 rotate-45" />

                        <div className="grid grid-cols-1 gap-2 relative">
                          {link?.children?.map(item => (
                            <a
                              key={item.title}
                              href={`${import.meta.env.BASE_URL}${item.url}`}
                              className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-accent/10 transition-all duration-300"
                            >
                              <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover/item:bg-accent/20 group-hover/item:shadow-[0_0_15px_rgba(0,194,255,0.2)] transition-all duration-300">
                                <DynamicIcon name={item.class} className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-foreground group-hover/item:text-accent transition-colors duration-300">
                                  {item.title}
                                </div>
                                <div className="text-xs text-foreground/50 mt-0.5">
                                  {item.subtitle}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>

                        {/* View All link */}
                        {/* <div className="mt-4 pt-4 border-t border-border/10">
                          <Link
                            to={link.url}
                            onClick={e => handleNavClick(e, link.url)}
                            className="flex items-center justify-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-300 group/all"
                          >
                            View All {link.title}
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/all:translate-x-1" />
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            {ctaMenus.length > 0 && 
  ctaMenus?.map((menu, index) => {
    if (menu.class === "btn") {
      return (
        <a href={`${import.meta.env.BASE_URL}${menu.url}`} key={index}>
          <Button
          size="sm"
          className="group relative bg-gradient-to-r from-accent to-primary text-accent-foreground font-medium px-5 py-2 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.15)] hover:shadow-[0_0_25px_rgba(0,194,255,0.3)] transition-all duration-300 overflow-hidden"
        >
            <span className="relative z-10 flex items-center gap-2 text-primary-foreground">
            {menu.title}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Button>
          </a>
      );
    }

    return (
      <a
        key={index}
        href={`${import.meta.env.BASE_URL}${menu.url}`}
        className="text-sm font-semibold text-foreground hover:text-accent transition-colors duration-300"
      >
        {menu.title}
      </a>
    );
  })
}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground/80 hover:text-foreground p-2 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                size={24}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                size={24}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl transition-all duration-400 ease-out overflow-hidden ${isOpen ? "max-h-[85vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
          }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col gap-1">
            {mainNavMenus?.map(link => {
              const isActive = activeSection === link.url.replace("#", "");
              const hasDropdown = link.children && link.children.length > 0;

              // Simple link (no dropdown) – always neutral style on mobile
              if (!hasDropdown) {
                return (
                  <a
                    key={link.title}
                    href={`${import.meta.env.BASE_URL}${link.url}`}
                    className="relative py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-between text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                  >
                    {link.title}
                  </a>
                );
              }

              // Dropdown link – style based only on open/closed state on mobile
              return (
                <div key={link.title}>
                  <button
                    type="button"
                    onClick={() => setMobileDropdown(mobileDropdown === link.title ? null : link.title)}
                    className={`w-full relative py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-between ${mobileDropdown === link.title
                        ? "text-accent bg-accent/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                      }`}
                  >
                    {link.title}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileDropdown === link.title ? "rotate-180" : ""}`} />
                  </button>
                  {link.children && mobileDropdown === link.title && (
                    <div className="ml-4 mt-1 mb-2 flex flex-col gap-1 border-l border-accent/20 pl-3">
                      {link.children.map(item => (
                        <a
                          key={item.title}
                          href={`${import.meta.env.BASE_URL}${item.url}`}
                          onClick={e => {
                            setIsOpen(false);
                            setMobileDropdown(null);
                          }}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-foreground/70 hover:text-accent hover:bg-accent/5 transition-all duration-200"
                        >
                          <DynamicIcon name={item.class} className="w-4 h-4 text-accent/70" />
                          <span>{item.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-border/10">
            {
  ctaMenus.length > 0 &&
  ctaMenus.map((menu, index) => {
    return menu.class === "btn" ? (
      <a
        key={index}
        href={`${import.meta.env.BASE_URL}${menu.url}`}
        onClick={() => setIsOpen(false)}
        className="w-full"
      >
        <Button className="w-full bg-gradient-to-r from-accent to-primary text-accent-foreground font-medium py-3 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.2)] flex items-center justify-center gap-2">
          {menu.title}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </a>
    ) : (
      <a
        key={index}
        href={`${import.meta.env.BASE_URL}${menu.url}`}
        className="py-3 px-4 text-base font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
      >
        {menu.title}
      </a>
    );
  })
}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;