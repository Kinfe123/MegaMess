
'use client'
import { UserAvatar } from "@/components/shared/user-avatar"
import { Button } from "@/components/ui/button"
import { type WaitlistEmail } from "@prisma/client"
import { useTransition } from "react"


const WaitlistShow = ({user }:{user:WaitlistEmail}) => {
    console.log('Email : ' , user)
    const [pending , startTransition] = useTransition()

    const onAccept = () => {

    }
    const onDecline = () => {

    }
    return (
        <div className="w-full">
            <div className="flex items-center justify-between ">
                <p>{user.email}</p>
                <div className="ml-auto flex gap-2 justify-center items-center">
                    <Button>Accept</Button>
                    <Button>Decline</Button>
                </div>
            </div>


        </div>
    )
}

export default WaitlistShow