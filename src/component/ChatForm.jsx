import { useState, useCallback, useContext } from "react";
import { SOCKET_EVENT } from "../constant/constant";
import { SocketContext } from "../service/socket";

export default function ChatForm({nickname,roomId,ip}) {
  const [typingMessage, setTypingMessage] = useState("");
  const {socket} = useContext(SocketContext);

  // textarea에서 텍스트를 입력하면 typingMessage state를 변경합니다.
  const handleChangeTypingMessage = useCallback(event => {
    setTypingMessage(event.target.value);
  }, []);

  const handlePressEnter = (event) => {
    event.key === 'Enter' && handleSendMessage();
  }

 // 버튼을 누르면 실행합니다.
  const handleSendMessage = useCallback(() => {
    // 공백을 trim()으로 제거합니다.
    const noContent = typingMessage.trim() === "";

    // 아무 메시지도 없으면 아무 일도 발생하지 않습니다.
    if (noContent) {
      return;
    }

    // 메시지가 있으면 nickname과 message를 SEND_MESSAGE 이벤트 타입과 함께 소켓 서버로 전송합니다.
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
      ip,
      nickname,
      roomId,
      content: typingMessage,
    });
    // state값은 공백으로 변경해줍니다.
    setTypingMessage("");
  }, [socket, nickname, typingMessage]);
    return (
        <div className="fixed bottom-0 w-full">
            <form className="border">
                <div className="w-full">
                    <textarea
                    className="w-full text-bgPrimary h-6"
                    maxLength={400}
                    autoFocus
                    value={typingMessage}
                    onChange={handleChangeTypingMessage}
                    onKeyUp={(e)=>handlePressEnter(e)}
                    />
                    <button
                    type="button"
                    className="w-full"
                    onClick={handleSendMessage}
                    >
                    전송
                    </button>
                </div>
            </form>
        </div>
    )
}