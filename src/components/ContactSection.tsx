import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ContactUsForm, { type ContactFormFieldsData, type ContactFormData } from "@/components/ContactUsForm";
import { api } from "@/api";
import { addClassToSpan } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface ContactData {
  section_heading: string;
  section_sub_heading: string;
  left_side_heading: string;
  left_side_description: string;
  item_1_icon: string;
  item_1_text: string;
  item_2_icon: string;
  item_2_text: string;
  item_3_icon: string;
  item_3_text: string;
}

interface ContactSectionProps {
  dataContact?: ContactData;
  contactFormFields?: ContactFormFieldsData | null;
}

const ContactSection = ({ dataContact, contactFormFields = null }: ContactSectionProps) => {
  const handleFormSubmit = async (data: ContactFormData) => {
    const formData = new FormData();
    formData.append("your-name", data.firstName);
    formData.append("last-name", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("subject", data.subject ?? "");
    formData.append("message", data.message);
    await api.submitContactForm(formData);
  };

  const trustBullets = dataContact ? [
    { icon: dataContact.item_1_icon, text: dataContact.item_1_text },
    { icon: dataContact.item_2_icon, text: dataContact.item_2_text },
    { icon: dataContact.item_3_icon, text: dataContact.item_3_text },
  ] : [];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);


const location = useLocation();

useEffect(() => {
  // Reset visibility on route change
  setIsVisible(false);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target); // trigger once
      }
    },
    { threshold: 0.1 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);

    // Fallback: mark visible if already in viewport
    const rect = sectionRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setIsVisible(true);
      observer.unobserve(sectionRef.current);
    }
  }

  return () => observer.disconnect();
}, [location.pathname]); // re-run on route change

  return <section ref={sectionRef} id="contact" className="relative pb-16 md:pb-24 lg:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(222,45%,6%)] to-[hsl(222,50%,4%)]" />
      
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to bottom, hsl(222 47% 5%), transparent)'
    }} />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,194,227,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(95,194,227,0.008)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        {dataContact && (
          <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{ __html: addClassToSpan(dataContact?.section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
            />
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">
              {dataContact.section_sub_heading}
            </p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Left Column - Trust Content */}
          {dataContact && (
            <div className="flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">
                {dataContact.left_side_heading}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                {dataContact.left_side_description}
              </p>

              {/* Trust Bullets */}
              <div className="space-y-4">
                {trustBullets.map((bullet, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                      <img 
                        src={bullet.icon} 
                        alt={bullet.text}
                        className="w-5 h-5"
                        style={{
                          filter: 'brightness(0) saturate(100%) invert(71%) sepia(46%) saturate(589%) hue-rotate(144deg) brightness(95%) contrast(92%)'
                        }}
                      />
                    </div>
                    <span className="text-foreground font-medium">
                      {bullet.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right Column - Form */}
          <div className="relative group">
            {/* Glass panel background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/15 backdrop-blur-md border border-border/30" />
            <ContactUsForm contactFormFields={contactFormFields ?? null} onSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA - appears when form is out of view */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border/30 z-50 translate-y-full opacity-0 pointer-events-none">
        <Button className="w-full bg-gradient-to-r from-accent to-primary text-primary-foreground h-12 font-semibold rounded-xl">
          Get in Touch
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>;
};
export default ContactSection;