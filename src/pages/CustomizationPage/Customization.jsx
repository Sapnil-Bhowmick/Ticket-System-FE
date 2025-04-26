import styles from "./Customization.module.css"

import SidebarNav from "../../components/SidebarNav/SidebarNav.jsx"

const Customization = () => {
  return (
    <div className={styles.customMain}>
      <div className={styles.customWrapper}>

        <div className={styles.customSiderBarNav}>
            <SidebarNav activePage = "ChatBot" />
        </div>

        <div className={styles.customizationArea}>
            <p>Chat Bot</p>
        </div>

      </div>
    </div>
  )
}

export default Customization
