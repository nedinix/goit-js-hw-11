import { refs } from './js/common/refs';
import { getImages } from './js/apiService/imagesRequest';
import { createGalleryMarkup } from './js/markupService/createGallery';

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

async function onSearchFormSubmit(e) {
  e.preventDefault();
  const value = e.target.searchQuery.value.trim();
  refs.container.innerHTML = createGalleryMarkup(await getImages(value));
}
