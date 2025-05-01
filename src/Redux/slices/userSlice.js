import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo : null,
    token: null,
    payload: null
}

const userSlice = createSlice({
    name: "User",
    initialState,

    reducers: {
        saveLoggedInUserDetails: (state , action) => {
            state.userInfo = action.payload.userInfo,
            state.token = action.payload.token
        } ,

        logoutUser: (state , action) => {
            state.userInfo = null,
            state.token = null
        } ,

        addPayload: (state , action) => {
            state.payload = action.payload.data
        }
    }

})




export const {saveLoggedInUserDetails , logoutUser , addPayload} = userSlice.actions
export default userSlice.reducer

