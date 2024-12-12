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
let totalHits = 0;

// Обробник події для форми пошуку
form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = form.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Помилка',
      message: 'Будь ласка, введіть пошуковий запит!',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0; // Скидаємо кількість результатів
  clearGallery(gallery);
  toggleLoader(loader, true);
  loadMoreBtn.style.display = 'none'; // Ховаємо кнопку "Завантажити ще"

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Немає результатів',
        message: 'Не знайдено зображень. Спробуйте інше ключове слово!',
      });
      return;
    }

    const markup = renderImages(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    // Відображаємо кнопку "Завантажити ще", якщо є більше зображень
    if (data.hits.length === 15 && totalHits > 15) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити зображення. Спробуйте ще раз!',
    });
  } finally {
    toggleLoader(loader, false);
  }
});

// Обробник події для кнопки "Завантажити ще"
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  toggleLoader(loader, true);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    const markup = renderImages(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    scrollAfterLoad(); // Прокрутка після завантаження нових зображень

    // Ховаємо кнопку, якщо повернуто менше 15 зображень або досягнуто кінця результатів
    if (
      data.hits.length < 15 ||
      (currentPage - 1) * 15 + data.hits.length >= totalHits
    ) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Кінець результатів',
        message: 'На жаль, ви досягли кінця результатів пошуку.',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити більше зображень!',
    });
  } finally {
    toggleLoader(loader, false);
  }
});

// Прокрутка після завантаження нових зображень
const scrollAfterLoad = () => {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({ top: itemHeight * 2, behavior: 'smooth' });
  }
};

// Автоматичне завантаження при скролінгу
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
      scrollAfterLoad(); // Прокрутка після завантаження нових зображень

      // Ховаємо кнопку, якщо повернуто менше 15 зображень або досягнуто кінця результатів
      if (
        data.hits.length < 15 ||
        (currentPage - 1) * 15 + data.hits.length >= totalHits
      ) {
        loadMoreBtn.style.display = 'none';
        iziToast.info({
          title: 'Кінець результатів',
          message: 'На жаль, ви досягли кінця результатів пошуку.',
        });
      }
    } catch (error) {
      iziToast.error({
        title: 'Помилка',
        message: 'Не вдалося завантажити більше зображень!',
      });
    } finally {
      toggleLoader(loader, false);
    }
  }
});
