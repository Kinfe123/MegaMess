import { Feedbacks } from "@prisma/client"
import Feedback from "./feedback-list"
import { Card } from "./ui/card"
const FeedbackLists = async ({ fileId, feedbacks }: { fileId: string, feedbacks: Feedbacks[] }) => {
    if (feedbacks.length === 0) {
        return (
            <div className='mt-2 flex justify-center items-center'>
                <p>There is no feedback on this file.</p>

            </div>
        )
    }
    return (
        <>

            <div className="flex w-full mr-auto flex-col gap-5 border-b-[1px] border-gray-200/5">
                {feedbacks.map((feedback) => {
                    return (
                        <Feedback feedbackId={feedback.id} feedbackAuthor={feedback.name ?? ""} feedbackDescription={feedback.description ?? ""} />

                    )
                })}
            </div>
        </>
    )

}

export default FeedbackLists