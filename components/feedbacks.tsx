import { Feedbacks } from "@prisma/client"

const FeedbackLists = async ({fileId , feedbacks}: {fileId: string , feedbacks: Feedbacks[]}) => {
 return (
    <>
        {feedbacks.map((feedback) => {
            return (

            )
        })}
    </>
 )
   
}

export default FeedbackLists