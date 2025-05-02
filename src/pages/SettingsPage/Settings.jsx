import styles from "./Settings.module.css"

import SidebarNav from "../../components/SidebarNav/SidebarNav.jsx"

import infoIcon from "../../assets/icons/info.svg"
import { useReducer, useState } from "react"
import axios from "axios"
import { api_constants } from "../../utils/api_constants.js"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../Redux/slices/userSlice.js"
import { useNavigate } from "react-router-dom"

import ClipLoader from "react-spinners/ClipLoader"


const intialFormState = {
  firstName: "",
  lastName: "",
  emailID: "",
  password: "",
  confirmPassword: ""
}

const formStateReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }

    case "RESET_FORM": {
      return intialFormState
    }
  }
}

const Settings = () => {

  const token = useSelector((store) => store.USER.token)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [formStateData, formDispatch] = useReducer(formStateReducer, intialFormState)
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

  const handleUpdate = (e) => {
    // console.log(e.target.name, e.target.value)
    formDispatch({
      type: "UPDATE_DATA",
      payload: {
        field: e.target.name,
        value: e.target.value
      }
    })
  }



  const handleSaveProfile = async () => {
    const filteredData = Object.fromEntries(
      Object.entries(formStateData).filter(([key, value]) => value)
    );

    if (Object.entries(filteredData).length > 0) {
      await updateProfile(filteredData)
    }
  }


  const updateProfile = async (data) => {
    // console.log("Inside updateProfile")
    setIsLoading(true)
    try {
      const res = await axios.patch(
        api_constants.BASE_URL + api_constants.EDIT_PROFILE,
        data,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )

      // console.log(res.data)

      toast.success(res.data.message)

      formDispatch({
        type: "RESET_FORM"
      })

      if (data.hasOwnProperty("emailID") || data.hasOwnProperty("password")) {
        // // console.log("Key exists");
        dispatch(logoutUser())
        navigate("/")
      }

    }
    catch (err) {
      const errMessage = err?.response?.data?.error?.message
      if (errMessage) {
        toast.error(errMessage)
      }
    }

    finally {
      setIsLoading(false)
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
                <input type="text" id="firstname" value={formStateData.firstName} name="firstName" placeholder="First name" onChange={handleUpdate} />
              </div>
              <div>
                <label for="lastname">Last name</label>
                <input type="text" id="lastname" name="lastName" value={formStateData.lastName} placeholder="Last name" onChange={handleUpdate} />
              </div>
              <div>
                <label for="email">Email</label>
                <input type="text" id="email" name="emailID" value={formStateData.emailID} placeholder="Email" onChange={handleUpdate} />
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
                <input type="password" id="password" name="password" value={formStateData.password} placeholder="Password" onChange={handleUpdate} />
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
                <input type="password" id="confirmPassword" name="confirmPassword" value={formStateData.confirmPassword} placeholder="Confirm Password" onChange={handleUpdate} />
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

            {
              isLoading ?
                <button className={styles.saveBtn} onClick={handleSaveProfile}>
                  <ClipLoader size={20} color={"#green"} className={styles.loader} />
                </button>
                :
                <button className={styles.saveBtn} onClick={handleSaveProfile}>
                  Save
                </button>
            }

          </div>

        </div>
      </div>
    </div>
  )
}

export default Settings
