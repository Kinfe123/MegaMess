import {type  WaitlistEmail } from "@prisma/client"
import WaitlistShow from "./waitlist-show"
import EmptyBoxWaitlist from "./empty-waitlists"
import { fileById } from "@/lib/file-info"



const Waitlists = async ({ fileId , users}: { fileId: string , users: WaitlistEmail[] }) => {
    const file = await fileById(fileId)
    if(!users.length) {
        return <EmptyBoxWaitlist file={file} />
    }
    return (
        <div className="flex flex-col gap-6">
            {users.map((user) => {
                return (
                    <WaitlistShow user={user} file={file!}/>
                )
            })}

        </div>
    )
}
export default Waitlists