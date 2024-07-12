import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import solutions from "../../data/solutions"

  export function Solutions() {
    return (
      <Accordion type="single" collapsible className="w-full">
        {
            solutions.map((solution, index) => (
                <AccordionItem value={solution.title} key={solution.title}>
                <AccordionTrigger>{index + 1}.{" "+solution.title}</AccordionTrigger>
                <AccordionContent>
                    {solution.description}
                </AccordionContent>
                </AccordionItem>
            ))
        }
      </Accordion>
    )
  }
  