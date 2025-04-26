import styles from "./Analytics.module.css"

import SidebarNav from "../../components/SidebarNav/SidebarNav.jsx"
import LineChart from "../../components/LineChart/LineChart.jsx"
import PieChart from "../../components/PieChart/PieChart.jsx";

const Analytics = () => {

  const missedChat_DataPoints = [
    { label: "Week 10 - 2025", week: "10", year: "2025", missedChats: 2 },
    { label: "Week 11 - 2025", week: "11", year: "2025", missedChats: 5 },
    { label: "Week 12 - 2025", week: "12", year: "2025", missedChats: 1 },
    { label: "Week 13 - 2025", week: "13", year: "2025", missedChats: 3 },
    { label: "Week 14 - 2025", week: "14", year: "2025", missedChats: 4 },
    { label: "Week 15 - 2025", week: "15", year: "2025", missedChats: 2 },
    { label: "Week 16 - 2025", week: "16", year: "2025", missedChats: 1 },
    { label: "Week 17 - 2025", week: "17", year: "2025", missedChats: 0 },
    { label: "Week 18 - 2025", week: "18", year: "2025", missedChats: 3 },
    { label: "Week 19 - 2025", week: "19", year: "2025", missedChats: 2 },
  ];


  return (
    <div className={styles.analyticsMain}>
      <div className={styles.analyticsWrapper}>

        <div className={styles.analyticsSidebar}>
          <SidebarNav activePage = "Analytics" />
        </div>

        <div className={styles.analyticsArea}>
          <p>Analytics</p>
          <div className={styles.lineChart}>
            <p>Missed Chats</p>
            <LineChart missedChat_DataPoints={missedChat_DataPoints} />
          </div>

          <div className={styles.avgReplTime}>
            <div>
              <h2>Average Reply time</h2>
              <p>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses will get you more conversations, help you earn customers trust and make more sales.</p>
            </div>
            <span>0 secs</span>
          </div>

          <div className={styles.resolvedTickets}>
            <div>
              <h2>Resolved Tickets</h2>
              <p>A callback system on a website, as well as proactive invitations, help to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.</p>
            </div>
            <div className={styles.pieChartDiv}>
              <PieChart />
            </div>
          </div>

          <div className={styles.totalChats}>
            <div>
              <h2>Total Chats</h2>
              <p>This metric Shows the total number of chats for all Channels for the selected the selected period </p>
            </div>
            <span>122 chats</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Analytics
