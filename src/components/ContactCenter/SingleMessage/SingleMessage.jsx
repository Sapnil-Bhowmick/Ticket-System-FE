import styles from "./SingleMessage.module.css"
import userAvatar from "../../../assets/icons/userAvatar.svg"
import { useSelector } from "react-redux"

const SingleMessage = ({ isSender, message, index, msgIndex }) => {

    const activeChatNo = useSelector((store) => store.TICKET.activeChatNo)
    const activeTicket = useSelector((store) => store.TICKET.activeTicket)

    return (
        <>
            <div
                className={styles.messageText}
                style={{
                    justifyContent: isSender ? "flex-start" : "flex-end"
                }}
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
                                !isSender ? `${message.senderID.firstName} ${message.senderID.lastName}` : `chat ${activeChatNo}`
                            }
                        </p>
                        <p className={styles.query}>
                            {message.message}
                        </p>
                    </div>
                </div>
            </div>

            {
                activeTicket.isMissed && index === msgIndex && <p className={styles.missedChat}>Replying to missed chat</p>
            }

        </>
    )
}

export default SingleMessage
