document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector(
    ".header .nav-bar .nav-list .hamburger"
  );

  const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
  const menu_item = document.querySelectorAll(".header .nav-bar .nav-list ul li");
  const header = document.querySelector(".header.container");
  const headerSeperator = document.querySelector("#header #header-seperator")
  const headerSeperatorDisplay = headerSeperator.style.display;


  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });

  document.addEventListener("scroll", () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 150) {
      header.style.backgroundColor = "#29323c";
      headerSeperator.style.display = "none"
    } else {
      header.style.backgroundColor = "transparent";
      headerSeperator.style.display = headerSeperatorDisplay;
    }
  });

  menu_item.forEach((item) => {
    item.addEventListener("click", () => {
      mobile_menu.classList.toggle("active");
    });
  });


  const swe_pros = document.querySelector(".swe-projects")
  const ml_pros = document.querySelector(".ml-projects")
  const mobile_pros = document.querySelector(".mobile-projects")
  const all_projs = document.querySelector(".all-pros")

  const swe_button = document.getElementById("swe-pro-view")
  const ml_button = document.getElementById("ml-pro-view")
  const mob_button = document.getElementById("mob-pro-view")
  const all_button = document.getElementById("all-pro-view")

  let all_buttons = [swe_button, ml_button, mob_button, all_button]

  const allProjsContainer = document.getElementById("all-projects-container");

  function switchToSelected(sel) {
    sel.style.color = "white"
    sel.style.backgroundColor = "crimson"

    for (let i = 0; i < 4; i++) {

      if (all_buttons[i] === sel)
        continue;

      all_buttons[i].style.color = "crimson"
      all_buttons[i].style.backgroundColor = "white"

    }
  }

  function readAllProjects() {
    return new Promise((resolve, reject) => {
      fetch("./assets/meta/projects.json").then(resp => {
        resp.json().then(body => {
          resolve(body);
        }).catch(err => {
          reject(err);
        })
      }).catch(err => {
        reject(err);
      })
    })
  }

  function renderProjects(btn) {

    const category = btn.dataset.val;

    readAllProjects().then(projs => {

      console.log(projs)

      console.log("category: ", category)

      if (category !== "all") {
        projs = projs.filter(proj => proj.categories.includes(category));
      }

      projs.sort(proj => proj.rank);

      console.log("Sorted: ", projs);

      allProjsContainer.innerHTML = ''

      for (let proj in projs) {
        allProjsContainer.appendChild(getProjectDiv(projs[proj]));
      }

    })
  }

  function getProjectDiv(project) {

    console.log("processing project:", project);

    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    const projectInfo = document.createElement("div");
    projectInfo.classList.add("project-info");

    const a = document.createElement("a");
    a.href = project.link;

    const title = document.createElement("h1");
    title.textContent = project.title;

    a.appendChild(title);

    projectInfo.appendChild(a);

    const heading = document.createElement("h2");
    heading.innerText = project.heading;

    projectInfo.appendChild(heading);

    const content = document.createElement("p");
    content.innerText = project.description;

    projectInfo.appendChild(content);

    const tags = document.createElement("div");
    tags.classList.add("project-item-tags")

    for (let tag in project.displayTags) {
      const spanTag = document.createElement("span");
      spanTag.innerText = project.displayTags[tag];
      tags.appendChild(spanTag);
    }

    projectInfo.appendChild(tags);

    projectItem.appendChild(projectInfo);

    const projectImage = document.createElement("div");
    projectImage.classList.add("project-image");

    const bg = document.createElement("img");
    bg.src = "./assets/img/project-logo/" + project.thumbnail;
    bg.alt = "project.title";

    projectImage.appendChild(bg);

    projectItem.appendChild(projectImage);

    return projectItem;

  }


  all_buttons.forEach(button => {

    button.addEventListener('click', () => {

      renderProjects(button);
      switchToSelected(button);

    })
  })

  all_button.click();
});