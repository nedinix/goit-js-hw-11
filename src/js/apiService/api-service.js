import instance from './instance';
import { Notify } from 'notiflix';

const API_KEY = '35839995-5c49d25fb3199a064f9ba676b';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const options = {
        params: {
          key: API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          q: this.searchQuery,
          per_page: 40,
          page: this.page,
        },
      };

      if (this.searchQuery) {
        const response = await instance.get('', options);
        this.incrementPage();
        console.log(response.data.totalHits);
        if (!response.data.hits.length) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          Notify.info(`"Hooray! We found ${response.data.totalHits} images."`);
          return response.data.hits;
        }
      }

      console.log('after ', this.page);
    } catch (error) {
      if (error.status === '404') {
      }
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
