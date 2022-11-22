import { createContext } from "react";
import socketClient from "socket.io-client";
import dayjs from "dayjs";
import getMyRole from "./getMyRole";
import { toggleIsPlay, updateChatLog } from "../store/slices/roomSlice";
import { setUserList } from "../store/slices/userSlice";

export const socket = socketClient(String(process.env.REACT_APP_BACK_URL), { withCredentials: true });
export const SocketContext = createContext(socket);
export const SOCKET_EVENT = {
  JOIN_ROOM: "JOIN_ROOM",
  UPDATE_NICKNAME: "UPDATE_NICKNAME",
  SEND_MESSAGE: "SEND_MESSAGE",
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
  GAME_START: "GAME_START",
  START_VOTE: "START_VOTE",
  RECEIVE_EVENT: "RECEIVE_EVENT",
};

export const handleEvent = async (socketData,dispatch,state) => {
  const { content, type, time, nickname } = socketData;

  switch (type) {
    case SOCKET_EVENT.GAME_START:
      dispatch(toggleIsPlay())
      await getMyRole({
        ip:sessionStorage.getItem('ip'),
        nickname:sessionStorage.getItem('nickname'),
        roomId:sessionStorage.getItem('roomId')
        }).then(data=> {
          console.log(data);
          dispatch(setUserList(data.userList));
          makeMessage({
            type:SOCKET_EVENT.SEND_MESSAGE,
            nickname:sessionStorage.getItem('nickname'),
            content :`게임이 시작되었습니다. \n 당신은 ${data.role} 입니다.`
          });
          makeMessage({
           type:SOCKET_EVENT.SEND_MESSAGE,
           nickname:sessionStorage.getItem('nickname'),
           content :`2분간 회의를 통해 마피아일 것같은 사람을 색출해주세요. \n 동률일 경우 아무도 처형되지 않습니다.`
         });
        });
      break;
    default:
      break;
  }
}

export const makeMessage = async(pongData,dispatch,state) => {
  const { content, type, time, nickname } = pongData;

 
  let contentLabel = "";

  switch (type) {
    case SOCKET_EVENT.JOIN_ROOM: {
      dispatch(updateChatLog({
        nickname: 'SYSTEM',
        content:`${nickname} has joined the room.`,
        time: dayjs(time).format("HH:mm"),
      }))
      break;
    }
    case SOCKET_EVENT.SEND_MESSAGE: {
      dispatch(updateChatLog({
        nickname: nickname,
        content:content,
        time: dayjs(time).format("HH:mm"),
      }))
      break;
    }
  case SOCKET_EVENT.START_VOTE: {
    dispatch(updateChatLog({
      nickname: 'SYSTEM',
      content:content,
      time: dayjs(time).format("HH:mm"),
    }))
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
