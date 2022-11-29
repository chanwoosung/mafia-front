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
        toggleOffUserState(state,action) {
            state.userList = state.userList.map((user,index) => {
                if(user.nickname === action.payload.nickname){
                    user.live = false
                }
                return user
           })   
        },
    }
});

export const selectUserState = (state) => state.user
export const  {resetUser,setUserList,toggleOffUserState} = userSlice.actions
