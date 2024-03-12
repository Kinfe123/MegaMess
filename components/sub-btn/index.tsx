import styles from './sub-btn.module.css'
const SubButton = ({ handler }: { handler: () => void }) => {
    return (
        <button onClick={handler} className={styles.btn}>
            Add
        </button>



    )

}
export default SubButton