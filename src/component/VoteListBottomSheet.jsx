import { useContext, useEffect } from "react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { AccountContext } from "../context/account";
import { client } from "../service/client";
import { makeMessage, SocketContext, SOCKET_EVENT } from "../service/socket";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleOffIsVotingPeriod } from "../store/slices/roomSlice";
import BottomSheet from "./BottomSheet";
import Button from "./Button";

export default function VoteListBottomSheet({setIsOpenBottomSheet}) {
    const {account,setAccount} = useContext(AccountContext);
    const {socket,ip} = useContext(SocketContext);
    const {register,handleSubmit,reset,control} = useForm();
    const {user,roomInfo} = useAppSelector(state=>state);
    const dispatch = useAppDispatch();
    console.log(user, roomInfo);
    
    const checkAlive = useCallback(()=>{
        const alive = user.userList.find(element => element.nickname === account.nickname && element.live)
        if(alive===undefined) return false;
        else return true
    },[])
    
    const handleClose = () => {
        setIsOpenBottomSheet(false);
        reset();
    }
    
    const onClick = useCallback(async({id,value:nickname})=>{
        dispatch(toggleOffIsVotingPeriod());
        await client.post('/vote-mafia',{
            params:{
                ip,
                id,
                roomId: roomInfo.roomId,
                vote:nickname
            }
        }).then(({data:{data}})=>{
            console.log(data.allReady);
            makeMessage({
                type:SOCKET_EVENT.SEND_MESSAGE,
                nickname:'SYSTEM',
                content :`${nickname}이 마피아라고 투표하셨습니다.`
            },dispatch);
            data.allReady===true && socket.emit(SOCKET_EVENT.ANNOUNCE_RESULT, { ip:account.ip, nickname:account.nickname,roomId:roomInfo.roomId });
        }).finally(()=>{
            handleClose();
        });
    },[])
    
    
    return (
        <>
            <BottomSheet close={handleClose} className={"!h-[50vh]"} >
                <div className="p-6 pt-10 grid grid-cols-2 gap-4">

                {
                    Boolean(user.userList)&&user.userList.map((item, index)=> {
                        if(item.live=== false) {
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
                                    <button className="border border-white bg-bgAccent text-black text-lg font-semibold rounded-md text-center h-12 flex justify-center flex-col items-center w-full disabled:opacity-50" disabled={!roomInfo.isVotingPeriod||!checkAlive()}
                                    onClick={(e)=>onClick(e.currentTarget)}
                                    value={item.nickname}
                                    id={item._id}>
                                    {item.nickname}
                                    </button>
                                </div>
                            )
                        }
                    })
                }
                </div>
                <div className={'w-full h-[73px] bg-bgPrimary p-4 fixed bottom-0 z-[2]'}>
                    <Button
                        theme="Accent"
                        text="투표 넘기기"
                        className="py-[10px] w-full !text-sm font-Pretendard !leading-normal disabled:opacity-50"
                        onClick={(e)=>onClick(e.currentTarget)}
                        value={'기권'}
                        id={roomInfo.roomId}
                        disable={!roomInfo.isVotingPeriod||!checkAlive()}
                        />
                </div>
            </BottomSheet>
        </>
    )
}