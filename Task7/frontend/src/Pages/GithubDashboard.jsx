import {useEffect, useState} from "react";

function GithubDashboard() {

    const [profile, setProfile] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch("http://localhost:8081/api/github/dashboard", {credentials: "include"})
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Unable to load GitHub data");
                }
                return data;
            })
            .then(data => {
                setProfile(data.profile);
                setRepositories(data.repositories);
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
                <p className="github-error">{error}</p>
            </section>
        );
    }

    return (
        <section className="github-page">
            <div className="container">
                <div className="github-heading">
                    <span className="section-label">EXTERNAL API</span>
                    <h1>GitHub Developer Dashboard</h1>
                    <p>
                        Profile and repository information
                        retrieved through the GitHub REST API.
                    </p>
                </div>

                {profile && (
                    <div className="github-profile-card">
                        <img
                            src={profile.avatar_url}
                            alt={profile.login}
                            className="github-avatar"
                        />
                        <div>
                            <h2>{profile.name || profile.login}</h2>
                            <p>@{profile.login}</p>
                            {profile.bio && (<p>{profile.bio}</p>)}
                            <div className="github-stats">
                                <span>{profile.public_repos}{" "}Repositories</span>
                                <span>{profile.followers}{" "}Followers</span>
                                <span>{profile.following}{" "}Following</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="github-repositories">
                    <h2>Repositories</h2>

                    <div className="github-repo-grid">
                        {repositories.map(repo => (
                            <article key={repo.id} className="github-repo-card">
                                <h3>{repo.name}</h3>
                                <p>{repo.description || "No description provided."}</p>
                                <div className="github-repo-info">
                                    <span>{repo.language || "Not specified"}</span>
                                    <span>★ {repo.stargazers_count}</span>
                                    <span>Forks {repo.forks_count}</span>
                                </div>

                                <a href={repo.html_url} target="_blank" rel="noreferrer">View Repository</a>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GithubDashboard;