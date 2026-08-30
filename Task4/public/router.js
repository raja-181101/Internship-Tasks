(function () {
  const CONTENT_ID = "app-content";
  const PAGE_SCRIPT_ID = "page-script";
  let currentPath = window.location.pathname;
  function applyDocument(doc) {
    const newContent = doc.getElementById(CONTENT_ID);
    const currentContent = document.getElementById(CONTENT_ID);
    if (!newContent || !currentContent) {
      return false;
    }

    currentContent.replaceWith(newContent);

    const newTitle = doc.querySelector("title");
    if (newTitle) document.title = newTitle.textContent;
    document.body.className = doc.body.className;
    const oldScript = document.getElementById(PAGE_SCRIPT_ID);
    if (oldScript) oldScript.remove();

    const newScript = doc.getElementById(PAGE_SCRIPT_ID);
    if (newScript) {
      const script = document.createElement("script");
      script.id = PAGE_SCRIPT_ID;
      script.textContent = newScript.textContent;
      document.body.appendChild(script);
    }

    window.scrollTo(0, 0);
    bindPage();
    return true;
  }

  async function navigate(url, { push = true } = {}) {
    try {
      const res = await fetch(url, { headers: { "X-Requested-With": "router" } });
      if (!res.ok) throw new Error("Request failed: " + res.status);

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const ok = applyDocument(doc);
      if (!ok) {
        window.location.href = url;
        return;
      }

      if (push) history.pushState({ url }, "", url);
      currentPath = new URL(url, window.location.origin).pathname;
    } catch (err) {
      console.error("Client-side navigation failed, falling back to full reload:", err);
      window.location.href = url;
    }
  }

  function shouldIntercept(link) {
    const href = link.getAttribute("href");
    if (!href) return false;
    if (href.startsWith("#")) return false;
    if (link.target === "_blank") return false;
    if (!href.startsWith("/")) return false;
    return true;
  }

  function onLinkClick(e) {
    const link = e.currentTarget;
    if (!shouldIntercept(link)) return;
    e.preventDefault();
    navigate(link.getAttribute("href"));
  }
  function onHashLinkClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute("href");
    const id = href.slice(1);
    const target = id ? document.getElementById(id) : null;

    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(history.state, "", href);
  }

  async function onRegisterSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (typeof window.checkedForm === "function" && !window.checkedForm()) {
      return;
    }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const ok = applyDocument(doc);
      if (!ok) {
        form.submit();
        return;
      }

      const finalUrl = res.redirected ? new URL(res.url).pathname : "/register";
      history.replaceState({ url: finalUrl }, "", finalUrl);
    } catch (err) {
      console.error("AJAX form submit failed, falling back to normal submit:", err);
      form.submit();
    }
  }

  function bindPage() {
    document.querySelectorAll("#app-content a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      link.removeEventListener("click", onLinkClick);
      link.removeEventListener("click", onHashLinkClick);

      if (href && href.startsWith("#")) {
        link.addEventListener("click", onHashLinkClick);
      } else {
        link.addEventListener("click", onLinkClick);
      }
    });

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
      registerForm.removeEventListener("submit", onRegisterSubmit);
      registerForm.addEventListener("submit", onRegisterSubmit);
    }
  }

  window.addEventListener("popstate", () => {
    const newPath = window.location.pathname;
    if (newPath === currentPath) {
      return;
    }
    currentPath = newPath;
    navigate(newPath, { push: false });
  });

  document.addEventListener("DOMContentLoaded", bindPage);
})();
