class MoviesService {
  constructor() {
    this.apiBase =
      'https://api.themoviedb.org/3/search/movie?api_key=2cc18ce7a3c09a8400d9c07212f86c7e';
  }

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }

  getMoviesBySearch() {
    return this.getResource('&query=return');
  }
}

export default MoviesService;
