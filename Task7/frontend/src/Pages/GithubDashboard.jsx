import { useEffect, useState } from "react";

function GithubDashboard() {

    const [profile, setProfile] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch(
            "http://localhost:8081/api/github/dashboard",
            {
                credentials: "include"
            }
        )
            .then(async response => {

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Unable to load GitHub data"
                    );
                }

                return data;
            })
            .then(data => {

                setProfile(data.profile);
                setRepositories(data.repositories || []);
                setLoading(false);

            })
            .catch(error => {

                setError(error.message);
                setLoading(false);

            });

    }, []);


    if (loading) {
        return (
            <section className="github-page">
                <p className="github-status">
                    Loading GitHub Dashboard...
                </p>
            </section>
        );
    }


    if (error) {
        return (
            <section className="github-page">
                <p className="github-error">
                    {error}
                </p>
            </section>
        );
    }


    return (
        <section className="github-page">

            <div className="container">

                <div className="github-heading">

                    <span className="section-label">
                        EXTERNAL API
                    </span>

                    <h1>
                        GitHub Developer Dashboard
                    </h1>

                    <p>
                        Live profile and repository information
                        retrieved securely through the GitHub REST API.
                    </p>

                </div>


                {profile && (

                    <div className="github-profile-card">

                        <img
                            src={profile.avatar_url}
                            alt={profile.login}
                            className="github-avatar"
                        />

                        <div className="github-profile-content">

                            <div className="github-profile-title">

                                <div>
                                    <h2>
                                        {profile.name || profile.login}
                                    </h2>

                                    <p className="github-username">
                                        @{profile.login}
                                    </p>
                                </div>

                                <span className="github-api-badge">
                                    GitHub API
                                </span>

                            </div>


                            {profile.bio && (
                                <p className="github-bio">
                                    {profile.bio}
                                </p>
                            )}


                            <div className="github-stats">

                                <span>
                                    <strong>
                                        {profile.public_repos}
                                    </strong>
                                    {" "}Repositories
                                </span>

                                <span>
                                    <strong>
                                        {profile.followers}
                                    </strong>
                                    {" "}Followers
                                </span>

                                <span>
                                    <strong>
                                        {profile.following}
                                    </strong>
                                    {" "}Following
                                </span>

                            </div>


                            <a
                                href={profile.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="github-profile-link"
                            >
                                View GitHub Profile
                            </a>

                        </div>

                    </div>

                )}


                <div className="github-repositories">

                    <div className="github-repository-heading">

                        <div>
                            <span className="section-label">
                                REPOSITORIES
                            </span>

                            <h2>
                                Developer Projects
                            </h2>
                        </div>

                        <span className="repository-count">
                            {repositories.length} Repositories Loaded
                        </span>

                    </div>


                    {repositories.length === 0 ? (

                        <div className="github-empty-repositories">

                            <h3>No repositories found</h3>

                            <p>
                                This GitHub account does not currently
                                have any repositories available to display.
                            </p>

                        </div>

                    ) : (

                        <div className="github-repo-grid">

                            {repositories.map(repo => (

                                <article
                                    key={repo.id}
                                    className="github-repo-card"
                                >

                                    <div className="repo-card-header">

                                        <h3>
                                            {repo.name}
                                        </h3>

                                        <span className="repo-visibility">
                                            {repo.private
                                                ? "Private"
                                                : "Public"
                                            }
                                        </span>

                                    </div>


                                    <p>
                                        {repo.description ||
                                            "No description provided."
                                        }
                                    </p>


                                    <div className="github-repo-info">

                                        <span>
                                            {repo.language ||
                                                "Not specified"
                                            }
                                        </span>

                                        <span>
                                            ★ {repo.stargazers_count}
                                        </span>

                                        <span>
                                            Forks {repo.forks_count}
                                        </span>

                                    </div>


                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View Repository
                                    </a>

                                </article>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}

export default GithubDashboard;