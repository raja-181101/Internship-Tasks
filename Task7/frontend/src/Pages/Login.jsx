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

                        <div className="oauth-divider"><span>OR</span></div>
                        <button type="button" className="github-login-button" onClick={() => {window.location.href = "http://localhost:8081/oauth2/authorization/github";}}>
                            <svg viewBox="0 0 24 24" className="github-login-icon" aria-hidden="true">
                                <path
                                    fill="currentColor"
                                    d="M12 .5C5.73.5.75 5.59.75 11.86c0 5.01 3.44 9.26 8.21 10.76.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.23-3.23-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58a11.38 11.38 0 0 0 8.2-10.76C23.25 5.59 18.27.5 12 .5Z"
                                />
                            </svg>
                            Continue with GitHub
                        </button>
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