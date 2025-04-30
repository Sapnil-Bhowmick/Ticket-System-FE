
import styles from "./Login.module.css"

import login_register_img from "../../assets/images/login_register.png"
import logo from "../../assets/icons/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { useReducer } from "react"
import axios from "axios"

import { useDispatch, useSelector } from "react-redux"
import { saveLoggedInUserDetails } from "../../Redux/slices/userSlice"
import toast from "react-hot-toast"
import { api_constants } from "../../utils/api_constants"


const intialFormState = {
  emailID: "",
  password: ""
}

const initialErrorState = {
  emailID: "",
  password: ""
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

const errorStateReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }

    case "RESET_ERROR": {
      return initialErrorState
    }
  }
}

const Login = () => {

    const navigate = useNavigate()
    const [formStateData, dispatch] = useReducer(formStateReducer, intialFormState)
    const [errorState, errDispatch] = useReducer(errorStateReducer, initialErrorState)

    const dispatchAction = useDispatch()
    const userDetails = useSelector((store) => store.USER)

    
    const handleUpdate = (e) => {
      dispatch({
          type: "UPDATE_DATA",
          payload: {
              field: e.target.name,
              value: e.target.value
          }
      })
  }


  const validateInput = (field) => {
    const value = formStateData[field]

    let isValid = true

    if (field === "firstName" || field === "lastName" || field === "emailID" || field === "password" || field === "confirmPasssword") {
      if (value.trim().length <= 0) {
        errDispatch({
          type: "SET_ERROR",
          payload: {
            field: field,
            value: `${field} is required`
          }
        })
        isValid = false
      }
    }

    return isValid
  }

  const handleLogin = async(e) => {
    e.preventDefault()

    errDispatch({
      type: "RESET_ERROR"
    })

    let isUsernameValid = validateInput("emailID")
    let isPasswordValid = validateInput("password")

    if(isPasswordValid && isUsernameValid){
      try{
        const res = await loginUser(formStateData)
        toast.success(res.message)
        const {token , user} = res.data
        // console.log(token , user)
        dispatchAction(saveLoggedInUserDetails({
          token,
          userInfo: user
        }))

        navigate("/Dashboard")

        dispatch({
          type: "RESET_FORM"
        })

      }
      catch(err){
        const errMessage = err?.response?.data?.error?.message
        if (errMessage) {
            toast.error(errMessage)
        }
      }
    }
  }

  //& LOGIN API CALL
  const loginUser = async (dataObj) => {
    const res = await axios.post(api_constants.BASE_URL + api_constants.ADMIN_LOGIN, dataObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 200) {
      return res.data
    }
    // console.log("RESPONSE", res)
  }


  // console.log("ADMIN_DETAILS" , adminDetails)


  return (
    <div className={styles.loginMain}>
      <div className={styles.loginWrapper}>
        <img src={logo} alt="Company Logo" className={styles.logo} />
        <div className={styles.loginFormDiv}>
          <div className={styles.login}>
            <form>
              <div className={styles.title}>
                <p>Sign in to your Plexify</p>
              </div>

              <div className={styles.inputFieldDiv}>
                <label for="firstName">Username</label>
                <input type="text" id="firstName" name="emailID" value={formStateData.emailID} onChange={handleUpdate} />
                {errorState.emailID && <p className={styles.error}>{errorState.emailID}</p>}
              </div>
              <div className={styles.inputFieldDiv}>
                <label for="lastName">Password</label>
                <input type="password" id="lastName" name="password" value={formStateData.password} onChange={handleUpdate} />
                {errorState.password && <p className={styles.error}>{errorState.password}</p>}
              </div>
              <button className={styles.loginBtn} onClick={(e) => handleLogin(e)}>
                Log in
              </button>

              <Link to="" className={styles.forgotPasswordLink}>Forgot password?</Link>
              <p className={styles.accountText}>Don't have an account?<Link to="/register" className={styles.signUpLink}> Sign up</Link></p>
            </form>
          </div>

          <p className={styles.footerText}>This site is protected by reCAPTCHA and the <span>Google Privacy Policy </span> and <span>Terms of Service </span> apply</p>

        </div>

        <div className={styles.loginImgDiv}>
          <img src={login_register_img} alt="" className={styles.login_register_img} />
          {/* img */}
        </div>

      </div>
    </div>
  )
}

export default Login
