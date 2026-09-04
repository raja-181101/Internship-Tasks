import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../utils/auth.js";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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

    if (loading) {
        return (
            <section className="users-page">
                <p className="users-status">Loading profile...</p>
            </section>
        );
    }

    if (!user) {
        return null;
    }


    return (
        <section className="users-page">
            <div className="container">
                <div className="users-heading">
                    <span className="section-label">MY PROFILE</span>
                    <h1>Account Details</h1>
                    <p>View and manage your account information.</p>
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
                            <Link to={`/user/${user.id}/edit`} className="edit-button">
                                Edit
                            </Link>
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Profile;