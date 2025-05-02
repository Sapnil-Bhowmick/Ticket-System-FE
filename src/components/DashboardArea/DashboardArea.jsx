import styles from "./DashboardArea.module.css"

import SearchIcon from "../../assets/icons/search.svg"
import downArrow from "../../assets/icons/down-arrow.svg"

import { useEffect, useState } from "react";
import Ticket from "../Ticket/Ticket";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

import { add_all_tickets } from "../../Redux/slices/ticketSlice";
import { api_constants } from "../../utils/api_constants";
import { formatDate } from "../../utils/dateTime";


const DashboardArea = () => {

    const dispatch = useDispatch()

    const tabs = [
        { id: 0, label: "All Tickets" },
        { id: 1, label: "Resolved" },
        { id: 2, label: "Unresolved" },
    ];

    const [activeTab, setActiveTab] = useState(0)
    const [search, setSearch] = useState("")
    const token = useSelector((store) => store.USER.token)
    const { all_tickets, resolved_tickets, unresolved_tickets } = useSelector((store) => store.TICKET)

    const [allTickets, setAllTickets] = useState()

    const ticketTypeArr =
        activeTab === 0 ? all_tickets : activeTab === 1 ? resolved_tickets : activeTab === 2 ? unresolved_tickets : null

    // // console.log("token", token)

    useEffect(() => {
        // console.log("Get all tickets")
        getAllTickets()
    }, [])


    const handleSearchTicket = () => {
        if (allTickets && allTickets.length !== 0) {
            if (search.trim().length > 0) {
                const filteredTickets = allTickets.filter((ticket) => formatDate(ticket.createdAt).includes(search))
                // console.log("filteredTickets", filteredTickets)

                dispatch(add_all_tickets({
                    data: filteredTickets
                }))
            } else {
                dispatch(add_all_tickets({
                    data: allTickets
                }))
            }
        }
    }


    const getAllTickets = async () => {
        try {
            const res = await axios.get(
                api_constants.BASE_URL + api_constants.TICKET_ALL,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            const { data: ticketData } = res.data
            dispatch(add_all_tickets({
                data: ticketData
            }))

            setAllTickets(ticketData)

            // // console.log(res.data)
        }
        catch (err) {
            toast.error("Unable to fetch tickets")
        }
    }

    return (
        <section className={styles.dashboardAreaMain}>
            <div className={styles.dashboardAreaWrapper}>
                <h1>Dashboard</h1>

                <div className={styles.searchDiv}>
                    <input
                        className={styles.searchTicketInput}
                        placeholder="Search for ticket"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearchTicket()
                            }
                        }}
                    />
                    <img src={SearchIcon} alt="" className={styles.search} onClick={handleSearchTicket} />
                </div>

                <div className={styles.tabContainer}>
                    {
                        tabs.map((tab, index) => {
                            return (
                                <div key={tab.id}
                                    className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {activeTab === tab.id && <img src={downArrow} alt="" />}
                                    {tab.label}
                                </div>
                            )
                        })
                    }

                    <div className={styles.line}></div>
                </div>

                <div className={styles.ticketContainer}>
                    {
                        ticketTypeArr && ticketTypeArr.length !== 0 ? (
                            ticketTypeArr.map((ticket, index) => {
                                return <Ticket ticketdata={ticket} ticketNo={index+1} key={ticket._id} />
                            }) 

                        ) :
                            <p className={styles.notFoundText}>No Tickets Found</p>
                    }

                </div>
            </div>
        </section >
    )
}

export default DashboardArea
