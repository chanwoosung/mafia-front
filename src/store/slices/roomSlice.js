import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ip:'',
    nickname:'',
    roomId:'',
    isPlay: false,
    chatLog: [],
}

export const roomInfoSlice = createSlice({
    name:'roomInfo',
    initialState,
    reducers: {
        resetRoomInfo(state) {
            state.ip = '';
            state.chatLog=[];
            state.nickname = '';
            state.roomId = '';
            state.isPlay = false;
        },
        setRoomInfo(state,action) {
            state = action.payload
        },
        toggleIsPlay(state) {
            state.isPlay = !state.isPlay
        },
        updateChatLog(state,action) {
            state.chatLog.push(action.payload)
        },

    }
});
export const selectRoomState = (state) => state.roomInfo 

export const  {resetRoomInfo,setRoomInfo,toggleIsPlay,updateChatLog} = roomInfoSlice.actions
