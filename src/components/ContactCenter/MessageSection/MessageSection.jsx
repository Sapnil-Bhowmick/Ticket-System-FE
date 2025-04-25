import styles from "./MessageSection.module.css"

import dashboard from "../../../assets/icons/dashboard-icon.svg"
import sendIcon from "../../../assets/icons/sendIcon.svg"
import SingleMessage from "../SingleMessage/SingleMessage"
import { Link } from "react-router-dom"



const MessageSection = () => {

    const goToDashboard = () => {

    }

    return (
        <div className={styles.messageSectionMain}>
            <div className={styles.messageSectionWrapper}>

                <div className={styles.ticketAddress}>
                    <span>Ticket# 2025-00123</span>
                    <img src={dashboard} alt="" onClick={goToDashboard()}/>
                </div>

                <div className={styles.typeMessageDiv}>
                    <div>
                        <textarea placeholder="Type here" />
                        <img src={sendIcon} alt="" className={styles.sendIcon} />
                    </div>
                </div>

                <div className={styles.messageContainer}>
                    <div className={styles.messageTime}>
                        <div className={styles.line}></div>
                        <p>March 7, 2025</p>
                        <div className={styles.line}></div>
                    </div>


                    {/* <SingleMessage isSender={true} />
                    <SingleMessage isSender={false} />
                    <SingleMessage isSender={true} />


                    <SingleMessage isSender={true} />
                    <SingleMessage isSender={false} />
                    <SingleMessage isSender={true} /> */}

                    {
                        new Array(3).fill(0).map((message, index) => <SingleMessage isSender={true} key={index} />)
                    }


                </div>

            </div>
        </div>
    )
}

export default MessageSection
