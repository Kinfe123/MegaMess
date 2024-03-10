'use client'

import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { Input } from "@/components/ui/input"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { addWaitlist } from "@/actions/file-actions"
import { toast } from "@/components/ui/use-toast"
import { Loader } from "lucide-react"

// TODO: type email fix
const FallBackDetails = ({email , fileId}: {email:string | null | undefined , fileId: string}) => {
    const [email_ , setEmail] = useState(email ?? "")
    const [pending ,startTransition] = useTransition()
    const handleClick = () => {
        startTransition(() => {
            addWaitlist(email_ , fileId).then((data) => {
                toast({
                    title: "Email Submitted.",
                    description: "You have successfully submited you email address. We will let you know once you get approved through email",
                })
            }).catch((err) => {
                toast({
                    title: "Something went wrong.",
                    description: "There is an error while submitting your email.",
                    variant: "destructive",
                })

            })
        })

    }
    return (
        <EmptyPlaceholder className="w-full bg-gradient-to-tr from-purple-400/10 rounded-md  via-transparent to-transparent/5 mx-auto">
          <EmptyPlaceholder.Icon name="post" />

          <EmptyPlaceholder.Title className="font-heading text-3xl">You dont have the right access to access the file .</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Please if you think this not expected please add your email below for the file owner to approve you          
          </EmptyPlaceholder.Description>
          <div className='flex justify-center items-center mx-auto gap-4'>
            <Input type="email" className='w-80'value={email_} onChange={(e) => setEmail(e.target.value)}/>
          <Button disabled={pending} onClick={handleClick}>  {pending ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : ""}Submit</Button>

          </div>
        </EmptyPlaceholder>

    )
}
export default FallBackDetails 