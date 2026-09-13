function AboutProject() {
    return (
        <main className="about-project-page">

            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-card">

                        <span className="section-label">
                            TASK 7
                        </span>

                        <h1>
                            Advanced API Usage & External API Integration
                        </h1>

                        <p>
                            Task 7 extends the secure React and Spring Boot
                            application by introducing GitHub OAuth authentication,
                            external GitHub REST API integration, account linking,
                            API rate limiting and advanced error handling.
                        </p>

                    </div>
                </div>
            </section>


            <section className="about-content-section">
                <div className="container">

                    <div className="about-section-heading">
                        <span className="section-label">
                            IMPLEMENTATION
                        </span>

                        <h2>
                            What We Implemented
                        </h2>
                    </div>


                    <div className="about-grid">

                        <AboutCard
                            number="01"
                            title="GitHub OAuth"
                            text="Users can authenticate securely through GitHub using OAuth without sharing their GitHub password with the application."
                        />

                        <AboutCard
                            number="02"
                            title="Account Linking"
                            text="Existing users who registered with email and password can connect a GitHub account to their existing application profile."
                        />

                        <AboutCard
                            number="03"
                            title="GitHub REST API"
                            text="The Spring Boot backend communicates with the GitHub REST API using the authorized GitHub access token."
                        />

                        <AboutCard
                            number="04"
                            title="Developer Dashboard"
                            text="GitHub profile information and repositories are retrieved from the external API and displayed in a React developer dashboard."
                        />

                        <AboutCard
                            number="05"
                            title="API Rate Limiting"
                            text="Repeated requests to the GitHub integration are controlled using rate limiting to protect the API from excessive usage."
                        />

                        <AboutCard
                            number="06"
                            title="Advanced Error Handling"
                            text="The application handles authentication failures, GitHub API errors, rate-limit responses and external service failures."
                        />

                    </div>

                </div>
            </section>


            <section className="upgrade-section">
                <div className="container">

                    <div className="about-section-heading">

                        <span className="section-label">
                            PROJECT EVOLUTION
                        </span>

                        <h2>
                            What Changed From Task 6?
                        </h2>

                    </div>


                    <div className="upgrade-wrapper">

                        <div className="upgrade-card">

                            <span className="upgrade-task">
                                TASK 6
                            </span>

                            <h3>
                                Secure Database Application
                            </h3>

                            <p>
                                PostgreSQL permanently stores user information.
                            </p>

                            <p>
                                BCrypt protects local account passwords.
                            </p>

                            <p>
                                JWT authenticates protected REST API requests.
                            </p>

                            <p>
                                USER and ADMIN roles control authorization.
                            </p>

                        </div>


                        <div className="upgrade-arrow">
                            →
                        </div>


                        <div className="upgrade-card highlighted">

                            <span className="upgrade-task">
                                TASK 7
                            </span>

                            <h3>
                                Advanced External API Integration
                            </h3>

                            <p>
                                GitHub OAuth provides external authentication.
                            </p>

                            <p>
                                Existing users can link their GitHub accounts.
                            </p>

                            <p>
                                GitHub REST API supplies developer profile
                                and repository information.
                            </p>

                            <p>
                                Rate limiting and advanced error handling
                                protect external API operations.
                            </p>

                        </div>

                    </div>

                </div>
            </section>


            <section className="security-flow-section">
                <div className="container">

                    <div className="about-section-heading">

                        <span className="section-label">
                            GITHUB INTEGRATION FLOW
                        </span>

                        <h2>
                            How The Application Works
                        </h2>

                    </div>


                    <div className="security-flow">

                        <FlowStep
                            number="01"
                            title="Connect GitHub"
                            text="The user signs in with GitHub or connects GitHub from an existing profile."
                        />

                        <FlowStep
                            number="02"
                            title="OAuth Authorization"
                            text="Spring Security redirects the user to GitHub for secure authorization."
                        />

                        <FlowStep
                            number="03"
                            title="OAuth Callback"
                            text="GitHub redirects the authenticated user back to the Spring Boot application."
                        />

                        <FlowStep
                            number="04"
                            title="Access Token"
                            text="The backend receives GitHub authorization and securely manages the GitHub access token."
                        />

                        <FlowStep
                            number="05"
                            title="GitHub REST API"
                            text="The backend requests profile and repository information from GitHub."
                        />

                        <FlowStep
                            number="06"
                            title="Developer Dashboard"
                            text="React displays the GitHub profile and repository information returned by the backend."
                        />

                    </div>

                </div>
            </section>

        </main>
    );
}


function AboutCard({ number, title, text }) {

    return (
        <div className="about-feature-card">

            <span>{number}</span>

            <h3>{title}</h3>

            <p>{text}</p>

        </div>
    );
}


function FlowStep({ number, title, text }) {

    return (
        <div className="flow-step">

            <div className="flow-number">
                {number}
            </div>

            <h3>{title}</h3>

            <p>{text}</p>

        </div>
    );
}


export default AboutProject;