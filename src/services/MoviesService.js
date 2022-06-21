class MoviesService {
  constructor() {
    this.apiBase = 'https://api.themoviedb.org/3';
    this.apiMovie = '/search/movie';
    this.apiGenres = '/genre/movie/list';
    this.apiGuestSession = '/authentication/guest_session/new';
    this.apiKey = '2cc18ce7a3c09a8400d9c07212f86c7e';
  }

  async getResource(type, url = '') {
    const res = await fetch(
      `${this.apiBase}${type}?api_key=${this.apiKey}${url}`
    );

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }

  getMovies(text, page = 1) {
    return this.getResource(this.apiMovie, `&query=${text}&page=${page}`);
  }

  async getGenres() {
    return this.getResource(this.apiGenres);
  }
}

export default MoviesService;
