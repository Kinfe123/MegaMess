import { cn } from '@/lib/utils'
import styles from './sub-btn.module.css'
const SubButton = ({ handler }: { handler: () => void }) => {
    return (
        <button onClick={handler} className={cn(styles.btn , 'font-heading')}>
            Add
        </button>



    )

}
export default SubButton