import {Link} from "react-router-dom";
import {isLoggedIn} from "../utils/auth.js";
import {useEffect, useState} from "react";

function Navbar(){
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    useEffect(() => {
        function handleAuthChange() {
            setLoggedIn(isLoggedIn());
        }
        window.addEventListener("authChange", handleAuthChange);
        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };

    }, []);
    return(
        <nav className="custom-navbar">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/" className="navbar-brand">
                        Task 6
                    </Link>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        {!loggedIn && (
                            <Link to="/login">Login</Link>
                        )}
                        {loggedIn && (
                            <Link to="/profile">Profile</Link>
                        )}
                        <Link to="/about">About Project</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;