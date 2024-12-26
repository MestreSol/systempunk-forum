import "./styles.css";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-area footer-text">
            <div className="brand-area">
                <img src="/logo.png"></img>
                <h1>Systempunk</h1>
            </div>
            <div className="text-area">
                <p>
                    Tellus non diam morbi quam vel venenatis proin sed. Dolor elementum nunc dictum interdum amet arcu aenean eu integer
                </p>
                <p>
                    copyright © 2024 todos os direitos reservados a Big O
                </p>
            </div>
            </div>
            <div className="footer-links footer-area">
                <h2>
                    Social
                </h2>
                <div className="social-links">
                    <a href="#"><img src="/facebook.png"></img></a>
                    <a href="#"><img src="/instagram.png"></img></a>
                    <a href="#"><img src="/X.png"></img></a>
                    <a href="#"><img src="/linkedin.png"></img></a>
                </div>
            </div>
            <div className="footer-links footer-area">
                <h2>
                    Company
                </h2>
                <div className="company-links">
                    <ul>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>
                        <li>
                            <a href="#">Projects</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
