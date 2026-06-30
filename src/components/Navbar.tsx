import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { DynamicIcon } from "./DynamicIcon";
import { Link, useLocation } from "react-router-dom";
import EyeFollowButton from "./EyeFollowButton";

export interface MenuItem {
  title: string;
  url: string;
  subtitle?: string;
  class?: string;
  children?: MenuItem[];
  onClick?: () => void;
}

export interface HeaderData {
  logo: string;
  alt: string;
  primary_menu: {
    title: string;
    url: string;
    subtitle?: string;
    class?: string;
    children?: MenuItem[];
  }[];
  secondary_menu: MenuItem[];
}

export interface HeaderProps {
  data?: HeaderData;
}

// Safe icon — never crashes on empty/disabled class
const NavIcon = ({ name, className }: { name?: string; className?: string }) => {
  if (!name || name === "" || name === "disabled") return null;
  return <DynamicIcon name={name} className={className} />;
};

const Navbar = ({ data }: HeaderProps) => {
  const location = useLocation();
  const [isOpen,         setIsOpen]         = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredL2,      setHoveredL2]      = useState<string | null>(null);
  const [hoveredL3,      setHoveredL3]      = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [mobileL2,       setMobileL2]       = useState<string | null>(null);
  const [mobileL3,       setMobileL3]       = useState<string | null>(null);

  const mainNavMenus = data?.primary_menu || [];
  const ctaMenus     = data?.secondary_menu || [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const closeAll = () => {
    setActiveDropdown(null);
    setHoveredL2(null);
    setHoveredL3(null);
  };

  const closeMobileAll = () => {
    setIsOpen(false);
    setMobileDropdown(null);
    setMobileL2(null);
    setMobileL3(null);
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
          <Link to="/" className="flex items-center group shrink-0">
            <img
              alt={data?.alt}
              className="h-10 w-auto transition-all duration-300 group-hover:brightness-110 brightness-110 contrast-110"
              src={data?.logo}
            />
          </Link>

          {/* ── Desktop Navigation ──────────────────────────────────────── */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-10">
            {mainNavMenus?.map(link => {
              const hasL1Dropdown  = (link.children?.length ?? 0) > 0;
              const isDropdownOpen = activeDropdown === link.title;

              return (
                <div
                  key={link.title}
                  className="relative"
                  onMouseEnter={() => hasL1Dropdown && setActiveDropdown(link.title)}
                  onMouseLeave={closeAll}
                >
                  <Link
                    to={link.url}
                    className={`relative flex items-center gap-1 text-sm font-semibold tracking-wide transition-all duration-300 py-2 px-3 rounded-lg text-foreground hover:text-accent ${
                      link.class === "disabled" ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    {link.title}
                    {hasL1Dropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  {/* ── L1 Dropdown panel ───────────────────────────────── */}
                  {hasL1Dropdown && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                        isDropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="bg-background/95 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-5 min-w-[320px]">
                        {/* Arrow */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/95 rotate-45" />

                        <div className="grid grid-cols-1 gap-2 relative">
                          {link.children?.map(l2 => {
                            const hasL2Children = (l2.children?.length ?? 0) > 0;
                            const isL2Open      = hoveredL2 === l2.title;

                            return (
                              <div
                                key={l2.title}
                                className="relative"
                                onMouseEnter={() => { setHoveredL2(l2.title); setHoveredL3(null); }}
                                onMouseLeave={() => { setHoveredL2(null); setHoveredL3(null); }}
                              >
                                <Link
                                  to={l2.url}
                                  onClick={closeAll}
                                  className={`group/l2 flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                                    l2.class === "disabled" ? "pointer-events-none opacity-50" : ""
                                  } ${isL2Open ? "bg-accent/10" : "hover:bg-accent/10"}`}
                                >
                                  {/* Icon box — only when class is a valid icon name */}
                                  {l2.class && l2.class !== "" && l2.class !== "disabled" && (
                                    <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover/l2:bg-accent/20 group-hover/l2:shadow-[0_0_15px_rgba(0,194,255,0.2)] transition-all duration-300 shrink-0">
                                      <NavIcon name={l2.class} className="w-4 h-4" />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-foreground group-hover/l2:text-accent transition-colors duration-300 flex items-center justify-between gap-2">
                                      <span>{l2.title}</span>
                                      {hasL2Children && (
                                        <ChevronRight className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
                                      )}
                                    </div>
                                    {l2.subtitle && (
                                      <div className="text-xs text-foreground/50 mt-0.5">{l2.subtitle}</div>
                                    )}
                                  </div>
                                </Link>

                                {/* ── L2 flyout panel ───────────────────── */}
                                {hasL2Children && (
                                  <div
                                    className={`absolute left-full top-0 pl-2 transition-all duration-200 z-10 ${
                                      isL2Open
                                        ? "opacity-100 visible translate-x-0"
                                        : "opacity-0 invisible -translate-x-2"
                                    }`}
                                  >
                                    <div className="bg-background/95 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-3 min-w-[260px]">
                                      {l2.children?.map(l3 => {
                                        const hasL3Children = (l3.children?.length ?? 0) > 0;
                                        const isL3Open      = hoveredL3 === l3.title;

                                        return (
                                          <div
                                            key={l3.title}
                                            className="relative"
                                            onMouseEnter={() => setHoveredL3(l3.title)}
                                            onMouseLeave={() => setHoveredL3(null)}
                                          >
                                            <Link
                                              to={l3.url}
                                              onClick={closeAll}
                                              className={`group/l3 flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 ${
                                                l3.class === "disabled" ? "pointer-events-none opacity-50" : ""
                                              } ${isL3Open ? "bg-accent/10" : "hover:bg-accent/10"}`}
                                            >
                                              {l3.class && l3.class !== "" && l3.class !== "disabled" && (
                                                <div className="p-1.5 rounded-md bg-accent/10 text-accent group-hover/l3:bg-accent/20 transition-all duration-200 shrink-0">
                                                  <NavIcon name={l3.class} className="w-3.5 h-3.5" />
                                                </div>
                                              )}
                                              <div className="flex-1 min-w-0">
                                                <span className="text-sm font-medium text-foreground/80 group-hover/l3:text-accent transition-colors duration-200 flex items-center justify-between gap-2">
                                                  <span>{l3.title}</span>
                                                  {hasL3Children && (
                                                    <ChevronRight className="w-3 h-3 text-foreground/40 shrink-0" />
                                                  )}
                                                </span>
                                                {l3.subtitle && (
                                                  <div className="text-xs text-foreground/40 mt-0.5">{l3.subtitle}</div>
                                                )}
                                              </div>
                                            </Link>

                                            {/* ── L3 flyout panel ─────────── */}
                                            {hasL3Children && (
                                              <div
                                                className={`absolute left-full top-0 pl-2 transition-all duration-200 z-20 ${
                                                  isL3Open
                                                    ? "opacity-100 visible translate-x-0"
                                                    : "opacity-0 invisible -translate-x-2"
                                                }`}
                                              >
                                                <div className="bg-background/95 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-3 min-w-[220px]">
                                                  {l3.children?.map(l4 => (
                                                    <Link
                                                      key={l4.title}
                                                      to={l4.url}
                                                      onClick={closeAll}
                                                      className={`group/l4 flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 hover:bg-accent/10 ${
                                                        l4.class === "disabled" ? "pointer-events-none opacity-50" : ""
                                                      }`}
                                                    >
                                                      {l4.class && l4.class !== "" && l4.class !== "disabled" && (
                                                        <div className="p-1.5 rounded-md bg-accent/10 text-accent group-hover/l4:bg-accent/20 transition-all duration-200 shrink-0">
                                                          <NavIcon name={l4.class} className="w-3.5 h-3.5" />
                                                        </div>
                                                      )}
                                                      <div className="flex-1 min-w-0">
                                                        <span className="text-sm font-medium text-foreground/80 group-hover/l4:text-accent transition-colors duration-200">
                                                          {l4.title}
                                                        </span>
                                                        {l4.subtitle && (
                                                          <div className="text-xs text-foreground/40 mt-0.5">{l4.subtitle}</div>
                                                        )}
                                                      </div>
                                                    </Link>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
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
            {ctaMenus.length > 0 &&
              ctaMenus?.map((menu, index) => {
                if (menu.class === "btn") {
                  return (
                    <React.Fragment key={index}>
                      <EyeFollowButton text={menu.title} href={menu.url} eyeSize={22} pupilSize={8} />
                    </React.Fragment>
                  );
                }
                return (
                  <Link
                    key={index}
                    to={menu.url}
                    className="text-sm font-semibold text-foreground hover:text-accent transition-colors duration-300"
                  >
                    {menu.title}
                  </Link>
                );
              })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground/80 hover:text-foreground p-2 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
                size={24}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}
                size={24}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Navigation ─────────────────────────────────────────────── */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl transition-all duration-400 ease-out overflow-hidden ${
          isOpen ? "max-h-[85vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col gap-1">
            {mainNavMenus?.map(link => {
              const hasL1Children = (link.children?.length ?? 0) > 0;

              {/* Simple link — no children */}
              if (!hasL1Children) {
                return (
                  <Link
                    key={link.title}
                    to={link.url}
                    className={`relative py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-between text-foreground/70 hover:text-foreground hover:bg-foreground/5 ${
                      link.class === "disabled" ? "pointer-events-none opacity-50" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                );
              }

              return (
                <div key={link.title}>

                  {/* L1 toggle button */}
                  <button
                    type="button"
                    onClick={() => setMobileDropdown(mobileDropdown === link.title ? null : link.title)}
                    className={`w-full relative py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-between ${
                      mobileDropdown === link.title
                        ? "text-accent bg-accent/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {link.title}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileDropdown === link.title ? "rotate-180" : ""}`} />
                  </button>

                  {/* L1 children */}
                  {mobileDropdown === link.title && (
                    <div className="ml-4 mt-1 mb-2 flex flex-col gap-1 border-l border-accent/20 pl-3">
                      {link.children?.map(l2 => {
                        const hasL2Children = (l2.children?.length ?? 0) > 0;

                        return (
                          <div key={l2.title}>
                            <div className="flex items-center gap-1">
                              <Link
                                to={l2.url}
                                onClick={() => { if (!hasL2Children) closeMobileAll(); }}
                                className={`flex-1 flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-foreground/70 hover:text-accent hover:bg-accent/5 transition-all duration-200 ${
                                  l2.class === "disabled" ? "pointer-events-none opacity-50" : ""
                                }`}
                              >
                                {l2.class && l2.class !== "" && l2.class !== "disabled" && (
                                  <NavIcon name={l2.class} className="w-4 h-4 text-accent/70" />
                                )}
                                <span>{l2.title}</span>
                              </Link>
                              {hasL2Children && (
                                <button
                                  type="button"
                                  onClick={() => setMobileL2(mobileL2 === l2.title ? null : l2.title)}
                                  className="p-2 text-foreground/50 hover:text-accent transition-colors shrink-0"
                                >
                                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileL2 === l2.title ? "rotate-180" : ""}`} />
                                </button>
                              )}
                            </div>

                            {/* L2 children */}
                            {hasL2Children && mobileL2 === l2.title && (
                              <div className="ml-6 mt-1 mb-1 flex flex-col gap-0.5 border-l border-accent/10 pl-3">
                                {l2.children?.map(l3 => {
                                  const hasL3Children = (l3.children?.length ?? 0) > 0;

                                  return (
                                    <div key={l3.title}>
                                      <div className="flex items-center gap-1">
                                        <Link
                                          to={l3.url}
                                          onClick={() => { if (!hasL3Children) closeMobileAll(); }}
                                          className={`flex-1 flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-sm text-foreground/60 hover:text-accent hover:bg-accent/5 transition-all duration-200 ${
                                            l3.class === "disabled" ? "pointer-events-none opacity-50" : ""
                                          }`}
                                        >
                                          {l3.class && l3.class !== "" && l3.class !== "disabled" && (
                                            <NavIcon name={l3.class} className="w-3.5 h-3.5 text-accent/60" />
                                          )}
                                          <span>{l3.title}</span>
                                        </Link>
                                        {hasL3Children && (
                                          <button
                                            type="button"
                                            onClick={() => setMobileL3(mobileL3 === l3.title ? null : l3.title)}
                                            className="p-2 text-foreground/40 hover:text-accent transition-colors shrink-0"
                                          >
                                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${mobileL3 === l3.title ? "rotate-180" : ""}`} />
                                          </button>
                                        )}
                                      </div>

                                      {/* L3 children */}
                                      {hasL3Children && mobileL3 === l3.title && (
                                        <div className="ml-5 mt-0.5 mb-1 flex flex-col gap-0.5 border-l border-accent/10 pl-3">
                                          {l3.children?.map(l4 => (
                                            <Link
                                              key={l4.title}
                                              to={l4.url}
                                              onClick={closeMobileAll}
                                              className={`flex items-center gap-2 py-2 px-2 rounded-lg text-xs text-foreground/50 hover:text-accent hover:bg-accent/5 transition-all duration-200 ${
                                                l4.class === "disabled" ? "pointer-events-none opacity-50" : ""
                                              }`}
                                            >
                                              {l4.class && l4.class !== "" && l4.class !== "disabled" && (
                                                <NavIcon name={l4.class} className="w-3 h-3 text-accent/50" />
                                              )}
                                              <span>{l4.title}</span>
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-border/10">
            {ctaMenus.length > 0 &&
              ctaMenus.map((menu, index) => {
                return menu.class === "btn" ? (
                  <Link key={index} to={menu.url} onClick={() => setIsOpen(false)} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-accent to-primary text-accent-foreground font-medium py-3 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.2)] flex items-center justify-center gap-2">
                      {menu.title}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link
                    key={index}
                    to={menu.url}
                    className="py-3 px-4 text-base font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
                  >
                    {menu.title}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
