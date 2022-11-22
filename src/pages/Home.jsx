import { Outlet, useLocation } from "react-router-dom";
import Header from "../component/Header";
import { ROUTE_PATH } from "../constant/constant";
import Login from "./Login";

export default function Home({nickname}) {
    const {pathname} = useLocation();
    return (
        <div>
            <Header/>
            {pathname === ROUTE_PATH.HOME ? (
                <Login />
            ) : (
                <div className="min-h-[100vh] pt-16">
                    <Outlet />
                </div>
            )}
            {/* <MessageList nickname={nickname} />
            <ChatForm nickname={nickname} /> */}
        </div>
    )
}