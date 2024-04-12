import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { topFiles } from "@/lib/file-info";
import { Suspense } from "react";
import TopLists from "./top-list";

export async function RecentPerformers() {
   let tops = await topFiles()
   tops = tops.slice(0 , 5)
  return (
    <div className="space-y-8">
      {tops.map((top) => {
        return (
          <Suspense fallback={<PerformerSkeleton />}>
            <TopLists fileId = {top[0]}/>

          </Suspense>

        )
      })}


    </div>
  );
}



const PerformerSkeleton = () => {
  return (
    <div className="flex flex-col gap-0 justify-center items-start">
      <Skeleton className="w-32 h-3" />
      <Skeleton className="w-72 h-5" />


    </div>
  )
}