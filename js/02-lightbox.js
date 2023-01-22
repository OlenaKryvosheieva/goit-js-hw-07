import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const galleryItem = createGalleryItem(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryItem);
galleryContainer.addEventListener("click", onGalleryContainerClick);

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

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

  lightbox.open(evt.target);
}
