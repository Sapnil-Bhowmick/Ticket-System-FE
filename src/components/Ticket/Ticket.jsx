import styles from "./Ticket.module.css"

import userAvatar from "../../assets/icons/userAvatar.svg"
import { Link } from "react-router-dom"


const Ticket = () => {
    return (
        <div className={styles.ticketContainer}>
            <div className={styles.ticketInfo}>
                <div className={styles.timeDiv}>
                    <div className={styles.ticket}>
                        <span className={styles.active}></span>
                        <span className={styles.ticketNo}>Ticket# 2023-00123</span>
                    </div>

                    <div className={styles.postedTime}>
                        Posted at 12:45 AM
                    </div>
                </div>

                <div className={styles.ticketBody}>
                    <p className={styles.desc}>I have a doubt regarding todays class ?</p>
                    <span className={StyleSheet.elapsedTime}>10:00</span>
                </div>
            </div>

            <div className={styles.ticketSender}>
                <div className={styles.user}>
                    <img src={userAvatar} alt="User Image" />
                    <div className={styles.userInfo}>
                        <span>John Snow</span>
                        <span>+91-0000000000</span>
                        <span>example@gmail.com</span>
                    </div>
                </div>

                <Link className={styles.openTicket}>Open Ticket</Link>
            </div>
        </div>
    )
}

export default Ticket
