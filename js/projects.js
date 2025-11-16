const GITHUB_USERNAME = "negarbaharmand";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Fetch and merge GitHub + JSON data
async function loadGitHubProjects() {
  const projectsGrid = document.querySelector(".projects-grid");

  // Show loading message
  projectsGrid.innerHTML = '<p class="loading">Loading projects...</p>';

  try {
    // Fetch both GitHub API and local JSON
    const [githubResponse, jsonResponse] = await Promise.all([
      fetch(GITHUB_API),
      fetch("../data/projects-data.json"),
    ]);

    const githubRepos = await githubResponse.json();
    const projectsData = await jsonResponse.json();

    // Clear loading message
    projectsGrid.innerHTML = "";

    // Merge data and create cards
    projectsData.projects.forEach((projectInfo) => {
      const githubRepo = githubRepos.find(
        (repo) => repo.name === projectInfo.repoName
      );

      if (githubRepo) {
        createProjectCard(githubRepo, projectInfo);
      }
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    projectsGrid.innerHTML = '<p class="error">Failed to load projects</p>';
  }
}

// Create project card with merged data
function createProjectCard(githubRepo, projectInfo) {
  const projectsGrid = document.querySelector(".projects-grid");

  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <div class="project-image">
      <img src="${projectInfo.image}" alt="${githubRepo.name}" />
    </div>
    <div class="project-content">
      <h3>${githubRepo.name}</h3>
      <p>${projectInfo.description}</p>
      <div class="tech-stack">
        <span>Tech stack:</span>
        <span class="tech-list">${projectInfo.techStack.join(", ")}</span>
      </div>
      <div class="project-links">
        ${
          projectInfo.liveUrl
            ? `<a href="${projectInfo.liveUrl}" target="_blank" class="link-preview">
          <i class="fas fa-external-link-alt"></i>
          Live Preview
        </a>`
            : ""
        }
        <a href="${githubRepo.html_url}" target="_blank" class="link-code">
          <i class="fab fa-github"></i>
          View Code
        </a>
      </div>
    </div>
  `;

  projectsGrid.appendChild(card);
}

// Load projects when page loads
loadGitHubProjects();
