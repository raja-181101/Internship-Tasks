import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../utils/auth.js";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [githubLoading, setGithubLoading] = useState(false);
    const [githubError, setGithubError] = useState("");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetch(`http://localhost:8081/api/users/${userId}`, {
                headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                if (!response.ok) {throw new Error("Unable to load profile");
                }
                return response.json();
            })
            .then(data => {setUser(data);setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [token, userId]);
    function handleLogout() {
        logout();
        navigate("/", {replace: true});
    }
    function moveToLogin(){
        navigate("/login",{replace:true});
    }

    if (loading) {
        return (
            <section className="users-page">
                <p className="users-status">Loading profile...</p>
            </section>
        );
    }

    if (!user) {
        return (
            <div className="users-page">
                <div className="auth-error">
                    <p className="users-status">Unable to Load Profile</p>
                    <button className="custom-button" onClick={moveToLogin}>
                        Login
                    </button>
                </div>
            </div>);
    }

    function connectGithub() {
        setGithubLoading(true);
        setGithubError("");
        const token = localStorage.getItem("token");
        fetch("http://localhost:8081/api/github/connect",
            {method: "POST", credentials: "include", headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to connect GitHub");
                }
                return response.json();
            })
            .then(data => {
                if (!data.authorizationUrl) {
                    throw new Error("GitHub authorization URL not received");
                }
                window.location.href = data.authorizationUrl;
            })
            .catch(error => {
                console.error("GitHub connection error:", error);
                setGithubError("Unable to connect GitHub. Please try again.");
                setGithubLoading(false);
            });

    }


    return (
        <section className="users-page">
            <div className="container">
                <div className="users-heading">
                    <span className="section-label">MY PROFILE</span>
                    <h1>Account Details</h1>
                    <p>View your account information and manage
                        connected services.
                    </p>
                </div>

                <div className="profile-card-wrapper">
                    <div className="user-card profile-card">
                        <div className="user-main">
                            <div className="user-avatar">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h2>{user.name}</h2>
                            <p className="user-email">{user.email}</p>
                        </div>

                        <div className="profile-details">
                            <div className="user-detail">
                                <span>Age</span><strong>{user.age}</strong>
                            </div>
                            <div className="user-detail">
                                <span>Gender</span><strong>{user.gender}</strong>
                            </div>
                            <div className="user-detail">
                                <span>City</span><strong>{user.city}</strong>
                            </div>
                            <div className="user-detail">
                                <span>Role</span><strong>{user.role}</strong>
                            </div>
                        </div>

                        <div className="user-actions">

                            <div className="user-action-row">
                                <Link to={`/user/${user.id}/edit`} className="edit-button">
                                    Edit
                                </Link>
                                <button onClick={handleLogout} className="logout-button">
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div className="github-profile-section">
                            {user.githubId ? (<>
                                    <div className="github-connected">
                                        <div className="github-connected-icon">✓</div>
                                        <div>
                                            <span>GitHub Connected</span>
                                            {user.githubUsername && (
                                                <p>@{user.githubUsername}</p>
                                            )}
                                        </div>
                                    </div>
                                    <Link to="/github" className="github-dashboard-button">
                                        GitHub Dashboard
                                    </Link>
                                </>
                            ) : (<>
                                    <div className="github-connect-info">
                                        <h3>Connect GitHub</h3>
                                        <p>
                                            Connect your GitHub account to view your developer profile and repositories.
                                        </p>
                                    </div>
                                    <button className="github-dashboard-button" onClick={connectGithub} disabled={githubLoading}>
                                        {githubLoading
                                            ? "Connecting..."
                                            : "Connect GitHub"
                                        }
                                    </button>
                                </>
                            )}
                            {githubError && (
                                <p className="github-connect-error">{githubError}</p>
                            )}
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default Profile;