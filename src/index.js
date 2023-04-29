import refs from './js/common/refs';
// import { ImagesApiService, getImages } from './js/apiService/imagesRequest';
import ImagesApiService from './js/apiService/api-service';
import { createGalleryMarkup } from './js/markupService/createGallery';

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();
console.log(imagesApiService);

async function onSearchFormSubmit(e) {
  e.preventDefault();
  // searchKey = e.target.searchQuery.value.trim();
  // refs.container.insertAdjacentHTML(
  //   'beforeend',
  //   createGalleryMarkup(await getImages(searchKey))
  // );

  imagesApiService.searchQuery = e.target.searchQuery.value.trim();
  refs.container.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(await imagesApiService.getImages())
  );
}

async function onLoadMore() {
  refs.container.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(await imagesApiService.getImages())
  );
}
