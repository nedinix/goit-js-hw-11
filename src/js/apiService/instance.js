import axios from 'axios';

export default instance = axios.create({
  baseURL: 'https://pixabay.com/api',
});
