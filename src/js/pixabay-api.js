import axios from "axios";

export async function getImages(keyWord) {
    const params = {
        key: '43249690-fb8fa8f624055727458ab84aa',
        q: keyWord,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    }
    const url = 'https://pixabay.com/api/';
    const res = await axios.get(url, { params })
    return res.data
}

