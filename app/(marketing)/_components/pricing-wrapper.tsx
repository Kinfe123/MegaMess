import { PricingCards } from "@/components/pricing-cards"
import { PricingFaq } from "@/components/pricing-faq"
import Section from "./section"
import { BottomLine } from "./gradients"

const PricingWrapper = () => {
    return (
        <>
            <Section
                className="pt-[2rem] -mt-[5.25rem]"
                crossesOffset="lg:translate-y-[5.25rem]"
                customPaddings
                id="pricing">
                <div className="flex w-full flex-col gap-16 py-8 md:py-8">

                    <PricingCards />


                </div>
                <BottomLine />
            </Section>
            <PricingFaq />
        </>
    )
}

export default PricingWrapper