import {Link} from "react-router-dom";

function TaskSection(){
    return(
        <section id="home" className= "page-section task-section">
            <div className="container">
                <div className="row allign-items-center">
                    <div className="col-lg-7 task-content">
                        <span className="task-label">Level 4 - Expert</span>
                        <h1>Task 7</h1>
                        <h2>
                            Advanced API Usage &{" "}<span>External API Integration</span>
                        </h2>
                        <p>
                            In this task, we extended our React and Spring Boot application with GitHub OAuth authentication, external GitHub REST API integration, API rate limiting and advanced error handling.
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
                                <p>Implement GitHub OAuth Authentication</p>
                            </div>
                            <div className="task-item">
                                <span>02</span>
                                <p>Integrate the GitHub REST API</p>
                            </div>
                            <div className="task-item">
                                <span>03</span>
                                <p>Build a GitHub Developer Dashboard</p>
                            </div>
                            <div className="task-item">
                                <span>04</span>
                                <p>Implement API Rate Limiting</p>
                            </div>
                            <div className="task-item">
                                <span>05</span>
                                <p>Add Advanced API Error Handling</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default TaskSection;