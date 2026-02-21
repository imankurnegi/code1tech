import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Please enter your last name").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Please enter your phone number").max(20, "Phone number must be less than 20 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  message: z.string().trim().min(10, "Please share a bit more about your needs").max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactFormFieldConfig = {
  field_name: string;
  type: string;
  label: string;
  placeholder: string;
};

export type ContactFormFieldsData = {
  row1: ContactFormFieldConfig[];
  row2: ContactFormFieldConfig[];
  row3: ContactFormFieldConfig[];
  row4: ContactFormFieldConfig[];
  row5: ContactFormFieldConfig[];
  row6: ContactFormFieldConfig[];
};

const FIELD_NAME_TO_SCHEMA_KEY: Record<string, keyof ContactFormData> = {
  "your-name": "firstName",
  "last-name": "lastName",
  "email": "email",
  "phone": "phone",
  "company-name": "company",
  "message": "message",
};

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  { code: "+61", country: "AU" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+81", country: "JP" },
  { code: "+86", country: "CN" }
];

type ContactUsFormProps = {
  contactFormFields: ContactFormFieldsData | null;
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
};

const ContactUsForm = ({ contactFormFields, onSubmit: onSubmitProp }: ContactUsFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  if (!contactFormFields) {
    return null;
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      if (onSubmitProp) {
        await onSubmitProp(data);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setIsSubmitted(true);
      reset();
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative rounded-2xl bg-card/20 backdrop-blur-xl border border-border/20 overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_25px_60px_rgba(0,78,158,0.15)] h-full flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 sm:p-8 lg:p-10">

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Send us a <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">message</span>
        </h2>
        <p className="text-muted-foreground mb-8">Simply fill the form to tell us what's happening. A few details can help us understand your needs perfectly.</p>

        {/* <h2 dangerouslySetInnerHTML={{ __html: loaderData?.contactData?.data?.form_heading || "" }} className="text-2xl sm:text-3xl font-bold text-foreground mb-2"></h2>
        <p className="text-muted-foreground mb-8">{loaderData?.contactData?.data?.form_paragraph}</p> */}

        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          {contactFormFields.row1?.map((field) => {
            const schemaKey = FIELD_NAME_TO_SCHEMA_KEY[field.field_name];
            if (!schemaKey) return null;
            return (
              <div key={field.field_name}>
                <label htmlFor={field.field_name} className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                <Input
                  id={field.field_name}
                  type={field.type as "text" | "email"}
                  placeholder={field.placeholder}
                  {...register(schemaKey)}
                  className={`bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 rounded-xl transition-all duration-200 ${errors[schemaKey] ? "border-destructive" : ""}`}
                />
                {errors[schemaKey]?.message && <p className="text-destructive text-xs mt-1.5">{errors[schemaKey].message}</p>}
              </div>
            );
          })}
          {contactFormFields.row2?.map((field) => {
            const schemaKey = FIELD_NAME_TO_SCHEMA_KEY[field.field_name];
            if (!schemaKey) return null;
            return (
              <div key={field.field_name}>
                <label htmlFor={field.field_name} className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                <Input
                  id={field.field_name}
                  type={field.type as "text" | "email"}
                  placeholder={field.placeholder}
                  {...register(schemaKey)}
                  className={`bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 rounded-xl transition-all duration-200 ${errors[schemaKey] ? "border-destructive" : ""}`}
                />
                {errors[schemaKey]?.message && <p className="text-destructive text-xs mt-1.5">{errors[schemaKey].message}</p>}
              </div>
            );
          })}
        </div>

        {contactFormFields.row3?.map((field) => {
          const schemaKey = FIELD_NAME_TO_SCHEMA_KEY[field.field_name];
          if (!schemaKey) return null;
          return (
            <div key={field.field_name} className="mb-5">
              <label htmlFor={field.field_name} className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
              <Input
                id={field.field_name}
                type={field.type as "email"}
                placeholder={field.placeholder}
                {...register(schemaKey)}
                className={`bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 rounded-xl transition-all duration-200 ${errors[schemaKey] ? "border-destructive" : ""}`}
              />
              {errors[schemaKey]?.message && <p className="text-destructive text-xs mt-1.5">{errors[schemaKey].message}</p>}
            </div>
          );
        })}

        {contactFormFields.row4?.map((field) => {
          const schemaKey = FIELD_NAME_TO_SCHEMA_KEY[field.field_name];
          if (!schemaKey) return null;
          return (
            <div key={field.field_name} className="mb-5">
              <label htmlFor={field.field_name} className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
              <div className="flex gap-2">
                <div className="relative">
                  <button type="button" onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)} className="h-12 px-3 bg-muted/30 border border-border/50 rounded-xl flex items-center gap-2 text-foreground hover:border-accent/50 transition-colors min-w-[80px]">
                    <span className="text-sm">{selectedCountryCode}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isCountryDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isCountryDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-card border border-border/50 rounded-xl shadow-xl z-50 min-w-[120px] py-1">
                      {countryCodes.map((item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountryCode(item.code);
                            setIsCountryDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-muted/50 text-foreground flex items-center justify-between"
                        >
                          <span>{item.code}</span>
                          <span className="text-muted-foreground text-xs">{item.country}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Input
                  id={field.field_name}
                  type="tel"
                  placeholder={field.placeholder}
                  {...register(schemaKey)}
                  className={`flex-1 bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 rounded-xl transition-all duration-200 ${errors[schemaKey] ? "border-destructive" : ""}`}
                />
              </div>
              {errors[schemaKey]?.message && <p className="text-destructive text-xs mt-1.5">{errors[schemaKey].message}</p>}
            </div>
          );
        })}

        {contactFormFields.row5?.map((field) => {
          const schemaKey = FIELD_NAME_TO_SCHEMA_KEY[field.field_name];
          if (!schemaKey) return null;
          const isOptional = field.field_name === "company-name";
          return (
            <div key={field.field_name} className="mb-5">
              <label htmlFor={field.field_name} className="block text-sm font-medium text-foreground mb-2">
                {field.label} {isOptional && <span className="text-muted-foreground">(Optional)</span>}
              </label>
              <Input
                id={field.field_name}
                type={field.type as "text"}
                placeholder={field.placeholder}
                {...register(schemaKey)}
                className="bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 rounded-xl transition-all duration-200"
              />
            </div>
          );
        })}

        {contactFormFields.row6?.map((field) => {
          const schemaKey = FIELD_NAME_TO_SCHEMA_KEY[field.field_name];
          if (!schemaKey) return null;
          return (
            <div key={field.field_name} className="mb-6">
              <label htmlFor={field.field_name} className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
              <Textarea
                id={field.field_name}
                placeholder={field.placeholder}
                rows={5}
                {...register(schemaKey)}
                className={`bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 text-foreground placeholder:text-muted-foreground/50 resize-none rounded-xl transition-all duration-200 ${errors[schemaKey] ? "border-destructive" : ""}`}
              />
              {errors[schemaKey]?.message && <p className="text-destructive text-xs mt-1.5">{errors[schemaKey].message}</p>}
            </div>
          );
        })}

        <Button type="submit" variant="hero" size="lg" disabled={isSubmitting || isSubmitted} className="w-full group h-14 text-base font-semibold rounded-xl disabled:opacity-70">
          {isSubmitting ? <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Sending...
          </span> : isSubmitted ? <span className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Message Sent!
          </span> : <>
            Send Message
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </>}
        </Button>

        <p className="text-center text-muted-foreground text-sm mt-4">
          We usually respond within 24 hours
        </p>
      </form>
    </div>
  )
}

export default ContactUsForm;
