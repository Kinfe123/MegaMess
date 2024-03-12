import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const pricingFaqData = [
  {
    id: "item-1",
    question: "What is the cost of the free plan?",
    answer: "Our free plan is completely free, with no monthly or annual charges. It's a great way to get started and explore our basic features.",
  },
  {
    id: "item-2",
    question: "How much does the Basic Monthly plan cost?",
    answer: "The Basic Monthly plan is priced at $15 per month. It provides access to our core features and is billed on a monthly basis.",
  },
  {
    id: "item-3",
    question: "What is the price of the Pro Monthly plan?",
    answer: "The Pro Monthly plan is available for $25 per month. It offers advanced features and is billed on a monthly basis for added flexibility.",
  },
  {
    id: "item-4",
    question: "Do you offer any annual subscription plans?",
    answer: "Yes, we offer annual subscription plans for even more savings. The Basic Annual plan is $144 per year, and the Pro Annual plan is $300 per year.",
  },
  {
    id: "item-5",
    question: "Is there a trial period for the paid plans?",
    answer: "We offer a 14-day free trial for both the Pro Monthly and Pro Annual plans. It's a great way to experience all the features before committing to a paid subscription.",
  },
];

export function PricingFaq() {
  return (
    <section className="relative container max-w-3xl py-2">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
      </svg>
      <div className="absolute bottom-10 -z-10 flex w-full justify-center">
        <div className="animate-pulse-slow h-[400px] w-[400px] max-w-full rounded-full bg-gradient-to-tr from-[#a855f7cc] to-[#ef63f1] opacity-10 blur-[100px]" />
      </div> 
      <div className="mb-14 space-y-6 text-center">
        <h1 className="text-balance text-center font-heading text-3xl md:text-5xl">
          Frequently Asked Questions
      </h1>
        <p className="text-md text-balance text-muted-foreground">
          Explore our comprehensive FAQ to find quick answers to common inquiries.
          If you need further assistance, don&apos;t hesitate to contact us for personalized help.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent>{faqItem.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}