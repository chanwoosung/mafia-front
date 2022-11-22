import { useEffect } from "react";
import { useCallback } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { client } from "../service/client";
import BottomSheet from "./BottomSheet";
import Button from "./Button";

export default function MakeRoomBottomSheet({form,setIsOpenBottomSheet, account}) {
    const {register,handleSubmit,reset,control,setFocus} = form
    const navigate = useNavigate();

    const onSubmit = useCallback(
      async(data) => {
        console.log(data);
        const {data:result,error} = await client.post('/make-room',{
            roomName: data.roomName,
            amountCitizen: data.amountCitizen,
            amountMafia: data.amountMafia,
            roomOwner: {
                ip: account.ip,
                nickname: account.nickname,
            }
        });
        if(error) {
            console.log(error);
        }
        if(result.state) {
            const {data: joinInfo} = await client.post('/join-room',{
                roomId: result.roomId,
                ip: account.ip,
                nickname: account.nickname,
            });
            if(joinInfo) {
                navigate(`/room/${result.roomId}`);
            }
        }
      },
      [],
    )

    useEffect(()=> {
        setFocus('roomName');
    })
    
    const handleClose = () => {
        setIsOpenBottomSheet(false);
        reset();
    }
    
    return (
        <>
            <BottomSheet close={handleClose} className={"!h-[50vh]"} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5 px-5 pt-10">
                        <div className="flex gap-5 justify-center">
                            <span className="whitespace-nowrap h-full my-auto font-markHeavy min-w-[120px]">방 이름</span>
                            <input type="text" placeholder="방제" id="roomName" name="roomName" className="w-full h-10 required:border-red-500 required:text-red placeholder:italic placeholder:text-center text-bgPrimary pl-1" 
                                {
                                    ...register("roomName", {
                                        required: "값을 입력해주세요.",
                                        focus:true
                                    })
                                }
                            />
                        </div>
                        <div className="flex gap-5 flex-start">
                            <span className="whitespace-nowrap h-full my-auto font-markHeavy w-[120px]">시민 인원 수</span>
                            <Controller
                                name="amountCitizen"
                                render={({field}) => 
                                    (
                                        <select className="text-bgSecondary w-16" onChange={(value)=>field.onChange(value)} value={field.value}>
                                            {
                                                new Array(8).fill().map((item,index)=> {
                                                    return (
                                                        <option key={index}>{index + 1}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    )
                                }
                                control={control}
                                defaultValue={1}
                            />
                        </div>
                        <div className="flex gap-5 flex-start">
                            <span className="whitespace-nowrap h-full my-auto font-markHeavy w-[120px]">마피아 인원 수</span>
                            <Controller
                                name="amountMafia"
                                render={({field}) => 
                                    (
                                        <select className="text-bgSecondary w-16" onChange={(value)=>field.onChange(value)} value={field.value}>
                                            {
                                                new Array(2).fill().map((item,index)=> {
                                                    return (
                                                        <option key={index}>{index + 1}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    )
                                }
                                control={control}
                                defaultValue={1}
                            />
                        </div>
                    </div>
                    <div className={'w-full h-[73px] bg-bgPrimary p-4 fixed bottom-0 z-[2]'}>
                        <Button
                            theme="Accent"
                            text="방 만들기"
                            className="py-[10px] w-full !text-sm font-Pretendard !leading-normal"
                            type="submit"
                            />
                    </div>
                </form>
            </BottomSheet>
        </>
    )
}