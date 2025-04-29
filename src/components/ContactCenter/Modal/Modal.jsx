import styles from "./Modal.module.css"

import React from 'react'

const Modal = ({ message, set_member_status, handleConfirm, customStyles }) => {
    return (
        <div
            className = {styles.memberPopup}
            style = {customStyles && customStyles}
        >
            <p>{message}</p>
            <div className={styles.btnDiv}>
                <button className={styles.cancel} onClick={() => set_member_status()}>Cancel</button>
                <button className={styles.confirm} onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default Modal
