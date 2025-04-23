import styles from "./DashboardArea.module.css"

import SearchIcon from "../../assets/icons/search.svg"
import downArrow from "../../assets/icons/down-arrow.svg"

import { useState } from "react";
import Ticket from "../Ticket/Ticket";

const DashboardArea = () => {

    const tabs = [
        { id: 0, label: "All Tickets" },
        { id: 1, label: "Resolved" },
        { id: 2, label: "Unresolved" },
    ];

    const [activeTab, setActiveTab] = useState(1)

    return (
        <section className={styles.dashboardAreaMain}>
            <div className={styles.dashboardAreaWrapper}>
                <h1>Dashboard</h1>

                <div className={styles.searchDiv}>
                    <input className={styles.searchTicketInput} placeholder="Search for ticket" />
                    <img src={SearchIcon} alt="" className={styles.search} />
                </div>

                <div className={styles.tabContainer}>
                    {
                        tabs.map((tab, index) => {
                            return (
                                <div key={tab.id}
                                    className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {activeTab === tab.id && <img src={downArrow} alt="" />}
                                    {tab.label}
                                </div>
                            )
                        })
                    }

                    <div className={styles.line}></div>
                </div>

                <div className={styles.ticketContainer}>
                    {
                        new Array(5).fill(0).map((ticket, index) => {
                            return (
                                <Ticket key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </section >
    )
}

export default DashboardArea
