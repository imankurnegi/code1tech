import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";

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
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid work email").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Please enter your phone number").max(20, "Phone number must be less than 20 characters"),
  subject: z.string().trim().min(1, "Please enter a subject").max(100, "Subject must be less than 100 characters"),
  message: z.string().trim().min(10, "Please share a bit more about your needs").max(1000, "Message must be less than 1000 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = ({ dataContact }: ContactSectionProps) => {
  // Transform API data to trust bullets
  const trustBullets = dataContact ? [
    { icon: dataContact.item_1_icon, text: dataContact.item_1_text },
    { icon: dataContact.item_2_icon, text: dataContact.item_2_text },
    { icon: dataContact.item_3_icon, text: dataContact.item_3_text },
  ] : [];
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const {
    toast
  } = useToast();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("your-name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("subject", data.subject);
      formData.append("message", data.message);

      await api.submitContactForm(formData);

      setIsSubmitted(true);
      reset();
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours."
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {dataContact.section_heading.split(' ').map((word, index) => {
                if (word === 'Us') {
                  return (
                    <span key={index} className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">
                      {word}
                    </span>
                  );
                }
                return word + ' ';
              })}
            </h2>
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
          <div className="relative">
            {/* Glass panel background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/15 backdrop-blur-md border border-border/30" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 md:p-8 space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <Input id="name" placeholder="John Smith" {...register("name")} className={`bg-muted/30 border-border/40 focus:border-accent focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 ${errors.name ? "border-destructive" : ""}`} />
                {errors.name && <p className="text-destructive text-xs mt-1.5">{errors.name.message}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="john@company.com" {...register("email")} className={`bg-muted/30 border-border/40 focus:border-accent focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 ${errors.email ? "border-destructive" : ""}`} />
                {errors.email && <p className="text-destructive text-xs mt-1.5">{errors.email.message}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Contact No.
                </label>
                <Input id="phone" type="tel" placeholder="Your phone number" {...register("phone")} className={`bg-muted/30 border-border/40 focus:border-accent focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 ${errors.phone ? "border-destructive" : ""}`} />
                {errors.phone && <p className="text-destructive text-xs mt-1.5">{errors.phone.message}</p>}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input id="subject" placeholder="What is this about?" {...register("subject")} className={`bg-muted/30 border-border/40 focus:border-accent focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 ${errors.subject ? "border-destructive" : ""}`} />
                {errors.subject && <p className="text-destructive text-xs mt-1.5">{errors.subject.message}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  How can we help?
                </label>
                <Textarea id="message" placeholder="Tell us about your project or challenge..." rows={4} {...register("message")} className={`bg-muted/30 border-border/40 focus:border-accent focus:ring-accent/20 text-foreground placeholder:text-muted-foreground/50 resize-none ${errors.message ? "border-destructive" : ""}`} />
                {errors.message && <p className="text-destructive text-xs mt-1.5">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" disabled={isSubmitting || isSubmitted} className="w-full group bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground h-14 text-base font-semibold rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 disabled:opacity-70">
                {isSubmitting ? <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </span> : isSubmitted ? <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </span> : <>
                    Let's Build Something Together
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>}
              </Button>

              {/* Micro-copy */}
              <p className="text-center text-muted-foreground text-xs">
                No pressure. No obligation. Just a conversation.
              </p>
            </form>
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