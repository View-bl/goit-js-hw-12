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
const loadMoreBtn = document.querySelector('#load-more');
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
  loadMoreBtn.style.display = 'none'; // Hide Load more button initially

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
    loadMoreBtn.style.display = 'block'; // Show Load more button
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again!',
    });
  } finally {
    toggleLoader(loader, false);
  }
});

loadMoreBtn.addEventListener('click', async () => {
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
});

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
