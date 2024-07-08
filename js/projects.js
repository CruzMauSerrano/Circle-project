window.addEventListener("load", async () => {
    showLoadingIndicator();

    try {
        const response = await fetch(
            "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const mainProjectId = getQuerystringId();
        let mainProjectIndex = data.findIndex(
            (project) => project.uuid == mainProjectId
        );

        if (mainProjectIndex === -1) {
            window.location.href = "../pages/404.html";
            return;
        }

        const mainProject = data[mainProjectIndex];
        addMainProject(mainProject);

        data.splice(mainProjectIndex, 1);
        const otherProjects = data.slice(0, 3).reverse();
        addOtherProjects(otherProjects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        window.location.href = "../pages/404.html"; 
    } finally {
        hideLoadingIndicator();
        showMainContent();
    }
});

function getQuerystringId() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    return params.id;
}

function addMainProject(project) {
    if (!project) {
        return;
    }

    const projectHTML = `
          <h1 class="title">${project.name}</h1>
          <div class="subtitle">
          <span class="UI-design-title">${project.description}</span>
  
          <span class="completed-title">Completed on
              <span class="completed-title-data">${project.completed_on}</span>
          </span>
          </div>
          <div class="project-image-section">
          <img class="project-image" src="${project.image}" alt="${project.name} image" />
          </div>
  
          <article class="project-description">
              ${project.content}
          </article>
      `;

    const projectElement = document.getElementById("project");
    projectElement.innerHTML = projectHTML;
}

function addOtherProjects(projects) {
    let articlesHTML = "";

    projects.forEach((project) => {
        articlesHTML += jsonProjectToOtherHtmlArticle(project);
    });

    const container = document.querySelector("div.projects-container");
    container.innerHTML = articlesHTML;
}

function jsonProjectToOtherHtmlArticle(project) {
    if (!project) {
        return;
    }

    const projectHTML = `
          <article class="project-card">
              <a class="project-wrapper" href="../pages/projects.html?id=${project.uuid}">
                  <img class="img-project" src="${project.image}" alt="${project.name} image" />
                  <div class="project-inner-card">
                  <h4 class="project-title">${project.name}</h4>
                  <p class="project-description capitalize">${project.description}</p>
                  <a class="learn-more" href="../pages/projects.html?id=${project.uuid}">Learn more</a>
                  </div>
              </a>
          </article>
      `;

    return projectHTML;
}

function showLoadingIndicator() {
    const loader = document.getElementById("loading-indicator");
    if (loader) {
        loader.style.display = "block";
    }
}

function hideLoadingIndicator() {
    const loader = document.getElementById("loading-indicator");
    if (loader) {
        loader.style.display = "none";
    }
}

function showMainContent() {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
        mainContent.style.display = "block";
    }
}
