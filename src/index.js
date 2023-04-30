import refs from './js/common/refs';
import ImagesApiService from './js/apiService/api-service';
import createGalleryMarkup from './js/markupService/createGallery';
import loadScroll from './js/helpers/loadScroll';
import {
  addLoadMoreBtn,
  hideLoadMoreBtn,
} from './js/helpers/toggleloadMoreBtn';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { onSearchFormSubmit } from './js/events';

hideLoadMoreBtn();
refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();
const lightbox = new SimpleLightbox('.photo-card-link', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(imagesApiService);

let options = {
  root: null,
  rootMargin: '1000px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onScrollLoad, options);

async function onScrollLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entries);
      return loadNextPage();
    }
  });
}

async function onSearchFormSubmit(e) {
  e.preventDefault();
  imagesApiService.searchQuery = e.target.searchQuery.value.trim();

  imagesApiService.resetPage();
  hideLoadMoreBtn();
  refs.container.innerHTML = '';

  try {
    await imagesApiService.fetchImages().then(({ hits, totalHits }) => {
      if (!hits.length) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      Notify.success(`Hooray! We found ${totalHits} images.`);
      renderGallery(hits);
      observer.observe(refs.loadMoreBtn);
      if (totalHits > 40) {
        addLoadMoreBtn();
      }
    });
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function onLoadMore() {
  return loadNextPage();
}

async function loadNextPage() {
  try {
    await imagesApiService.fetchImages().then(({ hits, totalHits }) => {
      if (hits.length < totalHits) {
        renderGallery(hits);
      }

      if (hits.length < 40) {
        hideLoadMoreBtn();
        Notify.info(
          "We're sorry, but you've reached the end of search results.",
          {
            timeout: 2000,
            position: 'center-top',
          }
        );
        observer.unobserve(refs.loadMoreBtn);
      }
      loadScroll();
    });
  } catch (error) {
    Notify.failure(`${error.message}`);
  }
}

function renderGallery(data) {
  refs.container.insertAdjacentHTML('beforeend', createGalleryMarkup(data));
  lightbox.refresh();
}
