import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    teamMembers: null
}

const memberSlice = createSlice({
    name: "Member",
    initialState,

    reducers: {
        addTeamMembers: (state , action) => {
            state.teamMembers = action.payload.data
        } , 

        addNewTeamMember: (state , action) => {
            state.teamMembers.push(action.payload.data)
        } , 

        updateMember: (state , action) => {
            const {updatedMemberData , index} = action.payload
            state.teamMembers[index] = updatedMemberData
        } ,

        deleteMember: (state , action) => {
            const filteredTeamMembers = state.teamMembers.filter((member , index) => index !== action.payload.index)
            state.teamMembers = filteredTeamMembers
        }
    }

})



export const {addTeamMembers , addNewTeamMember , updateMember , deleteMember} = memberSlice.actions
export default memberSlice.reducer