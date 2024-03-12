import { cn } from '@/lib/utils'
import styles from './sub-btn.module.css'
import { Loader } from 'lucide-react'
const SubButton = ({ handler, pending }: { handler: () => void, pending: boolean }) => {
    return (
        <button disabled={pending} onClick={handler} className={cn(styles.btn, 'font-heading')}>
            {pending ? (<Loader className='w-3  h-3 animate-spin my-2' />) : "Add"}
        </button>



    )

}
export default SubButton