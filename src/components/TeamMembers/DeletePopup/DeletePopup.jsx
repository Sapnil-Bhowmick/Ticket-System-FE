
import styles from "./DeletePopup.module.css"

import React from 'react'

const DeletePopup = ({setMemberId}) => {
    return (
        <div
            className={styles.memberPopup}
            // style={customStyles && customStyles}
        >
            <p>This teammate will be deleted.</p>
            <div className={styles.btnDiv}>
                <button className={styles.cancel} onClick={() => setMemberId(null)}>Cancel</button>
                <button className={styles.confirm} >Confirm</button>
            </div>
        </div>
    )
}

export default DeletePopup
