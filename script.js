import Constants from "./constants.js";

// el prefix is used for DOM element names.
const constants = new Constants();
const list = constants.list;
const elList = document.querySelector("#list");
list.forEach((item, id) => {
  const elItem = document.createElement("li");
  elItem.setAttribute("index", id);

  // Label for list item
  const elLabel = document.createElement("span");
  elLabel.classList.add("list-item-label");
  elLabel.textContent = item.title;

  //bullet image for item
  const elBulletImg = document.createElement("img");
  elBulletImg.src = item.previewImage;
  elBulletImg.classList.add("bullet-img");

  elItem.append(elBulletImg, elLabel);
  // Adding elements to DOM
  elList.appendChild(elItem);
});

const updateMainImage = (prevId, newId) => {
  elList.children[prevId].classList.remove("current");
  elList.children[newId].classList.add("current");

  let elMainImage = document.querySelector("#mainImage");
  let elMainImageCaption = document.querySelector("#mainImageCaption");
  elMainImage.src = list[newId].previewImage;
  elMainImageCaption.textContent = list[newId].title;
  return Number(newId);
};

// Initially first item is selected.
elList.children[0].classList.add("current");
let currentId = 0;
updateMainImage(currentId, currentId);

for (let item of elList.children) {
  // Index of clicked item.
  const id = item.getAttribute("index");
  item.addEventListener("click", () => {
    currentId = updateMainImage(currentId, id);
  });
}

window.addEventListener("keydown", (event) => {
  // Event listeners for keyboard navigation.
  if (event.key === "ArrowDown") {
    if (currentId < elList.children.length - 1) {
      currentId = updateMainImage(currentId, currentId + 1);
    }
  } else if (event.key === "ArrowUp") {
    if (currentId >= 1) {
      currentId = updateMainImage(currentId, currentId - 1);
    }
  }
});
