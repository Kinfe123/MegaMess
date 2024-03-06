import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { Button } from "@/components/ui/button"
import FileForm from "./upload-form"
import { User } from "@prisma/client"

const EmptyBox =  ({userId , title}: {userId: string , title: string}) => {
    return (
        <EmptyPlaceholder className="bg-gradient-to-tr from-purple-400/10 rounded-md  via-transparent to-transparent/5">
          <EmptyPlaceholder.Icon name="post" />

          <EmptyPlaceholder.Title className="font-heading text-3xl">No <span className='text-gradient_indigo-purple font-extrabold'>{title} Created Yet.</span></EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any {title.toLowerCase()} yet. Start creating {title.toLowerCase()} and share it.
          </EmptyPlaceholder.Description>
          <div className='flex justify-center items-center mx-auto'>
          <FileForm  userId={userId}/>

          </div>
        </EmptyPlaceholder>

    )
}
export default EmptyBox 