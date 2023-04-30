import refs from './js/common/refs';
import ImagesApiService from './js/apiService/api-service';
import createGalleryMarkup from './js/markupService/createGallery';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.loadMoreBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();
const lightbox = new SimpleLightbox('.photo-card-link', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSearchFormSubmit(e) {
  e.preventDefault();

  imagesApiService.searchQuery = e.target.searchQuery.value.trim();
  imagesApiService.resetPage();
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.container.innerHTML = '';

  if (!imagesApiService.searchQuery) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  return await imagesApiService.fetchImages().then(({ hits, totalHits }) => {
    if (!hits.length) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notify.success(`Hooray! We found ${totalHits} images.`);
    renderGallery(hits);
    if (totalHits < hits.length) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
  });
}

async function onLoadMore() {
  return await imagesApiService.fetchImages().then(({ hits, totalHits }) => {
    if (hits.length < totalHits) {
      renderGallery(hits);
      smoothScroll();
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
});

function renderGallery(data) {
  refs.container.insertAdjacentHTML('beforeend', createGalleryMarkup(data));
  lightbox.refresh();
}

function smoothScroll() {
  setTimeout(() => {
    const { height: cardHeight } =
      refs.container.firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  }, 500);
}
