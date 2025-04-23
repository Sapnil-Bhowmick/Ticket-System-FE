import styles from "./SingleChat.module.css"

import userAvatar from "../../../assets/icons/userAvatar.svg"

const SingleChat = () => {
  return (
    <div className={styles.chatMain}>
      <div>
        <img src={userAvatar} alt="User Avatar" />
      </div>

      <div className={`${styles.info} ${styles.activeChat}`}>
        <span className={styles.chatNo}>Chat 1</span>
        <span className={styles.query}>I have a question about todays class ?</span>
      </div>
    </div>
  )
}

export default SingleChat
