import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ip:'',
    nickname:'',
    roomId:'',
    isPlay: false,
    isVotingPeriod:false,
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
            state.isVotingPeriod = false;
            state.isPlay = false;
        },
        setRoomInfo(state,action) {
            state = action.payload
        },
        setRoomId(state,action) {
            state.roomId = action.payload.roomId
        },
        toggleIsPlay(state) {
            state.isPlay = !state.isPlay
        },
        updateChatLog(state,action) {
            state.chatLog.push(action.payload)
        },
        toggleIsVotingPeriod(state) {
            state.isVotingPeriod = !state.isVotingPeriod
        },
        toggleOffIsVotingPeriod(state) {
            state.isVotingPeriod = false
        },
        toggleOnIsVotingPeriod(state) {
            state.isVotingPeriod = true
        }

    }
});
export const selectRoomState = (state) => state.roomInfo 

export const  {resetRoomInfo,setRoomInfo,setRoomId,toggleIsPlay,updateChatLog,toggleIsVotingPeriod,toggleOffIsVotingPeriod,toggleOnIsVotingPeriod} = roomInfoSlice.actions
