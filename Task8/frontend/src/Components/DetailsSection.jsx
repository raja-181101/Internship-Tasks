import { Link } from "react-router-dom";

function DetailsSection() {
    return (
        <section id="details" className="page-section details-section">
            <div className="container">
                <div className="section-heading text-center">
                    <span className="section-label">
                        TASK 7 FEATURES
                    </span>
                    <h2>Advanced API Features</h2>
                    <p>Task 7 extends the application with secure OAuth
                        authentication, external API integration, account
                        linking, rate limiting and advanced error handling.</p>
                </div>

                <div className="row g-4">
                    <DetailCard
                        icon="🔐"
                        title="GitHub OAuth"
                        text="Authenticates users securely through GitHub OAuth without exposing GitHub credentials to the application."
                    />

                    <DetailCard
                        icon="🔗"
                        title="Account Linking"
                        text="Allows existing application users to securely connect their GitHub account to their profile."
                    />

                    <DetailCard
                        icon="🌐"
                        title="GitHub REST API"
                        text="Integrates with the GitHub REST API to retrieve authenticated user information and developer data."
                    />

                    <DetailCard
                        icon="📂"
                        title="Repository Integration"
                        text="Retrieves and displays GitHub repositories with information such as language, stars and forks."
                    />

                    <DetailCard
                        icon="⏱️"
                        title="API Rate Limiting"
                        text="Controls repeated API requests and returns HTTP 429 when the configured request limit is exceeded."
                    />

                    <DetailCard
                        icon="🛡️"
                        title="Advanced Error Handling"
                        text="Handles authentication failures, GitHub API errors, unavailable services and other external API failures."
                    />
                </div>
                <div className="text-center mt-5">
                    <Link to="/user" className="custom-button">
                        View My Profile
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