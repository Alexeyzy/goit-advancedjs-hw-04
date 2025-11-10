import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '53124504-9ef9dc7d083288085c55b9d9d';
const PER_PAGE = 15;

export async function fetchPhotosByQuery(query, page = 1) {
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
