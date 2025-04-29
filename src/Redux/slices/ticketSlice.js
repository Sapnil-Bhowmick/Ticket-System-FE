
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    all_tickets: null,
    resolved_tickets: null,
    unresolved_tickets: null,

    activeTicket: null,
    activeChatNo: null
}


const ticketSlice = createSlice({
    name: "Ticket",
    initialState ,

    reducers: {
        add_all_tickets: (state,action) => {
            state.all_tickets = action.payload.data

            let resolvedTickets = [] , unresolvedTickets = []
            action.payload.data.forEach((ticket) => {
                if((ticket.status === "UnResolved")){
                    unresolvedTickets.push(ticket)
                } 
                else {
                    resolvedTickets.push(ticket)
                }
            })

            state.resolved_tickets = resolvedTickets
            state.unresolved_tickets = unresolvedTickets
        } , 

        addActiveTicket: (state , action) => {
            state.activeTicket = action.payload.data
            state.activeChatNo = action.payload.chatNo
        } ,

        removeTicket: (state , action) => {

            let updatedActiveTicket
            const index = state.all_tickets.findIndex((ticket) => ticket._id === action.payload.ticketID)
            if(index === 0){
                updatedActiveTicket = state.all_tickets[index + 1]
            } 
            else if(index === state.all_tickets.length - 1){
                updatedActiveTicket = state.all_tickets[index - 1]
            }

            const filteredTickets = state.all_tickets.filter((ticket) => ticket._id !== action.payload.ticketID)
            state.all_tickets = filteredTickets
            state.activeTicket = updatedActiveTicket
        } , 

        updateActiveTicketStatus: (state , action) => {
            state.activeTicket.status = action.payload.ticketStatus
        }
    }
})


export const {add_all_tickets , addActiveTicket , removeTicket , updateActiveTicketStatus} = ticketSlice.actions
export default ticketSlice.reducer