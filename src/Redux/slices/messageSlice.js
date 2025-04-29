import { createSlice } from "@reduxjs/toolkit";
import { groupMessagesByDate } from "../../utils/message";

const initialState = {
    activeTicketMessages: null
}

const messageSlice = createSlice({
    name: "Message",
    initialState,

    reducers: {
        add_ActiveTicketMessages: (state , action) => {
            state.activeTicketMessages = groupMessagesByDate(action.payload.data)
        } ,

        addNewMessage: (state, action) => {
            // 1. Extract all the message arrays from the grouped object
            const allMessages = Object.values(state.activeTicketMessages).flat();
        
            // 2. Add the new message
            const updatedMessages = [...allMessages, action.payload.data];
        
            // 3. Re-group by date
            state.activeTicketMessages = groupMessagesByDate(updatedMessages);
        } ,

        // clearActiveTicketMessages: (state , action) => {
        //     state.activeTicketMessages = null
        // }
    }
})


export const {add_ActiveTicketMessages , addNewMessage} = messageSlice.actions
export default messageSlice.reducer