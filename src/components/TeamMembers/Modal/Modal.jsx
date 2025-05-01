
import styles from "./Modal.module.css"


import downArrow from "../../../assets/icons/downArrow.svg"
import { useState } from "react"
import axios from "axios"
import { api_constants } from "../../../utils/api_constants"
import { useDispatch, useSelector } from "react-redux"
import { addNewTeamMember, updateMember } from "../../../Redux/slices/memberSlice"
import toast from "react-hot-toast"


const Modal = ({ isEdit, setIsModalOpen, memberData = null, activeIndex = null }) => {

    // // console.log("data ", memberData)
    // // console.log("index" , activeIndex)

    const dispatch = useDispatch()
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)

    const token = useSelector((store) => store.USER.token)

    //   // console.log("isOpenDropdown" , isOpenDropdown)

    const [formdata, setFormData] = useState({
        userName: "",
        emailID: "",
        role: "",
        phone: ""
    })

    const [errdata, setErrData] = useState({
        userName: "",
        emailID: "",
        role: "",
        phone: ""
    })


    const handleInput = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


    const validateInput = (field, minLength = null, maxLength = null, regex = null) => {
        const value = formdata[field]
        // console.log(value)
        let isValid = true

        if (maxLength && value.trim().length > maxLength) {
            setErrData((prev) => {
                return {
                    ...prev,
                    [field]: `${field} must be lesser than ${maxLength} characters`
                }
            })
            // console.log("Should be < maxLength")
            isValid = false
        }

        if (regex && regex.test(value) !== true) {
            setErrData((prev) => {
                return {
                    ...prev,
                    [field]: field === "emailID" ? `Please provide a valid ${field}` : `Please provide a valid Phone No`
                }
            })
            // console.log("Regex did bot match")
            isValid = false
        }


        if (minLength && value.trim().length < minLength) {
            setErrData((prev) => {
                return {
                    ...prev,
                    [field]: `${field} is required and must be atleast ${minLength} characters`
                }
            })
            // console.log("Should be > minLength")
            isValid = false
        }

        if (field === "userName" || field === "emailID") {
            if (value.trim().length <= 0) {
                setErrData((prev) => {
                    return {
                        ...prev,
                        [field]: `${field} is required`
                    }
                })
                // console.log("Field is Required")
                isValid = false
            }
        }

        return isValid

    }



    const addMember = async (data) => {
        // console.log("inside add member api")
        try {
            const res = await axios.post(
                api_constants.BASE_URL + api_constants.ADD_MEMBER,
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            const { data: ticketData } = res.data

            dispatch(addNewTeamMember({
                data: ticketData
            }))

            setIsModalOpen(false)

        }
        catch (err) {
            const errMessage = err?.response?.data?.error?.message
            if (errMessage) {
                toast.error(errMessage)
            }
        }
    }

    const editMember = async (data) => {
        // console.log("inside edit member api")
        try {
            const res = await axios.post(
                api_constants.BASE_URL + api_constants.EDIT_MEMBER + `?memberID=${memberData._id}`,
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            const { data: ticketData } = res.data

            // console.log("RESPONSE", ticketData)

            dispatch(updateMember({
                index: activeIndex,
                updatedMemberData: ticketData
            }))

            setIsModalOpen(false)

        }
        catch (err) {
            const errMessage = err?.response?.data?.error?.message
            if (errMessage) {
                toast.error(errMessage)
            }
        }
    }


    const handleAddNewMember = async () => {
        setErrData({
            userName: "",
            emailID: "",
            role: "",
            phone: ""
        })

        const isUserNameValid = validateInput("userName", 2, 100)
        const isEmailIDValid = validateInput("emailID", null, null, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        const isRoleValid = validateInput("role")

        if (isUserNameValid && isEmailIDValid && isRoleValid) {
            const newMemberData = {
                userName: formdata.userName,
                emailID: formdata.emailID,
                role: formdata.role
            }

            // // console.log(newMemberData)
            await addMember(newMemberData)
        }

    }

    const handleEditMember = async () => {
        setErrData({
            userName: "",
            emailID: "",
            role: "",
            phone: ""
        })

        const nonEmptyFormData = Object.fromEntries(Object.entries(formdata).filter(([key, value]) => value.trim().length !== 0))

        // const phoneRegex = /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
        // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        // const isEmailIDValid = formdata.emailID && emailRegex.test(formdata.emailID)
        // const isPhoneValid = formdata.phone && phoneRegex.test(formdata.phone)

        // if (formdata.phone && !isPhoneValid) {
        //     setErrData((prev) => {
        //         return {
        //             ...prev,
        //             phone: "Invalid Phone No"
        //         }
        //     })
        // }

        // if (formdata.emailID && !isEmailIDValid) {
        //     setErrData((prev) => {
        //         return {
        //             ...prev,
        //             emailID: "Invalid Email ID"
        //         }
        //     })
        // }


        // // console.log("isEmailIDValid" , isEmailIDValid)
        // // console.log("isPhoneValid" , isPhoneValid)

        // if(formdata.emailID){
        //     if(isEmailIDValid){
        //         await editMember(nonEmptyFormData)
        //     }
        // }


        // if(formdata.emailID && formdata.phone){
        //     if(isEmailIDValid && isPhoneValid){}
        // }


        await editMember(nonEmptyFormData)
    }


    const handleSave = () => {
        if (isEdit) {
            handleEditMember()
        } else {
            handleAddNewMember()
        }
    }

    return (
        <div className={styles.add_edit_modalMain}>
            <div className={styles.add_edit_modalWrapper}>
                <h2>{isEdit ? "Edit Team members" : "Add Team members"}</h2>
                <p>Talk with colleagues in a group chat. Messages in this group are only visible to it's participants. New teammates may only be invited by the administrators.
                </p>

                <div className={styles.inputContainer} >
                    <div>
                        <label for="username">User name</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="User name"
                            name="userName"
                            value={formdata.userName}
                            onChange={(e) => handleInput(e)}
                        />
                        {!isEdit && errdata.userName && <span className={styles.error}>{errdata.userName}</span>}
                    </div>

                    <div>
                        <label for="email">Email ID</label>
                        <input type="text" id="email" placeholder="Email ID" name="emailID" value={formdata.emailID} onChange={(e) => handleInput(e)} />
                        {!isEdit && errdata.emailID && <span className={styles.error}>{errdata.emailID}</span>}
                    </div>

                    {
                        isEdit &&
                        <div>
                            <label for="phone">Phone</label>
                            <input type="text" id="phone" placeholder="phone" value={formdata.phone} name="phone" onChange={(e) => handleInput(e)} />
                            {errdata.phone && <span className={styles.error}>{errdata.phone}</span>}
                        </div>
                    }

                    <div>
                        <label>Designation</label>
                        <div
                            className={styles.memberRole}
                            style={{ backgroundColor: formdata.role === "MEMBER" && "#F6F7F5" }}
                            onClick={
                                () => setFormData((prev) => {
                                    return {
                                        ...prev,
                                        role: "MEMBER"
                                    }
                                })
                            }>
                            Member
                            <img src={downArrow} alt="" className={styles.downArrow} onClick={() => setIsOpenDropdown(!isOpenDropdown)} />
                        </div>
                        {
                            isOpenDropdown &&
                            <div
                                className={styles.memberRole}
                                style={{ backgroundColor: formdata.role === "ADMIN" && "#F6F7F5" }}
                                onClick={
                                    () => setFormData((prev) => {
                                        return {
                                            ...prev,
                                            role: "ADMIN"
                                        }
                                    })
                                }>
                                Admin
                            </div>
                        }
                    </div>

                </div>

                <div className={styles.btnContainer}>
                    <button className={styles.cancel} onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </button>
                    <button className={styles.save} onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
