import DashboardArea from '../../components/DashboardArea/DashboardArea'
import SidebarNav from '../../components/SidebarNav/SidebarNav'
import styles from './Dashboard.module.css'



const Dashboard = () => {

  console.log("In Dashboard")

  return (
    <div className={styles.dashboardMain}>
        <div className={styles.dashboardWrapper}>
          <div className={styles.dasboardSidebar}>
            <SidebarNav activePage = "Dashboard" />
          </div>

          <div className={styles.dashboardTicketArea}>
            <DashboardArea />
          </div>
        </div>
    </div>
  )
}

export default Dashboard
