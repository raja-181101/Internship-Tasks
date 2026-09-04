import {Link} from "react-router-dom";

function TaskSection(){
    return(
        <section id="home" className= "page-section task-section">
            <div className="container">
                <div className="row allign-items-center">
                    <div className="col-lg-7 task-content">
                        <span className="task-label">Level 3 - Advanced</span>
                        <h1>Task 6</h1>
                        <h2>
                            API Integration & <span>{" "} Front-End Interaction</span>
                        </h2>
                        <p>
                            In this task, we connect a React
                            front end with our Spring Boot REST API.
                            The application supports CRUD operations
                            and displays data received from the server.
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
                                <p>Create REST API endpoints</p>
                            </div>
                            <div className="task-item">
                                <span>02</span>
                                <p>Connect React with Spring Boot</p>
                            </div>
                            <div className="task-item">
                                <span>03</span>
                                <p>Perform CRUD operations</p>
                            </div>
                            <div className="task-item">
                                <span>04</span>
                                <p>Fetch and display API data</p>
                            </div>
                            <div className="task-item">
                                <span>05</span>
                                <p>Use React Router for navigation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default TaskSection;