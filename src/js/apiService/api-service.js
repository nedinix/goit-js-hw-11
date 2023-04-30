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
        const response = await instance
          .get('', options)
          .catch(function (error) {
            if (error.response) {
              // Запит було зроблено, і сервер відповів кодом стану, який
              // виходить за межі 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // Запит було зроблено, але відповіді не отримано
              // `error.request` - це екземпляр XMLHttpRequest у браузері та екземпляр
              // http.ClientRequest у node.js
              console.log(error.request);
            } else {
              // Щось сталося під час налаштування запиту, що викликало помилку
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
        this.incrementPage();
        return response.data;
      }
    } catch (error) {
      throw new Error(Notify.failure(`${error.message}`));
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
