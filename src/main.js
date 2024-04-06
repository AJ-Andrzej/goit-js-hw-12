import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from '../src/js/pixabay-api';
import { imageTemplate } from './js/render-function'
import { renderImages } from './js/render-function'

const form = document.querySelector(".search-form");
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-more');
const btnMore = document.querySelector('.btn-more');
let searchValue = '';
let currantPage = 1;
let maxPage = 0;
const perPage = 15;

form.addEventListener('submit', crateGallery)
btnMore.addEventListener('click', onLoadMore)

async function crateGallery(event) {
    event.preventDefault()
    loader.classList.remove('visually-hidden');
    searchValue = form.elements.searchInput.value;
    currantPage = 1
    gallery.innerHTML = ""
    const images = await getImages(searchValue, currantPage)
    try {
        if (images.hits.length < 1) {
        iziToast.show({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#ef4040',
        position: 'topRight',
        }
        ) 
    }
    const markup = renderImages(images.hits);
        gallery.insertAdjacentHTML('beforeend', markup)
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: `alt`,
        captionDelay: 250,
        });
        form.reset() 
        loader.classList.add('visually-hidden');
        lightbox.refresh(); 
    } catch (error) {
        console.log(error)
    }
    maxPage = Math.ceil(images.totalHits / perPage)
    checkBtnStatus()
    
}

function showBtnMore() {
    btnMore.classList.remove('visually-hidden')
 }
function hideBtnMore() {
    btnMore.classList.add('visually-hidden')
}

function checkBtnStatus() {
    if (currantPage >= maxPage) {
        hideBtnMore()
    } else {
       showBtnMore()
    }
}

async function onLoadMore() {
    currantPage += 1;
    loaderMore.classList.remove('visually-hidden');
    const images = await getImages(searchValue, currantPage)
    try {
        if (currantPage >= maxPage) {
        loaderMore.classList.add('visually-hidden'); 
        iziToast.show({
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#ef4040',
        position: 'topRight',
        }
        )
        }
    const markup = renderImages(images.hits);
        gallery.insertAdjacentHTML('beforeend', markup)
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: `alt`,
        captionDelay: 250,
        });
        form.reset() 
        loaderMore.classList.add('visually-hidden');
        lightbox.refresh(); 
    } catch (error) {
        console.log(error)
    }
        window.scrollBy({
        top: getParam() * 2,
        left: 0,
        behavior: 'smooth',
    });
    checkBtnStatus()
}




