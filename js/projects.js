const GITHUB_USERNAME = "negarbaharmand";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;

let REPO_CACHE = null;
// Fetch and merge GitHub + JSON data
async function loadGitHubProjects() {
  const projectsGrid = document.querySelector(".projects-grid");
  if (!projectsGrid) return;
  projectsGrid.innerHTML =
    '<p class="loading" role="status">Loading projects…</p>';

  // Show loading message
  projectsGrid.innerHTML = '<p class="loading">Loading projects...</p>';

  try {
    const [githubRepos, projectsData] = await Promise.all([
      fetchRepos(),
      fetchLocalProjects(),
    ]);

    // Guard rails
    const projects = Array.isArray(projectsData?.projects)
      ? projectsData.projects
      : [];

    projectsGrid.innerHTML = "";

    // Keep input order from projects-data.json
    for (const projectInfo of projects) {
      const repo = githubRepos.find((r) => r.name === projectInfo.repoName);
      if (!repo) continue;

      projectsGrid.appendChild(createProjectCard(repo, projectInfo));
    }

    if (!projectsGrid.children.length) {
      projectsGrid.innerHTML =
        '<p class="error">No matching projects found.</p>';
    }
  } catch (err) {
    console.error("Error loading projects:", err);
    projectsGrid.innerHTML = '<p class="error">Failed to load projects.</p>';
  }
}

async function fetchRepos() {
  if (REPO_CACHE) return REPO_CACHE;

  const res = await fetch(GITHUB_API, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const data = await res.json();

  // Minimal map for size and safety
  REPO_CACHE = (Array.isArray(data) ? data : []).map((r) => ({
    name: r.name,
    html_url: r.html_url,
    description: r.description ?? "",
    homepage: r.homepage ?? "",
  }));

  return REPO_CACHE;
}

async function fetchLocalProjects() {
  const res = await fetch("data/projects-data.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`Local JSON ${res.status}`);
  return await res.json();
}

function createProjectCard(githubRepo, projectInfo) {
  const {
    ProjectName = githubRepo.name,
    description = githubRepo.description || "",
    image = "",
    techStack = [],
    liveUrl,
  } = projectInfo;

  // If no live demo, fall back to the repo URL
  const primaryUrl = liveUrl || githubRepo.html_url;

  const article = document.createElement("article");
  article.className = "project-card";

  article.innerHTML = `
        <a class="project-image" href="${primaryUrl}" target="_blank" rel="noopener" aria-label="Open ${ProjectName}">
            <img src="${image}" alt="Screenshot of ${ProjectName}">
        </a>

        <div class="project-content">
            <h3>${ProjectName}</h3>
            <p class="project-desc">${description}</p>

            <div class="tech-stack">
                <span>Tech stack:</span>
                <span class="tech-list">${techStack.join(", ")}</span>
            </div>

            <div class="project-links">
                ${
                  liveUrl
                    ? `<a class="link-preview" href="${liveUrl}" target="_blank" rel="noopener" aria-label="Live preview of ${ProjectName}">
                                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                                <span>Live Preview</span>
                           </a>`
                    : ""
                }
                <a class="link-code" href="${
                  githubRepo.html_url
                }" target="_blank" rel="noopener" aria-label="Source code of ${ProjectName}">
                    <i class="fab fa-github" aria-hidden="true"></i>
                    <span>View Code</span>
                </a>
            </div>
        </div>
    `;

  return article;
}

/* Helpers to avoid accidental HTML injection in JSON fields */
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function escapeAttr(str = "") {
  return escapeHtml(str);
}

// Init
loadGitHubProjects();
