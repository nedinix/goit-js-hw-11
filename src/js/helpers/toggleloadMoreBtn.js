import refs from '../common/refs';

export function addLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
