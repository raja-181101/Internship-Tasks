import { Link } from "react-router-dom";

function DetailsSection() {
    return (
        <section id="details" className="page-section details-section">
            <div className="container">
                <div className="section-heading text-center">
                    <span className="section-label">
                        USER INFORMATION
                    </span>
                    <h2>Account Information</h2>
                    <p>The following information is collected and securely managed by the application.</p>
                </div>

                <div className="row g-4">
                    <DetailCard
                        icon="👤"
                        title="Name"
                        text="Stores the user's full name for account identification."
                    />

                    <DetailCard
                        icon="✉"
                        title="Email"
                        text="Used as the unique account identifier and login credential."
                    />

                    <DetailCard
                        icon="🎂"
                        title="Age"
                        text="Stores the user's validated age information."
                    />

                    <DetailCard
                        icon="⚥"
                        title="Gender"
                        text="Stores the gender selected during registration."
                    />

                    <DetailCard
                        icon="🌆"
                        title="City"
                        text="Stores the user's selected city."
                    />

                    <DetailCard
                        icon="🔐"
                        title="Password"
                        text="Validated for strength and securely stored using BCrypt hashing."
                    />
                </div>
                <div className="text-center mt-5">
                    <Link to="/user" className="custom-button">
                        View Registered Users
                    </Link>
                </div>
            </div>
        </section>
    );
}


function DetailCard({ icon, title, text }) {
    return (
        <div className="col-md-6 col-lg-4">
            <div className="detail-card">
                <div className="detail-icon">
                    {icon}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>

    );
}

export default DetailsSection;