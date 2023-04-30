import refs from './js/common/refs';
import ImagesApiService from './js/apiService/api-service';
import createGalleryMarkup from './js/markupService/createGallery';
import loadScroll from './js/helpers/loadScroll';
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

  try {
    await imagesApiService.fetchImages().then(({ hits, totalHits }) => {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      renderGallery(hits);
      if (totalHits > 40) {
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
    });
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function onLoadMore() {
  await imagesApiService.fetchImages().then(({ hits, totalHits }) => {
    if (hits.length < totalHits) {
      renderGallery(hits);
    }

    if (hits.length < 40) {
      refs.loadMoreBtn.classList.add('is-hidden');

      Notify.failure(
        "We're sorry, but you've reached the end of search results.",
        {
          timeout: 2000,
        }
      );
    }
    loadScroll();
  });
}

function renderGallery(data) {
  refs.container.insertAdjacentHTML('beforeend', createGalleryMarkup(data));
  lightbox.refresh();
}
