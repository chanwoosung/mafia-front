import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
const initialState = {
    ip:'',
    nickname:'',
    roomId:'',
    timer: false ,
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
        },
        toggleTimer(state) {
            state.timer = !state.timer
        }
    }
})
export const  {initRoomAccountInfo,setRoomAccountInfo,toggleTimer} = roomAccountInfoSlice.actions
export const selectProduct = (state) => state.roomAccountInfo
export default configureStore({
    reducer: {
        roomAccountInfoSlice: roomAccountInfoSlice.reducer
    },
  });
  
export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();