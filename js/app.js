/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const navBarListWrapper = document.querySelector("#navbar__list");
const sectionsWrapper = document.querySelector(".sections__container");
const sections = [
  {
    title: "section 1",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt.",
    ],
  },
  {
    title: "section 2",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt.",
    ],
  },
  {
    title: "section 3",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt.",
    ],
  },
];

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

const navList = sections.map(({ title }, index) => {
  const dataLinkValue = `section${index + 1}`;
  const refrenceToSection = `#section${index + 1}`;
  const navElement = document.createElement("li");
  navElement.classList.add("nav-item");
  navElement.setAttribute("data-link", `${dataLinkValue}`);
  navElement.innerHTML = `<a href= ${refrenceToSection} > ${title}</>`;

  navBarListWrapper.appendChild(navElement);
  return navElement;
});

// Build sections
const allSections = sections.forEach(({ title, paragraphs }, index) => {
  let sectionElement = document.createElement("section");
  let landingContainer = document.createElement("div");
  landingContainer.classList.add("landing__container");
  let headerElement = document.createElement("h2");
  headerElement.innerText = title;
  let sectionId = `section${index + 1}`;
  let dataAttrValue = `section ${index + 1}`;
  landingContainer.appendChild(headerElement);

  paragraphs.forEach((paragraph) => {
    let parag = document.createElement("p");
    parag.innerText = paragraph;
    landingContainer.appendChild(parag);
  });
  sectionElement.appendChild(landingContainer);
  sectionElement.setAttribute("id", sectionId);
  sectionElement.setAttribute("data-nav", dataAttrValue);
  sectionsWrapper.appendChild(sectionElement);
});

let sectionsToObserve = sectionsWrapper.querySelectorAll("section");
let navListItems = navBarListWrapper.querySelectorAll("li");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry && entry.intersectionRatio > 0) {
      let sectionId = entry.target.id;
      let section = entry.target;
      navListItems.forEach((navItem) => {
        if (navItem.getAttribute("data-link") === sectionId) {
          navItem.classList.add("active");
          section.classList.add("active");
        } else if (navItem.classList.contains("active")){
        
            navItem.classList.remove('active');
            section.classList.remove('active')
          
        }
        else {
          navItem.classList.remove("active");
          section.classList.remove("active");
        }
      });
    }
  });
});

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

sectionsToObserve.forEach((section) => observer.observe(section, options));
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

const clickHandler = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  const targetElement = evt.target;
  const sectionID = targetElement.getAttribute("data-link");
  const section = document.getElementById(sectionID);

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};
navList.forEach((item) => {
  item.addEventListener("click", clickHandler);
});
// Set sections as active
