import Button from "./Button";

export default function MakeRoomButton({setIsOpenBottomSheet}) {
    return (
        <div className={'w-full h-[73px] bg-bgPrimary p-4 fixed bottom-0 z-[2]'}>
            <Button
                theme="Accent"
                text="방 만들기"
                className="py-[10px] w-full !text-sm font-Pretendard !leading-normal"
                onClick={() => setIsOpenBottomSheet(true)}
            />
        </div>
    )
}