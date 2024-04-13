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
        {feedbacks.map((feedback) => {
            return (
                <FeedbackList feedbackId={feedback.id} feedbackAuthor={feedback.name} feedbackDescription={feedback.description ?? ""} />

            )
        })}
    </>
 )
   
}

export default FeedbackLists