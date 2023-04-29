import { instance } from './apiService';

export async function getImages(key) {
  try {
    const response = await instance.get('', {
      params: {
        key: '35839995-5c49d25fb3199a064f9ba676b',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: key,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error(error.status);
  }
}
