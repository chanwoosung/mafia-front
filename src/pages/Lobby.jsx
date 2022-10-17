import { useCallback, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import MakeRoomBottomSheet from "../component/MakeRoomBottomSheet";
import MakeRoomButton from "../component/MakeRoomButton";
import { AccountContext } from "../context/account"
import { useGetRoomListQuery } from "../hooks/useGetRoomList";

export default function Lobby() {
    const {account,setAccount} = useContext(AccountContext);
    const [isOpenBottomSheet,setIsOpenBottomSheet] = useState(false)
    const { data:roomList } = useGetRoomListQuery();
    console.log(roomList);
    const form = useForm({
        mode: "onSubmit"
    });
    return (
        <div>
            <div className="py-4">
                {account.ip}
                <span>어서오세요{account.nickname}님</span>
            </div>
            {roomList === undefined ? <></> : 
                (roomList.map((room,index) => {
                    return (
                        <div key={index}>
                            {console.log(room)}
                        </div>
                    )
                }))
            }
            <MakeRoomButton setIsOpenBottomSheet={setIsOpenBottomSheet}  />
            { isOpenBottomSheet && <MakeRoomBottomSheet form={form} account={account} setIsOpenBottomSheet={setIsOpenBottomSheet} />}
        </div>
    )
}