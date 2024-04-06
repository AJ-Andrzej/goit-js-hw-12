export function getImages(keyWord) {
    const BASE_URL = "https://pixabay.com";
    const END_POINT = "/api/"
    const params = new URLSearchParams({
        key: '43249690-fb8fa8f624055727458ab84aa',
        q: keyWord,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    })
    const url = `${BASE_URL}${END_POINT}?${params}`;

    return fetch(url).then(res => res.json());
}

