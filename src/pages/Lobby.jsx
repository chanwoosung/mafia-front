import { useContext } from "react"
import { AccountContext } from "../context/account"

export default function Lobby() {
    const {account,setAccount} = useContext(AccountContext);
    console.log(account,setAccount)
    return (
        <div>
            {account.ip}
            <span>어서오세요{account.nickname}님</span>
        </div>
    )
}