
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    // mokin something that comes as a body - 
    // name , description , fileUrl
    const name = 'TEST NAMEE'
    const description = 'Test Descriptions'
    const fileUrl = 'https://files.edgestore.dev/syq4tyuw5ogm0mk3/publicFiles/_public/e36f81e8-e69f-4c62-91e4-a5f92563fc15.svg'
    const size = '1.4kb'
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    const res = await fetch(`${baseUrl}/api/files` , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'ad0e8fa6a2a5c31dd5b7dd8e3c1195e9',
        },
        body: JSON.stringify({
            name: name,
            description: description,
            fileUrl: fileUrl,
            size: size,

        })
        
    })
    const result = await res.json()

    return new Response(JSON.stringify(result))
} 