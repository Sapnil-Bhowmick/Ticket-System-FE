import styles from './Company.module.css'

import AdobeLogo from "../../../assets/icons/Adobe-Logo.svg"
import ElasticLogo from "../../../assets/icons/Elastic-Logo.svg"
import OpendoorLogo from "../../../assets/icons/Opendoor-Logo.svg"
import AirtableLogo from "../../../assets/icons/Airtable-Logo.svg"
import FramerLogo from "../../../assets/icons/Framer-Logo.svg"

const Company = () => {
  return (
    <section className={styles.companyMain}>
        <div className={styles.companyWrapper}>
            <img  src={AdobeLogo} alt="Company Logo" />
            <img  src={ElasticLogo} alt="Company Logo" />
            <img  src={OpendoorLogo} alt="Company Logo" />
            <img  src={AirtableLogo} alt="Company Logo" />
            <img  src={ElasticLogo} alt="Company Logo" />
            <img  src={FramerLogo} alt="Company Logo" />
        </div>
    </section>
  )
}

export default Company
