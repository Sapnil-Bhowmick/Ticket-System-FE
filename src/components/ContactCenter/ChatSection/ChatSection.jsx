import { useDispatch, useSelector } from "react-redux"
import SingleChat from "../SingleChat/SingleChat"
import styles from "./ChatSection.module.css"
import toast from "react-hot-toast"
import axios from "axios"
import { useEffect } from "react"
import { add_all_tickets } from "../../../Redux/slices/ticketSlice"
import { api_constants } from "../../../utils/api_constants.js"



const ChatSection = () => {

  const dispatch = useDispatch()

  const activeTicket = useSelector((store) => store.TICKET.activeTicket)
  const token = useSelector((store) => store.USER.token)
  const all_tickets = useSelector((store) => store.TICKET.all_tickets)

  useEffect(() => {
    getAllTickets()
    console.log("in useEffect -> chatSection")
  }, [activeTicket])

  const getAllTickets = async () => {
    console.log("inside getAllTickets")
    try {
      const res = await axios.get(
        api_constants.BASE_URL + api_constants.TICKET_ALL,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )

      console.log("RESPONSE", res)

      const { data: ticketData } = res.data
      dispatch(add_all_tickets({
        data: ticketData
      }))

      // console.log(res.data)
    }
    catch (err) {
      toast.error("Unable to fetch Chats")
    }
  }


  return (
    <div className={styles.chatSectionMain}>
      <div className={styles.chatSectionWrapper}>
        <h1>Contact Center</h1>

        <div className={styles.tab}>
          <span>Chats</span>
          <div className={styles.line}></div>
        </div>

        <div className={styles.chatContainer}>
          {
            all_tickets && all_tickets.length !== 0 ? (
              all_tickets.map((ticket , index) => <SingleChat key={ticket._id} ticketData={ticket} chatNo={index + 1} />)
            ) : (
              <p className={styles.notFoundText}>No Chats Found</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ChatSection
