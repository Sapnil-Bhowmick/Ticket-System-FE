import { createSlice } from "@reduxjs/toolkit";
import { groupMessagesByDate } from "../../utils/message";

const initialState = {
    myQuery: null ,
    queryUserInfo: null
}

const querySlice = createSlice({
    name: "Query",
    initialState,

    reducers: {
        addQuery: (state , action) => {
            state.myQuery = action.payload.data
        } , 

        addQueryUser: (state , action) => {
            state.queryUserInfo = action.payload.data
        } ,

        appendQuery: (state , action) => {
            if(state.myQuery !== null){
                state.myQuery.push(action.payload.data)
            } else {
                state.myQuery = [action.payload.data]
            }
            
        }
    }
})


export const {addQuery , addQueryUser , appendQuery} = querySlice.actions
export default querySlice.reducer