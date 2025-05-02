import Company from "../../components/WelcomePageComponents/Company/Company.jsx"
import Hero from "../../components/WelcomePageComponents/Hero/Hero.jsx"
import Nav from "../../components/WelcomePageComponents/Navigation/Nav.jsx"
import About from "../../components/WelcomePageComponents/About/About.jsx"
import PricingPlan from "../../components/WelcomePageComponents/PricingPlan/PricingPlan.jsx"
import Footer from "../../components/WelcomePageComponents/Footer/Footer.jsx"

import hublyLogo from "../../assets/icons/hubly-logo-noborder.svg"
import crossIcon from "../../assets/icons/cross.svg"
import sendIcon from "../../assets/icons/Message-Send-Icon.svg"

import chatbotBubble from '../../assets/icons/chatbot-bubble.svg'
import chatbotClose from "../../assets/icons/chatbot-close.svg"
import logo from "../../assets/icons/Hubly-Logo.svg"

import styles from "./HomePage.module.css"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

import { api_constants } from "../../utils/api_constants.js"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { addQuery, addQueryUser, appendQuery } from "../../Redux/slices/querySlice.js"



const HomePage = () => {

    const lastMessageRef = useRef(null)
    const dispatch = useDispatch()
    const { myQuery, queryUserInfo } = useSelector((store) => store.QUERY)
    // // console.log("queryUserInfo", queryUserInfo)
    const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true)
    // const [isChatStarted, setIsChatStarted] = useState(false)

    // console.log("MYQUERY" , myQuery)

    const [introForm, setIntroForm] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const [introError, setIntroError] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const [customization, setCustomization] = useState({
        headerColor: null,
        bgColor: null,

        welcomeMessage: null,
        prompt_msg_1: null,
        prompt_msg_2: null,

        name_placeholder: null,
        email_placeolder: null,
        phone_placeholder: null
    })

    const [message, setMessage] = useState("")


    useEffect(() => {
        getCustomizations()
        if (queryUserInfo && queryUserInfo._id) {
            getMessages()
        }
    }, [isMessageBoxOpen , queryUserInfo])


    useEffect(() => {
        // * Auto scroll to the latest chat
        if (lastMessageRef.current) {
            // console.log("Scolling...")
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [myQuery, isMessageBoxOpen]);


    const handleInputChange = (e) => {
        setIntroForm((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


    const handleSendMessage = () => {
        if (message.trim().length > 0) {
            const data = {
                message
            }

            // // console.log(data)
            sendQuery(data)
            setMessage("")
        }
    }


    const validateInput = (field, minLength = null, maxLength = null, regex = null) => {
        const value = introForm[field]
        // // console.log("value", `${field}: ${value}`)
        let isValid = true

        if (maxLength && value.trim().length > maxLength) {
            setIntroError((prev) => {
                return {
                    ...prev,
                    [field]: `${field} must be lesser than ${maxLength} characters`
                }
            })
            // // console.log("Should be < maxLength")
            isValid = false
        }

        if (regex && regex.test(value) !== true) {
            setIntroError((prev) => {
                return {
                    ...prev,
                    [field]: `Invalid ${field}`
                }
            })
            // // console.log("Regex did not match")
            isValid = false
        }


        if (minLength && value.trim().length < minLength) {
            setIntroError((prev) => {
                return {
                    ...prev,
                    [field]: `${field} is required and must be atleast ${minLength} characters`
                }
            })
            // // console.log("Should be > minLength")
            isValid = false
        }

        if (field === "name" || field === "email" || field === "phone") {
            if (value.trim().length <= 0) {
                setIntroError((prev) => {
                    return {
                        ...prev,
                        [field]: `${field} is required`
                    }
                })
                // // console.log("Field is Required")
                isValid = false
            }
        }

        return isValid

    }


    const handleRegisterNewUser = async () => {

        setIntroError({
            name: "",
            email: "",
            phone: ""
        })

        let isNameValid = validateInput("name", 2, 100)
        let isEmailIDValid = validateInput("email", null, null, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        let isPhonevalid = validateInput("phone", null, null, /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/)

        if (isNameValid && isEmailIDValid && isPhonevalid) {
            const data = {
                ...introForm,
                emailID: introForm.email
            }
            await addUser(data)
        }
    }


    // ! ------------------------- API -----------------------------------

    const addUser = async (data) => {
        // // console.log("inside get customizations api")
        try {
            const res = await axios.post(api_constants.BASE_URL + api_constants.ADD_USER, data)

            const { data: userData } = res.data

            dispatch(addQueryUser({
                data: userData
            }))

            // // console.log("userData", userData)

            toast.success(res.data.message)

        }
        catch (err) {
            const errMessage = err?.response?.data?.error?.message
            if (errMessage) {
                toast.error(errMessage)
            }
        }
    }

    const getCustomizations = async () => {
        // // console.log("inside get customizations api")
        try {
            const res = await axios.get(api_constants.BASE_URL + api_constants.GET_CUSTOMIZATION)

            const { data: customizationData } = res.data

            // // console.log("customizationData", customizationData)

            // * Set Values Fetched from DB
            setCustomization({
                headerColor: customizationData.color.header,
                bgColor: customizationData.color.background,

                welcomeMessage: customizationData.welcomeMessage.welcome_message,
                prompt_msg_1: customizationData.welcomeMessage.prompt_message_1,
                prompt_msg_2: customizationData.welcomeMessage.prompt_message_2,

                name_placeholder: customizationData.formPlaceholders.name,
                email_placeolder: customizationData.formPlaceholders.email,
                phone_placeholder: customizationData.formPlaceholders.phone

            })

            // toast.success(res.data.message)

        }
        catch (err) {
            const errMessage = err?.response?.data?.error?.message
            if (errMessage) {
                toast.error(errMessage)
            }
        }
    }

    const getMessages = async () => {
        // // console.log("inside get customizations api")
        try {
            const res = await axios.get(api_constants.BASE_URL + api_constants.GET_USER_MESSAGES + `/${queryUserInfo._id}`)

            const { data: messages } = res.data

            // // console.log("messages", messages)

            dispatch(addQuery({
                data: messages
            }))

            // toast.success(res.data.message)

        }
        catch (err) {
            const errMessage = err?.response?.data?.error?.message
            if (errMessage) {
                toast.error(errMessage)
            }
        }
    }

    const sendQuery = async (data) => {
        // console.log("inside sendquery api")
        try {
            const res = await axios.post(api_constants.BASE_URL + api_constants.USER_SEND_QUERY + `/${queryUserInfo._id}`, data)

            const { data: queryData } = res.data

            // console.log("queryData", queryData)

            dispatch(appendQuery({
                data: queryData
            }))

            toast.success(res.data.message)

        }
        catch (err) {
            const errMessage = err?.response?.data?.error?.message
            if (errMessage) {
                toast.error(errMessage)
            }
        }
    }

    return (
        <div className={styles.HomePageMain}>
            <div className={styles.HomePageWrapper}>
                <Nav />
                <Hero />
                <Company />
                <About />
                <PricingPlan />
                <Footer />

                {/* ChatBot */}
                <div className={styles.chatBot}>
                    <div className={styles.chatBotWrapper}>
                        {
                            isMessageBoxOpen ? (
                                <>
                                    <img src={hublyLogo} alt="" className={styles.logo} />
                                    <img src={crossIcon} alt="" className={styles.crossIcon} onClick={() => setIsMessageBoxOpen(false)} />
                                    <div className={styles.welcomeMessage}>
                                        <p>{customization && customization.welcomeMessage}</p>
                                    </div>
                                </>
                            ) :
                                (
                                    <div className={styles.charArea}>
                                        <div className={styles.header}
                                            style={{ backgroundColor: customization && customization.headerColor && customization.headerColor }}
                                        >
                                            <div className={styles.logoDiv}>
                                                <img src={logo} alt="" />
                                                <span className={styles.active}></span>
                                            </div>
                                            <span>Hubly</span>
                                        </div>

                                        <div
                                            className={styles.body}
                                            style={{ backgroundColor: customization && customization.bgColor && customization.bgColor }}
                                        >
                                            {/* <div className={styles.messageDiv}>
                                                <div className={styles.message}>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm
                                                </div>
                                            </div> */}

                                            {/* User Registration Form */}

                                            {
                                                !queryUserInfo &&
                                                <div className={styles.formDivMain}>
                                                    <img src={hublyLogo} alt="" />
                                                    <div className={styles.form}>
                                                        <p>Introduce Yourself</p>

                                                        <div>
                                                            <p>{customization && customization.name_placeholder}</p>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                placeholder="Your name"
                                                                value={introForm.name}
                                                                onChange={(e) => handleInputChange(e)}
                                                            />
                                                            {introError.name && <p className={styles.error}>{introError.name}</p>}
                                                        </div>

                                                        <div>
                                                            <p>{customization && customization.phone_placeholder}</p>
                                                            <input
                                                                type="text"
                                                                name="phone"
                                                                placeholder="+1 (000) 000-0000"
                                                                value={introForm.phone}
                                                                onChange={(e) => handleInputChange(e)}
                                                            />
                                                            {introError.phone && <p className={styles.error}>{introError.phone}</p>}
                                                        </div>

                                                        <div>
                                                            <p>{customization && customization.email_placeolder}</p>
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                placeholder="example@gmail.com"
                                                                value={introForm.email}
                                                                onChange={(e) => handleInputChange(e)}
                                                            />
                                                            {introError.email && <p className={styles.error}>{introError.email}</p>}
                                                        </div>

                                                        <div className={styles.btnDiv}>
                                                            <button onClick={handleRegisterNewUser} >
                                                                Thank You!
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            {/* User Prompts */}

                                            {
                                                (myQuery === null || myQuery?.length === 0) && queryUserInfo &&
                                                <div className={styles.messagePrompt}>
                                                    <div className={styles.promptMain}>
                                                        <img src={hublyLogo} alt="" />
                                                        <div className={styles.promptDiv}>
                                                            <div className={styles.prompt}>
                                                                {customization && customization.prompt_msg_1}
                                                            </div>

                                                            <div className={styles.prompt}>
                                                                {customization && customization.prompt_msg_2}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            {
                                                myQuery && myQuery.length !== 0 &&
                                                myQuery.map((query, index) => {

                                                    return (
                                                        <div
                                                            className={styles.messageDiv}
                                                            style={{
                                                                justifyContent: queryUserInfo._id === query.senderID._id ? "flex-end" : "flex-start"
                                                            }}
                                                            key={query._id}
                                                            ref={index === myQuery.length - 1 ? lastMessageRef : null}
                                                        >
                                                            <div className={styles.message}>
                                                                {query.message}
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
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleSendMessage()
                                                    }
                                                }}
                                            />
                                            <img src={sendIcon} alt="" className={styles.sendIcon} onClick={handleSendMessage} />
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
