import { Link } from "react-router-dom";

function DetailsSection() {
    return (
        <section id="details" className="page-section details-section">
            <div className="container">
                <div className="section-heading text-center">
                    <span className="section-label">
                        TASK 8 FEATURES
                    </span>
                    <h2>Advanced Server-Side Features</h2>
                    <p>Task 8 extends the application with request
                        processing middleware, Redis-powered background
                        job processing, server-side caching, and
                        real-time monitoring through an interactive
                        dashboard.</p>
                </div>

                <div className="row g-4">
                    <DetailCard
                        icon="📝"
                        title="Request Logging Middleware"
                        text="Intercepts incoming HTTP requests and records the request method, URI, response status, unique request ID and processing time."
                    />

                    <DetailCard
                        icon="⚙️"
                        title="Background Job Processing"
                        text="Processes long-running timer jobs independently from normal HTTP request handling using a scheduled background worker."
                    />

                    <DetailCard
                        icon="📋"
                        title="Redis Job Queue"
                        text="Stores background jobs in a Redis-backed queue and tracks each job through queued, processing and completed states."
                    />

                    <DetailCard
                        icon="⚡"
                        title="Redis Server-Side Caching"
                        text="Stores frequently accessed user data in Redis to reduce repeated database access and demonstrate server-side caching."
                    />

                    <DetailCard
                        icon="🗄️"
                        title="PostgreSQL & Redis Comparison"
                        text="Allows authenticated users to retrieve selected profile data from PostgreSQL and Redis and compare backend response times."
                    />

                    <DetailCard
                        icon="📊"
                        title="Task 8 Monitoring Dashboard"
                        text="Provides a React dashboard for creating timer jobs, monitoring the job queue, viewing request information and testing Redis caching."
                    />
                </div>
                <div className="text-center mt-5">
                    <Link to="/task8" className="custom-button">
                        Open Task 8 Dashboard
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