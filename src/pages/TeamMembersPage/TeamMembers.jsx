import SidebarNav from "../../components/SidebarNav/SidebarNav"
import styles from "./TeamMembers.module.css"

import TeamMembersSection from "../../components/TeamMembers/TeamMembersSection/TeamMembersSection"
import { useState } from "react"

const TeamMembers = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={styles.teamMain}>
      <div className={styles.teamWrapper}>

        { isModalOpen && <div className={styles.backdropBg}></div> }
        <div className={styles.teamSidebar}>
          <SidebarNav activePage="Team" />
        </div>

        <div className={styles.teamMembersArea} >
          <TeamMembersSection
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
    </div>
  )
}

export default TeamMembers
