import { Link } from "react-router-dom";

function DetailsSection() {
    return (
        <section id="details" className="page-section details-section">
            <div className="container">
                <div className="section-heading text-center">
                    <span className="section-label">
                        FORM INFORMATION
                    </span>
                    <h2>Registration Details</h2>
                    <p>These are the details collected through the registration form.</p>
                </div>

                <div className="row g-4">
                    <DetailCard
                        icon="👤"
                        title="Name"
                        text="Stores the user's full name."
                    />

                    <DetailCard
                        icon="✉"
                        title="Email"
                        text="Stores the user's email address."
                    />

                    <DetailCard
                        icon="🎂"
                        title="Age"
                        text="Stores the user's age."
                    />

                    <DetailCard
                        icon="⚥"
                        title="Gender"
                        text="Stores the selected gender."
                    />

                    <DetailCard
                        icon="🌆"
                        title="City"
                        text="Stores the selected city."
                    />

                    <DetailCard
                        icon="ID"
                        title="User ID"
                        text="Generated automatically by the server."
                    />
                </div>
                <div className="text-center mt-5">
                    <Link to="/users" className="custom-button">
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