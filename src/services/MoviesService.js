class MoviesService {
  constructor() {
    this.apiBase = 'https://api.themoviedb.org/3';
    this.apiMovie = '/search/movie';
    this.apiGenres = '/genre/movie/list';
    this.apiGuestSession = '/authentication/guest_session/new';
    this.apiKey = 'api_key=2cc18ce7a3c09a8400d9c07212f86c7e';
  }

  getResource = async (url, option) => {
    const res = await fetch(`${this.apiBase}${url}`, option);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  };

  getMovies = async (text, page = 1) =>
    this.getResource(
      `${this.apiMovie}?${this.apiKey}&query=${text}&page=${page}`
    );

  getGenres = async () => this.getResource(`${this.apiGenres}?${this.apiKey}`);

  createGuestSession = async () =>
    this.getResource(`${this.apiGuestSession}?${this.apiKey}`);

  rateMovie = async (movieId, guestId, rate) =>
    this.getResource(
      `/movie/${movieId}/rating?${this.apiKey}&guest_session_id=${guestId}`,
      {
        method: 'POST',
        body: JSON.stringify({ value: rate }),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    );

  getRatedMovies = async (guestId, page = 1) =>
    this.getResource(
      `/guest_session/${guestId}/rated/movies?${this.apiKey}&page=${page}`
    );
}

export default MoviesService;
