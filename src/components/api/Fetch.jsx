import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '35858642-7539d22feccd12b18f81f248c';

async function fetchImages(query, page) {
  const options = {
    params: {
      key: KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 12,
    },
  };

  const request = await axios.get(URL, options);
  return request;
}

export default fetchImages;
