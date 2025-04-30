
import styles from "./Register.module.css"

import login_register_img from "../../assets/images/login_register.png"
import logo from "../../assets/icons/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { useReducer, useState } from "react"

import axios from "axios"
import toast from "react-hot-toast"
import { api_constants } from "../../utils/api_constants"


const intialFormState = {
  firstName: "",
  lastName: "",
  emailID: "",
  password: "",
  confirmPasssword: ""
}

const initialErrorState = {
  firstName: "",
  lastName: "",
  emailID: "",
  password: "",
  confirmPasssword: ""
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


const Register = () => {

  const navigate = useNavigate()
  const [formStateData, dispatch] = useReducer(formStateReducer, intialFormState)
  const [errorState, errDispatch] = useReducer(errorStateReducer, initialErrorState)
  const [isChecked, setIsChecked] = useState(false)

  const handleUpdate = (e) => {
    dispatch({
      type: "UPDATE_DATA",
      payload: {
        field: e.target.name,
        value: e.target.value
      }
    })
  }


  const validateInput = (field, minLength = null, maxLength = null, regex = null) => {
    const value = formStateData[field]
    console.log(value)
    let isValid = true

    if (maxLength && value.trim().length > maxLength) {
      errDispatch({
        type: "SET_ERROR",
        payload: {
          field: field,
          value: `${field} must be lesser than ${maxLength} characters`
        }
      })
      console.log("Should be < maxLength")
      isValid = false
    }

    if (regex && regex.test(value) !== true) {
      errDispatch({
        type: "SET_ERROR",
        payload: {
          field: field,
          value: field === "password" ? `${field} must have atleast 1 upperCase, 1 lowerCase, 1 digit, 1 special character` : `Invalid ${field}`
        }
      })
      console.log("Regex did not match")
      isValid = false
    }


    if (minLength && value.trim().length < minLength) {
      errDispatch({
        type: "SET_ERROR",
        payload: {
          field: field,
          value: `${field} is required and must be atleast ${minLength} characters`
        }
      })
      console.log("Should be > minLength")
      isValid = false
    }

    if (field === "firstName" || field === "lastName" || field === "emailID" || field === "password" || field === "confirmPasssword") {
      if (value.trim().length <= 0) {
        errDispatch({
          type: "SET_ERROR",
          payload: {
            field: field,
            value: `${field} is required`
          }
        })
        console.log("Field is Required")
        isValid = false
      }
    }

    return isValid

  }

  const isPasswordsMatched = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return true
    } else {
      return false
    }
  }


  const handleRegister = async (e) => {
    e.preventDefault()

    errDispatch({
      type: "RESET_ERROR"
    })

    let isFirstNameValid = validateInput("firstName", 2, 100)
    let isLastNameValid = validateInput("lastName", 2, 100)
    let isEmailIDValid = validateInput("emailID", null, null, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    let isPasswordValid = validateInput("password", 6)
    let isConfirmPassword = validateInput("confirmPasssword", 6)

    let is_PasswordsMatched = isPasswordsMatched(formStateData.password, formStateData.confirmPasssword)

    if (!is_PasswordsMatched) {
      toast.error("Passwords did not match")
    }

    if (!isChecked) {
      toast.error("Please accept Terms of Use")
    }

    if (isFirstNameValid && isLastNameValid && isPasswordValid && isConfirmPassword & isEmailIDValid && is_PasswordsMatched && isChecked) {
      // console.log(formStateData)

      try {
        const {confirmPasssword , ...dataObj} = formStateData
        // console.log(dataObj)
        const res = await registerUser(dataObj)
        toast.success(res.message)
        navigate("/login")
      }
      catch (err) {
        const errMessage = err?.response?.data?.error?.message
        if(errMessage){
          toast.error(errMessage)
        }
      }

    }

  }



  //& REGISTER API CALL
  const registerUser = async (dataObj) => {
    const res = await axios.post(api_constants.BASE_URL + api_constants.ADMIN_REGISTER, dataObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 200) {
      return res.data
    }
    // console.log("RESPONSE", res)
  }

  return (
    <div className={styles.registerMain}>
      <div className={styles.registerWrapper}>
        <img src={logo} alt="Company Logo" className={styles.logo} />
        <div className={styles.registerFormDiv}>
          <div className={styles.register}>
            <form>
              <div className={styles.title}>
                <p>Create an account</p>
                <Link to="/login" className={styles.link}>Sign in instead</Link>
              </div>

              <div className={styles.inputFieldDiv}>
                <label for="firstName">First name</label>
                <input type="text" id="firstName" name="firstName" value={formStateData.firstName} onChange={handleUpdate} />
                {errorState.firstName && <p className={styles.error}>{errorState.firstName}</p>}
              </div>
              <div className={styles.inputFieldDiv}>
                <label for="lastName">Last name</label>
                <input type="text" id="lastName" name="lastName" value={formStateData.lastName} onChange={handleUpdate} />
                {errorState.lastName && <p className={styles.error}>{errorState.lastName}</p>}
              </div>
              <div className={styles.inputFieldDiv}>
                <label for="email">Email</label>
                <input type="email" id="email" name="emailID" value={formStateData.emailID} onChange={handleUpdate} />
                {errorState.emailID && <p className={styles.error}>{errorState.emailID}</p>}
              </div>
              <div className={styles.inputFieldDiv}>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" value={formStateData.password} onChange={handleUpdate} />
                {errorState.password && <p className={styles.error}>{errorState.password}</p>}
              </div>
              <div className={styles.inputFieldDiv}>
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPasssword" value={formStateData.confirmPasssword} onChange={handleUpdate} />
                {errorState.confirmPasssword && <p className={styles.error}>{errorState.confirmPasssword}</p>}
              </div>

              <div className={styles.terms_conditions}>
                <input type="checkbox" id="checkbox" className={styles.customCheckbox} onChange={() => setIsChecked(!isChecked)} />
                <label for="checkbox">By creating an account, I agree to our <span>Terms of use </span>
                  and <span>Privacy Policy</span> </label>
              </div>

              <button className={styles.registerBtn} onClick={(e) => handleRegister(e)}>
                Create an account
              </button>
            </form>
          </div>

          <p className={styles.footerText}>This site is protected by reCAPTCHA and the <span>Google Privacy Policy </span> and <span>Terms of Service </span> apply</p>

        </div>

        <div className={styles.registerImgDiv}>
          <img src={login_register_img} alt="" className={styles.login_register_img} />
          {/* img */}
        </div>

      </div>
    </div>
  )
}

export default Register
