import {type  WaitlistEmail } from "@prisma/client"
import WaitlistShow from "./waitlist-show"



const Waitlists = ({ fileId , users}: { fileId: string , users: WaitlistEmail[] }) => {
    return (
        <div>
            {users.map((user) => {
                return (
                    <WaitlistShow user={user}/>
                )
            })}

        </div>
    )
}
export default Waitlists