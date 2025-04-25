import styles from "./TeamMembersSection.module.css"

import editIcon from "../../../assets/icons/edit.svg"
import deleteIcon from "../../../assets/icons/delete.svg"
import avatar from "../../../assets/icons/userAvatar.svg"
import upDown from "../../../assets/icons/up-down.svg"
import circlePlus from "../../../assets/icons/circle-plus.svg"


import { useState } from "react"
import Modal from "../Modal/Modal"

const TeamMembersSection = ({ setIsModalOpen, isModalOpen }) => {

  const [isEditMember, setIsEditMember] = useState(false)

  const handleEdit = () => {
    setIsEditMember(true)
    setIsModalOpen(true)
  }

  return (
    <div className={styles.TeamMembersSectionMain}>
      <div className={styles.TeamMembersSectionWrapper}>

        <p>Team</p>

        <div className={styles.membersGroup}>
          <table>
            <thead>
              <tr>
                <th className={styles.avatarTh}></th>
                <th className={styles.fullName}>
                  Full Name
                  <img src={upDown} alt="" />
                </th>
                <th>Phone</th>
                <th>Email</th>
                <th className={styles.role}>Role</th>
                <th className={styles.buttonTh}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.avatarcell}>
                  <img src={avatar} alt="avatar" className="avatar" />
                </td>
                <td>Joe Doe</td>
                <td>+1 (000) 000-0000</td>
                <td>example@gmail.com</td>
                <td className={styles.roleType}>Admin</td>
                <td className={styles.actions}>
                  <img src={editIcon} alt="Edit" className={styles.editIcon} onClick={() => handleEdit()} />
                  <img src={deleteIcon} alt="Delete" className={styles.deleteIcon} />
                </td>
              </tr>
            </tbody>


            <button className={styles.addMemberBtn}
              onClick={() => {
                setIsEditMember(false) 
                setIsModalOpen(!isModalOpen) 
              }}
            >
              <img src={circlePlus} alt="" />
              <span>Add Team members</span>
            </button>

          </table>
        </div>

        {
          isModalOpen && (
            isEditMember ? (
              <Modal setIsModalOpen={setIsModalOpen} isEdit={true} />
            ) : (
              <Modal setIsModalOpen={setIsModalOpen} isEdit={false} />
            )
          )
        }



      </div>
    </div>
  )
}

export default TeamMembersSection
