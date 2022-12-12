import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ip:'',
    nickname:'',
    roomId:'',
    myJob: '',
    isPlay: false,
    isVotingPeriod:false,
    isMafiaTime:false,
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
            state.myJob = '';
            state.isVotingPeriod = false;
            state.isMafiaTime = false;
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
        },
        setMyJob(state,action) {
            state.myJob = action.payload
        },
        toggleIsMafiaTime(state) {
            state.isMafiaTime =!state.isMafiaTime
        },
        toggleOffMafiaTime(state) {
            state.isMafiaTime =false
        }

    }
});
export const selectRoomState = (state) => state.roomInfo 

export const  {resetRoomInfo,setRoomInfo,setRoomId,toggleIsPlay,updateChatLog,toggleIsVotingPeriod,toggleOffIsVotingPeriod,toggleOnIsVotingPeriod,setMyJob,toggleIsMafiaTime,toggleOffMafiaTime} = roomInfoSlice.actions
