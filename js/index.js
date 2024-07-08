window.addEventListener("load", async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"
      );
      const data = await response.json();
  
      var articles = data.reverse().slice(0, 3).map(jsonProjectToHtmlArticle);
  
      const container = document.querySelector("div.projects-container");
      container.innerHTML = "";
      articles.forEach((article) => container.appendChild(article));
    } catch (error) {
      console.log(error);
    } finally {
      document.querySelector("section.recent-projects").removeAttribute("hidden");
    }
  });
  
  function jsonProjectToHtmlArticle(project) {
    const article = document.createElement("article");
    article.className = "project-card";
  
    const wrapper = createProjectWrapperAnchor(project);
    article.appendChild(wrapper);
  
    return article;
  }
  
  function createProjectWrapperAnchor(project) {
    const wrapperAnchor = document.createElement("a");
    wrapperAnchor.className = "project-wrapper";
    wrapperAnchor.href = `./pages/projects.html?id=${project.uuid}`;
  
    const imgElement = document.createElement("img");
    imgElement.className = "img-project";
    imgElement.setAttribute("src", project.image);
    imgElement.setAttribute("alt", project.name);
    wrapperAnchor.appendChild(imgElement);
  
    const divInnerCard = createProjectInnerCard(project);
    wrapperAnchor.appendChild(divInnerCard);
  
    return wrapperAnchor;
  }
  
  function createProjectInnerCard(project) {
    const divInnerCard = document.createElement("div");
    divInnerCard.className = "project-inner-card";
  
    const h4Element = document.createElement("h4");
    h4Element.className = "project-title";
    h4Element.innerHTML = project.name;
    divInnerCard.appendChild(h4Element);
  
    const pElement = document.createElement("p");
    pElement.className = "project-description capitalize";
    pElement.innerHTML = project.description;
    divInnerCard.appendChild(pElement);
  
    const learnMoreLink = document.createElement("a");
    learnMoreLink.className = "learn-more";
    learnMoreLink.innerHTML = "Learn more";
    learnMoreLink.setAttribute(
      "href",
      `./pages/projects.html?id=${project.uuid}`
    );
    divInnerCard.appendChild(learnMoreLink);
  
    return divInnerCard;
  }
  