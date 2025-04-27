import Company from "../../components/WelcomePageComponents/Company/Company.jsx"
import Hero from "../../components/WelcomePageComponents/Hero/Hero.jsx"
import Nav from "../../components/WelcomePageComponents/Navigation/Nav.jsx"

import hublyLogo from "../../assets/icons/hubly-logo-noborder.svg"
import crossIcon from "../../assets/icons/cross.svg"
import sendIcon from "../../assets/icons/Message-Send-Icon.svg"

import chatbotBubble from '../../assets/icons/chatbot-bubble.svg'
import chatbotClose from "../../assets/icons/chatbot-close.svg"
import logo from "../../assets/icons/Hubly-Logo.svg"

import styles from "./HomePage.module.css"
import { useState } from "react"

const HomePage = () => {

    const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true)
    // const [isChatStarted, setIsChatStarted] = useState(false)
    const [introForm, setIntroForm] = useState({
        name: "Your name",
        email: "example@gmail.com",
        phone: "+1 (000) 000-0000"
    })

    const [message, setMessage] = useState("")


    const handleInputChange = (e) => {
        setIntroForm((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const registerNewUser = () => {
        console.log(introForm)
    }

    const handleSendMessage = () => {
        console.log(message)
    }

    return (
        <div className={styles.HomePageMain}>
            <div className={styles.HomePageWrapper}>
                <Nav />
                <Hero />
                <Company />

                {/* ChatBot */}
                <div className={styles.chatBot}>
                    <div className={styles.chatBotWrapper}>
                        {
                            isMessageBoxOpen ? (
                                <>
                                    <img src={hublyLogo} alt="" className={styles.logo} />
                                    <img src={crossIcon} alt="" className={styles.crossIcon} onClick={() => setIsMessageBoxOpen(false)} />
                                    <div className={styles.welcomeMessage}>
                                        <p>👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.</p>
                                    </div>
                                </>
                            ) :
                                (
                                    <div className={styles.charArea}>
                                        <div className={styles.header}>
                                            <div className={styles.logoDiv}>
                                                <img src={logo} alt="" />
                                                <span className={styles.active}></span>
                                            </div>
                                            <span>Hubly</span>
                                        </div>

                                        <div className={styles.body}>
                                            <div className={styles.messageDiv}>
                                                <div className={styles.message}>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm
                                                </div>
                                            </div>

                                            {/* User Registration Form */}

                                            <div className={styles.formDivMain}>
                                                <img src={hublyLogo} alt="" />
                                                <div className={styles.form}>
                                                    <p>Introduce Yourself</p>

                                                    <div>
                                                        <p>Your name</p>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={introForm.name}
                                                            onChange={(e) => handleInputChange(e)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <p>Your Phone</p>
                                                        <input
                                                            type="text"
                                                            name="phone"
                                                            value={introForm.phone}
                                                            onChange={(e) => handleInputChange(e)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <p>Your Email</p>
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            value={introForm.email}
                                                            onChange={(e) => handleInputChange(e)}
                                                        />
                                                    </div>

                                                    <div className={styles.btnDiv}>
                                                        <button onClick={registerNewUser} >
                                                            Thank You!
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.messagePrompt}>
                                                <div className={styles.promptMain}>
                                                    <img src={hublyLogo} alt="" />
                                                    <div className={styles.promptDiv}>
                                                        <div className={styles.prompt}>
                                                            How can I help you?
                                                        </div>

                                                        <div className={styles.prompt}>
                                                            Ask me anything
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                Array(5).fill(0).map((_, index) => {
                                                    return (
                                                        <div className={styles.messageDiv} key={index}>
                                                            <div className={styles.message}>
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div className={styles.footer}>
                                            <input
                                                type="text"
                                                placeholder="Write a message"
                                                className={styles.typingArea}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if(e.key === "Enter") {
                                                        handleSendMessage()
                                                    }
                                                }}
                                            />
                                            <img src={sendIcon} alt="" className={styles.sendIcon} onClick={handleSendMessage}/>
                                        </div>
                                    </div>
                                )
                        }


                        <div className={styles.iconMain}>
                            <div className={styles.icon} onClick={() => setIsMessageBoxOpen(!isMessageBoxOpen)}>
                                {
                                    !isMessageBoxOpen ?
                                        <img src={chatbotClose} alt="" />
                                        :
                                        <img src={chatbotBubble} alt="" />

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
