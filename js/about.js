// Fetch CV data
async function loadCVData() {
  try {
    const response = await fetch("data/cv-data.json");
    const data = await response.json();

    generateEducation(data.education);
    generateExperience(data.experience);
  } catch (error) {
    console.error("Error loading CV data:", error);
  }
}

// Call the function when page loads
loadCVData();

// Generate Education section
function generateEducation(education) {
  const educationSection = document.querySelector(".education-section");

  const h2 = educationSection.querySelector("h2");
  educationSection.innerHTML = "";
  educationSection.appendChild(h2);

  education.forEach((edu) => {
    const eduItem = document.createElement("div");
    eduItem.className = "education-item";
    eduItem.innerHTML = `
      <div class="education-content">
        <h3>${edu.degree}</h3>
        <div class="education-details">
          <span class="institution">
            <i class="fas fa-university"></i> ${edu.institution}
          </span>
        </div>
        ${edu.description ? `<p>${edu.description}</p>` : ""}
      </div>
      <div class="education-meta">
        <span class="date">
          <i class="fas fa-calendar"></i> ${edu.period}
        </span>
      </div>
    `;
    educationSection.appendChild(eduItem);
  });
}

// Generate Experience section (same as before)
function generateExperience(experience) {
  const workSection = document.querySelector(".work-section");

  const h2 = workSection.querySelector("h2");
  workSection.innerHTML = "";
  workSection.appendChild(h2);

  experience.forEach((exp) => {
    const expItem = document.createElement("div");
    expItem.className = "experience-item";
    expItem.innerHTML = `
      <div class="experience-content">
        <h3>${exp.title}</h3>
        <div class="experience-details">
          <span class="company">
            <i class="fas fa-building"></i> ${exp.company}
          </span>
        </div>
        ${exp.description ? `<p>${exp.description}</p>` : ""}
      </div>
      <div class="experience-meta">
        <span class="date">
          <i class="fas fa-calendar"></i> ${exp.period}
        </span>
      </div>
    `;
    workSection.appendChild(expItem);
  });
}
