import styles from "./DashboardArea.module.css"

const DashboardArea = () => {
  return (
    <section className={styles.dashboardAreaMain}>
        <div className={styles.dashboardAreaWrapper}>
            <h1>Dashboard</h1>

            <div className={styles.searchTicket}></div>

            <div>
                <div>
                    tabs
                </div>

                <div>
                    ticket
                </div>
            </div>
        </div>
    </section>
  )
}

export default DashboardArea
