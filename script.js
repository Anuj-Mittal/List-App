const list = [
  {
    previewImage:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cat.jpeg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cooking couple shoot portofilio(1).jpg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "bali-kelingking-beach-plastic-removal-drive.key",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "NextByk Investor Pitch 2021.ppt",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "interns-performance-report-june-2021.key",
  },
];

const elList = document.querySelector("#list");
list.forEach((item, id) => {
  const elItem = document.createElement("li");
  elItem.setAttribute("index", id);

  const elLabel = document.createElement("span");
  elLabel.classList.add("list-item-label");
  elLabel.textContent = item.title;

  const elBulletImg = document.createElement("img");
  elBulletImg.src = item.previewImage;
  elBulletImg.classList.add("bullet-img");

  elItem.appendChild(elBulletImg);
  elItem.appendChild(elLabel);
  elList.appendChild(elItem);
});

const updateMainImage = (prevId, index) => {
  elList.children[prevId].classList.remove("current");
  elList.children[index].classList.add("current");

  let elMainImage = document.querySelector("#mainImage");
  let elMainImageCaption = document.querySelector("#mainImageCaption");
  elMainImage.src = list[index].previewImage;
  elMainImageCaption.textContent = list[index].title;
  return Number(index);
};

elList.children[0].classList.add("current");
let currentId = 0;
updateMainImage(currentId, currentId);

for (let item of elList.children) {
  const id = item.getAttribute("index");
  item.addEventListener("click", () => {
    currentId = updateMainImage(currentId, id);
  });
}

window.addEventListener("keydown", (event) => {
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
