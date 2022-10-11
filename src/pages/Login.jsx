import Button from "../component/Button";

export default function Login () {

    return (
        <div className="flex flex-col items-center gap-5 justify-center m-auto min-h-[100vh]">
            <img src="/img/mafia_icon.png" alt="main_logo" width='200px' height="200px" />
            <input type="text" placeholder="Insert Your ID" className="placeholder:italic placeholder:text-center" />
            <Button theme={'Accent'} text={'Login'} size={'sm'} className="w-[132px]"  />
        </div>
    )
}