import { useState } from "react";
import { Linkedin, Twitter, Github, Mail, MapPin, ChevronDown } from "lucide-react";
import logo from "@/assets/code1-logo.svg";
const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const navigation = [{
    label: "Services",
    href: "#services"
  }, {
    label: "Solutions",
    href: "#solutions"
  }, {
    label: "Industries",
    href: "#industries"
  }, {
    label: "Case Studies",
    href: "#case-studies"
  }];
  const resources = [{
    label: "Blogs",
    href: "#blogs"
  }, {
    label: "Careers",
    href: "#careers"
  }, {
    label: "Contact",
    href: "#contact"
  }];
  const socialLinks = [{
    icon: Linkedin,
    href: "#",
    label: "LinkedIn"
  }, {
    icon: Twitter,
    href: "#",
    label: "Twitter"
  }, {
    icon: Github,
    href: "#",
    label: "GitHub"
  }];
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
              <img alt="Code1 Tech Systems" src="/lovable-uploads/1fea59e7-107a-4f96-90f3-b2e2cb8867e6.png" className="h-16 w-auto object-contain" />
              
            </a>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Enterprise technology solutions that scale with your ambition.
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
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigation.map((link, index) => <li key={index}>
                  <a href={link.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((link, index) => <li key={index}>
                  <a href={link.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">
                    {link.label}
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
                <a href="mailto:hello@code1tech.com" className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">
                  hello@code1tech.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Global presence across US, UK, and Asia
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
              <img src={logo} alt="Code1 Tech Systems" className="h-8 w-auto" />
              
            </a>
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
              Enterprise technology solutions that scale with your ambition.
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
                Navigation
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === "navigation" ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${openSection === "navigation" ? "max-h-48 pb-4" : "max-h-0"}`}>
              <ul className="space-y-3 pl-1">
                {navigation.map((link, index) => <li key={index}>
                    <a href={link.href} className="text-muted-foreground text-sm">
                      {link.label}
                    </a>
                  </li>)}
              </ul>
            </div>
          </div>

          {/* Resources Accordion */}
          <div className="border-b border-border/20">
            <button onClick={() => toggleSection("resources")} className="w-full flex items-center justify-between py-4">
              <span className="text-foreground font-semibold text-sm uppercase tracking-wider">
                Resources
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === "resources" ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${openSection === "resources" ? "max-h-36 pb-4" : "max-h-0"}`}>
              <ul className="space-y-3 pl-1">
                {resources.map((link, index) => <li key={index}>
                    <a href={link.href} className="text-muted-foreground text-sm">
                      {link.label}
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
                  <span className="text-muted-foreground text-sm">hello@code1tech.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent mt-0.5" />
                  <span className="text-muted-foreground text-sm">
                    Global presence across US, UK, and Asia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Code1 Tech Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors duration-200 px-2 py-1">
              Privacy Policy
            </a>
            <span className="text-border">|</span>
            <a href="#" className="hover:text-foreground transition-colors duration-200 px-2 py-1">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;