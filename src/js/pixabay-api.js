export const fetchPhotosByQuery = query => {

  const searchParams = new URLSearchParams({
    key: '53124504-9ef9dc7d083288085c55b9d9d',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
