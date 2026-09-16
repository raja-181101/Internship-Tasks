import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export default function Task8Dashboard() {

    const [seconds, setSeconds] = useState(10);
    const [jobs, setJobs] = useState([]);
    const [requestInfo, setRequestInfo] = useState({
        requestId: "-",
        status: "-",
        method: "-"
    });
    const [cacheStatus, setCacheStatus] = useState(null);
    const [selectedField, setSelectedField] = useState("name");
    const [databaseResult, setDatabaseResult] = useState(null);
    const [redisResult, setRedisResult] = useState(null);
    const [cacheLoading, setCacheLoading] = useState(false);
    const navigate = useNavigate();
    const [sessionExpired, setSessionExpired] = useState(false);

    const token = localStorage.getItem("token");
    const startTimerJob = async () => {
        const response = await fetch(`http://localhost:8081/api/jobs/timer?seconds=${seconds}`,
            {method: "POST", headers: {Authorization: `Bearer ${token}`}}
        );
        if (handleUnauthorized(response)) {
            return;
        }
        if (!response.ok) {
            console.error("Unable to create job");
            return;
        }
        const data = await response.json();

        setJobs((previousJobs) => [
            data,
            ...previousJobs
        ]);

        setRequestInfo({
            requestId:
                response.headers.get("X-Request-ID") || "-",
            status: response.status,
            method: "POST"
        });
    };

    useEffect(() => {

        if (token) {
            checkCacheStatus();
        }

    }, [token]);

    useEffect(() => {

        const interval = setInterval(async () => {

            setJobs((currentJobs) => {

                if (currentJobs.length === 0) {
                    return currentJobs;
                }

                Promise.all(
                    currentJobs.map(async (job) => {

                        if (
                            job.status === "COMPLETED" ||
                            job.status === "FAILED"
                        ) {
                            return job;
                        }

                        try {

                            const response = await fetch(
                                `http://localhost:8081/api/jobs/${job.jobId}`,
                                {
                                    headers: {
                                        Authorization:
                                            `Bearer ${token}`
                                    }
                                }
                            );

                            if (!response.ok) {
                                return job;
                            }

                            return await response.json();

                        } catch {
                            return job;
                        }
                    })
                ).then(setJobs);

                return currentJobs;
            });

        }, 1000);

        return () => clearInterval(interval);

    }, [token]);

    const handleUnauthorized = (response) => {
        if (response.status === 401) {
            localStorage.removeItem("token");
            setSessionExpired(true);
            return true;
        }
        return false;
    };

    const addUserToCache = async () => {

        try {

            setCacheLoading(true);

            const response = await fetch(
                "http://localhost:8081/api/cache/me",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (handleUnauthorized(response)){
                return;
            }

            if (!response.ok) {
                throw new Error(
                    "Unable to add user to Redis"
                );
            }

            const data = await response.json();

            setCacheStatus({
                cached: true,
                name: data.name
            });

            setRequestInfo({
                method: "POST",
                status: response.status,
                requestId:
                    response.headers.get("X-Request-ID") || "-"
            });

        } catch (error) {

            console.error(error);

        } finally {

            setCacheLoading(false);
        }
    };

    const getFromRedis = async () => {

        try {

            const response = await fetch(
                `http://localhost:8081/api/cache/me/redis?field=${selectedField}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (handleUnauthorized(response)){
                return;
            }
            if (!response.ok) {
                throw new Error(
                    "User is not available in Redis"
                );
            }

            const data = await response.json();

            setRedisResult(data);

            setRequestInfo({
                method: "GET",
                status: response.status,
                requestId:
                    response.headers.get("X-Request-ID") || "-"
            });

        } catch (error) {
            console.error(error);
        }
    };

    const getFromDatabase = async () => {

        try {

            const response = await fetch(
                `http://localhost:8081/api/cache/me/database?field=${selectedField}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (handleUnauthorized(response)){
                return;
            }
            if (!response.ok) {
                throw new Error(
                    "Unable to get database data"
                );
            }

            const data = await response.json();

            setDatabaseResult(data);

            setRequestInfo({
                method: "GET",
                status: response.status,
                requestId:
                    response.headers.get("X-Request-ID") || "-"
            });

        } catch (error) {
            console.error(error);
        }
    };

    const checkCacheStatus = async () => {

        try {

            const response = await fetch(
                "http://localhost:8081/api/cache/me/status",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (handleUnauthorized(response)){
                return;
            }
            if (!response.ok) {
                throw new Error("Unable to check cache");
            }

            const data = await response.json();

            setCacheStatus(data);

        } catch (error) {
            console.error(error);
        }
    };

    if (!token || sessionExpired) {

        return (
            <div className="task8-login-required">

                <div className="task8-login-card">

                    <h2>
                        {sessionExpired
                            ? "Session Expired"
                            : "Login Required"}
                    </h2>

                    <p>
                        {sessionExpired
                            ? "Your session has expired. Please login again to continue."
                            : "Please login to access the Task 8 Dashboard."
                        }
                    </p>

                    <button
                        className="custom-button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                </div>

            </div>
        );
    }


    return (
        <div className="task8-dashboard">

            <div className="dashboard-header">

                <h1>
                    Task 8 Dashboard
                </h1>

                <p>
                    Advanced Server-Side Functionality
                </p>

            </div>

            <div className="dashboard-grid">

                <div className="dashboard-column">
                    {/* BACKGROUND JOB */}

                    <div className="dashboard-card first-row-card">

                        <h2>Background Timer Job</h2>

                        <p className="card-description">
                            Submit asynchronous timer jobs through
                            the Redis job queue.
                        </p>

                        <input
                            type="number"
                            min="1"
                            max="60"
                            value={seconds}
                            onChange={(e) =>
                                setSeconds(e.target.value)
                            }
                        />

                        <button onClick={startTimerJob}>
                            Start Background Job
                        </button>

                    </div>

                    {/* REQUEST MONITORING */}

                    <div className="dashboard-card">

                        <h2>Request Monitoring</h2>
                        <p className="card-description">
                            View request information captured by the
                            server-side logging middleware.
                        </p>

                        <p>
                            Method:
                            <strong>
                                {" "}
                                {requestInfo.method}
                            </strong>
                        </p>

                        <p>
                            HTTP Status:
                            <strong>
                                {" "}
                                {requestInfo.status}
                            </strong>
                        </p>

                        <p>
                            Request ID:
                        </p>

                        <code>
                            {requestInfo.requestId}
                        </code>

                        <p className="active-status">
                            Request Logging Middleware Active ✓
                        </p>

                    </div>

                </div>

                <div className="dashboard-column">
                    {/* QUEUE Card*/}

                    <div className="dashboard-card first-row-card job-queue-card">

                        <h2>Job Queue</h2>

                        <p className="card-description">
                            Track queued, processing and completed
                            background jobs.
                        </p>

                        {jobs.length === 0 ? (

                            <p className="empty-jobs">
                                No jobs submitted yet.
                            </p>

                        ) : (

                            <div className="job-list">

                                {jobs.map((job) => (

                                    <div
                                        className={`job-item ${job.status.toLowerCase()}`}
                                        key={job.jobId}
                                    >

                                        <div className="job-item-header">

                        <span className="job-short-id">
                            {job.jobId.substring(0, 8)}...
                        </span>

                                            <span
                                                className={`job-status ${job.status.toLowerCase()}`}
                                            >
                            {job.status}
                        </span>

                                        </div>

                                        <p>
                                            Duration:
                                            <strong>
                                                {" "}
                                                {job.durationSeconds}s
                                            </strong>
                                        </p>

                                        {job.status === "PROCESSING" && (
                                            <>
                                                <p>
                                                    Remaining:
                                                    <strong>
                                                        {" "}
                                                        {job.remainingSeconds}s
                                                    </strong>
                                                </p>

                                                <progress
                                                    max={job.durationSeconds}
                                                    value={
                                                        job.durationSeconds -
                                                        job.remainingSeconds
                                                    }
                                                />
                                            </>
                                        )}

                                        <small>
                                            Job ID: {job.jobId}
                                        </small>

                                    </div>

                                ))}

                            </div>
                        )}

                    </div>

                </div>

                <div className="dashboard-column">
                    {/* REDIS CACHE */}
                    <div className="dashboard-card redis-cache-card">

                        <h2>Redis Cache Demo</h2>

                        <p className="card-description">
                            Compare PostgreSQL and Redis using
                            your authenticated profile data.
                        </p>

                        {cacheStatus && (

                            <div
                                className={
                                    cacheStatus.cached
                                        ? "cache-status available"
                                        : "cache-status unavailable"
                                }
                            >

                                {cacheStatus.cached
                                    ? `${cacheStatus.name} is available in Redis Cache ✓`
                                    : `${cacheStatus.name} is not available in Redis Cache`
                                }

                            </div>
                        )}

                        {cacheStatus && !cacheStatus.cached && (

                            <button
                                onClick={addUserToCache}
                                disabled={cacheLoading}
                            >
                                {cacheLoading
                                    ? "Adding..."
                                    : `Add ${cacheStatus.name} to Redis Cache`
                                }
                            </button>
                        )}

                        <label className="cache-label">
                            Select User Field
                        </label>

                        <select
                            value={selectedField}
                            onChange={(e) => {

                                setSelectedField(e.target.value);

                                setDatabaseResult(null);
                                setRedisResult(null);
                            }}
                        >

                            <option value="name">
                                Name
                            </option>

                            <option value="email">
                                Email
                            </option>

                            <option value="age">
                                Age
                            </option>

                            <option value="city">
                                City
                            </option>

                            <option value="gender">
                                Gender
                            </option>

                        </select>

                        <div className="cache-buttons">

                            <button onClick={getFromDatabase}>
                                Get From Database
                            </button>

                            <button
                                onClick={getFromRedis}
                                disabled={!cacheStatus?.cached}
                            >
                                Get From Redis
                            </button>

                        </div>

                        <div className="cache-results-grid">

                            {databaseResult && (

                                <div className="cache-result database-result">

                <span className="result-source">
                    PostgreSQL
                </span>

                                    <h3>
                                        {databaseResult.value}
                                    </h3>

                                    <p>
                                        Response Time
                                    </p>

                                    <strong>
                                        {Number(
                                            databaseResult.timeMs
                                        ).toFixed(3)} ms
                                    </strong>

                                </div>
                            )}

                            {redisResult && (

                                <div className="cache-result redis-result">

                <span className="result-source">
                    Redis Cache
                </span>

                                    <h3>
                                        {redisResult.value}
                                    </h3>

                                    <p>
                                        Response Time
                                    </p>

                                    <strong>
                                        {Number(
                                            redisResult.timeMs
                                        ).toFixed(3)} ms
                                    </strong>

                                </div>
                            )}

                        </div>

                    </div>

                </div>


            </div>

        </div>
    );
}