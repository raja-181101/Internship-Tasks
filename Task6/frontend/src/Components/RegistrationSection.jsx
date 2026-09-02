import { Link } from "react-router-dom";

function RegistrationSection() {
    return (
        <section id="registration" className="page-section registration-section">
            <div className="container">
                <div className="section-heading text-center">
                    <span className="section-label">REGISTRATION</span>
                    <h2>
                        How Registration Works
                    </h2>
                    <p>
                        React collects the user information and
                        communicates with the Spring Boot server
                        through our REST API.
                    </p>
                </div>
                <div className="process-card">
                    <div className="process-step">
                        <div className="step-number">01</div>
                        <div>
                            <h4>Fill Registration Form</h4>
                            <p>The user enters their information through the React registration page.</p>
                        </div>
                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">02</div>
                        <div>
                            <h4>React Creates JSON</h4>
                            <p>React collects the form values and converts the data into JSON.</p>
                        </div>
                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">03</div>
                        <div>
                            <h4>POST Request</h4>
                            <p>The JSON data is sent to the Spring Boot REST API.</p>
                        </div>

                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">04</div>
                        <div>
                            <h4>Spring Boot Processes It</h4>
                            <p>The controller receives the request and passes the data to the service.</p>
                        </div>

                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">05</div>
                        <div>
                            <h4>User Is Stored</h4>
                            <p>For Task 5, the user is stored temporarily in server memory.</p>
                        </div>

                    </div>

                    <div className="registration-action">
                        <Link to="/register" className="custom-button">
                            Go To Registration
                        </Link>
                    </div>

                </div>

            </div>

        </section>

    );
}

export default RegistrationSection;