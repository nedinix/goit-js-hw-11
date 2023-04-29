import refs from './js/common/refs';
import ImagesApiService from './js/apiService/api-service';
import { createGalleryMarkup } from './js/markupService/createGallery';

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();
console.log(imagesApiService);

async function onSearchFormSubmit(e) {
  e.preventDefault();

  imagesApiService.searchQuery = e.target.searchQuery.value.trim();
  imagesApiService.resetPage();
  refs.container.innerHTML = '';
  renderGallery(await imagesApiService.getImages());
  refs.loadMoreBtn.style.display = 'block';
}

async function onLoadMore() {
  renderGallery(await imagesApiService.getImages());
}

function renderGallery(data) {
  refs.container.insertAdjacentHTML('beforeend', createGalleryMarkup(data));
}
