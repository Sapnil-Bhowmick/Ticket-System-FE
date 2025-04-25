
import styles from "./Modal.module.css"


import downArrow from "../../../assets/icons/downArrow.svg"
import { useState } from "react"

const Modal = ({isEdit , setIsModalOpen}) => {

      const [isOpenDropdown, setIsOpenDropdown] = useState(false)

    //   console.log("isOpenDropdown" , isOpenDropdown)
    
    return (
        <div className={styles.add_edit_modalMain}>
            <div className={styles.add_edit_modalWrapper}>
                <h2>Add Team members</h2>
                <p>Talk with colleagues in a group chat. Messages in this group are only visible to it's participants. New teammates may only be invited by the administrators.
                </p>

                <div className={styles.inputContainer} >
                    <div>
                        <label for="username">User name</label>
                        <input type="text" id="username" placeholder="User name" />
                    </div>

                    <div>
                        <label for="email">Email ID</label>
                        <input type="text" id="email" placeholder="Email ID" />
                    </div>

                    {
                        isEdit &&
                        <div>
                            <label for="phone">Phone</label>
                            <input type="text" id="phone" />
                        </div>
                    }

                    <div>
                        <label>Designation</label>
                        <div className={styles.memberRole}>
                            Member
                            <img src={downArrow} alt="" className={styles.downArrow} onClick={() => setIsOpenDropdown(!isOpenDropdown)} />
                        </div>
                        {
                            isOpenDropdown &&
                            <div className={styles.memberRole}>
                                Admin
                            </div>
                        }
                    </div>

                </div>

                <div className={styles.btnContainer}>
                    <button className={styles.cancel} onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </button>
                    <button className={styles.save}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
