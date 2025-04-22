import styles from "./About.module.css"

import Pyramid from "../../../assets/icons/Pyramid.png"
import SocialIcons from '../../../assets/icons/SocialIcons.png'
import aboutBg from "../../../assets/images/aboutBg.png"

const About = () => {
    return (
        <section className={styles.AboutMain}>
            <div className={styles.AboutWrapper}>
                <div className={styles.aboutDescDic}>
                    <div className={styles.about}>
                        <h2>At its core, Hubly is a robust CRM solution.</h2>
                        <p>Hubly helps businesses streamline customer interactions, track leads, and automate tasks—saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly adapts to your needs, giving you the tools to scale efficiently.</p>
                    </div>
                </div>

                <div className={styles.features}>
                    <div className={styles.left}>
                        <div className={styles.platform}>
                            <h3>MULTIPLE PLATFORMS TOGETHER!</h3>
                            <p>Email communication is a breeze with our fully integrated, drag & drop email builder.</p>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.close}>
                                <h4>CLOSE</h4>
                                <p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
                            </div>

                            <div className={styles.nurture}>
                                <h4>NURTURE</h4>
                                <p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.aboutLogo}>
                            <img src={Pyramid} alt="" />
                            <img src={SocialIcons} alt="" className={styles.socialIcon}/>
                            <img src={aboutBg} alt="" className={styles.bg} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
