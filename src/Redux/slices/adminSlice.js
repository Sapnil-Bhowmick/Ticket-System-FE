import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo : null,
    token: null
}

const adminSlice = createSlice({
    name: "User",
    initialState,

    reducers: {
        saveLoggedInUserDetails: (state , action) => {
            state.userInfo = action.payload.userInfo,
            state.token = action.payload.token
        } ,

        logoutUser: (state , actions) => {
            state.userInfo = null,
            state.token = null
        }
    }

})




export const {saveLoggedInUserDetails , logoutUser} = adminSlice.actions
export default adminSlice.reducer

