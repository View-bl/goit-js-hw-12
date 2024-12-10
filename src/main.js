import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  toggleLoader,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = form.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term!' });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery(gallery);
  toggleLoader(loader, true);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'No images found. Try another keyword!',
      });
      return;
    }

    const markup = renderImages(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again!',
    });
  } finally {
    toggleLoader(loader, false);
  }
});
gallery.addEventListener('click', event => {
  if (event.target.tagName === 'IMG') {
    const img = event.target;
    const titleElement = img
      .closest('.gallery-item')
      .querySelector('.image-title');
    titleElement.style.display = 'block'; // Показуємо назву
  }
});

// Функція для оновлення галереї
export function updateGalleryMarkup(images) {
  const markup = renderImages(images);
  gallery.insertAdjacentHTML('beforeend', markup);

  // Оновлюємо SimpleLightbox після додавання нових елементів
  lightbox.refresh();
}
window.addEventListener('scroll', async () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    !loader.style.display
  ) {
    currentPage += 1;
    toggleLoader(loader, true);

    try {
      const data = await fetchImages(currentQuery, currentPage);
      const markup = renderImages(data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Failed to load more images!',
      });
    } finally {
      toggleLoader(loader, false);
    }
  }
});








