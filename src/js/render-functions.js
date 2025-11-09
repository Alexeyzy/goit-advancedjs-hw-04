export const createGalleryCardTemplate = imgInfo => {
  return `
    <li class="gallery-card">
      <a href="${imgInfo.largeImageURL}">
        <img
          class="gallery-img"
          src="${imgInfo.webformatURL}"
          alt="${imgInfo.tags}"
        />
      </a>
      <ul class="info">
        <li><b>Likes</b> ${imgInfo.likes}</li>
        <li><b>Views</b> ${imgInfo.views}</li>
        <li><b>Comments</b> ${imgInfo.comments}</li>
        <li><b>Downloads</b> ${imgInfo.downloads}</li>
      </ul>
    </li>
  `;
};