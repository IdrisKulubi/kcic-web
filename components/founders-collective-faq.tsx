"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { foundersCollectiveFaqs } from "@/lib/data/founders-collective"

export function FoundersCollectiveFaq() {
  return (
    <Accordion className="border-t border-[#1b241d]/10">
      {foundersCollectiveFaqs.map((faq, index) => (
        <AccordionItem
          key={faq.question}
          value={`faq-${index}`}
          className="border-[#1b241d]/10"
        >
          <AccordionTrigger className="py-4 text-base font-medium text-[#1b241d] hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-[#566159] leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
