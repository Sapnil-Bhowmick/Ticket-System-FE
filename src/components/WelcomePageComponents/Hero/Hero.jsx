import styles from "./Hero.module.css"

import rightArrow from "../../../assets/icons/arrow-right.svg"
import playVideo from "../../../assets/icons/play-video.svg"
import HeroImg from "../../../assets/icons/Hero.png"
import Card1 from "../../../assets/icons/Card-1.png"
import Card2 from "../../../assets/icons/Card-2.png"

import beroBg_large from "../../../assets/images/heroBg-large.png"
import beroBg_small from "../../../assets/images/heroBg-small.png"

const Hero = () => {
  return (
    <section className={styles.HeroMain}>
        <div className={styles.HeroWrapper}>
            <div className={styles.left}>
                <h1>Grow Your Business Faster with Hubly CRM</h1>
                <p>Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.</p>
                <div className={styles.btnContainer}>
                    <button className={styles.getstarted}>
                        Get started
                        <img src={rightArrow} alt="ArrowRight" className={styles.arrowRight} />
                    </button>

                    <div className={styles.watchVideo}>
                        <img src={playVideo} alt="Start playing video" />
                        <p>Watch Video</p>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.HeroImgDiv}>
                    <img src={HeroImg} alt="Hero Image" className={styles.HeroImg} />
                    <img src={Card1} alt="User Info Card" className={styles.card1} />
                    <img src={Card2} alt="Analytics Card" className={styles.card2} />
                    <img src={beroBg_large} alt="" className={styles.bgLarge} />
                    <img src={beroBg_small} alt="" className={styles.bgSmall} />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero
