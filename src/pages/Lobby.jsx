import { useContext, useState } from "react"
import { useForm } from "react-hook-form";
import MakeRoomBottomSheet from "../component/MakeRoomBottomSheet";
import MakeRoomButton from "../component/MakeRoomButton";
import { AccountContext } from "../context/account"
import { useGetRoomList } from "../hooks/useGetRoomList";

export default function Lobby() {
    const {account,setAccount} = useContext(AccountContext);
    const [isOpenBottomSheet,setIsOpenBottomSheet] = useState(false)
    const {data:roomList} = useGetRoomList();

    const form = useForm({
        mode: "onSubmit"
    });
    console.log(account,setAccount)
    return (
        <div>
            <div className="py-4">
                {account.ip}
                <span>어서오세요{account.nickname}님</span>
            </div>
            {roomList === undefined ? <></> : 
                roomList.map((room,index) => {
                    return (
                        <div key={index}>
                            {room}
                        </div>
                    )
                })
            }
            <MakeRoomButton setIsOpenBottomSheet={setIsOpenBottomSheet}  />
            { isOpenBottomSheet && <MakeRoomBottomSheet form={form} setIsOpenBottomSheet={setIsOpenBottomSheet} />}
        </div>
    )
}