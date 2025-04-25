
import styles from "./InfoSection.module.css"

import userAvatar from "../../../assets/icons/userAvatar.svg"
import nameIcon from "../../../assets/icons/name.svg"
import callIcon from "../../../assets/icons/call.svg"
import emailIcon from "../../../assets/icons/email.svg"
import downArrow from "../../../assets/icons/downArrow.svg"
import ticketIcon from "../../../assets/icons/Ticket.svg"


import { useState } from "react"
import Modal from "../Modal/Modal"

const InfoSection = () => {

    const [showTeamMembers, setShowTeamMembers] = useState(false)
    const [showTicketStatus, setShowTicketStatus] = useState(false)
    const [isAssignToMember, setIsAssignToMember] = useState(false)
    const [isStatusSet, setIsStatusSet] = useState(false)

    const handleAssignToTeamMember = () => {
        setShowTeamMembers(false)
        setIsAssignToMember(true)
    }

    const handleAssignConfirm = () => {
        console.log("Assigned")
    }

    const handleStatusConfirm = () => {
        console.log("Resolved")
    }

    return (
        <div className={styles.infoMain}>
            <div className={styles.infoWrapper}>

                <div className={styles.userAvatar}>
                    <img src={userAvatar} alt="" />
                    <span>Chat</span>
                </div>

                <div className={styles.userDetails}>
                    <p>Details</p>
                    <div className={styles.userAvatarPill}>
                        <img src={nameIcon} alt="" />
                        John Doe
                    </div>
                    <div className={styles.userAvatarPill}>
                        <img src={callIcon} alt="" />
                        +1 (000) 000-0000
                    </div>
                    <div className={styles.userAvatarPill}>
                        <img src={emailIcon} alt="" />
                        example@gmail.com
                    </div>
                </div>

                <div className={styles.teamMembers}>
                    <p>Teammates</p>
                    <div className={styles.admin}>
                        <img src={userAvatar} alt="" className={styles.avatar} />
                        Joe Doe
                        <img
                            src={downArrow}
                            alt=""
                            className={styles.downArrow}
                            onClick={() => setShowTeamMembers(!showTeamMembers)}
                        />

                        {
                            isAssignToMember &&
                            <Modal
                                message="Chat would be assigned to Different team membe"
                                set_member_status={setIsAssignToMember}
                                handleConfirm={handleAssignConfirm}
                            />
                        }
                    </div>

                    {
                        showTeamMembers &&
                        <div className={styles.myTeamMembers}>
                            {
                                new Array(3).fill(0).map((member, index) => {
                                    return (
                                        <div className={styles.member} key={index} onClick={handleAssignToTeamMember}>
                                            <img src={userAvatar} alt="" />
                                            Joe Doe
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>

                <div className={styles.teamMembers} style={{ position: "relative" }}>
                    <p>Teammates</p>
                    <div className={styles.admin}>
                        <img src={ticketIcon} alt="" className={styles.avatar} />
                        Ticket status
                        <img
                            src={downArrow}
                            alt=""
                            className={styles.downArrow}
                            onClick={() => setShowTicketStatus(!showTicketStatus)}
                        />
                    </div>

                    {
                        showTicketStatus &&
                        <div className={styles.myTeamMembers}>
                            <div className={`${styles.member} ${styles.status}`} onClick={() => setIsStatusSet(true)}>
                                Resolved
                            </div>
                            <div className={`${styles.member} ${styles.status}`}>
                                Unresolved
                            </div>
                        </div>
                    }


                    {
                        isStatusSet &&
                        <Modal
                            message="Chat will be closed"
                            set_member_status={setIsStatusSet}
                            handleConfirm={handleStatusConfirm}
                            customStyles={{
                                top: "150px"
                            }}
                        />
                    }


                </div>
            </div>
        </div>
    )
}

export default InfoSection
