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
    return res;
  }

  async getMovies(text, page = 1) {
    const res = await this.getResource(
      this.apiMovie,
      `&query=${text}&page=${page}`
    );
    if (!res.ok)
      throw new Error(`Could not get a list of movies, received ${res.status}`);

    return res.json();
  }

  async getGenres() {
    const res = await this.getResource(this.apiGenres);
    if (!res.ok) {
      throw new Error(`Could not get genres, received ${res.status}`);
    }
    return res.json();
  }

  async createGuestSession() {
    const res = await this.getResource(this.apiGuestSession);
    if (!res.ok)
      throw new Error(`Could not create Guest Session, received ${res.status}`);

    return res.json();
  }

  async rateMovie(movieId, guestId, rate) {
    const body = {
      value: rate,
    };
    await fetch(
      `${this.apiBase}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      }
    ).catch((e) => `Could not get genres, received ${e.status}`);
  }

  async getRatedMovies(guestId, page = 1) {
    const res = await fetch(
      `${this.apiBase}/guest_session/${guestId}/rated/movies?api_key=${this.apiKey}&page=${page}`
    );
    if (!res.ok) {
      throw new Error(`Could not get rated movies, received ${res.status}`);
    }
    return res.json();
  }
}

export default MoviesService;
