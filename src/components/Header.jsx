import mainLogo from "../assets/logo.png";

export default function Header() {
    return (
        <header>
            <img src={mainLogo} />
            <h1>Cook With This</h1>
        </header>
    )
}