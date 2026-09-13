import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

function OAuthSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const token = searchParams.get("token");
        const role = searchParams.get("role");
        const userId = searchParams.get("userId");
        const name = searchParams.get("name");
        if (!token || !role || !userId) {
            navigate("/login", {replace: true});
            return;
        }
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name || "");
        window.dispatchEvent(new Event("authChange"));
        navigate("/profile", {replace: true});
    }, [searchParams, navigate]);

    return (
        <section className="oauth-loading-page">
            <div className="oauth-loading-card">
                <h2>Signing you in...</h2>
                <p>
                    Your GitHub account has been verified.
                </p>
            </div>
        </section>
    );
}

export default OAuthSuccess;