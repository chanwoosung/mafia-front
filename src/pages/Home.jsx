import ChatForm from "../component/ChatForm";
import MessageList from "../component/MessageList";

export default function Home({nickname}) {
    return (
        <div>
            <MessageList nickname={nickname} />
            <ChatForm nickname={nickname} />
        </div>
    )
}