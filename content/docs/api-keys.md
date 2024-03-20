---
title: API Keys
description: How to create and get started using our api keys
---

<Callout>

API Keys makes it easier 
</Callout>


# Getting started 

Go to the [`dashboard/api-keys`](https://mega-mess.vercel.app/) and create an API key there.

## Setting up an API Key

Once you have clicked `Create API Key` button , you will be asked for name and description , which both are non required feild and the website that you want to use that out service , but it is recomended to have a name and description so that you kind of idea about for which purpose you are utilizing that API endpoint. 

## Using the API Keys 

After copying the api keys you can using in your app

for Nextjs/React . you can use 

```js
export async function GET(req: Request) {
    // mokin something that comes as a body - 
    // name , description , fileUrl
    const name = 'Test name'
    const description = 'Test Descriptions'
    const fileUrl = 'https://files.edgestore.dev/syq4tyuw5ogm0mk3/publicFiles/_public/e36f81e8-e69f-4c62-91e4-a5f92563fc15.svg'
    const size = '1.4kb'
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    const res = await fetch(`https://mega-mess.vercel.app/api/files` , {
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

    return new Response(result)
} 
```

However to avoid the test names , test description , and the file url i highly recommend checking the our custome made comps for handling [file upload](https://github.com/Kinfe123/MegaMess/blob/main/app/(dashboard)/dashboard/_components/file-upload.tsx) with EdgeStore.



Then this give you the response which seems like below 


```json
{
    "id": "clu08y76o0003npsz4ig65gl8",
    "name": "TEST NAMEE",
    "description": "Test Descriptions",
    "fileUrl": "https://files.edgestore.dev/syq4tyuw5ogm0mk3/publicFiles/_public/e36f81e8-e69f-4c62-91e4-asa.svg",
    "size": "1.4kb",
    "userId": "cltoy4tyq00018px24ef2wvvg",
    "visiblity": "PRIVATE",
    "createdAt": "2024-03-20T20:19:08.640Z",
    "updatedAt": "2024-03-20T20:19:08.640Z"
}
```


After that you now you got a file uploader component , file uploader api endpoints along with request headers including your API Key and now you can your files in our [`dashboard`](https://mega-mess.vercel.app/).


