import { useState } from "react";
import {Link, replace, useNavigate} from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [showPassword,setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(
                "http://localhost:8081/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("name", data.name);
            window.dispatchEvent(new Event("authChange"));
            navigate("/user",{replace:true});
        } catch (error) {
            console.error(error);
            setError(
                "Unable to connect to server"
            );
        }
    };
    return (
        <section className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-heading">
                    <span className="section-label">AUTHENTICATION</span>
                        <h1>Welcome Back</h1>
                        <p>Sign in to access your account and manage your profile securely.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className={"password-box"}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                            <i className={showPassword ? "bi bi-eye-slash eye-icon" : "bi bi-eye eye-icon"}
                               onClick={()=>
                                   setShowPassword(!showPassword)
                               }/>
                            </div>
                        </div>
                        {error && (
                            <p className="login-error">{error}</p>
                        )}
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <p className="login-register-text">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;