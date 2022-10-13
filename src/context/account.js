import { createContext, useState } from "react";

export const AccountContext = createContext();

export function AccountContextContainer({children}) {
    const [account, setAccount] = useState({
        ip: '',
        nickname: '',
      });
    return (
        <AccountContext.Provider value={{account,setAccount}}>
            {children}
        </AccountContext.Provider>
    )
}
