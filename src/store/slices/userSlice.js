import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userList:[],
}

export const userSlice = createSlice({
    initialState,
    name:'user',
    reducers: {
        resetUser(state) {
            state = initialState
        },
        setUserList(state,action) {
            state.userList = action.payload
        },
    }
});

export const selectUserState = (state) => state.user
export const  {resetUser,setUserList} = userSlice.actions
