import { useState } from "react";
import { Linkedin, Mail, ChevronDown, Phone, Instagram } from "lucide-react";

interface FooterMenuItem {
  id: number;
  title: string;
  url: string;
}

interface FooterMenuSection {
  title: string;
  items: FooterMenuItem[];
}

interface FooterData {
  footer_logo: {
    id: number;
    full: string;
    medium: string;
    alt: string;
  };
  footer_text: string;
  copyright_text: string;
  footer_menus: {
    code: FooterMenuSection;
    hire: FooterMenuSection;
  };
  social_links: {
    stackoverflow: string;
    linkedin: string;
    instagram: string;
    leetcode: string;
  };
  legal_links: {
    privacy_policy: string;
  };
  contact: {
    email: string;
    sales_email: string;
    sales_number_1: string;
    sales_number_2: string;
    hr_number_1: string;
    hr_number_2: string;
    address: string;
    address_2: string;
    address_3: string;
  };
}

interface FooterProps {
  footerSecData?: FooterData;
}

const Footer = ({ footerSecData }: FooterProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const addresses = footerSecData?.contact
    ? [
      {
        label: "Jaipur HQ",
        address: footerSecData.contact.address || "",
      },
      {
        label: "Delhi Office",
        address: footerSecData.contact.address_2 || "",
      },
      {
        label: "Austin Office",
        address: footerSecData.contact.address_3 || "",
      },
    ].filter((addr) => addr.address)
    : [];

  const code1Links = footerSecData?.footer_menus?.code?.items || [];

  const hireTalentLinks = footerSecData?.footer_menus?.hire?.items || [];

  const salesNumbers = footerSecData?.contact
    ? [footerSecData.contact.sales_number_1, footerSecData.contact.sales_number_2].filter(Boolean)
    : [];

  const hrNumbers = footerSecData?.contact
    ? [footerSecData.contact.hr_number_1, footerSecData.contact.hr_number_2].filter(Boolean)
    : [];

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[hsl(222,50%,4%)] border-t border-border/20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer - Desktop */}
        <div className="hidden md:block py-14 lg:py-16">
          {/* Top Section with Logo, Tagline and CTA */}
          <div className="mb-12 pb-10 border-b border-border/20">
            {footerSecData?.footer_logo?.full && (
              <img
                alt={footerSecData.footer_logo.alt || "Code1 Tech Systems"}
                src={footerSecData.footer_logo.full}
                className="h-12 w-auto object-contain mb-4"
              />
            )}
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
              {footerSecData?.footer_text || ""}
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Locations Column */}
            <div>
              <h4 className="text-foreground font-semibold text-base mb-5">
                Locations
              </h4>
              <div className="space-y-5">
                {addresses.map((loc, index) => (
                  <div key={index}>
                    <p className="text-foreground font-medium text-sm mb-1">
                      {loc.label}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {loc.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code1 Links */}
            <div>
              <h4 className="text-foreground font-semibold text-base mb-5">
                {footerSecData?.footer_menus?.code?.title || "Code1"}
              </h4>
              <ul className="space-y-3">
                {code1Links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hire Talent Links */}
            <div>
              <h4 className="text-foreground font-semibold text-base mb-5">
                {footerSecData?.footer_menus?.hire?.title || "Hire Talent"}
              </h4>
              <ul className="space-y-3">
                {hireTalentLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us & Email */}
            <div>
              <h4 className="text-foreground font-semibold text-base mb-5">
                Follow US
              </h4>
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {footerSecData?.social_links?.stackoverflow && (
                  <a
                    href={footerSecData.social_links.stackoverflow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-colors duration-200"
                    aria-label="StackOverflow"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.292 19.925l-3.923-2.103.839-1.857 3.923 2.103-.839 1.857zm2.843-3.503l-3.539-1.922 1.185-2.18 3.539 1.922-1.185 2.18zM18.95 1.29l-1.81.49.49 1.81 1.81-.49-.49-1.81zm-1.54 2.94l-1.08.29.29 1.08 1.08-.29-.29-1.08zm2.94 1.54l-1.81.49.49 1.81 1.81-.49-.49-1.81zM5.81 15.75l-1.922-3.539 2.18-1.185 1.922 3.539-2.18 1.185zm7.12-8.265l-2.103-3.923 1.857-.839 2.103 3.923-1.857.839zm-8.56 8.07l-1.29-2.405 1.857-.997 1.29 2.405-1.857.997zm10.58-11.8l-1.54-2.87 1.997-1.072 1.54 2.87-1.997 1.072zM4.5 19.5h15v2h-15v-2z" />
                    </svg>
                  </a>
                )}
                {footerSecData?.social_links?.linkedin && (
                  <a
                    href={footerSecData.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                  </a>
                )}
                {footerSecData?.social_links?.instagram && (
                  <a
                    href={footerSecData.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 text-muted-foreground" />
                  </a>
                )}
                {footerSecData?.social_links?.leetcode && (
                  <a
                    href={footerSecData.social_links.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-colors duration-200"
                    aria-label="LeetCode"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662L2.571 9.145c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.107-4.124c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l.883.879 3.85-3.855C15.838.195 16.476 0 17.187 0c.711 0 1.357.195 1.824.662l2.697 2.607c.467.467.703 1.15.703 1.864s-.236 1.357-.703 1.824l-7.709 7.721zm-1.112-8.14l2.712 2.607c.466.467.703 1.15.703 1.863s-.235 1.357-.702 1.824l-2.697 2.607c-.467.467-1.111.662-1.824.662s-1.357-.195-1.823-.662l-2.697-2.607c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l2.697-2.607c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662z" />
                    </svg>
                  </a>
                )}
              </div>

              <h4 className="text-foreground font-semibold text-base mb-3">
                Email:
              </h4>
              <div className="space-y-2">
                {footerSecData?.contact?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <a
                      href={`mailto:${footerSecData.contact.email}`}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
                    >
                      {footerSecData.contact.email}
                    </a>
                  </div>
                )}
                {footerSecData?.contact?.sales_email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <a
                      href={`mailto:${footerSecData.contact.sales_email}`}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
                    >
                      {footerSecData.contact.sales_email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Phone Numbers Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-6 border-t border-border/20">
            <div className="flex items-center gap-3">
              <span className="text-foreground font-semibold text-sm">Sales:</span>
              {salesNumbers.map((num, index) => (
                <a
                  key={index}
                  href={`tel:${num.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  {num}
                  {index < salesNumbers.length - 1 && <span className="ml-2">,</span>}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-foreground font-semibold text-sm">HR:</span>
              {hrNumbers.map((num, index) => (
                <a
                  key={index}
                  href={`tel:${num.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  {num}
                  {index < hrNumbers.length - 1 && <span className="ml-2">,</span>}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer - Mobile Accordion */}
        <div className="md:hidden py-10">
          {/* Brand */}
          <div className="mb-8 pb-8 border-b border-border/20">
            {footerSecData?.footer_logo?.full && (
              <img
                src={footerSecData.footer_logo.full}
                alt={footerSecData.footer_logo.alt || "Code1 Tech Systems"}
                className="h-16 w-auto mb-4"
              />
            )}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {footerSecData?.footer_text || ""}
            </p>
          </div>

          {/* Locations */}
          <div className="mb-6 pb-6 border-b border-border/20">
            <h4 className="text-foreground font-semibold text-sm mb-4">Locations</h4>
            <div className="space-y-4">
              {addresses.map((loc, index) => (
                <div key={index}>
                  <p className="text-foreground font-medium text-sm mb-1">
                    {loc.label}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {loc.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Code1 Accordion */}
          <div className="border-b border-border/20">
            <button
              onClick={() => toggleSection("code1")}
              className="w-full flex items-center justify-between py-4"
            >
              <span className="text-foreground font-semibold text-sm">
                {footerSecData?.footer_menus?.code?.title || "Code1"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === "code1" ? "rotate-180" : ""
                  }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${openSection === "code1" ? "max-h-64 pb-4" : "max-h-0"
                }`}
            >
              <ul className="space-y-3 pl-1">
                {code1Links.map((link) => (
                  <li key={link.id}>
                    <a href={link.url} className="text-muted-foreground text-sm">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hire Talent Accordion */}
          <div className="border-b border-border/20">
            <button
              onClick={() => toggleSection("hireTalent")}
              className="w-full flex items-center justify-between py-4"
            >
              <span className="text-foreground font-semibold text-sm">
                {footerSecData?.footer_menus?.hire?.title || "Hire Talent"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === "hireTalent" ? "rotate-180" : ""
                  }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${openSection === "hireTalent" ? "max-h-64 pb-4" : "max-h-0"
                }`}
            >
              <ul className="space-y-3 pl-1">
                {hireTalentLinks.map((link) => (
                  <li key={link.id}>
                    <a href={link.url} className="text-muted-foreground text-sm">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Accordion */}
          <div className="border-b border-border/20">
            <button
              onClick={() => toggleSection("contact")}
              className="w-full flex items-center justify-between py-4"
            >
              <span className="text-foreground font-semibold text-sm">Contact</span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === "contact" ? "rotate-180" : ""
                  }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${openSection === "contact" ? "max-h-64 pb-4" : "max-h-0"
                }`}
            >
              <div className="space-y-4 pl-1">
                <div>
                  <p className="text-foreground text-sm font-medium mb-2">Email:</p>
                  <div className="space-y-2">
                    {footerSecData?.contact?.email && (
                      <a href={`mailto:${footerSecData.contact.email}`} className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Mail className="w-4 h-4 text-accent" /> {footerSecData.contact.email}
                      </a>
                    )}
                    {footerSecData?.contact?.sales_email && (
                      <a href={`mailto:${footerSecData.contact.sales_email}`} className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Mail className="w-4 h-4 text-accent" /> {footerSecData.contact.sales_email}
                      </a>
                    )}
                  </div>
                </div>
                {salesNumbers.length > 0 && (
                  <div>
                    <p className="text-foreground text-sm font-medium mb-2">Sales:</p>
                    <div className="space-y-2">
                      {salesNumbers.map((num, i) => (
                        <a key={i} href={`tel:${num.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Phone className="w-4 h-4 text-accent" /> {num}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {hrNumbers.length > 0 && (
                  <div>
                    <p className="text-foreground text-sm font-medium mb-2">HR:</p>
                    <div className="space-y-2">
                      {hrNumbers.map((num, i) => (
                        <a key={i} href={`tel:${num.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Phone className="w-4 h-4 text-accent" /> {num}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="py-6">
            <p className="text-foreground text-sm font-medium mb-3">Follow US</p>
            <div className="flex items-center gap-2 flex-wrap">
              {footerSecData?.social_links?.stackoverflow && (
                <a
                  href={footerSecData.social_links.stackoverflow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center"
                  aria-label="StackOverflow"
                >
                  <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.292 19.925l-3.923-2.103.839-1.857 3.923 2.103-.839 1.857zm2.843-3.503l-3.539-1.922 1.185-2.18 3.539 1.922-1.185 2.18zM18.95 1.29l-1.81.49.49 1.81 1.81-.49-.49-1.81zm-1.54 2.94l-1.08.29.29 1.08 1.08-.29-.29-1.08zm2.94 1.54l-1.81.49.49 1.81 1.81-.49-.49-1.81zM5.81 15.75l-1.922-3.539 2.18-1.185 1.922 3.539-2.18 1.185zm7.12-8.265l-2.103-3.923 1.857-.839 2.103 3.923-1.857.839zm-8.56 8.07l-1.29-2.405 1.857-.997 1.29 2.405-1.857.997zm10.58-11.8l-1.54-2.87 1.997-1.072 1.54 2.87-1.997 1.072zM4.5 19.5h15v2h-15v-2z" />
                  </svg>
                </a>
              )}
              {footerSecData?.social_links?.linkedin && (
                <a
                  href={footerSecData.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                </a>
              )}
              {footerSecData?.social_links?.instagram && (
                <a
                  href={footerSecData.social_links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-muted-foreground" />
                </a>
              )}
              {footerSecData?.social_links?.leetcode && (
                <a
                  href={footerSecData.social_links.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center"
                  aria-label="LeetCode"
                >
                  <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662L2.571 9.145c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.107-4.124c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l.883.879 3.85-3.855C15.838.195 16.476 0 17.187 0c.711 0 1.357.195 1.824.662l2.697 2.607c.467.467.703 1.15.703 1.864s-.236 1.357-.703 1.824l-7.709 7.721zm-1.112-8.14l2.712 2.607c.466.467.703 1.15.703 1.863s-.235 1.357-.702 1.824l-2.697 2.607c-.467.467-1.111.662-1.824.662s-1.357-.195-1.823-.662l-2.697-2.607c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l2.697-2.607c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-xs text-muted-foreground">
            {footerSecData?.copyright_text || ""}
          </p>
          {footerSecData?.legal_links?.privacy_policy && (
            <>
              <span className="hidden sm:block text-border">|</span>
              <a
                href={footerSecData.legal_links.privacy_policy}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;