import {useState} from "react";
import {useNavigate} from "react-router-dom";

function CompleteProfile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
            age: "",
            gender: "",
            city: ""
        });
    const [error, setError] = useState("");

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prev => ({...prev, [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:8081/api/oauth/complete-profile", {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...formData, age: Number(formData.age)
                })
            }
        )
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Unable to complete profile");
                }
                return data;
            })
            .then(data => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userId", data.id);
                localStorage.setItem("name", data.name);
                window.dispatchEvent(new Event("authChange"));
                navigate("/profile", {replace: true});
            })
            .catch(error => {
                setError(error.message);
            });
    }


    return (
        <section className="register-page">
            <div className="register-container">
                <div className="register-card">
                    <div className="register-heading">
                        <span className="section-label">GITHUB ACCOUNT</span>
                        <h1>Complete Your Profile</h1>
                        <p>
                            Your GitHub account is verified.
                            Add the remaining information
                            to finish creating your profile.
                        </p>
                    </div>
                    <form className="user-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Age</label>

                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter your city"
                                required
                            />
                        </div>

                        {error && (<p className="error-message">{error}</p>)}

                        <button type="submit" className="register-button">Complete Profile</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default CompleteProfile;