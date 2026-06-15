import styles from "./Skeleton.module.css"

export default function Skeleton() {
  return (
    <div className={styles.skeleton} role="status" aria-label="Loading">
      <div className={styles.header}>
        <div className={styles.avatar} />
        <div className={styles.headerLines}>
          <div className={`${styles.headerLine} w-3/5`} />
          <div className={`${styles.headerLine} w-2/5`} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={`${styles.bodyLine} w-full`} />
        <div className={`${styles.bodyLine} w-full`} />
        <div className={`${styles.bodyLine} w-2/3`} />
      </div>
    </div>
  )
}
