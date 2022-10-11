import { useState, useCallback, useEffect, useContext, useRef } from "react";
import { makeMessage, SocketContext, SOCKET_EVENT } from "../service/socket";

import MessageItem from "./MessageItem";

function MessageList() {
  const [messages, setMessages] = useState([]);
  const chatWindow = useRef(null);
  const socket = useContext(SocketContext);

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
      setMessages(messages => [...messages, newMessage]);
      moveScrollToReceiveMessage();
    },
    [moveScrollToReceiveMessage]
  );

  useEffect(() => {
    socket.on(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, [socket, handleReceiveMessage]);

  return (
    <div className="chat-window card" ref={chatWindow}>
      {messages.map((message, index) => {
        return <MessageItem key={index} message={message} />;
      })}
    </div>
  );
}

export default MessageList;