import axios from 'axios';
// import { refs } from '../common/refs';

// refs.searchForm.searchQuery.addEventListener('input', onSearchInput);

// function onSearchInput(e) {
//   console.log(e.currentTarget.value.trim());
//   // e.currentTarget.value.trim();
// }

export const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
});
