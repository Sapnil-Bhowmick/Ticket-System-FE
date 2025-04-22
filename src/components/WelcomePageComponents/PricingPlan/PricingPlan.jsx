import styles from "./PricingPlan.module.css"

import TickIcon from "../../../assets/icons/tickIcon.svg"

const PricingPlan = () => {
    return (
        <section className={styles.PricingPlanMain}>
            <div className={styles.PricingPlanWrapper}>
                <div className={styles.PricingPlanDescDiv}>
                    <div className={styles.PricingPlanDesc}>
                        <h2>We have plans for everyone!</h2>
                        <p>We started with a strong foundation, then simply built all of the sales and marketing tools ALL businesses need under one platform.</p>
                    </div>
                </div>

                <div className={styles.PricingPlanCards}>
                    <article className={styles.article1}>
                        <h3>STARTER</h3>
                        <p>Best for local businesses needing to improve their online reputation.</p>
                        <span>$199</span>
                        <div className={styles.planFeatures}>
                            <span>What's Included</span>
                            <div className={styles.features}>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>Unlimited Users</span>
                                </div>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>GMB Messaging</span>
                                </div>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>Reputation Management</span>
                                </div>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>GMB Call Tracking</span>
                                </div>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>24/7 Award Winning Support</span>
                                </div>
                            </div>
                        </div>

                        <button className={styles.pricingBtn}>
                            SIGN UP FOR STARTER
                        </button>
                    </article>

                    <article className={styles.article2}>
                        <h3>GROW</h3>
                        <p>Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.</p>
                        <span>$399</span>
                        <div className={styles.planFeatures}>
                            <span>What's Included</span>
                            <div className={styles.features}>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>Pipeline Management</span>
                                </div>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>Marketing Automation Campaigns</span>
                                </div>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>Live Call Transfer</span>
                                </div>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>GMB Messaging</span>
                                </div>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>Embed-able Form Builder</span>
                                </div>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>Reputation Management</span>
                                </div>
                                <div>
                                    <img src={TickIcon} alt="Avaailable Features in Plan" />
                                    <span>24/7 Award Winning Support</span>
                                </div>
                            </div>
                        </div>

                        <button className={styles.pricingBtn}>
                            SIGN UP FOR STARTER
                        </button>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default PricingPlan
