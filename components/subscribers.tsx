'use client'
import { addWaitlistEmails } from "@/lib/user"
import { useState, useTransition } from "react"
import { toast } from "./ui/use-toast"
import { Input } from "./ui/input"
import SubButton from "./sub-btn"

const Subscribers = () => {

    const [pending , startTransition] = useTransition()
    const [email , setEmail] = useState<string>('')
    const handleClick = () => {
        startTransition(() => {
            addWaitlistEmails(email).then((data) => {
                toast({
                    title:"Waitlist Sent",
                    description: "You have successfully added to our waitlists.  We will make sure to stay you updated on our product through this email."
                })

            }).catch((err) => {
                toast({
                    title:"Something went wrong",
                    description: "There might be an internet issue or something around you!"
                })

            })
        })

    }
    return (
        <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gradient-to-tr from-transparent to-transparent/80 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                <h2 className="font-heading text-4xl tracking-tight  sm:text-5xl  ">
                    Lets  spot you   <br />  <span className="text-gradient_indigo-purple font-extrabold lg:text-8xl">
                        on  waitlist.
                    </span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                    Aliquip reprehenderit incididunt amet quis fugiat ut velit. Sit occaecat labore proident cillum in nisi
                    adipisicing officia excepteur tempor deserunt.
                </p>
                <div className="flex mt-5 max-w-xl mx-auto justify-center items-center gap-4">
                    <Input className="py-6" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="xyz@email.com"/> 
                    <SubButton handler={handleClick}/>

                </div>
                <div className="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5">
                </div>
                <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
                    <div
                        className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#a855f7cc] to-[#9b46e5] opacity-25"
                        style={{
                            clipPath:
                                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default Subscribers