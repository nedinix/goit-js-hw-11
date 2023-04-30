import refs from '../common/refs';

export default function loadScroll() {
  setTimeout(() => {
    const { height: cardHeight } =
      refs.container.firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  }, 400);
}
