import refs from './js/common/refs';
import ImagesApiService from './js/apiService/api-service';
import createGalleryMarkup from './js/markupService/createGallery';
import { Notify } from 'notiflix';

refs.loadMoreBtn.style.display = 'none';

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();

async function onSearchFormSubmit(e) {
  e.preventDefault();

  imagesApiService.searchQuery = e.target.searchQuery.value.trim();
  imagesApiService.resetPage();
  refs.loadMoreBtn.style.display = 'none';
  refs.container.innerHTML = '';
  if (imagesApiService.searchQuery) {
    const { hits, totalHits } = await imagesApiService.fetchImages();
    if (hits.length) {
      Notify.info(`Hooray! We found ${totalHits} images.`);
      renderGallery(hits);
      refs.loadMoreBtn.style.display = 'block';
    } else {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } else {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function onLoadMore() {
  const { hits } = await imagesApiService.fetchImages();
  renderGallery(hits);
}

function renderGallery(data) {
  refs.container.insertAdjacentHTML('beforeend', createGalleryMarkup(data));
}
