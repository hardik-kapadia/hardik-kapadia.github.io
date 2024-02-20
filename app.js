const hamburger = document.querySelector(
  ".header .nav-bar .nav-list .hamburger"
);

const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(".header .nav-bar .nav-list ul li");
const header = document.querySelector(".header.container");

const swe_pros = document.querySelector(".swe-projects")
const ml_pros = document.querySelector(".ml-projects")
const mobile_pros = document.querySelector(".mobile-projects")
const all_projs = document.querySelector(".all-pros")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
});

document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    header.style.backgroundColor = "#29323c";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    mobile_menu.classList.toggle("active");
  });
});

const swe_button = document.getElementById("swe-pro-view")
const ml_button = document.getElementById("ml-pro-view")
const mob_button = document.getElementById("mob-pro-view")
const all_button = document.getElementById("all-pro-view")

let all_buttons = [swe_button, ml_button, mob_button, all_button]

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

switchToSelected(all_button);
swe_pros.style.display = "none";
ml_pros.style.display = "none";
mobile_pros.style.display = "none";
all_projs.style.display = "block";
switchToSelected(all_button)

swe_button.addEventListener("click", () => {
  swe_pros.style.display = "block";
  switchToSelected(swe_button);
  ml_pros.style.display = "none";
  mobile_pros.style.display = "none";
  all_projs.style.display = "none";
})

ml_button.addEventListener("click", () => {
  swe_pros.style.display = "none";
  ml_pros.style.display = "block";
  switchToSelected(ml_button);
  mobile_pros.style.display = "none";
  all_projs.style.display = "none";
})

mob_button.addEventListener("click", () => {
  swe_pros.style.display = "none";
  ml_pros.style.display = "none";
  mobile_pros.style.display = "block";
  switchToSelected(mob_button);
  all_projs.style.display = "none";
})

all_button.addEventListener("click", () => {
  swe_pros.style.display = "none";
  ml_pros.style.display = "none";
  mobile_pros.style.display = "none";
  all_projs.style.display = "block";
  switchToSelected(all_button)
})