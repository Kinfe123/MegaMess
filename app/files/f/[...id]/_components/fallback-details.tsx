'use client'

import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"


const FallBackDetails = ({email}: {email:string | undefined}) => {
    const [email_ , setEmail] = useState(email ?? "")
    const handleClick = () => {
        // TODO: adding this to db so that the admin can approve it
    }
    return (
        <EmptyPlaceholder className="w-full bg-gradient-to-tr from-purple-400/10 rounded-md  via-transparent to-transparent/5 mx-auto">
          <EmptyPlaceholder.Icon name="post" />

          <EmptyPlaceholder.Title className="font-heading text-3xl">You dont have the right access to access the file .</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Please if you think this not expected please add your email below for the file owner to approve you          
          </EmptyPlaceholder.Description>
          <div className='flex justify-center items-center mx-auto gap-4'>
            <Input type="email" className='w-80'value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Button onClick={handleClick}>Submit</Button>

          </div>
        </EmptyPlaceholder>

    )
}
export default FallBackDetails 