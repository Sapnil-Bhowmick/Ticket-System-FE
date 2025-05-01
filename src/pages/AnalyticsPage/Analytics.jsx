import styles from "./Analytics.module.css"

import SidebarNav from "../../components/SidebarNav/SidebarNav.jsx"
import LineChart from "../../components/LineChart/LineChart.jsx"
import PieChart from "../../components/PieChart/PieChart.jsx";

import axios from "axios";
import { useEffect, useState } from "react";
import { api_constants } from "../../utils/api_constants.js";
import { useSelector } from "react-redux";


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


  const token = useSelector((store) => store.USER.token)
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    getAnalytics()
  }, [])


  const getAnalytics = async () => {
    // console.log("inside add member api")
    try {
      const res = await axios.get(
        api_constants.BASE_URL + api_constants.GET_ALL_ANALYTICS,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )

      setAnalytics(res.data.data)

    }
    catch (err) {
      const errMessage = err?.response?.data?.error?.message
      if (errMessage) {
        toast.error(errMessage)
      }
    }
  }


  return (
    <div className={styles.analyticsMain}>
      <div className={styles.analyticsWrapper}>

        <div className={styles.analyticsSidebar}>
          <SidebarNav activePage="Analytics" />
        </div>

        <div className={styles.analyticsArea}>
          <p>Analytics</p>
          <div className={styles.lineChart}>
            <p>Missed Chats</p>
            <LineChart missedChat_DataPoints={analytics ? analytics.missedChat_DataPoints : []} />
          </div>

          <div className={styles.avgReplTime}>
            <div>
              <h2>Average Reply time</h2>
              <p>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses will get you more conversations, help you earn customers trust and make more sales.</p>
            </div>
            <span>{analytics && analytics.avgReplyTimeInSeconds} secs</span>
          </div>

          <div className={styles.resolvedTickets}>
            <div>
              <h2>Resolved Tickets</h2>
              <p>A callback system on a website, as well as proactive invitations, help to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.</p>
            </div>
            <div className={styles.pieChartDiv}>
              <PieChart
                totalTickets={analytics ? analytics.totalTickets : 0}
                totalResolvedTickets={analytics ? analytics.totalResolvedTickets : 0}
              />
            </div>
          </div>

          <div className={styles.totalChats}>
            <div>
              <h2>Total Chats</h2>
              <p>This metric Shows the total number of chats for all Channels for the selected the selected period </p>
            </div>
            <span>{analytics && analytics.totalChats} chats</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Analytics
