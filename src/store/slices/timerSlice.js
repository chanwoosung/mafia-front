import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRunning: false ,
    time: 0,
}

export const timerSlice = createSlice({
    initialState,
    name:'timer',
    reducers: {
        resetTimer(state) {
            state = initialState
        },
        setTimer(state,action) {
            state =action.payload
        },
        toggleTimer(state) {
            state.isRunning = !state.isRunning
        }
    }
});
export const selectTimerState = (state) => state.timer
export const  {resetTimer,setTimer,toggleTimer} = timerSlice.actions
