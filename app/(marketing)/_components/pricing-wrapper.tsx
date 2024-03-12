import { PricingCards } from "@/components/pricing-cards"
import { PricingFaq } from "@/components/pricing-faq"
import Section from "./section"
import { BottomLine } from "./gradients"

const PricingWrapper = () => {
    return (
        <>
            <Section
                className="pt-[1rem] -mt-[5.25rem] pb-10"
                crossesOffset="lg:translate-y-[5.25rem]"
                customPaddings
                id="pricing">
                <div className="flex w-full flex-col gap-16 pb-8 md:py-8">

                    <PricingCards />


                </div>
                <BottomLine />
            </Section>
            <Section
                className="pt-[1rem]  -mt-[5.25rem]"
                crosses
                crossesOffset="lg:translate-y-[5.25rem]"
                customPaddings
                id="hero">
                <PricingFaq />
            <BottomLine />
            </Section>
        </>
    )
}

export default PricingWrapper