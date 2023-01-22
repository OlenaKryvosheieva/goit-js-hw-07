import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const galleryItem = createGalleryItem(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryItem);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
    </div>
    `;
    })
    .join("");
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `
  <div class="modal">
  <img src="${evt.target.dataset.source}" width="800" height="600">
  </div>
  `,
    {
      onShow: (instance) => {
        instance.element().querySelector(".modal").onclick = instance.close;
      },
    }
  );

  instance.show();

  galleryContainer.addEventListener("keydown", closeModal);

  function closeModal(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }

    galleryContainer.removeEventListener("keydown", closeModal);
  }
}
