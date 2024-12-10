export function renderImages(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <a href="${largeImageURL}" class="gallery-item" title="${tags}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy">
            <div class="info">
                <p><b>Likes:</b> ${likes}</p>
                <p><b>Views:</b> ${views}</p>
                <p><b>Comments:</b> ${comments}</p>
                <p><b>Downloads:</b> ${downloads}</p>
            </div>
        </a>
    `
    )
    .join('');
}

export function clearGallery(container) {
  container.innerHTML = '';
}

export function toggleLoader(loader, isLoading) {
  loader.style.display = isLoading ? 'block' : 'none';
}
