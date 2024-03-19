export async function GET(req: Request) {
    const headers =  req.headers
    
   

    const apikey =  headers.get('api-key')
    console.log('iT MIGHT WORK ' , apikey)
     
    return new Response('Hello world')
} 