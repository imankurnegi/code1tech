import { useState } from "react";
import { Linkedin, Twitter, Github, Mail, MapPin, ChevronDown } from "lucide-react";

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
    navigation: FooterMenuSection;
    resources: FooterMenuSection;
  };
  social_links: {
    linkedin: string;
    twitter: string;
    github: string;
  };
  legal_links: {
    privacy_policy: string;
    terms: string;
  };
  contact: {
    email: string;
    address: string;
  };
}

interface FooterProps {
  footerSecData: FooterData;
}

const Footer = ({ footerSecData }: FooterProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const socialLinks = [
    {
      icon: Linkedin,
      href: footerSecData?.social_links?.linkedin || "#",
      label: "LinkedIn"
    },
    {
      icon: Twitter,
      href: footerSecData?.social_links?.twitter || "#",
      label: "Twitter"
    },
    {
      icon: Github,
      href: footerSecData?.social_links?.github || "#",
      label: "GitHub"
    }
  ];

  const navigation = footerSecData?.footer_menus?.navigation?.items || [];
  const resources = footerSecData?.footer_menus?.resources?.items || [];

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  return <footer className="bg-[hsl(222,50%,4%)] border-t border-border/20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer - Desktop */}
        <div className="hidden md:grid py-14 lg:py-16 grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <img 
                alt={footerSecData?.footer_logo?.alt || "Code1 Tech Systems"} 
                src={footerSecData?.footer_logo?.full} 
                className="h-16 w-auto object-contain" 
              />
            </a>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              {footerSecData?.footer_text}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => <a key={index} href={social.href} className="w-9 h-9 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-colors duration-200" aria-label={social.label}>
                  <social.icon className="w-4 h-4 text-muted-foreground" />
                </a>)}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-5">
              {footerSecData?.footer_menus?.navigation?.title}
            </h4>
            <ul className="space-y-3">
              {navigation.map((link) => <li key={link.id}>
                  <a href={link.url} className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">
                    {link.title}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-5">
              {footerSecData?.footer_menus?.resources?.title}
            </h4>
            <ul className="space-y-3">
              {resources.map((link) => <li key={link.id}>
                  <a href={link.url} className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">
                    {link.title}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-5">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href={`mailto:${footerSecData?.contact?.email}`} className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">
                  {footerSecData?.contact?.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  {footerSecData?.contact?.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer - Mobile Accordion */}
        <div className="md:hidden py-10">
          {/* Brand */}
          <div className="mb-8 pb-8 border-b border-border/20">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <img 
                src={footerSecData?.footer_logo?.full} 
                alt={footerSecData?.footer_logo?.alt || "Code1 Tech Systems"} 
                className="h-8 w-auto" 
              />
            </a>
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
              {footerSecData?.footer_text}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => <a key={index} href={social.href} className="w-10 h-10 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center" aria-label={social.label}>
                  <social.icon className="w-4 h-4 text-muted-foreground" />
                </a>)}
            </div>
          </div>

          {/* Navigation Accordion */}
          <div className="border-b border-border/20">
            <button onClick={() => toggleSection("navigation")} className="w-full flex items-center justify-between py-4">
              <span className="text-foreground font-semibold text-sm uppercase tracking-wider">
                {footerSecData?.footer_menus?.navigation?.title}
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === "navigation" ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${openSection === "navigation" ? "max-h-48 pb-4" : "max-h-0"}`}>
              <ul className="space-y-3 pl-1">
                {navigation.map((link) => <li key={link.id}>
                    <a href={link.url} className="text-muted-foreground text-sm">
                      {link.title}
                    </a>
                  </li>)}
              </ul>
            </div>
          </div>

          {/* Resources Accordion */}
          <div className="border-b border-border/20">
            <button onClick={() => toggleSection("resources")} className="w-full flex items-center justify-between py-4">
              <span className="text-foreground font-semibold text-sm uppercase tracking-wider">
                {footerSecData?.footer_menus?.resources?.title}
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === "resources" ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${openSection === "resources" ? "max-h-36 pb-4" : "max-h-0"}`}>
              <ul className="space-y-3 pl-1">
                {resources.map((link) => <li key={link.id}>
                    <a href={link.url} className="text-muted-foreground text-sm">
                      {link.title}
                    </a>
                  </li>)}
              </ul>
            </div>
          </div>

          {/* Contact Accordion */}
          <div className="border-b border-border/20">
            <button onClick={() => toggleSection("contact")} className="w-full flex items-center justify-between py-4">
              <span className="text-foreground font-semibold text-sm uppercase tracking-wider">
                Contact
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === "contact" ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${openSection === "contact" ? "max-h-32 pb-4" : "max-h-0"}`}>
              <div className="space-y-3 pl-1">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground text-sm">{footerSecData?.contact?.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent mt-0.5" />
                  <span className="text-muted-foreground text-sm">
                    {footerSecData?.contact?.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {footerSecData?.copyright_text}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <a href={footerSecData?.legal_links?.privacy_policy} className="hover:text-foreground transition-colors duration-200 px-2 py-1">
              Privacy Policy
            </a>
            <span className="text-border">|</span>
            <a href={footerSecData?.legal_links?.terms} className="hover:text-foreground transition-colors duration-200 px-2 py-1">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;