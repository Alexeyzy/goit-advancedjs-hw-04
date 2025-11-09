import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const refs = {
  form: document.querySelector('.js-search-form'),
  gallery: document.querySelector('.js-gallery'),
  loader: document.querySelector('.js-loader'),
  loadMoreBtn: document.querySelector('.js-load-more'),
};

let query = '';
let page = 1;
let totalHits = 0;

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onSearchFormSubmit(e) {
  e.preventDefault();
  query = e.target.elements.user_query.value.trim();
  refs.gallery.innerHTML = '';
  page = 1;
  refs.loadMoreBtn.classList.add('hidden');

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query before submitting!',
      position: 'topRight',
    });
    return;
  }

  refs.loader.classList.add('is-active');

  try {
    const data = await fetchPhotosByQuery(query, page);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
      return;
    }

    renderGallery(data.hits);

    if (data.hits.length < totalHits) {
      refs.loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.remove('is-active');
    e.target.reset();
  }
}

async function onLoadMoreClick() {
  page += 1;
  refs.loader.classList.add('is-active');

  try {
    const data = await fetchPhotosByQuery(query, page);
    renderGallery(data.hits, true);

    const totalPages = Math.ceil(totalHits / 15);
    if (page >= totalPages) {
      refs.loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.remove('is-active');
  }
}

function renderGallery(images, append = false) {
  const markup = images.map(createGalleryCardTemplate).join('');
  if (append) {
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    refs.gallery.innerHTML = markup;
  }
  lightbox.refresh();
}

function smoothScroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
