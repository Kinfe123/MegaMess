import { createLogs } from "@/actions/log-actions";
export async function POST(req: Request) {
    try {
        const startTimestamp = Date.now();
        const {fileId , status , email , filename} = await req.json()
 
        const origin_place = req.headers.get('referer') || ''
        const description = status ? `${email} has made a view requst to the file ${filename}`  : `Unsuccessful Attempt from an email ${email}` 
        // Get the request origin IP address
        const origin_ip = req.headers.get('x-forwarded-for') || ''
        const user_agent = req.headers.get('user-agent') || ''
        const endTimeStamp = Date.now();
        const responsTime = endTimeStamp - startTimestamp
        const requestToDB = await createLogs(fileId , status , description, origin_ip , origin_place , user_agent , responsTime.toString())
        if(requestToDB) {
            return new Response(JSON.stringify(requestToDB))

        }else {
            return new Response('Not Logged' , {status:400})
        }
        
    }catch(err) {
        throw new Error("Error has occured")
    }




}