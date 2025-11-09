import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const refs = {
  form: document.querySelector('.js-search-form'),
  gallery: document.querySelector('.js-gallery'),
  loader: document.querySelector('.js-loader'),
};

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(event) {
  event.preventDefault();

  const { target: searchForm } = event;
  const query = searchForm.elements.user_query.value.trim();
  refs.gallery.innerHTML = '';

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query before submitting!',
      position: 'topRight',
    });
    return;
  }

  refs.loader.classList.add('is-active');

  fetchPhotosByQuery(query)
    .then(data => {
      if (!data.hits.length) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      const markup = data.hits
        .map(image => createGalleryCardTemplate(image))
        .join('');

      refs.gallery.innerHTML = markup;
      refs.gallery
        .querySelectorAll('.gallery-card')
        .forEach(card => setTimeout(() => card.classList.add('show'), 50));
      lightbox.refresh();
    })
    .catch(() => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      refs.loader.classList.remove('is-active');
      searchForm.reset();
    });
}
