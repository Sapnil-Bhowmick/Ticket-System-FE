import styles from "./Settings.module.css"

import SidebarNav from "../../components/SidebarNav/SidebarNav.jsx"

import infoIcon from "../../assets/icons/info.svg"
import { useState } from "react"

const Settings = () => {

  const [showInfo, setShowInfo] = useState({
    showEmailInfo: false,
    showPasswordInfo: false,
    showConfirmPasswordInfo: false
  })

  const styleObj = (index) => {
    const infoVal = showInfo[index]
    return {
      bottom: !infoVal ? "6px" : "-42px",
      right: !infoVal ? "-36px" : "-287px"
    }
  }

  return (
    <div className={styles.settingsMain}>
      <div className={styles.settingsWrappper}>

        <div className={styles.settingsSidebar}>
          <SidebarNav activePage="Settings" />
        </div>

        <div className={styles.formArea}>
          <p>Settings</p>

          <div className={styles.editDiv}>
            <div className={styles.title}>
              <span>Edit Profile</span>
              <div className={styles.line}></div>
            </div>

            <div className={styles.formContainer}>
              <div>
                <label for="firstname">First name</label>
                <input type="text" id="firstname" placeholder="First name" />
              </div>
              <div>
                <label for="lastname">Last name</label>
                <input type="text" id="lastname" placeholder="Last name" />
              </div>
              <div>
                <label for="email">Email</label>
                <input type="text" id="email" placeholder="Email" />
                <div
                  className={styles.infoDiv}
                  style={styleObj("showEmailInfo")}
                >
                  <img src={infoIcon} alt=""
                    onClick={
                      () => setShowInfo((prev) => {
                        return { ...prev, showEmailInfo: !showInfo.showEmailInfo }
                      })
                    }
                  />
                  {
                    showInfo.showEmailInfo &&
                    <div className={styles.info}>
                      User will get logged out immediately
                    </div>
                  }
                </div>
              </div>
              <div>
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Password" />
                <div
                  className={styles.infoDiv}
                  style={styleObj("showPasswordInfo")}
                >
                  <img src={infoIcon} alt=""
                    onClick={
                      () => setShowInfo((prev) => {
                        return { ...prev, showPasswordInfo: !showInfo.showPasswordInfo }
                      })
                    }
                  />
                  {
                    showInfo.showPasswordInfo &&
                    <div className={styles.info}>
                      User will get logged out immediately
                    </div>
                  }
                </div>
              </div>
              <div>
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm Password" />
                <div
                  className={styles.infoDiv}
                  style={styleObj("showConfirmPasswordInfo")}
                >
                  <img src={infoIcon} alt=""
                    onClick={
                      () => setShowInfo((prev) => {
                        return { ...prev, showConfirmPasswordInfo: !showInfo.showConfirmPasswordInfo }
                      })
                    }
                  />
                  {
                    showInfo.showConfirmPasswordInfo &&
                    <div className={styles.info}>
                      User will get logged out immediately
                    </div>
                  }
                </div>
              </div>
            </div>

            <button className={styles.saveBtn}>
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Settings
