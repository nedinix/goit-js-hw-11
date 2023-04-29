import instance from './instance';
import { Notify } from 'notiflix';

const API_KEY = '35839995-5c49d25fb3199a064f9ba676b';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
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

    try {
      if (this.searchQuery) {
        const response = await instance.get('', options);
        this.incrementPage();

        return response.data;
      }
    } catch (error) {
      console.log(error.message);
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
