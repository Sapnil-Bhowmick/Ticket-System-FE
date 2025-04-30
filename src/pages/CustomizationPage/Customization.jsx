import styles from "./Customization.module.css"

import SidebarNav from "../../components/SidebarNav/SidebarNav.jsx"

import HublyLogo from "../../assets/icons/Hubly-Logo.svg"
import HublyLogo_noborder from "../../assets/icons/hubly-logo-noborder.svg"

import messageSendIcon from "../../assets/icons/Message-Send-Icon.svg"
import pencilIcon from "../../assets/icons/pencil.svg"

import { headerColors, bgColors } from "../../utils/constants.js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { api_constants } from "../../utils/api_constants.js"
import toast from "react-hot-toast"
import MissedTimer from "../../components/MissedTimer/MissedTimer.jsx"


const Customization = () => {

  const token = useSelector((store) => store.USER.token)

  const [customizationID, setCustomizationID] = useState(null)

  const [headerColor, setHeaderColor] = useState("#33475B")
  const [bgColor, setBgColor] = useState("##EEEEEE")
  const [customMessage, setCustomMessage] = useState({
    customMsg_1_bool: false,
    customMsg_2_bool: false,
    customMsg_1_msg: "How can I help you?",
    customMsg_2_msg: "Ask me anything"
  })

  const [introForm, setIntroForm] = useState({
    name: "Your name",
    email: "example@gmail.com",
    phone: "+1 (000) 000-0000"
  })

  const [welcomeMessage, setWelcomeMessage] = useState({
    isEdit: false,
    message: "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way."
  })

  const [selectedTime, setSelectedTime] = useState({
    hours: null,
    minutes: null,
    seconds: null
  })


  useEffect(() => {
    getCustomizations()
  }, [])



  // const submitPlaceholderData = () => {
  //   console.log(introForm)
  // }


  const handleInputChange = (e) => {
    setCustomMessage((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCustomMsg = async (e, key) => {
    console.log(e.target.value, key)
    if (e.key === 'Enter') {
      setCustomMessage((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
          [key]: !customMessage[key]
        }
      })

      let data
      if (key === "customMsg_1_bool") {
        data = {
          welcomeMessage: {
            prompt_message_1: e.target.value
          }
        }
      } else {
        data = {
          welcomeMessage: {
            prompt_message_2: e.target.value
          }
        }
      }

      await editCustomization(data)
    }

  }

  const handlePlaceholder = (e) => {
    setIntroForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleWelcomeMessage = (e) => {
    setWelcomeMessage((prev) => {
      return {
        ...prev,
        message: e.target.value
      }
    })
  }

  const handleWelcomeMsgKeyDown = async (e) => {
    console.log(e.target.value)
    if (e.key === 'Enter') {
      setWelcomeMessage((prev) => {
        return {
          message: e.target.value,
          isEdit: false
        }
      })

      const data = {
        welcomeMessage: {
          welcome_message: e.target.value
        }
      }

      await editCustomization(data)
    }
  }



  // ! ----------------------------- API ---------------------------------------

  const getCustomizations = async () => {
    // console.log("inside get customizations api")
    try {
      const res = await axios.get(api_constants.BASE_URL + api_constants.GET_CUSTOMIZATION)

      const { data: customizationData } = res.data
      // dispatch(deleteMember({
      //   index: memberID
      // }))

      console.log("customizationData", customizationData)

      // * Set Values Fetched from DB
      setCustomizationID(customizationData._id)
      setHeaderColor(customizationData.color.header)
      setBgColor(customizationData.color.background)
      setCustomMessage((prev) => {
        return {
          ...prev,
          customMsg_1_msg: customizationData.welcomeMessage.prompt_message_1,
          customMsg_2_msg: customizationData.welcomeMessage.prompt_message_2
        }

      })

      setIntroForm((prev) => {
        return {
          ...prev,
          name: customizationData.formPlaceholders.name,
          email: customizationData.formPlaceholders.email,
          phone: customizationData.formPlaceholders.phone
        }
      })

      setWelcomeMessage((prev) => {
        return {
          ...prev,
          message: customizationData.welcomeMessage.welcome_message


        }
      })

      setSelectedTime((prev) => {
        return {
          ...prev,
          hours: customizationData.missedChatDuration.hours,
          minutes: customizationData.missedChatDuration.minutes,
          seconds: customizationData.missedChatDuration.seconds
        }
      })

      toast.success(res.data.message)

    }
    catch (err) {
      const errMessage = err?.response?.data?.error?.message
      if (errMessage) {
        toast.error(errMessage)
      }
    }
  }



  const editCustomization = async (data) => {
    console.log("inside edit customizations api")
    try {
      const res = await axios.patch(
        api_constants.BASE_URL + api_constants.EDIT_CUSTOMIZATION + `/${customizationID}`,
        data,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )

      const { data: customizationData } = res.data
      // dispatch(deleteMember({
      //   index: memberID
      // }))

      console.log("customizationData", customizationData)

      // * Set Values Fetched from DB
      // setCustomizationID(customizationData._id)
      // setHeaderColor(customizationData.color.header)
      // setBgColor(customizationData.color.background)
      // setCustomMessage((prev) => {
      //    return {
      //     ...prev ,
      //     customMsg_1_msg: customizationData.welcomeMessage.prompt_message_1,
      //     customMsg_2_msg: customizationData.welcomeMessage.prompt_message_2
      //    }

      // })

      // setIntroForm((prev) => {
      //   return {
      //     ...prev , 
      //     name: customizationData.formPlaceholders.name,
      //     email: customizationData.formPlaceholders.email,
      //     phone: customizationData.formPlaceholders.phone
      //   }
      // })

      // setWelcomeMessage((prev) => {
      //   return {
      //     ...prev , 
      //     message: customizationData.welcomeMessage.welcome_message


      //   }
      // })

      toast.success(res.data.message)

    }
    catch (err) {
      const errMessage = err?.response?.data?.error?.message
      if (errMessage) {
        toast.error(errMessage)
      }
    }
  }



  const handleHeaderColor = async (selectedColor) => {
    setHeaderColor(selectedColor)

    const data = {
      color: {
        header: selectedColor
      }
    }

    await editCustomization(data)
  }

  const handleBgColor = async (selectedColor) => {
    setBgColor(selectedColor)

    const data = {
      color: {
        background: selectedColor
      }
    }

    await editCustomization(data)
  }


  const handlePlaceholderData = async () => {
    const data = {
      formPlaceholders: {
        ...introForm
      }
    }

    console.log(data)

    await editCustomization(data)
  }


  const handleTimeDuration = async (hours, minutes, seconds) => {
    // console.log(`${hours}:${minutes}:${seconds}`)

    const data = {
      missedChatDuration: {
        hours,
        minutes,
        seconds
      }
    }

    await editCustomization(data)
  }


  return (
    <div className={styles.customMain}>
      <div className={styles.customWrapper}>

        <div className={styles.customSiderBarNav}>
          <SidebarNav activePage="ChatBot" />
        </div>

        <div className={styles.customizationArea}>
          <p>Chat Bot</p>

          <div className={styles.custom_1}>
            <div className={styles.preview}>
              <div
                className={styles.chatbotHeader}
                style={{ backgroundColor: headerColor }}
              >
                <div className={styles.imgDiv}>
                  <img src={HublyLogo} alt="" className={styles.HublyLogo_Header} />
                  <span className={styles.active}></span>
                </div>
                <span>Hubly</span>
              </div>
              <div
                className={styles.chatbotBody}
                style={{ backgroundColor: bgColor }}
              >

                <div className={styles.messageDiv}>
                  <img src={HublyLogo_noborder} alt="" />
                  <div className={styles.message}>
                    <span>{customMessage.customMsg_1_msg}</span>
                    <span>{customMessage.customMsg_2_msg}</span>
                  </div>
                </div>

                <div className={styles.formDivMain}>
                  <div className={styles.form}>
                    <p>Introduce Yourself</p>

                    <div>
                      <p>Your name</p>
                      <span>{introForm.name}</span>
                    </div>

                    <div>
                      <p>Your Phone</p>
                      <span>{introForm.phone}</span>
                    </div>

                    <div>
                      <p>Your Email</p>
                      <span>{introForm.email}</span>
                    </div>

                    <div className={styles.btnDiv}>
                      <button>
                        Thank You!
                      </button>
                    </div>
                  </div>
                </div>

              </div>
              <div className={styles.chatbotFooter}>
                <span>Write a message</span>
                <img src={messageSendIcon} alt="" />
              </div>
            </div>

            <div className={styles.cutomizationContainer}>

              <div className={styles.header}>
                <p>Header Color</p>
                <div className={styles.colorPickerHeader}>
                  {
                    headerColors.map((item, index) => {
                      return (
                        <span
                          key={item.id}
                          style={{ backgroundColor: `${item.color}` }}
                          onClick={() => handleHeaderColor(item.color)}
                        ></span>
                      )
                    })
                  }
                </div>
                <div className={styles.selectedColorHeader}>
                  <span className={styles.color} style={{ backgroundColor: `${headerColor}` }}></span>
                  <span className={styles.code}>{headerColor}</span>
                </div>
              </div>

              <div className={`${styles.header} ${styles.background}`}>
                <p>Custom Background Color</p>
                <div className={styles.colorPickerHeader}>
                  {
                    bgColors.map((item, index) => {
                      return (
                        <span
                          key={item.id}
                          style={{ backgroundColor: `${item.color}` }}
                          onClick={() => handleBgColor(item.color)}
                        ></span>
                      )
                    })
                  }
                </div>
                <div className={styles.selectedColorHeader}>
                  <span className={styles.color} style={{ backgroundColor: `${bgColor}` }}></span>
                  <span className={styles.code}>{bgColor}</span>
                </div>
              </div>

              <div className={styles.message}>
                <p>Customize Message</p>
                <div className={styles.messageDiv}>
                  {
                    customMessage.customMsg_1_bool ? (
                      <input
                        type="text"
                        name="customMsg_1_msg"
                        value={customMessage.customMsg_1_msg}
                        onKeyDown={(e) => handleCustomMsg(e, "customMsg_1_bool")}
                        onChange={(e) => handleInputChange(e)}
                      />
                    ) : (
                      <div>
                        {customMessage.customMsg_1_msg.length > 25 ? customMessage.customMsg_1_msg.substring(0, 25) + "..." : customMessage.customMsg_1_msg}
                        <img src={pencilIcon} alt="" onClick={() => setCustomMessage((prev) => {
                          return {
                            ...prev,
                            customMsg_1_bool: !customMessage.customMsg_1_bool
                          }
                        })} />
                      </div>
                    )
                  }

                  {
                    customMessage.customMsg_2_bool ? (
                      <input
                        type="text"
                        name="customMsg_2_msg"
                        value={customMessage.customMsg_2_msg}
                        onKeyDown={(e) => handleCustomMsg(e, "customMsg_2_bool")}
                        onChange={(e) => handleInputChange(e)}
                      />
                    ) : (
                      <div>
                        {customMessage.customMsg_2_msg.length > 25 ? customMessage.customMsg_2_msg.substring(0, 25) + "..." : customMessage.customMsg_2_msg}
                        <img src={pencilIcon} alt="" onClick={() => setCustomMessage((prev) => {
                          return {
                            ...prev,
                            customMsg_2_bool: !customMessage.customMsg_2_bool
                          }
                        })} />
                      </div>
                    )
                  }


                </div>
              </div>
            </div>
          </div>

          <div className={styles.custom_2}>

            <div className={styles.welcomeMessagePreview}>
              <p>{welcomeMessage.message}</p>
              <img src={HublyLogo_noborder} alt="" />
            </div>


            <div className={styles.customContainer}>
              <div className={styles.formDivMain}>
                <div className={styles.form}>
                  <p>Introduce Yourself</p>

                  <div>
                    <p>Your name</p>
                    <input
                      type="text"
                      name="name"
                      value={introForm.name}
                      onChange={(e) => handlePlaceholder(e)}
                    />
                  </div>

                  <div>
                    <p>Your Phone</p>
                    <input
                      type="text"
                      name="phone"
                      value={introForm.phone}
                      onChange={(e) => handlePlaceholder(e)}
                    />
                  </div>

                  <div>
                    <p>Your Email</p>
                    <input
                      type="text"
                      name="email"
                      value={introForm.email}
                      onChange={(e) => handlePlaceholder(e)}
                    />
                  </div>

                  <div className={styles.btnDiv}>
                    <button onClick={handlePlaceholderData}>
                      Thank You!
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.welcomeMessageDiv}>
                <p>Welcome Message</p>
                {
                  welcomeMessage.isEdit ? (
                    <input
                      type="text"
                      value={welcomeMessage.message}
                      onChange={(e) => handleWelcomeMessage(e)}
                      onKeyDown={(e) => handleWelcomeMsgKeyDown(e)}
                    />
                  ) : (
                    <div>
                      <p>{welcomeMessage.message}</p>
                      <img src={pencilIcon} alt="" onClick={() => setWelcomeMessage((prev) => {
                        return {
                          ...prev,
                          isEdit: true
                        }
                      })} />
                      <span className={styles.count}>15/50</span>
                    </div>
                  )
                }
              </div>

              <div className={styles.missedTimerDiv}>
                <MissedTimer handleTimeDuration={handleTimeDuration} selectedTime={selectedTime} />
              </div>
            </div>

          </div>
        </div>

      </div >
    </div >
  )
}

export default Customization
