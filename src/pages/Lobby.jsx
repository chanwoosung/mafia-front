import { useCallback, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MakeRoomBottomSheet from "../component/MakeRoomBottomSheet";
import MakeRoomButton from "../component/MakeRoomButton";
import { AccountContext } from "../context/account"
import { useGetRoomListQuery } from "../hooks/useGetRoomList";
import { client } from "../service/client";

export default function Lobby() {
    const {account,setAccount} = useContext(AccountContext);
    const [isOpenBottomSheet,setIsOpenBottomSheet] = useState(false)
    const { data:roomList } = useGetRoomListQuery();
    const navigate = useNavigate();
    const form = useForm({
        mode: "onSubmit"
    });
    const joinRoom = useCallback(async(roomId)=>{
        const {data: joinInfo} = await client.post('/join-room',{
            roomId: roomId,
            ip: account.ip,
            nickname: account.nickname,
        });
        if(joinInfo) {
            navigate(`/room/${roomId}`);
        }
    },[account.ip, account.nickname, navigate])
    if(roomList===undefined) {
        return <></>
    }
    return (
        <div className="font-mark mb-20">
            <div className="py-4 flex gap-5 items-center mx-auto justify-center">
                <span>어서오세요 {account.nickname}님</span>
            </div>
            <div className="p-2">
                {
                    roomList.length === 0 ? <>개설된 방이 없습니다.</> : 
                    (
                    <div className="flex flex-col gap-6 border rounded-md bg-bgQuarternary p-2">
                        {roomList.map((room,index) => {
                                return (
                                    <div key={index}  className="w-full h-16 flex bg-bgTertiary border-bgPrimary justify-between px-5 cursor-pointer"
                                    onClick={()=>joinRoom(room._id)}>
                                        <div className="flex items-center">
                                            <span>{room.roomName}</span>
                                        </div>
                                        <div className="flex gap-5">
                                            <div className="flex my-auto gap-4">
                                                <span>참가 인원</span>
                                                <span>{room.userList.length}</span>
                                            </div>
                                            <div className="flex flex-col gap-1 justify-around">
                                                <div className="flex gap-4 justify-between">
                                                    <span>시민 정원</span>
                                                    <span>{room.amountCitizen}</span>
                                                </div>
                                                <div className="flex gap-4 justify-between">
                                                    <span>마피아 정원</span>
                                                    <span>{room.amountMafia}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            </div>
            <MakeRoomButton setIsOpenBottomSheet={setIsOpenBottomSheet}  />
            { isOpenBottomSheet && <MakeRoomBottomSheet form={form} account={account} setIsOpenBottomSheet={setIsOpenBottomSheet} />}
        </div>
    )
}