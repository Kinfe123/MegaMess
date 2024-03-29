'use client'

import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { Input } from "@/components/ui/input"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { addWaitlist } from "@/actions/file-actions"
import { toast } from "@/components/ui/use-toast"
import { Loader } from "lucide-react"

// TODO: type email fix
const FallBackDetails = ({email , fileId ,filename }: {email:string | null | undefined , fileId: string , filename: string | undefined}) => {
    const [email_ , setEmail] = useState(email ?? "")
    const [pending ,startTransition] = useTransition()
    const handleClick = async () => {
        // Two ways email for the one who makes the request and the file owner to notify both the status

        startTransition(async () => {
            const sendEmailForRequester = await fetch('/api/email' , {
                method: 'POST',
                body: JSON.stringify({
                    email: email_,
                    subject: "Permission Require",
                    link: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/file/${fileId}`,
                    content: `${email_} is atempting to view the file. can you please check in the request on link below`,
                    linkHelper:'Click to the request',
                  
                })
            })
            const response =  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/logs` , {
                method:'POST',
                body: JSON.stringify({
                    fileId: fileId,
                    status: 'REQUESTED',
                    email: email,
                    filename: filename,
                })
            })
            addWaitlist(email_ , fileId).then((data) => {
                toast({
                    title: "Email Submitted.",
                    description: "You have made a access request. We will let you know once you get approved through email",
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