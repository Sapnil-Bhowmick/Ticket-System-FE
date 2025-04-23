
import styles from "./Login.module.css"

import login_register_img from "../../assets/images/login_register.png"
import logo from "../../assets/icons/logo.svg"
import { Link } from "react-router-dom"

const Login = () => {

  const handleLogin = (e) => {
    e.preventDefault()
  }

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
                <input type="text" id="firstName" />
              </div>
              <div className={styles.inputFieldDiv}>
                <label for="lastName">Password</label>
                <input type="text" id="lastName" />
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
