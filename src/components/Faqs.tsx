import { addClassToSpan } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from
  "@/components/ui/accordion";

interface FaqProp {
    heading: string;
    faqs: { q: string; a: string }[];
}

export const Faqs = ({ heading, faqs }: FaqProp) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
                      <h2
                        className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                        dangerouslySetInnerHTML={{ __html: addClassToSpan(heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                      />
                    </div>
                    <div className={`transition-all duration-700 opacity-100 translate-y-0`} style={{ transitionDelay: "150ms" }}>
                      <Accordion type="single" collapsible className={`space-y-3 transition-all duration-700}`}>
            {faqs.map((faq, index) =>
              <AccordionItem key={index} value={`faq-${index}`} className="border-none rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <AccordionTrigger className="px-5 py-4 text-foreground hover:text-accent hover:no-underline text-left text-sm font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-muted-foreground text-sm leading-[1.7]">{faq.a}</AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
                    </div>
                  </div>
    );
};