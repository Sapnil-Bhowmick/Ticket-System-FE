import ChatSection from "../../components/ContactCenter/ChatSection/ChatSection"
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

        </div>

        <div className={styles.infoSection}> 

        </div>
      </div>
    </div>
  )
}

export default ContactCenter
