import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    teamMembers: null,
    teamMembers_memberAdmin: null
}

const memberSlice = createSlice({
    name: "Member",
    initialState,

    reducers: {
        addTeamMembers: (state, action) => {
            state.teamMembers = action.payload.data
        },

        addNewTeamMember: (state, action) => {
            if(!state.teamMembers){
                state.teamMembers = [action.payload.data]
            } else {
                state.teamMembers.push(action.payload.data)
            }
        },

        updateMember: (state, action) => {
            const { updatedMemberData, index } = action.payload
            state.teamMembers[index] = updatedMemberData
        },

        deleteMember: (state, action) => {
            const filteredTeamMembers = state.teamMembers.filter((member, index) => index !== action.payload.index)
            state.teamMembers = filteredTeamMembers
        },

        clearTeamMembers: (state , action) => {
            state.teamMembers = null
        },

        addNewTeamMember_memberAdmin: (state, action) => {
            if (!state.teamMembers_memberAdmin) {
                state.teamMembers_memberAdmin = action.payload.data
            } else {
                state.teamMembers_memberAdmin.push(action.payload.data)
            }
        },

        deleteNewTeamMember_memberAdmin: (state, action) => {
            const filteredMembers = state.teamMembers_memberAdmin &&
                state.teamMembers_memberAdmin.filter((member, index) => index !== action.payload.index)

            state.teamMembers_memberAdmin = filteredMembers
        }
    }

})



export const {
    addTeamMembers,
    addNewTeamMember,
    updateMember,
    deleteMember,
    clearTeamMembers,
    addNewTeamMember_memberAdmin,
    deleteNewTeamMember_memberAdmin,
    filteredMembers
} = memberSlice.actions
export default memberSlice.reducer