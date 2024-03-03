import * as React from "react"
import { type User, type File } from "@prisma/client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


interface PromiseProps  {
    user: {
        image: string | null,
         name: string | null;
    } & File  
}
type UserAvatarProps = {
    promise: Promise<({ user: { image: string | null; name: string | null; }; } & File) | null>  
   
};


const UserAvatar = async ({promise}: UserAvatarProps) => {
  const user  = await promise
  console.log('the user from avatar is : ' , user)
  
  const fullNameSplit = (user?.user.name as string).split(" ")
  const firstName = fullNameSplit[0]
  const lastName = fullNameSplit[fullNameSplit.length - 1]
  const initials = `${firstName.charAt(0) ?? ""} ${lastName.charAt(0) ?? ""}`
  return (
    <div className="flex gap-2 ">
      <Avatar>
        <AvatarImage src={user?.user.image ?? 'https://kc.com/asa'} alt={(user?.user.name as string) ?? 'MegaMesser Pic'} />
        <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col items-start justify-center gap-[-20px]'>
        <p className='leading-none" text-sm font-medium'>{user?.user.name}</p>
        <p className='text-xs leading-none text-muted-foreground'>MegaMesser</p>
      </div>
    </div>

  )

}

export { UserAvatar }