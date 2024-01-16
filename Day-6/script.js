document.addEventListener('DOMContentLoaded', getMovies);

async function getMovies() {
  const apiUrl = 'https://yts.mx/api/v2/list_movies.json?limit=8';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const movieGrid = document.getElementById('movieGrid');

    if (data && data.data && data.data.movies) {
      data.data.movies.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        movieGrid.appendChild(movieCard);
      });
    } else {
      console.error('Error fetching movie data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');

  const img = document.createElement('img');
  img.classList.add('movie-img');
  img.src = movie.medium_cover_image;
  img.alt = movie.title;

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const rating = document.createElement('div');
  rating.classList.add('overlay-item');
  rating.textContent = `Rating: ${movie.rating}`;

  const genres = document.createElement('div');
  genres.classList.add('overlay-item');
  genres.textContent = `Genres: ${movie.genres.join(', ')}`;

  const viewButton = document.createElement('button');
  viewButton.classList.add('overlay-item', 'view-button');
  viewButton.textContent = 'View Details';

  overlay.appendChild(rating);
  overlay.appendChild(genres);
  overlay.appendChild(viewButton);

  imgContainer.appendChild(img);
  imgContainer.appendChild(overlay);

  movieCard.appendChild(imgContainer);

  const title = document.createElement('div');
  title.classList.add('movie-title');
  title.textContent = movie.title;

  const year = document.createElement('div');
  year.classList.add('movie-year');
  year.textContent = movie.year;

  const resolution = document.createElement('div');
  resolution.classList.add('movie-resolution');
  resolution.textContent = `${movie.torrents
    .map((torrent) => `${torrent.quality} ${torrent.type}`)
    .join(', ')}`;

  movieCard.appendChild(title);
  movieCard.appendChild(year);
  movieCard.appendChild(resolution);

  return movieCard;
}
