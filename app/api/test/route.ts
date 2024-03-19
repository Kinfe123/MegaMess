export async function GET(req: Request) {
    const res = await fetch('http://localhost:3000/api/files' , {
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'works',
        }
    })

    return new Response('Hello wrodl')
} 