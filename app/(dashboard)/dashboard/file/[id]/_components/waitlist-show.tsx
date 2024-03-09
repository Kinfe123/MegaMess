
'use client'
import { UserAvatar } from "@/components/shared/user-avatar"
import { Button } from "@/components/ui/button"
import { type WaitlistEmail } from "@prisma/client"
import { User } from "lucide-react"
import { useTransition } from "react"


const WaitlistShow = ({user }:{user:WaitlistEmail}) => {
    console.log('Email : ' , user)
    const [pending , startTransition] = useTransition()

    const onAccept = () => {

    }
    const onDecline = () => {

    }
    return (
        <div className="w-full py-1">
            <div className="flex items-center justify-between ">
               <div className="flex justify-center items-center gap-2">
                    <User className="w-5 h-5"/>
                    <p  className="text-muted-foreground">{user.email}</p>

               </div>
                <div className="ml-auto flex gap-2 py-2 justify-center items-center">
                    <Button variant={'outline'}>Accept</Button>
                    <Button  variant={'destructive'} className="bg-gradient-to-t from-red-500 to-red-400/80 border-t-destructive-foreground">Decline</Button>
                </div>
            </div>
          <hr className="w-full"/>

        </div>
    )
}

export default WaitlistShow