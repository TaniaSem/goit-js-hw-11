import axios from 'axios';

export default async function fetchByQuery(query, page) {
  const API_KEY = '29563957-4f73ee18d6ec9b01780e978cb';
  const url = 'https://pixabay.com/api/';
  return await axios.get(
    `${url}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
}
