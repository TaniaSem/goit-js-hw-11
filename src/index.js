// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import markupImg from './js/markup_img';
import fetchByQuery from './js/fetch';
import './css/styles.css';

// https://pixabay.com/api/?key=29563957-4f73ee18d6ec9b01780e978cb&q=${name}&image_type=photo

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearchSubmit);

let searchQuery = '';
let page = 1;
let images = [];
let lightbox;

refs.loadMoreBtn.classList.add('invisible');

function onSearchSubmit(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value;
  page = 1;
  // console.log(searchQuery);
  fetchByQuery(searchQuery, page)
    .then(({ data }) => {
      images = data.hits;
      // totalPages = data.totalHits / 40;
      console.log(images);
      if (images.length === 0 || searchQuery === '') {
        console.log(data.totalHits);
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        refs.gallery.innerHTML = '';
        onRender(images);
        lightbox = new SimpleLightbox('.gallery div a', { captionDelay: 250 });
        refs.loadMoreBtn.classList.remove('invisible');
      }

      if (images.length < 40 && images.length > 0) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        refs.loadMoreBtn.classList.add('invisible');
        return;
      }
    })
    .catch(error => console.log(error.message));
}

function onRender(images) {
  const gallery = images.map(image => markupImg(image)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', gallery);
}

refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  try {
    page += 1;
    fetchByQuery(searchQuery, page).then(({ data }) => {
      images = data.hits;
      console.log(images);
      if (images.length === 0) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        refs.loadMoreBtn.classList.add('invisible');
      }
      onRender(images);
      lightbox.refresh();
    });
  } catch (error) {
    if (error.name === 'AxiosError') {
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadMoreBtn.classList.add('invisible');
    }
  }
}
