
'use client'
import { allowEmail, delWaitlist } from "@/actions/file-actions"
import { UserAvatar } from "@/components/shared/user-avatar"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { File, type WaitlistEmail } from "@prisma/client"
import { Loader, User } from "lucide-react"
import { useTransition } from "react"


const WaitlistShow = ({user , file }:{user:WaitlistEmail , file: File}) => {
    const [pending1 , startTransition1] = useTransition()
    const [pending2 , startTransition2] = useTransition()

    const fileUrl = file.fileUrl.split('/')
    const onAccept = () => {
        startTransition1(() => {
            
            allowEmail(user.fileId , user.email).then((data) => {
                
                fetch('/api/emails' , {
                    method:'POST',
                    body: JSON.stringify({
                        email: user.email,
                        subject: 'File Access Approved',
                        link: `${process.env.NEXT_PUBLIC_APP_URL}/files/f/${fileUrl[fileUrl.length-1]}`,
                        content: `You have been approved to have an access to the file named by ${file.name} about ${file.description} on the link below`,
                        linkHelper: "Access the file"

                    })
                    
                })
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
                
                 
                fetch('/api/emails' , {
                    method:'POST',
                    body: JSON.stringify({
                        email: user.email,
                        subject: 'File Access Rejected',
                        link: `${process.env.NEXT_PUBLIC_APP_URL}/files/f/${fileUrl[fileUrl.length-1]}`,
                        content: `You have been rejected by file owner . If you think that it is by mistake you can make another one below `,
                        linkHelper: "Make Access Request"

                    })
                    
                })
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
                    <User className="w-5 h-5 border-[0.5px] rounded-full border-white/40 text-white/60"/>
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