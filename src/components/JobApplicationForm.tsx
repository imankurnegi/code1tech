import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, X, CheckCircle, Loader2 } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";
import { z } from "zod";

const applicationSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  position: z.string().min(1, "Position is required"),
  experience: z.string().min(1, "Experience is required"),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  linkedin_url: z.string().trim().url("Invalid URL").optional().or(z.literal("")),
  portfolio_url: z.string().trim().url("Invalid URL").optional().or(z.literal("")),
  cover_letter: z.string().trim().max(2000).optional().or(z.literal("")),
});

interface JobApplicationFormProps {
  preselectedPosition?: string;
  positions?: string[];
  trigger?: React.ReactNode;
}

const JobApplicationForm = ({ preselectedPosition, positions, trigger }: JobApplicationFormProps) => {
  const positionList = positions && positions.length > 0 ? positions : [];
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { data: formFields } = useQuery({
    queryKey: ["job-application-form-fields"],
    queryFn: api.getJobApplicationFormFields,
  });

  const getField = (rowKey: string) => formFields?.[rowKey]?.[0];
  const fullNameField = getField("row1");
  const emailField = getField("row2");
  const phoneField = getField("row3");
  const positionField = getField("row4");
  const experienceField = getField("row5");
  const companyField = getField("row6");
  const linkedinField = getField("row7");
  const portfolioField = getField("row8");
  const resumeField = getField("row9");
  const coverLetterField = getField("row10");

  const apiPositionOptions = (positionField?.options || []).filter(
    (option: string) => option && option.toLowerCase() !== "select a position"
  );
  
  // Add preselectedPosition to options if not already present
  let mergedPositionOptions = apiPositionOptions.length > 0
    ? apiPositionOptions
    : positionList;
  
  // Ensure preselected position is in the list
  if (preselectedPosition && !mergedPositionOptions.includes(preselectedPosition)) {
    mergedPositionOptions = [preselectedPosition, ...mergedPositionOptions];
  }
  
  const experienceOptions = (experienceField?.options || []).filter(
    (option: string) => option && option.toLowerCase() !== "years of experience"
  );

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    position: preselectedPosition || "",
    experience: "",
    company: "",
    linkedin_url: "",
    portfolio_url: "",
    cover_letter: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast({ title: "Invalid file", description: "Please upload a PDF or Word document.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
      return;
    }
    setResumeFile(file);
    if (errors.resume) setErrors((prev) => ({ ...prev, resume: "" }));
  };

  const resetForm = () => {
    setFormData({
      full_name: "", email: "", phone: "", position: preselectedPosition || "",
      experience: "", company: "", linkedin_url: "",
      portfolio_url: "", cover_letter: "",
    });
    setResumeFile(null);
    setErrors({});
    setIsSubmitted(false);
  };

  // Update form position when preselectedPosition changes (for different job)
  useEffect(() => {
    if (open && preselectedPosition) {
      setFormData((prev) => ({ ...prev, position: preselectedPosition }));
    }
  }, [preselectedPosition, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = applicationSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!resumeFile) {
      setErrors((prev) => ({ ...prev, resume: "Resume is required" }));
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = new FormData();
      submission.append("form_id", "1000");
      submission.append("full_name", parsed.data.full_name);
      submission.append("email", parsed.data.email);
      submission.append("phone", parsed.data.phone);
      submission.append("position", parsed.data.position);
      submission.append("experience", parsed.data.experience);
      submission.append("company", parsed.data.company || "");
      submission.append("linkedin_url", parsed.data.linkedin_url || "");
      submission.append("portfolio_url", parsed.data.portfolio_url || "");
      submission.append("cover_letter", parsed.data.cover_letter || "");
      submission.append("resume", resumeFile);

      await api.submitContactForm(submission);

      setIsSubmitted(true);
      toast({ title: "Application submitted!", description: "We'll review your application and get back to you soon." });
    } catch (err: any) {
      console.error("Submission error:", err);
      toast({ title: "Error", description: "Failed to submit application. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setTimeout(resetForm, 300); }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="hero" size="lg">
            Apply Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        {isSubmitted ? (
          <div className="py-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest. Our team will review your application and reach out soon.
            </p>
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-foreground">
                {formFields?.heading}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {formFields?.paragraph}
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name" className="text-foreground">{fullNameField?.label}</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    placeholder={fullNameField?.placeholder}
                    className="mt-1 bg-muted/50 border-border"
                  />
                  {errors.full_name && <p className="text-xs text-destructive mt-1">{errors.full_name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">{emailField?.label}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder={emailField?.placeholder}
                    className="mt-1 bg-muted/50 border-border"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone & Position */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-foreground">{phoneField?.label}</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder={phoneField?.placeholder}
                    className="mt-1 bg-muted/50 border-border"
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="position" className="text-foreground">{positionField?.label}</Label>
                  <Select value={formData.position} onValueChange={(v) => handleChange("position", v)}>
                    <SelectTrigger className="mt-1 bg-muted/50 border-border">
                      <SelectValue placeholder={positionField?.options?.[0]} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {mergedPositionOptions.map((pos: string) => (
                        <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.position && <p className="text-xs text-destructive mt-1">{errors.position}</p>}
                </div>
              </div>

              {/* Experience & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience" className="text-foreground">{experienceField?.label}</Label>
                  <Select value={formData.experience} onValueChange={(v) => handleChange("experience", v)}>
                    <SelectTrigger className="mt-1 bg-muted/50 border-border">
                      <SelectValue placeholder={experienceField?.options?.[0]} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {experienceOptions.map((exp: string) => (
                        <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.experience && <p className="text-xs text-destructive mt-1">{errors.experience}</p>}
                </div>
                <div>
                  <Label htmlFor="company" className="text-foreground">{companyField?.label}</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder={companyField?.placeholder}
                    className="mt-1 bg-muted/50 border-border"
                  />
                </div>
              </div>

              {/* LinkedIn & Portfolio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin" className="text-foreground">{linkedinField?.label}</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin_url}
                    onChange={(e) => handleChange("linkedin_url", e.target.value)}
                    placeholder={linkedinField?.placeholder}
                    className="mt-1 bg-muted/50 border-border"
                  />
                  {errors.linkedin_url && <p className="text-xs text-destructive mt-1">{errors.linkedin_url}</p>}
                </div>
                <div>
                  <Label htmlFor="portfolio" className="text-foreground">{portfolioField?.label}</Label>
                  <Input
                    id="portfolio"
                    value={formData.portfolio_url}
                    onChange={(e) => handleChange("portfolio_url", e.target.value)}
                    placeholder={portfolioField?.placeholder}
                    className="mt-1 bg-muted/50 border-border"
                  />
                  {errors.portfolio_url && <p className="text-xs text-destructive mt-1">{errors.portfolio_url}</p>}
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <Label className="text-foreground">{resumeField?.label}</Label>
                <div className="mt-1">
                  {resumeFile ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                      <FileText className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm text-foreground truncate flex-1">{resumeFile.name}</span>
                      <span className="text-xs text-muted-foreground">{(resumeFile.size / 1024 / 1024).toFixed(1)} MB</span>
                      <button type="button" onClick={() => setResumeFile(null)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-6 rounded-lg border-2 border-dashed border-border hover:border-accent/50 transition-colors text-center group"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2 group-hover:text-accent transition-colors" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload your resume
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">PDF or Word, max 5MB</p>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {errors.resume && <p className="text-xs text-destructive mt-1">{errors.resume}</p>}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <Label htmlFor="cover_letter" className="text-foreground">{coverLetterField?.label}</Label>
                <Textarea
                  id="cover_letter"
                  value={formData.cover_letter}
                  onChange={(e) => handleChange("cover_letter", e.target.value)}
                  placeholder={coverLetterField?.placeholder}
                  rows={4}
                  className="mt-1 bg-muted/50 border-border resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">{formData.cover_letter.length}/2000</p>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" variant="hero" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                    </>
                  ) : (
                    formFields?.button_text
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;
