import {
  Award,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import certISO27001 from "@/assets/cert-iso27001.png";
import certISO9001 from "@/assets/cert-iso9001.png";
import certISO20000 from "@/assets/cert-iso20000.png";
import certCMMI from "@/assets/cert-cmmi.png";

export interface FooterData {
  logo?: string;
  alt?: string;
  footer_logo?: {
    full?: string;
    alt?: string;
  };
  [key: string]: any;
}

export interface FooterProps {
  data?: FooterData;
}

const certifications = [
  { image: certISO27001, label: "ISO 27001:2022" },
  { image: certISO9001, label: "ISO 9001:2015" },
  { image: certISO20000, label: "ISO 20000-1:2018" },
  { image: certCMMI, label: "CMMI Level 3" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blogs" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "Engineering as a Service", href: "/services/engineer-as-a-service" },
  { label: "Data Engineering", href: "/services/data-engineering" },
  { label: "Data Science", href: "/services/data-science" },
  { label: "AI / ML & Agentic Systems", href: "/services/ai-ml-solutions" },
  { label: "Managed Services", href: "/services/eaas/managed-services" },
];

const socialLinks = [
  {
    label: "AmbitionBox",
    href: "https://www.ambitionbox.com/overview/code1-overview",
    icon: <img src="/ambitionbox.png" alt="" className="h-4 w-4 object-contain" />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/code1dev",
    icon: <Facebook aria-hidden="true" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/thecode1/",
    icon: <Linkedin aria-hidden="true" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/code1.dev/",
    icon: <Instagram aria-hidden="true" />,
  },
  {
    label: "X",
    href: "https://twitter.com/code1dev",
    icon: <Twitter aria-hidden="true" />,
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/code1dev",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    ),
  },
];

const locations = [
  {
    label: "India HQ",
    address: "17, 18, 1st Floor, Milap Nagar, Tonk Road, Jaipur, (Raj), 302018",
  },
  {
    label: "USA Office",
    address: "The Porter Building, 1 Brunel Way, SL1 1FQ",
  },
  {
    label: "UK Office",
    address: "24 Maw bray close Reading RG6 3BZ",
  },
];

const salesNumbers = ["+91-9782466568", "+91-9950728600", "+1 737-212-9555"];
const hrNumbers = ["+91-9251594132"];

const FooterLink = ({ label, href }: { label: string; href: string }) => (
  <li>
    <Link
      to={href}
      className="inline-flex min-h-8 items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {label}
    </Link>
  </li>
);

const ContactGroup = ({ label, numbers }: { label: string; numbers: string[] }) => (
  <div className="min-w-0 border-l border-border/40 pl-4">
    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
      {label}
    </p>
    <div className="flex flex-col gap-1">
      {numbers.map((number) => (
        <a
          key={number}
          href={`tel:${number.replace(/[^+\d]/g, "")}`}
          className="inline-flex min-h-8 items-center gap-2.5 whitespace-nowrap text-[13px] font-medium text-foreground/90 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
        >
          <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          {number}
        </a>
      ))}
    </div>
  </div>
);

const Footer = ({ data }: FooterProps = {}) => {
  const logoSrc =
    data?.logo ||
    data?.footer_logo?.full ||
    "https://backend.code1.dev/wp-content/uploads/2026/01/be96b161-1e7c-4c4a-8065-54051cbd349b.png";
  const logoAlt = data?.alt || "Code1 Tech Systems";

  return (
    <footer className="border-t border-border/20 bg-[hsl(222,50%,4%)] text-foreground">

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-[1.2fr_0.75fr_0.95fr_1.3fr] lg:gap-10 lg:py-14">
          <div className="col-span-2 max-w-sm lg:col-span-1">
            <Link to="/" className="inline-flex items-center group shrink-0">
              <img
                alt={logoAlt}
                src={logoSrc}
                className="h-10 w-auto transition-all duration-300 group-hover:brightness-110 brightness-110 contrast-110"
                loading="lazy"
              />
            </Link>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Technology, data, and AI solutions engineered to help ambitious businesses move faster.
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/75">
              India <span className="px-2 text-accent">•</span> USA <span className="px-2 text-accent">•</span> UK
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-muted/20 text-muted-foreground transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_18px_hsl(var(--accent)/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:h-4 [&>svg]:w-4 [&>img]:h-4 [&>img]:w-4"
                >
                  {icon}
                </a>
              ))}
            </div>

          </div>

          <nav aria-label="Company links">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Code1
            </h3>
            <ul className="space-y-1">
              {companyLinks.map((link) => <FooterLink key={link.href} {...link} />)}
            </ul>
          </nav>

          <nav aria-label="Services links">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Services
            </h3>
            <ul className="space-y-1">
              {serviceLinks.map((link) => <FooterLink key={link.href} {...link} />)}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Contact
            </h3>

            <div className="space-y-2.5">
              <a
                href="mailto:enquiry@code1.dev"
                className="flex min-h-8 items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                enquiry@code1.dev
              </a>
              <a
                href="mailto:hrd@code1.dev"
                className="flex min-h-8 items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                hrd@code1.dev
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-6">
              <ContactGroup label="Sales" numbers={salesNumbers} />
              <ContactGroup label="HR" numbers={hrNumbers} />
            </div>
          </div>

        </div>

        <div className="border-t border-border/30 py-7">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            Locations
          </div>
          <div className="grid gap-5 sm:grid-cols-3 sm:gap-8">
            {locations.map((location) => (
              <address key={location.label} className="not-italic">
                <p className="text-sm font-semibold text-foreground">{location.label}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{location.address}</p>
              </address>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-border/30 py-6 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            <Award className="h-4 w-4 text-accent" aria-hidden="true" />
            Certifications
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-14 w-[66px] items-center justify-center overflow-hidden shrink-0">
              <iframe
                id="Iframe1"
                src="https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1"
                width="114px"
                height="97px"
                title="Dun & Bradstreet D-U-N-S Registered Seal"
                frameBorder="0"
                scrolling="no"
                className="origin-center scale-[0.58] shrink-0 border-0"
              />
            </div>
            {certifications.map((cert) => (
              <img
                key={cert.label}
                src={cert.image}
                alt={`${cert.label} certification badge`}
                title={cert.label}
                loading="lazy"
                decoding="async"
                width="56"
                height="56"
                className="h-14 w-14 rounded-lg bg-white object-contain p-1.5 transition-transform duration-200 hover:scale-105"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/30 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026, ITVet Technologies Pvt. Ltd.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link className="transition-colors hover:text-accent" to="/privacy-policy">Privacy Policy</Link>
            <Link className="transition-colors hover:text-accent" to="/terms-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
