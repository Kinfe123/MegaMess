import { PricingCards } from "@/components/pricing-cards"
import { PricingFaq } from "@/components/pricing-faq"
import Section from "./section"

const PricingWrapper = () => {
    return (
        <>
            <Section
                className="pt-[2rem] -mt-[5.25rem]"
                crossesOffset="lg:translate-y-[5.25rem]"
                cross={false}
                customPaddings
                id="pricing">
                <div className="flex w-full flex-col gap-16 py-8 md:py-8">

                    <PricingCards />


                </div>
            </Section>
            <hr className='container' />
            <PricingFaq />
        </>
    )
}

export default PricingWrapper