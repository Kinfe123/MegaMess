export async function GET(req: Request) {
    // mokin something that comes as a body - 
    // name , description , fileUrl
    const name = 'Test name'
    const description = 'Test Description'
    const fileUrl = 'https://files.edgestore.dev/syq4tyuw5ogm0mk3/publicFiles/_public/e36f81e8-e69f-4c62-91e4-a5f92563fc15.svg'
    const size = '1.4kb'
    const res = await fetch('http://localhost:3000/api/files' , {
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


    console.log(result)

    return new Response('Hello wrodl')
} 