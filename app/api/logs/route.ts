import { createLogs } from "@/actions/log-actions";
export async function GET(req: Request) {
    try {
        const startTimestamp = Date.now();
        const {fileId , status} = await req.json()
 
        const origin_place = req.headers.get('referer') || ''

        // Get the request origin IP address
        const origin_ip = req.headers.get('x-forwarded-for') || ''
        const user_agent = req.headers.get('user-agent') || ''
        const endTimeStamp = Date.now();
        const responsTime = endTimeStamp - startTimestamp
        const requestToDB = await createLogs(fileId , status , origin_ip , origin_place , user_agent , responsTime.toString())
        if(requestToDB) {
            return new Response(JSON.stringify(requestToDB))

        }
        return new Response(JSON.stringify({origin_place , origin_ip}))
        
    }catch(err) {
        throw new Error("Error has occured")
    }




}