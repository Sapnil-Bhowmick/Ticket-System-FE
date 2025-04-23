import SingleChat from "../SingleChat/SingleChat"
import styles from "./ChatSection.module.css"

const ChatSection = () => {
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
                  new Array(20).fill(0).map((ticket , index) => <SingleChat key={index} />)
                }
            </div>
        </div>
    </div>
  )
}

export default ChatSection
