function AboutProject() {
    return (
        <main className="about-project-page">

            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-card">

                        <span className="section-label">
                            TASK 8
                        </span>

                        <h1>
                            Advanced Server-Side Functionality
                        </h1>

                        <p>
                            Task 8 extends the application with advanced
                            server-side capabilities using Spring Boot and
                            Redis, including request logging middleware,
                            background job processing, Redis-based job
                            queuing, server-side caching and application
                            monitoring.
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
                            title="Request Logging Middleware"
                            text="A custom Spring Boot request filter intercepts incoming HTTP requests and records the request method, URI, response status, unique request ID and processing time."
                        />

                        <AboutCard
                            number="02"
                            title="Background Job Processing"
                            text="Background timer jobs are processed independently from normal HTTP request handling using a scheduled server-side worker."
                        />

                        <AboutCard
                            number="03"
                            title="Redis Job Queue"
                            text="Redis stores queued background jobs and their current state, allowing jobs to move through queued, processing and completed stages."
                        />

                        <AboutCard
                            number="04"
                            title="Server-Side Caching"
                            text="Redis is used as a server-side cache for user data, reducing repeated access to the PostgreSQL database for cached information."
                        />

                        <AboutCard
                            number="05"
                            title="Cache Comparison"
                            text="Authenticated users can retrieve selected profile information from PostgreSQL and Redis while viewing the backend response time for each source."
                        />

                        <AboutCard
                            number="06"
                            title="Task 8 Dashboard"
                            text="The React dashboard provides a visual interface for creating background jobs, monitoring the queue, viewing request information and testing Redis caching."
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
                            What Changed From Task 7?
                        </h2>

                    </div>


                    <div className="upgrade-wrapper">

                        <div className="upgrade-card">

                            <span className="upgrade-task">
                                TASK 7
                            </span>

                            <h3>
                                Advanced API Integration
                            </h3>

                            <p>
                                GitHub OAuth provides secure external
                                authentication.
                            </p>

                            <p>
                                Existing users can link their GitHub
                                accounts.
                            </p>

                            <p>
                                GitHub REST API provides developer profile
                                and repository information.
                            </p>

                            <p>
                                Rate limiting and error handling protect
                                external API operations.
                            </p>

                        </div>


                        <div className="upgrade-arrow">
                            →
                        </div>


                        <div className="upgrade-card highlighted">

                            <span className="upgrade-task">
                                TASK 8
                            </span>

                            <h3>
                                Advanced Server-Side Functionality
                            </h3>

                            <p>
                                Request middleware logs and monitors
                                HTTP request processing.
                            </p>

                            <p>
                                Redis provides background job queuing
                                and job status storage.
                            </p>

                            <p>
                                A scheduled worker processes queued
                                jobs asynchronously.
                            </p>

                            <p>
                                Redis server-side caching reduces
                                repeated database access.
                            </p>

                        </div>

                    </div>

                </div>
            </section>


            <section className="security-flow-section">
                <div className="container">

                    <div className="about-section-heading">

                        <span className="section-label">
                            SERVER-SIDE PROCESSING FLOW
                        </span>

                        <h2>
                            How The Application Works
                        </h2>

                    </div>


                    <div className="security-flow">

                        <FlowStep
                            number="01"
                            title="Client Request"
                            text="The React frontend sends authenticated HTTP requests to the Spring Boot backend."
                        />

                        <FlowStep
                            number="02"
                            title="Request Middleware"
                            text="The request logging middleware intercepts requests and records request and response information."
                        />

                        <FlowStep
                            number="03"
                            title="Backend Processing"
                            text="Spring Boot processes the request and communicates with PostgreSQL or Redis depending on the requested operation."
                        />

                        <FlowStep
                            number="04"
                            title="Redis Cache"
                            text="Frequently accessed user information can be stored and retrieved from Redis instead of repeatedly querying PostgreSQL."
                        />

                        <FlowStep
                            number="05"
                            title="Background Worker"
                            text="Timer jobs are stored in the Redis queue and processed independently by the scheduled background worker."
                        />

                        <FlowStep
                            number="06"
                            title="Monitoring Dashboard"
                            text="React displays job progress, queue status, request information and database-versus-cache results in the Task 8 dashboard."
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