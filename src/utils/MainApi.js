import { MOVIES_URL } from "./MoviesApi";
const none = 'none';

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка _getResponseData: ${res.status}`));
  }

  getMovies(jwt) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res));
  }

  deleteMovieFromSaved(jwt, movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
      .then((res) => this._getResponseData(res));
  }

  saveMovie(jwt, movie) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        country: movie.country ? movie.country : "",
        description: movie.description ? movie.description : "",
        image: movie.image.url ? MOVIES_URL + movie.image.url : movie.image,
        trailer: movie.trailer ? movie.trailer : movie.trailerLink,
        director: movie.director ? movie.director : "",
        duration: movie.duration ? movie.duration : "",
        year: movie.year ? movie.year : "",
        nameRU: movie.nameRU ? movie.nameRU : "",
        nameEN: movie.nameEN ? movie.nameEN : "",
        thumbnail: movie.thumbnail ? movie.thumbnail : MOVIES_URL + movie.image.formats.thumbnail.url,
        movieId: movie.id
      })
    })
      .then((res) => this._getResponseData(res));
  }

  getUserInfo(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => this._getResponseData(res));
  }

  toggleMovieSave(jwt, movie, movieId, isSaved) {
    return isSaved ? this.deleteMovieFromSaved(jwt, movieId) : this.saveMovie(jwt, movie);
  }

  updateUserInfo(jwt, email, name) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        email,
        name
      })
    })
      .then((res) => this._getResponseData(res));
  }
};
const mainApi = new MainApi({

  baseUrl: "https://api.avolk.ru"

  // baseUrl: "http://localhost:3000"
});

export default mainApi;
