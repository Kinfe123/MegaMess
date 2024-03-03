import Link from 'next/link'
import { env } from '@/env.mjs'
const FallBack = () => {
    return (
        <div className='h-full flex justify-center items-center'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading">No such is exists :) </h1>
            <p>You create on  <Link href={`${env.NEXT_PUBLIC_APP_URL}`}>here</Link></p>

        </div>
    )
}

export default FallBack