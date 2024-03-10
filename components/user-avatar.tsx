import * as React from "react"
import { type User, type File } from "@prisma/client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Skeleton } from "./ui/skeleton";
import { getUserById } from "@/lib/user";
import { allowedEmailForFile, allowedOwnerEmail } from "@/actions/file-actions";


interface PromiseProps {
  user: {
    image: string | null,
    name: string | null;
  } & File
}
type UserAvatarProps = {
  promise: Promise<({ user: { image: string | null; name: string | null; firstName: string | null; lastName: string | null }; } & File) | null> 
  fileIdInfo: Promise<string | undefined>
};


const UserAvatar = async ({ promise  , fileIdInfo}: UserAvatarProps) => {
  const user = await promise
  const fileId = await fileIdInfo
  const allowed = await allowedEmailForFile(fileId!)
  const allowFileOwner = await allowedOwnerEmail(fileId!)
  if(( user?.visiblity === 'EMAIL' &&  !allowed) || user?.visiblity === 'PRIVATE'  || allowFileOwner) {
    return (
      <>
      <span>You are allowed to see the details</span>
      </>
    )
  }
  const firstName = user?.user.firstName ?? ""
  const lastName = user?.user.lastName ?? ""
  const fullName = firstName + lastName
  const initials = `${fullName?.charAt(0) ?? ""} ${lastName.charAt(0) ?? ""}`
  return (
    <div className="flex gap-2 ">
      <Avatar>
        <AvatarImage src={user?.user.image ?? 'https://kc.com/asa'} alt={(user?.user.name as string) ?? 'MegaMesser Pic'} />
        <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col items-start justify-center gap-[-20px]'>
        <p className='leading-none" text-sm font-medium'>{user?.user.name}</p>
        <React.Suspense fallback={<Skeleton className="w-7 h-3" />}>
          <p className='text-xs leading-none text-white/60'></p>
          {fullName.length > 0 ? `${fullName}` : "MegaMesser"}
        </React.Suspense>
      </div>


    </div>

  )

}

export { UserAvatar }