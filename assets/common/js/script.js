import ITEM_LIST from "./itemList.js";

const MAX_TITLE_LENGTH = 31;
/**
 * Truncates the string to a maximum of MAX_TITLE_LENGTH.
 * Inserts '...' in between the string.
 * Guarantees that the output string doesnt exceed MAX_TITLE_LENGTH.
 * @param {string} title - The string to be truncated
 * @returns {string} - Truncated string
 */
const truncateTitle = (title) => {
  if (title.length <= MAX_TITLE_LENGTH) {
    return title;
  } else {
    return (
      // First Few characters + ellipisis (...) + Last few characters
      title.substr(0, Math.floor(MAX_TITLE_LENGTH / 2)) +
      "..." +
      title.substr(-(MAX_TITLE_LENGTH - Math.floor(MAX_TITLE_LENGTH / 2) - 3))
    );
  }
};
/**
 * This function takes array of objects (with props : perviewImage and title) i.e the initial
 * list, and returns the unordered list (<ul> Object). Further, each <li> Object (children of <ul> object)
 * has bulletImg (<img>) (small preview of the img) and the title (<span>).
 * @param {Array} list
 * @returns {<ul> Object}
 */
const createElementList = (list) => {
  // <ul>
  const elList = document.querySelector("#list");

  list.forEach((item, id) => {
    // creating <li>
    const elItem = document.createElement("li");
    // Storing img source and title in <li> attributes.
    elItem.setAttribute("imgSrc", item.previewImage);
    elItem.setAttribute("title", item.title);

    // Bullet image for item
    const elBulletImg = document.createElement("img");
    elBulletImg.src = item.previewImage;
    elBulletImg.classList.add("bullet-img");

    // Title for list item
    const elTitle = document.createElement("span");
    elTitle.classList.add("list-item-title");
    elTitle.textContent = truncateTitle(item.title);

    elItem.append(elBulletImg, elTitle);

    // Adding <li> to the <ul>
    elList.appendChild(elItem);
  });
  return elList;
};

/**
 * Main Image refers to the image of the selected list item.
 * This function updates the Main Image, and it removes '.current'
 * class from previously selected <li> and adds '.current' class to the given <li> (item).
 *  And then, updates the main display image and caption.
 * @param {<li> Object} item | The new <li> which is selected by the user.
 */
const updateMainImage = (item) => {
  if (document.querySelector(".current")) {
    document.querySelector(".current").classList.remove("current");
  }
  item.classList.add("current");

  let elMainImage = document.querySelector("#mainImage");
  let elMainImageCaption = document.querySelector("#mainImageCaption");
  elMainImage.src = item.getAttribute("imgSrc");
  elMainImageCaption.textContent = item.getAttribute("title");
};

/**
 * Takes the <ul> Object and adds 'click' event listeners on every list item <li> (children of <ul>).
 * @param {<ul> Object} elList
 */
const addClickEventListeners = (elList) => {
  for (let item of elList.children) {
    // Index of clicked item.
    item.addEventListener("click", () => {
      updateMainImage(item);
    });
  }
};
/**
 * This function adds keyboard navigation event listeners on window object.
 * Prevents default behaviour by Up and Down Arrow keys.
 * Pressing Up Arrow key, we move to previous sibling of the currently selected <li> object.
 * Presing Down Arrow key, we move to next sibling of the currently seclected <li> object.
 * The navigation is cyclic. i.e. If previous sibling is not Available we jump to the
 * last element, And If next sibling is not Available we jump to the
 * first element.
 */
const addKeyboardEventListeners = () => {
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const currentItem = document.querySelector(".current");
      if (currentItem.previousElementSibling) {
        updateMainImage(currentItem.previousElementSibling);
      } else {
        updateMainImage(currentItem.parentElement.lastElementChild);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const currentItem = document.querySelector(".current");
      if (currentItem.nextElementSibling) {
        updateMainImage(currentItem.nextElementSibling);
      } else {
        updateMainImage(currentItem.parentElement.firstElementChild);
      }
    }
  });
};

/**
 * ITEM_LIST is array of objects of the list items with props => previewImg, title.
 * Containing source of the image and title of the image respectively.
 */

const elList = createElementList(ITEM_LIST);

// Adding event listeners.
addClickEventListeners(elList);
addKeyboardEventListeners();

// By default setting the first child of the <ul> Object to selected.
updateMainImage(elList.children[0]);
