import { createContext } from "react";
import socketClient from "socket.io-client";
import dayjs from "dayjs";
import getMyRole from "./getMyRole";

export const socket = socketClient(String(process.env.REACT_APP_BACK_URL), { withCredentials: true });
export const SocketContext = createContext(socket);
export const SOCKET_EVENT = {
  JOIN_ROOM: "JOIN_ROOM",
  UPDATE_NICKNAME: "UPDATE_NICKNAME",
  SEND_MESSAGE: "SEND_MESSAGE",
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
  GAME_START: "GAME_START",
  START_VOTE: "START_VOTE",
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
      console.log(content);
      contentLabel = String(content);
      
      break;
    }
    case SOCKET_EVENT.GAME_START: {
         const {data:{role}} = await getMyRole({
         ip:sessionStorage.getItem('ip'),
         nickname:sessionStorage.getItem('nickname'),
         roomId:sessionStorage.getItem('roomId')
         });
         sessionStorage.setItem('role',role);
         contentLabel = `게임이 시작되었습니다. \n 당신은 ${role} 입니다.\n2분간 회의를 통해 마피아일 것같은 사람을 색출해주세요. \n 동률일 경우 아무도 처형되지 않습니다.`;
         makeMessage({
           type:SOCKET_EVENT.SEND_MESSAGE,
           nickname:sessionStorage.getItem('nickname'),
           content :`게임이 시작되었습니다. \n 당신은 ${role} 입니다.`
         });
         makeMessage({
          type:SOCKET_EVENT.SEND_MESSAGE,
          nickname:sessionStorage.getItem('nickname'),
          content :`2분간 회의를 통해 마피아일 것같은 사람을 색출해주세요. \n 동률일 경우 아무도 처형되지 않습니다.`
        });
     break;
   }
  case SOCKET_EVENT.START_VOTE: {
    console.log(pongData);
    contentLabel = String(content);
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