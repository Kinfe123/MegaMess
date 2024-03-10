// @ts-nocheck
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { Button } from "@/components/ui/button"
import { VisiblityBtn } from "@/app/files/f/[...id]/_components/visiblity-popup"
import { type File } from "@prisma/client"
const EmptyBoxWaitlist =  ({file}: {file:File | null}) => {
    
    return (
        <EmptyPlaceholder className="bg-gradient-to-tr from-purple-400/10 rounded-md  via-transparent to-transparent/5">
          <EmptyPlaceholder.Icon name="post" />

          <EmptyPlaceholder.Title className="font-heading text-3xl">No <span className='text-gradient_indigo-purple font-bold'>Waitlists Users</span></EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You dont have any waitlisted users but you can <span className='font-bold'>invite</span> here
          </EmptyPlaceholder.Description>
          <div className='flex text-black hover:text-white bg-white rounded-lg  justify-center items-center mx-auto'>
            {/* //@ts-ignore */}
            <VisiblityBtn file={file} />
          </div>
        </EmptyPlaceholder>

    )
}
export default EmptyBoxWaitlist 