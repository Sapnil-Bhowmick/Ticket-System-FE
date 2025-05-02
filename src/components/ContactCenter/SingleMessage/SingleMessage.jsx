import styles from "./SingleMessage.module.css"
import userAvatar from "../../../assets/icons/userAvatar.svg"
import { useSelector } from "react-redux"
import { forwardRef } from "react"


const SingleMessage = forwardRef(({ isSender, message, index, msgIndex, isFirstMessage }, ref) => {

    const activeChatNo = useSelector((store) => store.TICKET.activeChatNo)
    const activeTicket = useSelector((store) => store.TICKET.activeTicket)
    const payload = useSelector((store) => store.USER.payload)

    // // console.log("REF" , ref)

    return (
        <>
            <div
                className={styles.messageText}
                style={{
                    justifyContent: isSender ? "flex-start" : "flex-end"
                }}
                ref={ref}
            >

                <div
                    className={styles.message}
                    style={{
                        flexDirection: isSender ? "row" : "row-reverse"
                    }}
                >
                    <img src={message.senderID.profilePic} alt="User Avatar" className={styles.avatar} />
                    <div
                        className={styles.info}
                        style={{
                            margin: isSender ? "0px 0px 0px var(--spacing-sm)" : "0px var(--spacing-sm) 0px 0px"
                        }}
                    >
                        <p
                            className={styles.chatNo}
                            style={{
                                textAlign: isSender ? "left" : "right"
                            }}
                        >
                            {
                                !isSender ?
                                    payload.isMember ? `${message.senderID.userName}` : `${message.senderID.firstName} ${message.senderID.lastName}`
                                    :
                                    `chat ${activeChatNo}`
                            }
                        </p>
                        <p className={styles.query}>
                            {message.message}
                        </p>
                    </div>
                </div>
            </div>

            {
                activeTicket?.isMissed && isFirstMessage && <p className={styles.missedChat}>Replying to missed chat</p>
            }

        </>
    )
})

export default SingleMessage
