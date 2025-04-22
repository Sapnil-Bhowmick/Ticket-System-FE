import styles from "./Footer.module.css"

import logo from "../../../assets/icons/logo.svg"

import discord from "../../../assets/icons/discord.svg"
import figma from "../../../assets/icons/figma.svg"
import instagram from "../../../assets/icons/instagram.svg"
import linkedin from "../../../assets/icons/linkedin.svg"
import message from "../../../assets/icons/message.svg"
import twitter from "../../../assets/icons/twitter.svg"
import youtube from "../../../assets/icons/youtube.svg"

const Footer = () => {
    return (
        <foooter className={styles.footerMain}>
            <div className={styles.footerWrapper}>
                <img src={logo} alt="Company-Logo" className={styles.logo} />

                <nav>
                    <div>
                        <p>Product</p>
                        <ul>
                            <li>Universal checkout</li>
                            <li>Payment workflows</li>
                            <li>Observability</li>
                            <li>UpliftAI</li>
                            <li>Apps & integrations</li>
                        </ul>
                    </div>

                    <div>
                        <p>Why Primer</p>
                        <ul>
                            <li>Expand to new markets</li>
                            <li>Boost payment success</li>
                            <li>Improve conversion rates</li>
                            <li>Reduce payments fraud</li>
                            <li>Recover revenue</li>
                        </ul>
                    </div>

                    <div>
                        <p>Developers</p>
                        <ul>
                            <li>Primer Docs</li>
                            <li>API Reference</li>
                            <li>Payment methods guide</li>
                            <li>Service status</li>
                            <li>Community</li>
                        </ul>
                    </div>

                    <div>
                        <p>Resources</p>
                        <ul>
                            <li>Blog</li>
                            <li>Success stories</li>
                            <li>News room</li>
                            <li>Terms</li>
                            <li>Privacy</li>
                        </ul>
                    </div>

                    <div>
                        <p>Company</p>
                        <ul>
                            <li>Careers</li>
                        </ul>
                    </div>
                </nav>

                <div className={styles.socialIcons}>
                    <img src={message} alt="Message" />
                    <img src={linkedin} alt="Linkedin" />
                    <img src={twitter} alt="Twitter" />
                    <img src={youtube} alt="Youtube" />
                    <img src={discord} alt="Discord" />
                    <img src={figma} alt="Figma" />
                    <img src={instagram} alt="Instagram" />
                </div>
            </div>
        </foooter>
    )
}

export default Footer
