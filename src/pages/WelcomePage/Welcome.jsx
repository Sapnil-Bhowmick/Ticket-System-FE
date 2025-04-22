import About from "../../components/WelcomePageComponents/About/About.jsx"
import Company from "../../components/WelcomePageComponents/Company/Company.jsx"
import Footer from "../../components/WelcomePageComponents/Footer/Footer.jsx"
import Hero from "../../components/WelcomePageComponents/Hero/Hero.jsx"
import Nav from "../../components/WelcomePageComponents/Navigation/Nav.jsx"
import PricingPlan from "../../components/WelcomePageComponents/PricingPlan/PricingPlan.jsx"
import styles from "./Welcome.module.css"

const Welcome = () => {
  return (
    <div className={styles.WelcomeMain}>
      <div className={styles.WelcomeWrapper}>
          <Nav />
          <Hero />
          <Company />
          <About />
          <PricingPlan />
          <Footer />
      </div>
    </div>
  )
}

export default Welcome
