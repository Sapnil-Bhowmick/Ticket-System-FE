import styles from "./Nav.module.css"

import logo from "../../../assets/icons/logo.svg"
import { Link } from "react-router-dom"
Link

const Nav = () => {
  return (
    <nav className={styles.navMain}>
      <div className={styles.navWrapper}>
        <img src={logo} alt="Logo" className={styles.logo}/>
        <div className={styles.buttonDiv}>
            <div className={styles.login}>
                Login
            </div>
            <button className={styles.signup}>
                Sign up
            </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
