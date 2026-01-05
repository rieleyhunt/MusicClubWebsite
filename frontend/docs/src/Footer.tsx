import { useAuth } from "./AuthContext"
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    const { logout, isLoggedIn } = useAuth();
    return (
        <div className="footer">
            <div className="footer-text">
            <strong>Carleton Music Club</strong>
            <div className="address">
                <p>1125 Colonel By Drive,</p>
                <p>Ottawa, ON, K1S 5B6</p>
            </div>
            <p>email: <a href="mailto:musicclubcu@gmail.com">musicclubcu@gmail.com</a></p>
            <div className="footer-socials">
                <a href="http://instagram.com/musicclubcu" target="_blank" rel="noopener noreferrer">
                <img src="/instagram.png" alt="Follow us on Instagram"></img>
                </a>
                <a href="https://discord.gg/rCm28JwxVb" target="_blank" rel="noopener noreferrer">
                <img src="/discord.png" alt="Discord"></img>
                </a>
            </div>
                {!isLoggedIn && (
                    <div className="footer-login">
                        <p>Are you an executive?</p>
                        <Link to="/Login">
                            <button className="exec-footer-login">Login</button>
                        </Link>
                    </div>
                )}
                {isLoggedIn && (
                    <div className="footer-logout">
                        <form onSubmit={logout}>
                            <button type="submit" className="exec-footer-logout">Logout</button>
                        </form>
                    </div>
                )}
            <p className="copyright">© 2025 Carleton Music Club. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
