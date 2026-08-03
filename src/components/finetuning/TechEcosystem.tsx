import { Brain, Puzzle, Cloud, Database, Network, CloudCog, ShieldCheck, LucideIcon } from "lucide-react";

export type TechCat = {
  icon: LucideIcon;
  title: string;
  desc: string;
  chips?: string[];
};

const defaultCategories: TechCat[] = [
  {
    icon: Brain,
    title: "Foundation Models",
    desc: "We utilize leading Foundation Models, including GPT, Llama, Claude, Gemini, Mistral, Qwen, and other commercial models. Our specialists select the optimal model for your business based on industry, application, data sensitivity, and other factors.",
    chips: ["GPT", "Llama", "Claude", "Gemini", "Mistral"],
  },
  {
    icon: Puzzle,
    title: "AI Frameworks and Libraries",
    desc: "Our professionals use AI Frameworks, such as Hugging Face, Transformers, PyTorch, TensorFlow, and DeepSpeed, to create efficient and effective AI models. The application of these technologies ensures a high degree of reliability during model testing, training, and implementation.",
    chips: ["Hugging Face", "Transformers", "PyTorch", "TensorFlow", "DeepSpeed"],
  },
  {
    icon: Cloud,
    title: "Cloud Platforms",
    desc: "We build AI-based solutions on cloud systems, including AWS, Microsoft Azure, Google Cloud Platform, and hybrid infrastructures. Our Enterprise AI Solutions are characterized by flexibility and availability, allowing using these systems in your existing IT environment.",
    chips: ["AWS", "Azure", "Google Cloud", "Hybrid Cloud"],
  },
  {
    icon: Database,
    title: "Vector Databases",
    desc: "The cornerstone of enterprise artificial intelligence applications is the ability to swiftly and intelligently acquire virtual information. We employ Vector Databases like Pinecone, Weaviate, FAISS, and Chroma for effective semantic searching, retrieval-augmented generation, and providing adequate context information to the AI experience.",
    chips: ["Pinecone", "Weaviate", "FAISS", "Chroma"],
  },
  {
    icon: Network,
    title: "AI Orchestration Frameworks",
    desc: "Modern AI applications usually employ multiple components working together. We use LangChain and LangGraph, together with other available development frameworks, to create smart workflows that link models with business applications and APIs seamlessly.",
    chips: ["LangChain", "LangGraph", "APIs", "Workflows"],
  },
  {
    icon: CloudCog,
    title: "MLOps and Model Lifecycle Management",
    desc: "Reliable artificial intelligence goes beyond the development stage. We use MLOps with MLflow, Kubeflow, Docker, and Kubernetes to automate training, versioning, deployment, monitoring, and continuous improvement in AI operations.",
    chips: ["MLflow", "Kubeflow", "Docker", "Kubernetes"],
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI and Security",
    desc: "In every implementation we execute, security and responsible AI are indispensable. We introduce secure development protocols, governance systems, control measures, bias checks, and safeguards against violations to help organizations use safe artificial intelligence without putting sensitive data at risk.",
    chips: ["Governance", "Bias Checks", "Safeguards", "Compliance"],
  },
];

function TechCategoryCard({ cat }: { cat: TechCat }) {
  const Icon = cat.icon;
  return (
    <div className="group relative rounded-[22px] border border-cyan-400/15 bg-[hsl(220_50%_7%/0.7)] backdrop-blur-xl p-5 lg:p-6 transition-all duration-500 hover:border-cyan-400/45 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_hsl(190_90%_55%/0.35)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity"
        style={{
          backgroundImage:
            "linear-gradient(hsl(190 90% 55% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(190 90% 55% / 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-center gap-3 mb-3">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <Icon className="w-5 h-5 text-cyan-300" strokeWidth={1.75} />
        </div>
        <h3 className="text-white font-semibold text-[15px] lg:text-base leading-snug">
          {cat.title}
        </h3>
      </div>

      <p className="relative text-[13px] leading-relaxed text-slate-400 mb-4">
        {cat.desc}
      </p>

      {cat.chips && cat.chips.length > 0 && (
        <div className="relative flex flex-wrap gap-1.5">
          {cat.chips.map((c) => (
            <span
              key={c}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-cyan-400/20 bg-cyan-400/5 text-cyan-200/90 transition-colors group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10"
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

interface TechEcosystemProps {
  items?: TechCat[];
}

export default function TechEcosystem({ items }: TechEcosystemProps = {}) {
  const categories = items && items.length > 0 ? items : defaultCategories;
  const hasWide = categories.length >= 7;
  const top = categories.slice(0, 3);
  const bottom = categories.slice(3, hasWide ? 6 : 6);
  const wide = hasWide ? categories[6] : undefined;
  const overflow = !hasWide ? categories.slice(6) : [];

  return (
    <div className="relative">
      <div className="hidden lg:grid grid-cols-12 gap-5 auto-rows-min">
        {top.map((c) => (
          <div key={c.title} className="col-span-4">
            <TechCategoryCard cat={c} />
          </div>
        ))}

        {bottom.map((c) => (
          <div key={c.title} className="col-span-4">
            <TechCategoryCard cat={c} />
          </div>
        ))}

        {overflow.map((c) => (
          <div key={c.title} className="col-span-4">
            <TechCategoryCard cat={c} />
          </div>
        ))}

        {wide && (
          <div className="col-span-12">
            <div className="group relative rounded-[22px] border border-cyan-400/20 bg-gradient-to-br from-[hsl(220_50%_7%/0.9)] to-[hsl(222_47%_5%/0.9)] backdrop-blur-xl p-6 overflow-hidden transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_50px_-10px_hsl(190_90%_55%/0.35)]">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(190 90% 55% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(190 90% 55% / 0.4) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative grid grid-cols-12 gap-6 items-center">
                <div className={`${wide.chips && wide.chips.length ? "col-span-7" : "col-span-12"} flex items-start gap-4`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/25 to-blue-500/25 border border-cyan-400/40 flex items-center justify-center">
                    <wide.icon className="w-6 h-6 text-cyan-300" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{wide.title}</h3>
                    <p className="text-[13px] leading-relaxed text-slate-400">{wide.desc}</p>
                  </div>
                </div>
                {wide.chips && wide.chips.length > 0 && (
                  <div className="col-span-5 flex flex-wrap gap-2 justify-end">
                    {wide.chips.map((c) => (
                      <span
                        key={c}
                        className="text-xs font-medium px-3 py-1.5 rounded-md border border-cyan-400/25 bg-cyan-400/5 text-cyan-200/90"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
        {categories.map((c) => (
          <TechCategoryCard key={c.title} cat={c} />
        ))}
      </div>

      <div className="md:hidden space-y-4">
        {categories.map((c) => (
          <TechCategoryCard key={c.title} cat={c} />
        ))}
      </div>
    </div>
  );
}

