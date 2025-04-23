import styles from "./Nav.module.css"

import logo from "../../../assets/icons/logo.svg"
import { Link } from "react-router-dom"


const Nav = () => {
  return (
    <nav className={styles.navMain}>
      <div className={styles.navWrapper}>
        <img src={logo} alt="Logo" className={styles.logo}/>
        <div className={styles.buttonDiv}>
            {/* <div className={styles.login}> */}
                <Link to = "/login" className={styles.loginLink}>Login</Link>
            {/* </div> */}
            <button className={styles.signup}>
                <Link to="/register" className={styles.signUpLink}>Sign up</Link>
            </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
