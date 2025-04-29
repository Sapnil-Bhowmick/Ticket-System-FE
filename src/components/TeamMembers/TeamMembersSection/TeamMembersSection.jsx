import styles from "./TeamMembersSection.module.css"

import editIcon from "../../../assets/icons/edit.svg"
import deleteIcon from "../../../assets/icons/delete.svg"
import avatar from "../../../assets/icons/userAvatar.svg"
import upDown from "../../../assets/icons/up-down.svg"
import circlePlus from "../../../assets/icons/circle-plus.svg"



import { useEffect, useState } from "react"
import Modal from "../Modal/Modal"
import DeletePopup from "../DeletePopup/DeletePopup"
import { addTeamMembers } from "../../../Redux/slices/memberSlice"

import axios from "axios"
import { api_constants } from "../../../utils/api_constants"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"



const TeamMembersSection = ({ setIsModalOpen, isModalOpen }) => {

  const dispatch = useDispatch()
  const [isEditMember, setIsEditMember] = useState(false)
  const [memberId, setMemberId] = useState(null)
  const [activeMember, setActiveMember] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)

  const token = useSelector((store) => store.USER.token)
  const teamMembers = useSelector((store) => store.MEMBER.teamMembers)

  const handleEdit = (member, activeIndex) => {
    setActiveMember(member)
    setActiveIndex(activeIndex)
    setIsEditMember(true)
    setIsModalOpen(true)
  }


  useEffect(() => {
    getTeamMembers()
  }, [])

  const getTeamMembers = async () => {
    console.log("inside getmemebers api")
    try {
      const res = await axios.get(
        api_constants.BASE_URL + api_constants.TEAM_MEMBERS_ALL,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )

      const { data: ticketData } = res.data
      dispatch(addTeamMembers({
        data: ticketData
      }))

    }
    catch (err) {
      const errMessage = err?.response?.data?.error?.message
      if (errMessage) {
        toast.error(errMessage)
      }
    }
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
              {
                teamMembers && teamMembers.length !== 0 && teamMembers.map((member, index) => {
                  return (
                    <tr key={member._id}>
                      <td className={styles.avatarcell}>
                        <img src={member.profilePic} alt="avatar" className="avatar" />
                      </td>
                      <td>{member.userName}</td>
                      <td>{member.phone}</td>
                      <td>{member.emailID}</td>
                      <td className={styles.roleType}>{member.role}</td>
                      <td className={styles.actions}>
                        <img src={editIcon} alt="Edit" className={styles.editIcon} onClick={() => handleEdit(member, index)} />
                        {memberId === index && <DeletePopup setMemberId={setMemberId} memberID={memberId} activeMember={activeMember} />}
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className={styles.deleteIcon}
                          onClick={
                            () => {
                              setMemberId(index)
                              setActiveMember(member)
                            }
                          }
                        />
                      </td>
                    </tr>
                  )
                })
              }
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
              <Modal setIsModalOpen={setIsModalOpen} isEdit={true} memberData={activeMember} activeIndex={activeIndex} />
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
