const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47417091-7b1b728bfc28f8d5b77701890';

export const fetchImages = async (query, page = 1, perPage = 15) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
