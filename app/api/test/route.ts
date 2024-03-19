export async function GET(req: Request) {
    const res = await fetch('http://localhost:3000/api/files' , {
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'ad0e8fa6a2a5c31dd5b7dd8e3c1195e9',
        }
        
    })
    const result = await res.json()
    console.log(result)

    return new Response('Hello wrodl')
} 