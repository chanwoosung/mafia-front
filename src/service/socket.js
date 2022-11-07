import { createContext } from "react";
import socketClient from "socket.io-client";
import dayjs from "dayjs";
import getMyRole from "./getMyRole"

export const socket = socketClient(String(process.env.REACT_APP_BACK_URL), { withCredentials: true });
export const SocketContext = createContext(socket);
export const SOCKET_EVENT = {
  JOIN_ROOM: "JOIN_ROOM",
  UPDATE_NICKNAME: "UPDATE_NICKNAME",
  SEND_MESSAGE: "SEND_MESSAGE",
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
  GAME_START: "GAME_START",
};

export const makeMessage = async(pongData) => {
  const { content, type, time, nickname } = pongData;

 
  let contentLabel = "";

  switch (type) {
    case SOCKET_EVENT.JOIN_ROOM: {
      contentLabel = `${nickname} has joined the room.`;
      break;
    }
    case SOCKET_EVENT.SEND_MESSAGE: {
      console.log(pongData);
      contentLabel = String(content);
      
      break;
    }

    case SOCKET_EVENT.GAME_START: {
       (async()=>{
          const {data:{role}} = await getMyRole({
          ip:sessionStorage.getItem('ip'),
          nickname:sessionStorage.getItem('nickname'),
          roomId:sessionStorage.getItem('roomId')
          });
          sessionStorage.setItem('role',role);
          makeMessage({
            type:SOCKET_EVENT.SEND_MESSAGE,
            nickname:sessionStorage.setItem('nickname'),
            content:`게임이 시작되었습니다. \n 당신은 ${role} 입니다.`
          })
        }
      )()
      break;
    }
    default:
  }

  return {
    nickname,
    content: contentLabel,
    time: dayjs(time).format("HH:mm"),
  };
};
socket.on("connect", () => {
  console.log("socket server connected.");
});

socket.on("disconnect", () => {
  console.log("socket server disconnected.");
});