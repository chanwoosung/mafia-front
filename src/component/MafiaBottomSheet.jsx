import { useContext, useEffect } from "react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { AccountContext } from "../context/account";
import { makeMessage, SocketContext, SOCKET_EVENT } from "../service/socket";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleIsMafiaTime } from "../store/slices/roomSlice";
import BottomSheet from "./BottomSheet";

export default function MafiaBottomSheet({setIsOpenBottomSheet}) {
    const {account,setAccount} = useContext(AccountContext);
    const {socket,ip} = useContext(SocketContext);
    const {register,handleSubmit,reset,control} = useForm();
    const {user,roomInfo} = useAppSelector(state=>state);
    const dispatch = useAppDispatch();
    console.log(user, roomInfo);
    
    
    const handleClose = () => {
        setIsOpenBottomSheet(false);
        reset();
    }
    
    const onClick = useCallback(async(nickname)=>{
        dispatch(toggleIsMafiaTime());
        socket.emit(SOCKET_EVENT.KILL_CITIZEN, { ip:account.ip, nickname:nickname,roomId:roomInfo.roomId });
        handleClose();
    },[])
    
    
    return (
        <>
            <BottomSheet close={handleClose} className={"!h-[50vh]"} >
                <div className="p-6 pt-10 grid grid-cols-2 gap-4">

                {
                    Boolean(user.userList)&&user.userList.map((item, index)=> {
                        if(item.nickname === account.nickname) return null;
                        if(item.live === false) {
                            return (
                                <div key={index}>
                                    <button className="border border-white bg-orange-600 text-white text-lg font-semibold rounded-md text-center h-12 flex justify-center flex-col items-center w-full disabled:opacity-50" disabled={true}
                                    onClick={(e)=>onClick(e.currentTarget.value)}
                                    value={item.nickname}>
                                    {item.nickname} 사망
                                    </button>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index}>
                                    <button className="border border-white bg-bgAccent text-black text-lg font-semibold rounded-md text-center h-12 flex justify-center flex-col items-center w-full disabled:opacity-50" disabled={!roomInfo.isVotingPeriod}
                                    onClick={(e)=>onClick(e.currentTarget.value)}
                                    value={item.nickname}>
                                    {item.nickname}
                                    </button>
                                </div>
                            )
                        }
                    })
                }
                </div>
            </BottomSheet>
        </>
    )
}