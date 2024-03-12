"use client";

import Link from "next/link";
import { Suspense, useState } from 'react';

import { BillingFormButton } from "@/components/forms/billing-form-button";
import { Icons } from "@/components/shared/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from '@/components/ui/switch';
import { pricingData } from "@/config/subscriptions";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { UserSubscriptionPlan } from "@/types";
import FuzzyOverlay from "./fuzzy";
import { Separator } from "./ui/separator";
interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault = (!subscriptionPlan?.interval || subscriptionPlan.interval === "year") ? true : false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);
  const signInModal = useSigninModal();


  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };


  return (
    <section className="container relative oveflow-hidden flex rounded-full py-0 flex-col   items-center text-center">
      
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
      {/* <div className="absolute top-0 right-0 -z-10 flex w-full justify-center">
        <div className="animate-pulse-slow h-[400px] w-screen overflow-hidden max-w-full rounded-full bg-gradient-to-tr from-[#a855f7cc] to-[#ef63f1] opacity-10 blur-[100px]" />
      </div>  */}
    
      <div className="mx-auto mb-10 flex w-full flex-col gap-5">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Pricing</p>
        <h2 className="font-heading text-3xl leading-[1.1] md:text-5xl">
          MegaMess is so <span className='text-gradient_indigo-purple font-extrabold'>Generous.</span>
        </h2>
      </div>
      <div
            className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#a855f7cc] to-[#9b46e5] opacity-20"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
      <div className="mb-4 flex items-center gap-5">
        <span>Monthly Billing</span>
        <Switch
          checked={isYearly}
          onCheckedChange={toggleBilling}
          role="switch"
          aria-label="switch-year"
        />
        <span>Annual Billing</span>
      </div>

      <div className="mx-auto grid max-w-screen-lg gap-5 bg-inherit py-5 md:grid-cols-3 lg:grid-cols-3">
        {pricingData.map((offer) => (
          <div className="relative flex flex-col overflow-hidden rounded-xl border" key={offer.title}>
              <FuzzyOverlay />
            <div className="min-h-[150px] items-start space-y-4 bg-purple-900/5 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,176,225,0.12),rgba(255,255,255,0))] p-6">
              <p className="flex font-urban text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {offer.title}
              </p>

              

              <div className="flex flex-row">
                <div className="flex items-end">
                  <div className="flex text-left text-3xl font-semibold leading-6">
                    {isYearly && offer.prices.monthly > 0 ? (
                      <>
                      <span className="mr-2 text-muted-foreground line-through">${offer.prices.monthly}</span>
                        <span>${offer.prices.yearly / 12}</span>
                      </>
                    ) : `$${offer.prices.monthly}`}
                  </div>
                  <div className="-mb-1 ml-2 text-left text-sm font-medium">
                    <div>/mo</div>
                  </div>
                </div>
              </div>
              {offer.prices.monthly > 0 ? (
                <div className="text-left text-sm text-muted-foreground">
                  {isYearly ? `$${offer.prices.yearly} will be charged when annual` : "when charged monthly"}
                </div>
              ) : null}
            </div>
            <Separator />

            <div className="flex h-full flex-col bg-gradient-to-tr from-purple-400/15 via-transparent to-transparent/70 justify-between gap-16 p-6">
              <ul className="space-y-2 text-left text-sm font-medium leading-normal">
                {offer.benefits.map((feature) => (
                  <li className="flex items-start" key={feature}>
                    <Icons.check className="mr-3 size-5 shrink-0" />
                    <p>{feature}</p>
                  </li>
                ))}

                {offer.limitations.length > 0 && offer.limitations.map((feature) => (
                  <li className="flex items-start text-muted-foreground" key={feature}>
                    <Icons.close className="mr-3 size-5 shrink-0" />
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>

              {userId && subscriptionPlan ? (
                offer.title === 'Starter' ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      className: 'w-full',
                      variant: 'default',
                    })}
                  >
                    Go to dashboard
                  </Link>
                ) : (
                  <BillingFormButton year={isYearly} offer={offer} subscriptionPlan={subscriptionPlan} />
                )
              ) : (
                <Button onClick={signInModal.onOpen}>Sign in</Button>
              )}

            </div>
          </div>
        ))}
      </div>

      
    </section>
  )
}
