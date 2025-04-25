import styles from "./SingleMessage.module.css"
import userAvatar from "../../../assets/icons/userAvatar.svg"

const SingleMessage = ({isSender}) => {
    return (
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
                <img src={userAvatar} alt="User Avatar" />
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
                    >Chat 1
                    </p>
                    <p className={styles.query}>
                        I have a question regarding class duration ?
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SingleMessage
