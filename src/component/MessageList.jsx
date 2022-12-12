import { useState, useCallback, useEffect, useContext, useRef } from "react";
import { handleEvent, makeMessage, SocketContext, SOCKET_EVENT } from "../service/socket";
import { useAppDispatch, useAppSelector } from "../store";
import { selectRoomState } from "../store/slices/roomSlice";

import MessageItem from "./MessageItem";

function MessageList() {
  const [scrollHeight, setScrollHeight] = useState(0);
  const chatWindow = useRef(null);
  const {socket} = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const roomInfo = useAppSelector(selectRoomState);
  const [chat,setChat] = useState(roomInfo.chatLog);
  const reduxState = useAppSelector(state=>state);
  const moveScrollToReceiveMessage = useCallback(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const handleReceiveMessage = useCallback(
    async pongData => {
      await makeMessage(pongData,dispatch,reduxState);
      setScrollHeight(chatWindow.current.scrollHeight);
    },
    [chat]
  );

  const listenSocketState = useCallback(async socketData =>{
    console.log("reduxState",reduxState)
    await handleEvent(socketData,dispatch,reduxState);
  },[dispatch, reduxState]);

  useEffect(() => {
    socket.on(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);
    socket.on(SOCKET_EVENT.RECEIVE_EVENT, listenSocketState);
    return () => {
      socket.off(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, []);

  useEffect(()=>{
      moveScrollToReceiveMessage();
  },[scrollHeight]);


  return (
    <div className="chat-window card w-full max-h-[50vh] overflow-auto pt-5" ref={chatWindow}>
      {roomInfo.chatLog.map((message, index) => {
        return <MessageItem key={index} message={message} />;
      })}
    </div>
  );
}

export default MessageList;