import { useState, useCallback, useEffect, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { makeMessage, SocketContext, SOCKET_EVENT } from "../service/socket";
import {  selectProduct } from "../store";

import MessageItem from "./MessageItem";

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [scrollHeight, setScrollHeight] = useState(0);
  const chatWindow = useRef(null);
  const {socket} = useContext(SocketContext);
  const moveScrollToReceiveMessage = useCallback(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const handleReceiveMessage = useCallback(
    pongData => {
      const newMessage = makeMessage(pongData);
      setMessages([...messages, newMessage]);
      setScrollHeight(chatWindow.current.scrollHeight);
    },
    [messages]
  );

  useEffect(() => {
    socket.on(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);
    return () => {
      socket.off(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, [socket, handleReceiveMessage]);

  useEffect(()=>{
    if(scrollHeight !== chatWindow.current.scrollHeight ) {
      moveScrollToReceiveMessage();
    } 
  },[scrollHeight]);


  return (
    <div className="chat-window card w-full h-[50vh] overflow-auto" ref={chatWindow}>
      {messages.map((message, index) => {
        return <MessageItem key={index} message={message} />;
      })}
    </div>
  );
}

export default MessageList;