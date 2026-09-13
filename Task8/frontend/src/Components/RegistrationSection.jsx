import { Link } from "react-router-dom";

function RegistrationSection() {
    return (
        <section id="registration" className="page-section registration-section">
            <div className="container">
                <div className="section-heading text-center">
                    <span className="section-label">GITHUB INTEGRATION</span>
                    <h2>How GitHub Integration Works</h2>
                    <p>
                        The application uses GitHub OAuth for secure
                        authorization and integrates with the GitHub REST API
                        to retrieve the authenticated user's profile and
                        repository information.
                    </p>
                </div>
                <div className="process-card">
                    <div className="process-step">
                        <div className="step-number">01</div>
                        <div>
                            <h4>Connect with GitHub</h4>
                            <p> The user chooses GitHub authentication or connects a GitHub account from their profile.</p>
                        </div>
                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">02</div>
                        <div>
                            <h4>GitHub OAuth Authorization</h4>
                            <p>Spring Security redirects the user to GitHub,
                                where they securely authorize the application.</p>
                        </div>
                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">03</div>
                        <div>
                            <h4>OAuth Callback Is Processed</h4>
                            <p>GitHub redirects the user back to Spring Boot,
                                where the OAuth response is processed and the
                                authenticated GitHub account is identified.</p>
                        </div>

                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">04</div>
                        <div>
                            <h4>GitHub REST API Is Called</h4>
                            <p>The backend uses the authorized GitHub access
                                token to securely request profile and repository
                                information from the GitHub REST API.</p>
                        </div>

                    </div>
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="step-number">05</div>
                        <div>
                            <h4>Developer Dashboard Is Displayed</h4>
                            <p>React receives the GitHub data from Spring Boot
                                and displays the user's profile, repositories,
                                languages, stars, forks and other information.</p>
                        </div>

                    </div>

                    <div className="registration-action">
                        <Link to="/about" className="custom-button">
                            Explore Task 7
                        </Link>
                    </div>

                </div>

            </div>

        </section>

    );
}

export default RegistrationSection;