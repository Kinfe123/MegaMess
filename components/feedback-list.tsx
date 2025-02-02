"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { feedbackDelete } from "@/actions/file-actions";
import { toast } from "./ui/use-toast";
import { Card } from "@/components/ui/card";
const Feedback = ({
  feedbackId,
  feedbackAuthor,
  feedbackDescription,
}: {
  feedbackId: string;
  feedbackAuthor: string;
  feedbackDescription: string;
}) => {
  const [pending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(() => {
      feedbackDelete(feedbackId)
        .then((data) => {
          toast({
            title: "Feedback Deleted",
            description: "Feedback successfully deleted",
          });
        })
        .catch((err) => {
          toast({
            title: "Somethint went wrong",
            description: "There is something wrong while deleting the feedback",
          });
        });
    });
  };
  return (
    <Card className="w-full">
      <div className="w-full px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-white">
          {feedbackAuthor}
        </h3>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className=" text-sm text-gray-500">
            <p>{feedbackDescription}</p>
          </div>
          <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
            <Button
              disabled={pending}
              onClick={handleClick}
              type="button"
              variant={"destructive"}
              className="ml-auto inline-flex items-center  rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete File
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default Feedback;

