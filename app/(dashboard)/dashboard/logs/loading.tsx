import { Card , CardHeader , CardTitle , CardDescription  } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LogsSkeleton = () => {
    return (
        <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="grid gap-1">
                <CardTitle><Skeleton className='w-14 h-5' /></CardTitle>
                <CardDescription><Skeleton className="w-24 h-10" /></CardDescription>
            </div>

        </CardHeader>


    </Card>
    )
}

export default LogsSkeleton