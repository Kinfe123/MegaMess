import Image from 'next/image'
import GradientImg from '../../../../public/gradient.png'

interface FilePreviewLayoutProps  {
    children: React.ReactNode
}

export default async function FilePreviewLayout({
    children,
}: FilePreviewLayoutProps) {

    return (
        <div className="flex min-h-screen flex-col">
            <div className="absolute left-52 top-[-1100px] transform rotate-180 justify-center items-center flex">
                <Image src={GradientImg} alt="gradinet img" />

            </div>

            <main className="flex-1">{children}</main>
        </div>
    )
}
