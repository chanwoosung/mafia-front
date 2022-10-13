import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="w-full h-16 bg-bgAccent flex items-center my-auto px-6">
            <Link to="/">
                <img src="/img/Mafia-01.svg" alt="header-logo" className="w-11 h-11" />
            </Link>
        </div>
    )
}