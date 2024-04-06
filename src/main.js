import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import axios from "axios";
import { getImages } from '../src/js/pixabay-api';
import { imageTemplate } from './js/render-function'
import { renderImages } from './js/render-function'

const form = document.querySelector(".search-form")
const gallery = document.querySelector('.gallery')
const loader = document.querySelector('.loader')

form.addEventListener('submit', crateGallery)

async function crateGallery(event) {
    event.preventDefault()
    loader.classList.remove('visually-hidden');
    const searchValue = form.elements.searchInput.value;
    const images = await getImages(searchValue)
    try {
        if (images.hits.length < 1) {
        iziToast.show({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#ef4040',
        position: 'topRight',
        }
        )
        loader.classList.add('visually-hidden'); 
    }
    const markup = renderImages(images.hits);
        gallery.innerHTML = markup
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
    
}




