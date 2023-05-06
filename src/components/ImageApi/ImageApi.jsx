import axios from 'axios';

export async function ImageApi(inputData, page) {
  const searchParams = new URLSearchParams({
    key: '34462285-f3aa452bcf3fe96828154a0a7',
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  return images.data;
}
