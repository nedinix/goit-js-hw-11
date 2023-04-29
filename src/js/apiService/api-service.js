import instance from './instance';

// const options = {
//   params: {
//     key: '35839995-5c49d25fb3199a064f9ba676b',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     q: '',
//     per_page: 40,
//     page: 1,
//   },
// };

// export async function getImages(key, pageNum) {
//   try {
//     options.params.q = key;
//     options.params.page = pageNum;
//     const response = await instance.get('', options);
//     return response.data.hits;
//   } catch (error) {
//     console.error(error.status);
//   }
// }

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getImages() {
    console.log(this); //console

    try {
      const options = {
        params: {
          key: '35839995-5c49d25fb3199a064f9ba676b',
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
        return response.data.hits;
      }

      console.log('after ', this.page); //console
    } catch (error) {
      console.error(error.status);
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
