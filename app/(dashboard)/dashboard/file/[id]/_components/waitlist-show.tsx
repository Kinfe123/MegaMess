
'use client'
import { allowEmail, delWaitlist } from "@/actions/file-actions"
import { UserAvatar } from "@/components/shared/user-avatar"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { type WaitlistEmail } from "@prisma/client"
import { Loader, User } from "lucide-react"
import { useTransition } from "react"


const WaitlistShow = ({user }:{user:WaitlistEmail}) => {
    const [pending1 , startTransition1] = useTransition()
    const [pending2 , startTransition2] = useTransition()

    const onAccept = () => {
        startTransition1(() => {
            allowEmail(user.fileId , user.email).then((data) => {
                toast({
                    title: 'Email Approved',
                    description: 'You have successfully approved ' + user.email + " to view the file."
                })
            }).catch((err) => {
                toast({
                    title: "Somethnig went wrong",
                    description: "There is something went wrong while approving the email. ",
                    variant:"destructive"
                })
            })

        })

    }
    const onDecline = () => {
        startTransition2(() => {
            delWaitlist(user.fileId , user.email).then((data) => {
                toast({
                    title: 'Email Rejected',
                    description: 'You have successfully rejected ' + user.email + " to view the file."
                })
            }).catch((err) => {
                toast({
                    title: "Somethnig went wrong",
                    description: "There is something went wrong while approving the email. ",
                    variant:"destructive"
                })
            })
        })

    }
    return (
        <div className="w-full py-1">
            <div className="flex items-center justify-between ">
               <div className="flex justify-center items-center gap-2">
                    <User className="w-7 h-8 border-2 rounded-full border-white/60 text-white/60"/>
                    <p  className="text-muted-foreground text-sm">{user.email}</p>

               </div>
                <div className="ml-auto flex gap-2 pb-4 justify-center items-center">
                    <Button disabled={pending1 || pending2} onClick={onAccept} variant={'outline'}>{pending1 ? <Loader className="w-3 h-3 mr-1 animate-spin"/> : ""}Accept</Button>
                    <Button disabled={pending1 || pending2} onClick={onDecline} variant={'destructive'} className="bg-gradient-to-t from-red-500 to-red-400/80 border-t-destructive-foreground">{pending2 ? <Loader className="w-3 h-3 mr-1 animate-spin"/> : ""}Decline</Button>
                </div>
            </div>
          <hr className="w-full"/>

        </div>
    )
}

export default WaitlistShow