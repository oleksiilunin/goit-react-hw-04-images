import axios from 'axios';

import { API_KEY, BASE_URL } from '../helpers/pixabayOptions';

export const getImages = async (searchQuery, page = 1) => {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 20,
    },
  });
};
