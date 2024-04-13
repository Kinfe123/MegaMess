import { Feedbacks } from "@prisma/client"
import FeedbackList from "./feedback-list"

const FeedbackLists = async ({fileId , feedbacks}: {fileId: string , feedbacks: Feedbacks[]}) => {
 return (
    <>
        {feedbacks.map((feedback) => {
            return (
                <FeedbackList feedbackId={feedback.id} feedbackAuthor={feedback.name} feedbackDescription={feedback.description} />

            )
        })}
    </>
 )
   
}

export default FeedbackLists