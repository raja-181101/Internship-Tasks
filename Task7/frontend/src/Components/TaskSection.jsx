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
                            Database Integration &{" "}<span>Secure Authentication</span>
                        </h2>
                        <p>
                            In this task, we extended our React and Spring Boot application
                            with PostgreSQL database integration, secure password storage,
                            JWT authentication and role-based authorization.
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
                                <p>Integrate PostgreSQL Database</p>
                            </div>
                            <div className="task-item">
                                <span>02</span>
                                <p>Store User Data Securely</p>
                            </div>
                            <div className="task-item">
                                <span>03</span>
                                <p>Implement Login & JWT Authentication</p>
                            </div>
                            <div className="task-item">
                                <span>04</span>
                                <p>Add Role-Based Authorization</p>
                            </div>
                            <div className="task-item">
                                <span>05</span>
                                <p>Protect User & Admin Operations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default TaskSection;