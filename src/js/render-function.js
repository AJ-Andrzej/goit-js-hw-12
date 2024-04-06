export function imageTemplate({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) {
    return `<li class="gallery-item">
          <a href="${largeImageURL}"> <img loading="lazy" src="${webformatURL}" alt="${tags}" width="360" height="152"/> </a>
          <div class="gallery-item-description">
            <p class="description"><b>Likes</b> ${likes}</p>
            <p class="description"><b>Views</b> ${views}</p>
            <p class="description"><b>Comments</b> ${comments}</p>
            <p class="description"><b>Downloads</b> ${downloads}</p>
            </div>
          </li>`;
}

export function renderImages(imagesArr) {
     return imagesArr.map(imageTemplate).join('')
}

export function getParam() {
  const elem = document.querySelector('.gallery-item');
  const elements = elem.getBoundingClientRect();
  return elements.height;
}