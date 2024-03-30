
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { File, Logs } from "@prisma/client"
import { use } from "react"

const CardDisplay = ({file , title , icon, description}: {file: Promise<File[] | Logs[]> , title:string , icon: JSX.Element , description: string}) => {
    const filePromise = use(file)
    return (
        <Card className="relative overflow-clip group">
        <CardHeader className="flex  flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>

          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{filePromise.length}</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
    )
}

export default CardDisplay