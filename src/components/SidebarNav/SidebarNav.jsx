import styles from "./SidebarNav.module.css"

import dashboardLogo from "../../assets/icons/dashboard-logo.svg"
import contactCenterIcon from "../../assets/icons/contactCenter-icon.svg"
import dashboardIcon from "../../assets/icons/dashboard-icon.svg"
import analyticsIcon from "../../assets/icons/analytics-icon.svg"
import chatbotIcon from "../../assets/icons/chatbot-icon.svg"
import settingsIcon from "../../assets/icons/settings-icon.svg"
import teamIcon from "../../assets/icons/team-icon.svg"

import profileIcon from "../../assets/icons/profileIcon.svg"

const SidebarNav = () => {
    return (
        <nav className={styles.sidebarMain}>
            <div className={styles.sidebarWrapper}>

                <img src={dashboardLogo} alt="Logo" />
                <div>
                    <img src={dashboardIcon} alt="Go To Dashboard" />
                    <span>Dashboard</span>
                </div>
                <div>
                    <img src={contactCenterIcon} alt="Go To Contact Center" />
                    <span>Contact Center</span>
                </div>
                <div>
                    <img src={analyticsIcon} alt="Go To Analytics" />
                    <span>Analytics</span>
                </div>
                <div>
                    <img src={chatbotIcon} alt="Go To Customization" />
                    <span>Chat bot</span>
                </div>
                <div>
                    <img src={teamIcon} alt="Go To Teams" />
                    <span>Team</span>
                </div>
                <div>
                    <img src={settingsIcon} alt="Go To Setttings" />
                    <span>Seting</span>
                </div>

                <div className={styles.settings}>
                    <img src={profileIcon} alt="Go To Setttings" />
                </div>
            </div>

        </nav >
    )
}

export default SidebarNav
