'use client'
import { Button } from "@/components/ui/button"
import { type User } from "@prisma/client"
import { Heart } from "lucide-react"
import { useSigninModal } from "@/hooks/use-signin-modal"
import { useTransition } from "react"
import { fileFav } from "@/actions/file-actions"
import { favFiles } from "@/lib/fille"
import { toast } from "@/components/ui/use-toast"
type UserProps = {
    user: User & {
        id: string
    }
}
const FavIt = ({ userId , fileId , ownerId }: {userId: string, fileId: string , ownerId: string } ) => {


    const [pending , startTransition] = useTransition()
    const handleClick = () => {
        startTransition(() => {
            fileFav(ownerId , fileId ).then(() => {
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
    }
    const signInModal = useSigninModal()
    if (!userId) {
        return 
        
    }

    return (
        <Button className="flex gap-2 justify-center items-center ">
            <Heart className="w-3 h-3"/>
            <span>{userId ? 'Fav It' : ''}</span>
            
        </Button>
    )
}

export default FavIt