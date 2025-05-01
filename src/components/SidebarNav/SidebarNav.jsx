import styles from "./SidebarNav.module.css"

import dashboardLogo from "../../assets/icons/dashboard-logo.svg"
import contactCenterIcon from "../../assets/icons/contactCenter-icon.svg"
import dashboardIcon from "../../assets/icons/dashboard-icon.svg"
import analyticsIcon from "../../assets/icons/analytics-icon.svg"
import chatbotIcon from "../../assets/icons/chatbot-icon.svg"
import settingsIcon from "../../assets/icons/settings-icon.svg"
import teamIcon from "../../assets/icons/team-icon.svg"

import profileIcon from "../../assets/icons/profileIcon.svg"
import { Link, useNavigate } from "react-router-dom"
import { logoutUser } from "../../Redux/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { clearTicketData } from "../../Redux/slices/ticketSlice"
import { useEffect } from "react"


const SidebarNav = ({ activePage }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const payload = useSelector((store) => store.USER.payload)
    const token = useSelector((store) => store.USER.token)

    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(clearTicketData())
    }

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token]);

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
                {
                    payload?.role === "ADMIN" ?
                        <Link to="/TeamMembers" className={styles.link}>
                            <img src={teamIcon} alt="Go To Teams" />
                            {activePage === "Team" && <span>Team</span>}
                        </Link> : null
                }
                <Link to="/Settings" className={styles.link}>
                    <img src={settingsIcon} alt="Go To Setttings" />
                    {activePage === "Settings" && <span>Seting</span>}
                </Link>

                <Link className={styles.settings} onClick={handleLogout}>
                    <img src={profileIcon} alt="Go To Setttings" />
                </Link>
            </div>

        </nav >
    )
}

export default SidebarNav
