import {Link} from "react-router-dom";

function TaskSection(){
    return(
        <section id="home" className= "page-section task-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7 task-content">
                        <span className="task-label">Level 4 - Expert</span>
                        <h1>Task 8</h1>
                        <h2>
                            Advanced <span>Server-Side Functionality</span>
                        </h2>
                        <p>
                            Implement advanced backend capabilities using Spring Boot
                            and Redis, including request-processing middleware,
                            asynchronous background job processing, and server-side
                            caching for improved application performance and scalability.
                        </p>
                        <Link to="/about" className="custom-button">
                            About Project
                        </Link>
                    </div>
                    <div className="col-lg-5">
                        <div className="task-card">
                            <h3>
                                What are we doing?
                            </h3>
                            <div className="task-item">
                                <span>01</span>
                                <p>Implement Request Logging Middleware</p>
                            </div>
                            <div className="task-item">
                                <span>02</span>
                                <p>Implement Redis Background Job Processing</p>
                            </div>
                            <div className="task-item">
                                <span>03</span>
                                <p>Implement Server-Side Redis Caching</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default TaskSection;