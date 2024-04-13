import { Feedbacks } from "@prisma/client"
import FeedbackList from "./feedback-list"

const FeedbackLists = async ({fileId , feedbacks}: {fileId: string , feedbacks: Feedbacks[]}) => {
    if(feedbacks.length === 0) {
        return (
            <div className='mt-2 flex justify-center items-center'>
                <p>There is no feedback on this file.</p>

            </div>
        )
    }
    return (
    <>
       <div className="flex flex-col gap-2">

        {feedbacks.map((feedback) => {
            return (
                <FeedbackList feedbackId={feedback.id} feedbackAuthor={feedback.name} feedbackDescription={feedback.description ?? ""} />
                
            )
        })}
        </div>
    </>
 )
   
}

export default FeedbackLists