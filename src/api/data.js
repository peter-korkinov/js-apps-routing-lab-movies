import * as api from './api.js';


const login = api.login;
const register = api.register;
const logout = api.logout;

const endpoints = {
  movies: '/data/movies/',
  likes: '/data/likes'
};

async function getAllMovies() {
  return api.get(endpoints.movies);
}

async function getMovieById(id) {
  return api.get(endpoints.movies + id);
}

async function getLikes(movieId) {
  return api.get(endpoints.likes + `?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
}

async function createMovie(data) {
  return api.post(endpoints.movies, data);
}

async function editMovie(id, data) {
  return api.put(endpoints.movies + id, data);
}

async function postLike(ctx) {
  return api.post(endpoints.likes, ctx.id);
}

async function deleteMovieById(id) {
  return api.del(endpoints.movies + id);
}

async function isUserlikedMovie() {

}

export {
  login,
  register,
  logout,
  getMovieById,
  getAllMovies,
  getLikes,
  createMovie,
  editMovie,
  postLike,
  deleteMovieById
}