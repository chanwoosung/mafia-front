import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import { AccountContext } from "../context/account";
import getConfirmLogin from "../service/getConfirmLogin";
import { SocketContext } from "../service/socket";

export default function Login () {
    const [nickname,setNickname] = useState('');
    const {ip} = useContext(SocketContext);
    const {account,setAccount} = useContext(AccountContext);
    const navigator = useNavigate();
    const checkLogin = async() => {
        console.log(ip,nickname,process.env.REACT_APP_BACK_URL)
        const data = await getConfirmLogin({ip,nickname});
        if(data.state) {
            setAccount({ip,nickname});
            console.log(account);
            navigator({
                pathname: '/lobby'
            })
        }
    }
    return (
        <div className="flex flex-col items-center gap-5 justify-center m-auto min-h-[100vh]">
            <img src="/img/mafia_icon.png" alt="main_logo" width='200px' height="200px" />
            <span className="font-markHeavy text-2xl">Mafia Game</span>
            <input type="text" placeholder="Insert Your NickName" className="placeholder:italic placeholder:text-center w-[200px] text-bgPrimary pl-1" maxLength={11} onChange={(e)=>setNickname(e.currentTarget.value)} />
            <Button theme='Accent' text='Login' size='sm' className="w-[132px]" onClick={checkLogin}  />
        </div>
    )
}