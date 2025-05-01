import styles from "./SingleChat.module.css"

import userAvatar from "../../../assets/icons/userAvatar.svg"
import { useDispatch, useSelector } from "react-redux"
import { addActiveTicket } from "../../../Redux/slices/ticketSlice"

const SingleChat = ({ ticketData, chatNo }) => {

  const dispatch = useDispatch()
  const activeTicket = useSelector((store) => store.TICKET.activeTicket)

  const handleActiveChat = () => {
    dispatch(addActiveTicket({
      data: ticketData ,
      chatNo
    }))
  }

  return (
    <div
      className={styles.chatMain}
      style={{ backgroundColor: activeTicket?._id === ticketData?._id && "#EFEFEF" }}
      onClick={handleActiveChat}
    >
      <div>
        <img src={ticketData.creatorID.profilePic} alt="User Avatar" />
      </div>

      <div className={`${styles.info} ${activeTicket?._id === ticketData?._id && styles.activeChat}`}>
        <span className={styles.chatNo}>Chat {chatNo}</span>
        <span className={styles.query}>
          {
            ticketData?.latestMessage?.message.length > 30 ?
              ticketData?.latestMessage?.message?.substring(0, 30) + "..." : ticketData?.latestMessage?.message
          }
        </span>
      </div>
    </div>
  )
}

export default SingleChat
