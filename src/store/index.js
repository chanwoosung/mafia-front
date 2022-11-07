import { configureStore, createSlice } from '@reduxjs/toolkit';
const initialState = {
    ip:'',
    nickname:'',
    roomId:'',
}
export const roomAccountInfoSlice = createSlice({
    initialState,
    name:'roomAccountInfo',
    reducers: {
        initRoomAccountInfo(state,action) {
            state = initialState
        },
        setRoomAccountInfo(state,action) {
            state =action.payload
        }
    }
})
export const  {initRoomAccountInfo,setRoomAccountInfo} = roomAccountInfoSlice.actions
export const selectProduct = (state) => state.roomAccountInfo
export default configureStore({
    reducer: {
        roomAccountInfoSlice: roomAccountInfoSlice.reducer
    },
  });
  