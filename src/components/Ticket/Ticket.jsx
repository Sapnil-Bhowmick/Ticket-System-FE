import styles from "./Ticket.module.css"

import userAvatar from "../../assets/icons/userAvatar.svg"
import { Link, useNavigate } from "react-router-dom"
import { formatDate, formatTime, getElapsedTime } from "../../utils/dateTime"
import { addActiveTicket } from "../../Redux/slices/ticketSlice"
import { useDispatch } from "react-redux"



const Ticket = ({ticketdata , ticketNo}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOpenTicket = () => {
        dispatch(addActiveTicket({
            data: ticketdata,
            chatNo: ticketNo
        }))

        navigate("/ContactCenter")
    }



    return (
        <div className={styles.ticketContainer}>
            <div className={styles.ticketInfo}>
                <div className={styles.timeDiv}>
                    <div className={styles.ticket}>
                        <span className={styles.active}></span>
                        <span className={styles.ticketNo}>Ticket# {formatDate(ticketdata.createdAt)}</span>
                    </div>

                    <div className={styles.postedTime}>
                        Posted at {formatTime(ticketdata.createdAt)}
                    </div>
                </div>

                <div className={styles.ticketBody}>
                    <p className={styles.desc}>{ticketdata.description}</p>
                    <span className={StyleSheet.elapsedTime}>{getElapsedTime(ticketdata.createdAt)}</span>
                </div>
            </div>

            <div className={styles.ticketSender}>
                <div className={styles.user}>
                    <img src={ticketdata.creatorID.profilePic} alt="User Image" />
                    <div className={styles.userInfo}>
                        <span>{ticketdata.creatorID.name}</span>
                        <span>{ticketdata.creatorID.phone}</span>
                        <span>{ticketdata.creatorID.emailID}</span>
                    </div>
                </div>

                <Link className={styles.openTicket} onClick={handleOpenTicket}>Open Ticket</Link>
            </div>
        </div>
    )
}

export default Ticket
