
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { APIKey, File, Logs } from "@prisma/client"
import { use } from "react"

const CardDisplay = ({file , title , icon, description}: {file: Promise<File[] | Logs[] | APIKey[]> , title:string , icon: JSX.Element , description: string}) => {
    const filePromise = use(file)
    let sum = 0
    if(title === "Total Downloads") {
        console.log(filePromise)
        const filtered = filePromise.map((f) => f.downloads) 
        sum = filtered.reduce((prev , curr) => prev + curr)
        

    }
    return (
        <Card className="relative overflow-clip group">
        <CardHeader className="flex  flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>

          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sum === 0 ? filePromise.length :  sum }</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
    )
}

export default CardDisplay