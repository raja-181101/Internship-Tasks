import { Link } from "react-router-dom";

function RegistrationSection() {
    return (
        <section id="registration" className="page-section registration-section">
            <div className="container">
                <div className="section-heading text-center">
                    <span className="section-label">REGISTRATION</span>
                    <h2>How Registration Works</h2>
                    <p>
                        React validates the user information and sends it to the
                        Spring Boot REST API, where the password is secured and
                        the account is permanently stored in PostgreSQL.
                    </p>
                </div>
                <div className="process-card">
                    <div className="process-step">
                        <div className="step-number">01</div>
                        <div>
                            <h4>Fill Registration Form</h4>
                            <p> The user enters their personal details and creates a secure password.</p>
                        </div>
                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">02</div>
                        <div>
                            <h4>React Validates the Data</h4>
                            <p>The form validates the required fields, email format and password requirements.</p>
                        </div>
                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">03</div>
                        <div>
                            <h4>REST API Receives the Request</h4>
                            <p>React sends the registration data as JSON to the Spring Boot REST API.</p>
                        </div>

                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">04</div>
                        <div>
                            <h4>Password Is Secured</h4>
                            <p>Spring Boot hashes the password using BCrypt before storing the account.</p>
                        </div>

                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">05</div>
                        <div>
                            <h4>User Is Stored in PostgreSQL</h4>
                            <p>The validated user information and hashed password are permanently stored in the PostgreSQL database.</p>
                        </div>

                    </div>

                    <div className="registration-action">
                        <Link to="/about" className="custom-button">
                            About Project
                        </Link>
                    </div>

                </div>

            </div>

        </section>

    );
}

export default RegistrationSection;