import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav className="custom-navbar">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/" className="navbar-brand">
                        Task 5
                    </Link>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/user">Users</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;