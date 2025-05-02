
import styles from "./InfoSection.module.css"

import userAvatar from "../../../assets/icons/userAvatar.svg"
import nameIcon from "../../../assets/icons/name.svg"
import callIcon from "../../../assets/icons/call.svg"
import emailIcon from "../../../assets/icons/email.svg"
import downArrow from "../../../assets/icons/downArrow.svg"
import ticketIcon from "../../../assets/icons/Ticket.svg"


import { useEffect, useState } from "react"
import Modal from "../Modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { api_constants } from "../../../utils/api_constants"
import toast from "react-hot-toast"
import { removeTicket, updateActiveTicketStatus } from "../../../Redux/slices/ticketSlice"
// import { clearActiveTicketMessages } from "../../../Redux/slices/messageSlice"



const InfoSection = () => {

    const dispatch = useDispatch()
    const activeChat = useSelector((store) => store.TICKET.activeTicket)
    const payload = useSelector((store) => store.USER.payload)
    // console.log("payload", payload)
    const { token, userInfo } = useSelector((store) => store.USER)

    const [showTeamMembers, setShowTeamMembers] = useState(false)
    const [showTicketStatus, setShowTicketStatus] = useState(false)
    const [isAssignToMember, setIsAssignToMember] = useState(false)
    const [isStatusSet, setIsStatusSet] = useState(false)

    const [selectedMemberID, setSelectedMemberID] = useState("")
    const [selectStatus, setSelectStatus] = useState(null)

    const [teamMembers, setTeamMembers] = useState([])


    useEffect(() => {
        if (!payload?.isMember && payload?.role === "ADMIN") {
            // console.log("Get Team Members")
            getTeamMembers()
        }
    }, [payload])



    const getTeamMembers = async () => {

        try {
            const res = await axios.get(
                api_constants.BASE_URL + api_constants.TEAM_MEMBERS_ALL,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            const { data: teamMembers } = res.data
            setTeamMembers(teamMembers)

            // console.log("teamMembers", teamMembers)

        }
        catch (err) {
            toast.error("Unable to fetch Admin Team Members")
        }
    }


    const assignTicket_toMember = async (memberID) => {

        try {
            const res = await axios.post(
                api_constants.BASE_URL + api_constants.ASSIGN_TICKET + `/${memberID}`,
                { "ticketID": activeChat._id },

                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            dispatch(removeTicket({
                ticketID: activeChat._id
            }))

            toast.success(res.data.message)

        }
        catch (err) {
            const errMessage = err?.response?.data?.error?.message
            if (errMessage) {
                toast.error(errMessage)
            }
        }
    }

    const updateTicketStatus = async (status) => {

        try {
            const res = await axios.post(
                api_constants.BASE_URL + api_constants.SET_TICKET_STATUS + `/${status}`,
                { "ticketID": activeChat._id },

                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            dispatch(updateActiveTicketStatus({
                ticketStatus: status
            }))

            toast.success(res.data.message)

        }
        catch (err) {
            const errMessage = err?.response?.data?.error?.message
            if (errMessage) {
                toast.error(errMessage)
            }
        }
    }

    const handleAssignToTeamMember = (memberID) => {
        // console.log("MemberId" , memberID)
        setShowTeamMembers(false)
        setIsAssignToMember(true)
        setSelectedMemberID(memberID)
    }

    const handleAssignConfirm = async () => {
        
        if(!activeChat?._id){
            return toast.error("Please select a chat")
        }

        if (selectedMemberID) {
            // console.log("INSIDE")
            await assignTicket_toMember(selectedMemberID)
            setSelectedMemberID("")
            setShowTeamMembers(false)
            setIsAssignToMember(false)
        } 

    }

    const handleMemberStatus = () => {
        setIsStatusSet(false)
        setSelectStatus(null)
    }

    const handleStatusConfirm = (status) => {
        setIsStatusSet(false)
        if(!activeChat?._id){
            return toast.error("Please select a chat")
        }

        if (selectStatus) {
            // console.log("Resolved")
            updateTicketStatus(selectStatus)
        }
    }

    return (
        <div className={styles.infoMain}>
            <div className={styles.infoWrapper}>

                <div className={styles.userAvatar}>
                    <img src={activeChat?.creatorID?.profilePic} alt="" />
                    <span>Chat</span>
                </div>

                <div className={styles.userDetails}>
                    <p>Details</p>
                    <div className={styles.userAvatarPill}>
                        <img src={nameIcon} alt="" />
                        {activeChat?.creatorID?.name}
                    </div>
                    <div className={styles.userAvatarPill}>
                        <img src={callIcon} alt="" />
                        {activeChat?.creatorID?.phone}
                    </div>
                    <div className={styles.userAvatarPill}>
                        <img src={emailIcon} alt="" />
                        {activeChat?.creatorID?.emailID}
                    </div>
                </div>

                <div className={styles.teamMembers}>
                    <p>Teammates</p>
                    <div className={styles.admin}>
                        <img src={userInfo?.profilePic} alt="" className={styles.avatar} />
                        {
                            payload?.isMember ? `${userInfo?.userName}` : `${userInfo?.firstName} ${userInfo?.lastName}`
                        }
                        {
                            payload?.role === "ADMIN" && !payload?.isMember ?
                            <img
                                src={downArrow}
                                alt=""
                                className={styles.downArrow}
                                onClick={() => setShowTeamMembers(!showTeamMembers)}
                            /> : null

                        }
                        {
                            isAssignToMember &&
                            <Modal
                                message="Chat would be assigned to Different team member"
                                set_member_status={setIsAssignToMember}
                                handleConfirm={handleAssignConfirm}
                            />
                        }
                    </div>

                    {
                        showTeamMembers &&
                        <div className={styles.myTeamMembers}>
                            {
                                teamMembers.map((member, index) => {
                                    return (
                                        <div className={styles.member} key={member._id} onClick={() => handleAssignToTeamMember(member._id)}>
                                            <img src={member.profilePic} alt="" />
                                            {member.userName}
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
                            <div
                                className={`${styles.member} ${styles.status}`}
                                onClick={() => {
                                    setIsStatusSet(true)
                                    setSelectStatus("Resolved")
                                }}
                                style={{ backgroundColor: activeChat?.status === "Resolved" && "#EFEFEF" }}
                            >
                                Resolved
                            </div>
                            <div
                                className={`${styles.member} ${styles.status}`}
                                onClick={() => {
                                    setIsStatusSet(true)
                                    setSelectStatus("UnResolved")
                                }}
                                style={{ backgroundColor: activeChat?.status === "UnResolved" && "#EFEFEF" }}
                            >
                                Unresolved
                            </div>
                        </div>
                    }


                    {
                        isStatusSet &&
                        <Modal
                            message="Chat will be closed"
                            set_member_status={handleMemberStatus}
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
