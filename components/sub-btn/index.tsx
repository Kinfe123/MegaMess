import { cn } from '@/lib/utils'
import styles from './sub-btn.module.css'
import { Loader } from 'lucide-react'
import { Button } from '../ui/button'
const SubButton = ({ handler, pending }: { handler: () => void, pending: boolean }) => {
    return (
        <Button  disabled={pending} onClick={handler} className={cn(styles.btn, 'font-heading px-1 py-4')}>
            {pending ? (<Loader className='w-3  h-3 animate-spin my-2' />) : "Add"}
        </Button>



    )

}
export default SubButton