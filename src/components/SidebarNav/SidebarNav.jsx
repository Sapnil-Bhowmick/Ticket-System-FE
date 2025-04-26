import styles from "./SidebarNav.module.css"

import dashboardLogo from "../../assets/icons/dashboard-logo.svg"
import contactCenterIcon from "../../assets/icons/contactCenter-icon.svg"
import dashboardIcon from "../../assets/icons/dashboard-icon.svg"
import analyticsIcon from "../../assets/icons/analytics-icon.svg"
import chatbotIcon from "../../assets/icons/chatbot-icon.svg"
import settingsIcon from "../../assets/icons/settings-icon.svg"
import teamIcon from "../../assets/icons/team-icon.svg"

import profileIcon from "../../assets/icons/profileIcon.svg"
import { Link } from "react-router-dom"


const SidebarNav = ({activePage}) => {

    // console.log("activePage" , activePage)

    return (
        <nav className={styles.sidebarMain}>
            <div className={styles.sidebarWrapper}>

                <img src={dashboardLogo} alt="Logo" />
                <Link to="/Dashboard" className={styles.link}>
                    <img src={dashboardIcon} alt="Go To Dashboard" />
                    {activePage === "Dashboard" && <span>Dashboard</span>}
                </Link>
                <Link to="/ContactCenter" className={styles.link}>
                    <img src={contactCenterIcon} alt="Go To Contact Center" />
                    {activePage === "ContactCener" && <span>Contact Center</span>}
                </Link>
                <Link to="/Analytics" className={styles.link}>
                    <img src={analyticsIcon} alt="Go To Analytics" />
                    {activePage === "Analytics" && <span>Analytics</span>}
                </Link>
                <Link to="/Customization" className={styles.link}>
                    <img src={chatbotIcon} alt="Go To Customization" />
                    {activePage === "ChatBot" && <span>Chat bot</span>}
                </Link>
                <Link to="/TeamMembers" className={styles.link}>
                    <img src={teamIcon} alt="Go To Teams" />
                    {activePage === "Team" && <span>Team</span>}
                </Link>
                <Link to="/Settings" className={styles.link}>
                    <img src={settingsIcon} alt="Go To Setttings" />
                    {activePage === "Settings" && <span>Seting</span>}
                </Link>

                <Link className={styles.settings}>
                    <img src={profileIcon} alt="Go To Setttings" />
                </Link>
            </div>

        </nav >
    )
}

export default SidebarNav
