import Link from "next/link";

const GlobalMenu = () => {
    return (
    <nav className="menu">
            <div className="brand-area">
                <img src="/logo.png"></img>
            </div>
            <div className="search-area">
                <input type="text" placeholder="Search..."></input>
            </div>
            <div className="link-area">
            <ul>
                <li>
                    <Link href="/" className="active">Home</Link>
                </li>
                <li>
                    <Link href="/Universe">Universe</Link>
                </li>
                <li>
                    <Link href="/Timeline">Timeline</Link>
                </li>
                <li>
                    <Link href="/Projects">Projects</Link>
                </li>
                <li>
                    <Link href="/Contribute">Contribute</Link>
                </li>
                <li>
                    <Link href="/About">About</Link>
                </li>
            </ul>
            </div>
            <div className="user-area">
                <p className="user-name">USERNAME</p>
                <img src="/vercel.svg"></img>
            </div>
        </nav>
    );
}

export default GlobalMenu;