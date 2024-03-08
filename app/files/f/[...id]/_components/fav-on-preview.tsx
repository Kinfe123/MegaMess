'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { type User } from "@prisma/client"
import { Heart, Loader } from "lucide-react"
import { useSigninModal } from "@/hooks/use-signin-modal"
import { useTransition } from "react"
import { fileFav } from "@/actions/file-actions"
import { favByFileId, favFiles } from "@/lib/fille"
import { toast } from "@/components/ui/use-toast"
type UserProps = {
    user: User & {
        id: string
    }
}
const FavIt = ({ userId, fileId, ownerId }: { userId: string, fileId: string, ownerId: string }) => {

    const promise = React.use(favByFileId(fileId))
    console.log("Hello worl" , promise)
    const [pending, startTransition] = useTransition()
    const handleClick = () => {
        if (userId) {

            startTransition(() => {
                fileFav(ownerId, fileId).then(() => {
                    toast({
                        title: "Woohaa! File Added to Fav list",
                        description: "You have successfully added a file to fav list "
                    })

                }).catch((err) => {
                    toast({
                        title: "Something went wrong",
                        description: 'The file has not been added to the fav list'
                    })
                })
            })
        } else {
            signInModal.onOpen()
        }
    }
    const signInModal = useSigninModal()
    if (!userId) {
        return

    }

    return (
        <Button disabled={pending} onClick={handleClick} className="flex gap-2 justify-center items-center ">
            {pending ? <Loader className="w-3 h-3 animate-spin" /> : <Heart className="w-3 h-3" />}
            <span>{userId ? 'Fav It' : ''}</span>

        </Button>
    )
}

export default FavIt