import ChatSection from "../../components/ContactCenter/ChatSection/ChatSection"
import InfoSection from "../../components/ContactCenter/InfoSection/InfoSection"
import MessageSection from "../../components/ContactCenter/MessageSection/MessageSection"
import SidebarNav from "../../components/SidebarNav/SidebarNav"



import styles from "./ContactCenter.module.css"

const ContactCenter = () => {
  return (
    <div className={styles.contactcenterMain}>
      <div className={styles.contactcenterWrapper}>

        <div className={styles.contactcenterSidebar}>
          <SidebarNav activePage = "ContactCener" />
        </div>

        <div className={styles.ChatsSection}>
          <ChatSection />
        </div>

        <div className={styles.messageSection}>
          <MessageSection />
        </div>

        <div className={styles.infoSection}> 
          <InfoSection />
        </div>
      </div>
    </div>
  )
}

export default ContactCenter
