import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { topFiles } from "@/lib/file-info";
import { Suspense } from "react";
import TopLists from "./top-list";
import { Separator } from "@/components/ui/separator";

export async function RecentPerformers() {
  const tops = await topFiles()
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
    <div className="flex flex-col gap-1 justify-center items-start">
      <Skeleton className="w-32 h-7" />
      <Skeleton className="w-72 h-10" />


    </div>
  )
}