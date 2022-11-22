import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { roomInfoSlice } from './slices/roomSlice';
import { timerSlice } from './slices/timerSlice';
import { userSlice } from './slices/userSlice';



export const rootReducer = combineReducers({
    roomInfo: roomInfoSlice.reducer,
    user: userSlice.reducer,
    timer: timerSlice.reducer
})

export default configureStore({
    reducer: rootReducer,
  });
  
export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();