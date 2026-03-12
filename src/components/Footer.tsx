import { useState } from "react";
import { Linkedin, Mail, ChevronDown, Phone, Instagram, Twitter } from "lucide-react";

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
    linkedin: string;
    instagram: string;
    twitter: string;
    facebook: string;
    ambition_box: string;
    pinterest: string;
  };
  legal_links: {
    privacy_policy: string;
  };
  contact: {
    email: string;
    sales_email: string;
    sales_number_1: string;
    sales_number_2: string;
    sales_number_3: string;
    hr_number_1: string;
    hr_number_2: string;
    address: string;
    address_2: string;
    address_3: string;
    address_heading_1: string;
    address_heading_2: string;
    address_heading_3: string;
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
        label: footerSecData.contact.address_heading_1 || "",
        address: footerSecData.contact.address || "",
      },
      {
        label: footerSecData.contact.address_heading_2 || "",
        address: footerSecData.contact.address_2 || "",
      },
      {
        label: footerSecData.contact.address_heading_3 || "",
        address: footerSecData.contact.address_3 || "",
      },
    ].filter((addr) => addr.address)
    : [];

  const code1Links = footerSecData?.footer_menus?.code?.items || [];

  const hireTalentLinks = footerSecData?.footer_menus?.hire?.items || [];

  const salesNumbers = footerSecData?.contact
    ? [footerSecData.contact.sales_number_1, footerSecData.contact.sales_number_2, footerSecData.contact.sales_number_3].filter(Boolean)
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
          <div className={`${hireTalentLinks.length > 0 ? "grid-cols-4" : "grid-cols-3"} grid gap-8 lg:gap-12 mb-12`}>
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
            {hireTalentLinks.length > 0 &&
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
            }

            {/* Follow Us & Email */}
            <div>
              <h4 className="text-foreground font-semibold text-base mb-5">
                Follow US
              </h4>
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {footerSecData?.social_links?.ambition_box && (
                  <a
                    href={footerSecData.social_links.ambition_box}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-colors duration-200"
                    aria-label="Ambition Box"
                  >
                    <img src="/ambitionbox.svg" alt="Ambition Box" className="w-4 h-4" />
                  </a>
                )}
                {footerSecData?.social_links?.facebook && (
                  <a
                    href={footerSecData.social_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook w-4 h-4 text-muted-foreground"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin w-4 h-4 text-muted-foreground"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-instagram w-4 h-4 text-muted-foreground"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                )}
                {footerSecData?.social_links?.twitter && (
                  <a
                    href={footerSecData.social_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-twitter w-4 h-4 text-muted-foreground"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                )}
                {footerSecData?.social_links?.pinterest && (
                  <a
                    href={footerSecData.social_links.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-colors duration-200"
                    aria-label="Pinterest"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"></path></svg>
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
              {footerSecData?.social_links?.ambition_box && (
                <a
                  href={footerSecData.social_links.ambition_box}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center"
                  aria-label="Ambition Box"
                >
                 <img src="/ambitionbox.svg" alt="AmbitionBox" className="w-4 h-4" />
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
              {footerSecData?.social_links?.facebook && (
                <a
                  href={footerSecData.social_links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook w-4 h-4 text-muted-foreground"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
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
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin w-4 h-4 text-muted-foreground"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-instagram w-4 h-4 text-muted-foreground"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
              )}
              {footerSecData?.social_links?.twitter && (
                <a
                  href={footerSecData.social_links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center"
                  aria-label="Twitter"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-twitter w-4 h-4 text-muted-foreground"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
              )}
              {footerSecData?.social_links?.pinterest && (
                <a
                  href={footerSecData.social_links.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center"
                  aria-label="Pinterest"
                >
                <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"></path></svg>
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