import { useCallback, useMemo } from "react";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../component/Button";
import ChatForm from "../component/ChatForm";
import MafiaBottomSheet from "../component/MafiaBottomSheet";
import MessageList from "../component/MessageList";
import VoteListBottomSheet from "../component/VoteListBottomSheet";
import { SOCKET_EVENT } from "../constant/constant";
import { AccountContext } from "../context/account";
import postCancelReady from "../service/postCancelReady";
import postGetReady from "../service/postGetReady";
import { socket, SocketContext } from "../service/socket";
import { setRoomAccountInfo, useAppSelector } from "../store";
import {  resetRoomInfo, setRoomId } from "../store/slices/roomSlice";

export default function Room() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const {socket,ip} = useContext(SocketContext);
    const {account} = useContext(AccountContext);
    const {roomInfo,user} = useAppSelector(state=>state)
    const [isOpen,setIsOpen] = useState(false);
    const [ready,setReady] = useState(false);
    const dispatch = useDispatch();

    const quitRoom = () => {
        dispatch(resetRoomInfo());
        socket.emit(SOCKET_EVENT.QUIT_ROOM, { ip:account.ip, nickname:account.nickname,roomId:roomId });
        navigate('/lobby');
    }
    const getReady = async() => {
        const data = await postGetReady({params: { ip:account.ip, nickname:account.nickname,roomId:roomId }});
        setReady(true);
        sessionStorage.setItem('ip',account.ip);
        sessionStorage.setItem('nickname',account.nickname);
        sessionStorage.setItem('roomId',roomId);
        if(data.allReady) {
            socket.emit(SOCKET_EVENT.ALL_READY,{ roomId:roomId });
        }
    }
    const cancelReady = async() => {
        const data = await postCancelReady({params: { ip:account.ip, nickname:account.nickname,roomId:roomId }});
        setReady(false);
    }

    useEffect(()=>{
        if(ip===undefined) {
          return;
        }
        console.log({ ip:account.ip, nickname:account.nickname,roomId:roomId });
        socket.emit(SOCKET_EVENT.JOIN_ROOM, { ip:account.ip, nickname:account.nickname,roomId:roomId });
        dispatch(setRoomId({
            roomId:roomId,
        }))
        return () => {
          if (socket.readyState === 1) { 
              socket.emit(SOCKET_EVENT.QUIT_ROOM, { ip:account.ip, nickname:account.nickname,roomId:roomId });
              socket.emit('disconnect', { ip:account.ip, nickname:account.nickname,roomId:roomId });
              socket.close();
          }
        };
    },[]);

    return (
        <>
            <div className="w-full">
                <img className="flex ml-auto w-6 h-6 cursor-pointer" src="/img/cancel-btn.svg" onClick={quitRoom} alt="quit_btn" />
            </div>
            <MessageList nickname={account.nickname} roomId={roomId}  ip={ip} />
            <ChatForm nickname={account.nickname} roomId={roomId} ip={ip} />
            {!roomInfo.isPlay && !ready && <Button theme="Accent" text="Get Ready" onClick={getReady} className="fixed bottom-[56px] left-0 w-full" />}
            {!roomInfo.isPlay && ready && <Button theme="Accent" text="Cancel Ready" onClick={cancelReady} className="fixed bottom-[56px] left-0 w-full" />}
            {roomInfo.isPlay && <Button theme="Accent" text="Vote List" onClick={()=>setIsOpen(true)} className="fixed bottom-[56px] left-0 w-full" />}
            {roomInfo.isPlay && isOpen && <VoteListBottomSheet setIsOpenBottomSheet={setIsOpen} />}
            {roomInfo.isMafiaTime && <MafiaBottomSheet setIsOpenBottomSheet={setIsOpen} />}
        </>
    )
}