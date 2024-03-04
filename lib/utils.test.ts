
const fileUrl = 'https://files.edgestore.dev/syq4tyuw5ogm0mk3/publicFiles/_public/617ce89c-517d-4801-b059-27ca529f68d0.jpg'

export const toSize = async (url: string) => {
    const req = await fetch(url , {
      method:'HEAD'
    })
    const size = req.headers.get("content-length")

    const result = size ? parseInt(size) : 0
    return result
  
  
  }
  

test('Fetch the size from url in Bytes' ,() => {
   expect(toSize(fileUrl)).toBe(4900) 
} )
