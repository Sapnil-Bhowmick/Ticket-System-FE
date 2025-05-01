import styles from "./MessageSection.module.css"

import dashboard from "../../../assets/icons/dashboard-icon.svg"
import sendIcon from "../../../assets/icons/sendIcon.svg"
import SingleMessage from "../SingleMessage/SingleMessage"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { formatDate, formattedDate } from "../../../utils/dateTime"
import { api_constants } from "../../../utils/api_constants"
import axios from "axios"
import toast from "react-hot-toast"
import { useEffect, useRef, useState } from "react"
import { add_ActiveTicketMessages, addNewMessage } from "../../../Redux/slices/messageSlice"


const MessageSection = () => {

    const dispatch = useDispatch()
    const lastMessageRef = useRef(null)

    const activeTicket = useSelector((store) => store.TICKET.activeTicket)
    const { token, userInfo } = useSelector((store) => store.USER)
    const activeChatMessages = useSelector((store) => store.MESSAGE.activeTicketMessages)
    const navigate = useNavigate()

    // console.log("userInfo" , userInfo)
    // console.log("ACTIVE_TICKET" , activeTicket)

    const [inputMessage, setInputMessage] = useState("")

    const handleSendMessage = () => {
        if (inputMessage.trim().length > 0) {
            setInputMessage("")
            sendMessage()
        }
    }

    useEffect(() => {
        getAllMessages()
    }, [activeTicket])

    useEffect(() => {
        // * Auto scroll to the latest chat
        if (lastMessageRef.current) {
            // console.log("Scolling...")
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [activeTicket, activeChatMessages]);


    const sendMessage = async () => {
        try {
            const res = await axios.post(
                api_constants.BASE_URL + api_constants.ADMIN_SEND_MESSAGE, {
                message: inputMessage,
                ticketID: activeTicket._id
            },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            const { data: ticketData } = res.data

            dispatch(addNewMessage({
                data: ticketData
            }))


        }
        catch (err) {
            // toast.error("Unable to Send message")
            // console.log("Axios error:", err);
            const errMessage = err?.response?.data?.error?.message
            if (errMessage) {
                toast.error(errMessage)
            }
        }
    }

    const getAllMessages = async () => {
        try {
            const res = await axios.get(
                api_constants.BASE_URL + api_constants.GET_ALL_MESSAGES + `/${activeTicket._id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            const { data: ticketData } = res.data
            dispatch(add_ActiveTicketMessages({
                data: ticketData
            }))

        }
        catch (err) {
            // toast.error("Unable to fetch messages")
            const errMessage = err?.response?.data?.error?.message
            if (errMessage) {
                toast.error(errMessage)
            }
        }
    }

    return (
        <div className={styles.messageSectionMain}>
            <div className={styles.messageSectionWrapper}>

                <div className={styles.ticketAddress}>
                    <span>Ticket# {activeTicket && formatDate(activeTicket.createdAt)}</span>
                    <img src={dashboard} alt="" onClick={() => navigate("/Dashboard")} />
                </div>

                {
                    activeTicket && activeTicket.status !== "Resolved" && (
                        <div className={styles.typeMessageDiv}>
                            <div>
                                <textarea placeholder="Type here" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                                <img src={sendIcon} alt="" className={styles.sendIcon} onClick={handleSendMessage} />
                            </div>
                        </div>
                    )
                }


                <div className={styles.messageContainer}>

                    {
                        userInfo?._id === activeTicket?.assignID._id && activeTicket?.status !== "Resolved" ? (
                            activeChatMessages && Object.entries(activeChatMessages).map(([date, messages], index) => {

                                const isFirstGroup = index === 0;

                                return (
                                    <>
                                        <div className={styles.messageTime} key={date.toString()}>
                                            <div className={styles.line}></div>
                                            <p>{date}</p>
                                            <div className={styles.line}></div>
                                        </div>

                                        {
                                            messages.map((msg, msgIndex) => {

                                                const isFirstMessage = isFirstGroup && msgIndex === 0;

                                                return (
                                                    <SingleMessage
                                                        isSender={userInfo?._id === msg?.senderID?._id ? false : true}
                                                        key={msg._id}
                                                        message={msg}
                                                        index={index}
                                                        msgIndex={msgIndex}
                                                        isFirstMessage={isFirstMessage}
                                                        ref={
                                                            index === Object.keys(activeChatMessages).length - 1 && msgIndex === messages.length - 1 ?
                                                                lastMessageRef : null
                                                        }
                                                    />
                                                )
                                            }

                                            )
                                        }
                                    </>

                                );
                            })

                        ) : userInfo?._id !== activeTicket?.assignID._id && activeTicket ? (
                            <p>This chat is assigned to new team member. You no longer have access </p>
                        ) : activeTicket?.status === "Resolved" && (
                            <>
                                <div className={styles.messageTime}>
                                    <div className={styles.line}></div>
                                    <p>{formattedDate}</p>
                                    <div className={styles.line}></div>
                                </div>

                                <p className={styles.resolvedText}>This chat has been resolved </p>
                            </>
                        )


                    }



                </div>

            </div>
        </div>
    )
}

export default MessageSection
