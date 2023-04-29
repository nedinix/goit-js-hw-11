import refs from './js/common/refs';
import ImagesApiService from './js/apiService/api-service';
import { createGalleryMarkup } from './js/markupService/createGallery';

refs.loadMoreBtn.style.display = 'none';

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();
console.log(imagesApiService);

async function onSearchFormSubmit(e) {
  e.preventDefault();

  imagesApiService.searchQuery = e.target.searchQuery.value.trim();
  imagesApiService.resetPage();
  refs.container.innerHTML = '';
  const response = await imagesApiService.fetchImages();
  renderGallery(response);
  if (response.length) {
    refs.loadMoreBtn.style.display = 'block';
  }
  // refs.loadMoreBtn.classList.remove('hidden');
}

async function onLoadMore() {
  renderGallery(await imagesApiService.fetchImages());
}

function renderGallery(data) {
  refs.container.insertAdjacentHTML('beforeend', createGalleryMarkup(data));
}
