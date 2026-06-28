import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import JobApplicationForm from "@/components/JobApplicationForm";
import { api } from "@/api";
import he from "he";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin, Briefcase, Calendar, Building2, ArrowLeft, ArrowRight,
  Clock, Share2
} from "lucide-react";
import careersHero from "@/assets/careers-hero.jpg";
import SeoTags from "@/components/SeoTags";

const JobDetail = () => {
  const { id: jobSlug } = useParams<{ id: string }>();

  const { data: jobsResponse, isLoading, error } = useQuery({
    queryKey: ["job-detail", jobSlug],
    queryFn: () => api.getJobsBySlug(jobSlug || ""),
    enabled: !! jobSlug,
  });

  const jobs = jobsResponse?.data?.jobs ?? [];
  const selectedJob = jobs[0];
  const job = selectedJob
    ? {
        id: selectedJob.id,
        title: he.decode(selectedJob.title || ""),
        category: he.decode(selectedJob?.job_categories?.[0]?.name || ""),
        type: he.decode(selectedJob?.job_career_hire_type?.[0]?.name || ""),
        department: he.decode(selectedJob?.job_career_department?.[0]?.name || ""),
        location: `${he.decode(selectedJob?.job_career_city?.[0]?.name || "")}, ${he.decode(selectedJob?.job_career_country?.[0]?.name || "")}`.replace(/,\s*$/, ""),
        created_at: selectedJob.date ? new Date(selectedJob.date).toISOString() : "",
        content: selectedJob.content,
      }
    : null;

  const relatedJobs = jobs
    .filter((j: any) => j.id !== selectedJob?.id)
    .slice(0, 3)
    .map((j: any) => ({
      id: j.id,
      slug: j?.job_career_department?.[0]?.slug || j?.job_categories?.[0]?.slug || j.id,
      title: he.decode(j.title || ""),
      location: `${he.decode(j?.job_career_city?.[0]?.name || "")}, ${he.decode(j?.job_career_country?.[0]?.name || "")}`.replace(/,\s*$/, ""),
      type: he.decode(j?.job_career_hire_type?.[0]?.name || ""),
      category: he.decode(j?.job_categories?.[0]?.name || ""),
    }));

  const allPositions = job ? [job.title, "Other"] : ["Other"];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3" />
              <div className="h-6 bg-muted rounded w-1/4" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-1 space-y-4">
                  <div className="h-48 bg-muted rounded-2xl" />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-6 bg-muted rounded w-full" />
                  <div className="h-6 bg-muted rounded w-5/6" />
                  <div className="h-6 bg-muted rounded w-4/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-24 pb-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-foreground mb-4">Job Not Found</h1>
            <p className="text-muted-foreground mb-8">This position may no longer be available.</p>
            <Link to="/careers">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Careers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <SeoTags
        title={jobsResponse?.data?.seo?.title}
        description={jobsResponse?.data?.seo?.description}
        ogImage={jobsResponse?.data?.seo?.og_image}
        schema={jobsResponse?.data?.schema}
      />
    <div className="min-h-screen bg-background">

      {/* Hero Banner */}
      <section className="relative pt-20">
        <div className="relative h-[220px] sm:h-[280px] overflow-hidden">
          <img
            src={careersHero}
            alt={"Career at Code1 Tech"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground max-w-2xl">
                Innovation Starts <span className="text-gradient">Here</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/careers" className="hover:text-accent transition-colors">Careers</Link>
          <span>/</span>
          <Link to="/careers" className="hover:text-accent transition-colors">{job.category}</Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{job.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Sidebar - Job Info */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 leading-tight">
                      {job.title}
                    </h2>

                    <div className="flex items-center gap-2 text-muted-foreground mb-6">
                      <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm">{job.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <JobApplicationForm
                        preselectedPosition={job.title}
                        positions={allPositions}
                        trigger={
                          <Button className="gap-2 w-full sm:w-auto">
                            Apply Now <ArrowRight className="w-4 h-4" />
                          </Button>
                        }
                      />
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Briefcase className="w-4 h-4" /> Category
                        </span>
                        <span className="text-foreground font-medium">{job.category}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Hire Type
                        </span>
                        <span className="text-foreground font-medium">{job.type}</span>
                      </div>
                      {job.department && (
                        <div className="flex items-center justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Building2 className="w-4 h-4" /> Department
                          </span>
                          <span className="text-foreground font-medium">{job.department}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between py-2">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> Date Posted
                        </span>
                        <span className="text-foreground font-medium">
                          {job.created_at
                            ? new Date(job.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : ""}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Share */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-accent" /> Share this job
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                        }}
                      >
                        Copy Link
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                            "_blank"
                          );
                        }}
                      >
                        LinkedIn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Content - Job Description */}
            <div className="lg:col-span-2 space-y-8">
              {/* About the Company */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-accent rounded-full" />
                  {he.decode(job.content?.who_we_are_heading || "")}
                </h3>
                <div className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: he.decode(job.content?.who_we_are || "") }} />
              </div>

              {/* About the Role */}
              {job.content?.about_the_role && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent rounded-full" />
                    {he.decode(job.content?.about_the_role_heading || "")}
                  </h3>
                  <div className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: he.decode(job.content?.about_the_role || "") }} />
                </div>
              )}

              {/* What You'll Do */}
              {job.content?.what_you_do && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent rounded-full" />
                    {he.decode(job.content?.what_you_do_heading || "")}
                  </h3>
                  <div
                    className="text-muted-foreground leading-relaxed [&_ul]:space-y-3 [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: he.decode(job.content.what_you_do || "") }}
                  />
                </div>
              )}

              {/* Requirements */}
              {job.content?.what_you_bring && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent rounded-full" />
                    {he.decode(job.content?.what_you_bring_heading || "")}
                  </h3>
                  <div
                    className="text-muted-foreground leading-relaxed [&_ul]:space-y-3 [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: he.decode(job.content.what_you_bring || "") }}
                  />
                </div>
              )}

              {/* Benefits */}
              {job.content?.rewards_benefits && job.content?.rewards_benefits_heading && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-accent rounded-full" />
                  {he.decode(job.content?.rewards_benefits_heading || "")}
                </h3>
                <div className="text-muted-foreground leading-relaxed [&_p]:mb-4 [&_em]:text-sm [&_em]:italic" dangerouslySetInnerHTML={{ __html: he.decode(job.content?.rewards_benefits || "") }} />
              </div>
              )}


              {/* Extra Fields */}
              {job.content?.add_fields?.map((addFields : {heading?: string, content?: string}, index: number) => (
              <div key={index}>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-accent rounded-full" />
                  {he.decode(addFields.heading || "")}
                </h3>
                <div className="text-muted-foreground leading-relaxed [&_ul]:space-y-3 [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: he.decode(addFields.content || "") }} />
              </div>
            ))}

              {/* Apply CTA */}
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">Ready to make an impact?</h3>
                    <p className="text-muted-foreground text-sm">Apply now and join our team of innovators.</p>
                  </div>
                  <JobApplicationForm
                    preselectedPosition={job.title}
                    positions={allPositions}
                    trigger={
                      <Button size="lg" className="gap-2 whitespace-nowrap">
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <section className="py-16 sm:py-20 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
              Similar <span className="text-gradient">Jobs</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedJobs.map((rJob) => (
                <Link to={`/careers/${rJob.slug}`} key={rJob.id}>
                  <Card className="bg-card border-border hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 h-full group">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-accent mb-2 group-hover:underline">{rJob.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-3.5 h-3.5" /> {rJob.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">
                          {rJob.type}
                        </span>
                        <span className="text-xs text-muted-foreground">{rJob.category}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/careers">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> View All Openings
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
    </>
  );
};

export default JobDetail;
