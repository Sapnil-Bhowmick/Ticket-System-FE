
import styles from "./Register.module.css"


import login_register_img from "../../assets/images/login_register.png"
import logo from "../../assets/icons/logo.svg"
import { Link } from "react-router-dom"

const Register = () => {

  const handleRegister = (e) => {
    e.preventDefault()
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
                <input type="text" id="firstName" />
              </div>
              <div className={styles.inputFieldDiv}>
                <label for="lastName">Last name</label>
                <input type="text" id="lastName" />
              </div>
              <div className={styles.inputFieldDiv}>
                <label for="email">Email</label>
                <input type="email" id="email" />
              </div>
              <div className={styles.inputFieldDiv}>
                <label for="password">Password</label>
                <input type="password" id="password" />
              </div>
              <div className={styles.inputFieldDiv}>
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" />
              </div>

              <div className={styles.terms_conditions}>
                <input type="checkbox" id="checkbox" className={styles.customCheckbox} />
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
