function AboutProject(){
    return (
        <main className="about-project-page">
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-card">
                        <span className="section-label">TASK 6</span>
                        <h1>Database Integration & User Authentication</h1>
                        <p>Task 6 extends our previous REST API application by introducing persistent
                            database storage, secure authentication, JWT authorization and role-based access.
                        </p>
                    </div>
                </div>
            </section>
            <section className="about-content-section">
                <div className="container">
                    <div className="about-section-heading">
                        <span className="section-label">IMPLEMENTATION</span>
                        <h2>What We Implemented</h2>
                    </div>
                    <div className="about-grid">
                        <AboutCard
                            number="01"
                            title="PostgreSQL Database"
                            text="User information is now stored permanently in PostgreSQL instead of temporary server memory."
                        />
                        <AboutCard
                            number="02"
                            title="Spring Data JPA"
                            text="Repository-based database operations are used for creating, reading, updating and deleting users."
                        />
                        <AboutCard
                            number="03"
                            title="Secure Passwords"
                            text="Passwords are validated and stored as BCrypt hashes instead of plain text."
                        />
                        <AboutCard
                            number="04"
                            title="User Login"
                            text="Registered users can authenticate using their email address and password."
                        />
                        <AboutCard
                            number="05"
                            title="JWT Authentication"
                            text="Successful login generates a JSON Web Token used to authenticate protected API requests."
                        />
                        <AboutCard
                            number="06"
                            title="Role Based Access"
                            text="USER and ADMIN roles are used to control access to protected operations."
                        />
                    </div>
                </div>
            </section>
            <section className="upgrade-section">
                <div className="container">
                    <div className="about-section-heading">
                        <span className="section-label">PROJECT EVOLUTION</span>
                        <h2>What Changed From Task 5?</h2>
                    </div>
                    <div className="upgrade-wrapper">
                        <div className="upgrade-card">
                            <span className="upgrade-task">TASK 5</span>
                            <h3>REST API Integration</h3>
                            <p>User information was stored temporarily using an in-memory collection.</p>
                            <p>CRUD operations were available through the Spring Boot REST API.</p>
                            <p>React communicated directly with the API.</p>
                        </div>
                        <div className="upgrade-arrow">→</div>
                        <div className="upgrade-card highlighted">
                            <span className="upgrade-task">TASK 6</span>
                            <h3>Secure Persistent Application</h3>
                            <p>PostgreSQL permanently stores users.</p>
                            <p>Passwords are protected using BCrypt.</p>
                            <p>JWT authenticates protected requests.</p>
                            <p>USER and ADMIN roles control authorization.</p>
                        </div>
                    </div>
                </div>
            </section>
          <section className="security-flow-section">
                <div className="container">
                    <div className="about-section-heading">
                        <span className="section-label">AUTHENTICATION FLOW</span>
                        <h2>How The Application Works</h2>
                    </div>
                    <div className="security-flow">
                        <FlowStep
                            number="01"
                            title="Register"
                            text="The user creates an account."
                        />
                        <FlowStep
                            number="02"
                            title="Password Hashing"
                            text="Spring Boot hashes the password using BCrypt."
                        />
                        <FlowStep
                            number="03"
                            title="PostgreSQL"
                            text="Account information is stored permanently."
                        />
                        <FlowStep
                            number="04"
                            title="Login"
                            text="Email and password are verified."
                        />
                        <FlowStep
                            number="05"
                            title="JWT"
                            text="The server generates an authentication token."
                        />
                        <FlowStep
                            number="06"
                            title="Authorization"
                            text="The user's role determines allowed operations."
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
            <div className="flow-number">{number}</div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );

}
export default AboutProject;