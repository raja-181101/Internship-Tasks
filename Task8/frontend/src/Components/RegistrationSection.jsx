import { Link } from "react-router-dom";

function RegistrationSection() {
    return (
        <section id="registration" className="page-section registration-section">
            <div className="container">
                <div className="section-heading text-center">
                    <span className="section-label">ADVANCED SERVER-SIDE FUNCTIONALITY</span>
                    <h2>How Task 8 Works</h2>
                    <p>
                        The application uses Spring Boot and Redis
                        to implement request-processing middleware,
                        background job processing, and server-side
                        caching for a more robust backend architecture.
                    </p>
                </div>
                <div className="process-card">
                    <div className="process-step">
                        <div className="step-number">01</div>
                        <div>
                            <h4>Client Sends a Request</h4>
                            <p>The React frontend sends authenticated
                                HTTP requests to the Spring Boot backend
                                for application data and Task 8
                                operations.</p>
                        </div>
                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">02</div>
                        <div>
                            <h4>Request Middleware Processes It</h4>
                            <p>The request logging middleware intercepts
                                incoming requests and records information
                                such as the HTTP method, request URI,
                                response status, request ID, and
                                processing time.</p>
                        </div>
                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">03</div>
                        <div>
                            <h4>Background Jobs Are Queued</h4>
                            <p>Background timer jobs are added to a
                                Redis-backed queue. The worker processes
                                queued jobs independently while their
                                status and remaining time are stored
                                in Redis</p>
                        </div>

                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">04</div>
                        <div>
                            <h4>Application Data Is Cached</h4>
                            <p> Authenticated user data can be stored
                                temporarily in Redis, reducing the need
                                to repeatedly retrieve the same data
                                from PostgreSQL.</p>
                        </div>

                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">05</div>
                        <div>
                            <h4>Task 8 Dashboard Displays the Results</h4>
                            <p>The React dashboard displays background
                                job progress, queue status, request
                                monitoring information, and PostgreSQL
                                versus Redis cache retrieval results.</p>
                        </div>

                    </div>

                    <div className="registration-action">
                        <Link to="/about" className="custom-button">
                            Explore Task 8
                        </Link>
                    </div>

                </div>

            </div>

        </section>

    );
}

export default RegistrationSection;