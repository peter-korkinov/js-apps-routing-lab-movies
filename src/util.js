import { deleteMovieById, getMovieById } from "./api/data.js";

function getUserData() {
    // if (isLogged()) {
    //   const userData = JSON.parse(localStorage.getItem('userData'));
  
    //   return {
    //     id: () => userData._id,
    //     email: () => userData.email,
    //     token: () => userData.token
    //   }
    // }
    // return 0;

    return JSON.parse(sessionStorage.getItem('userData'));
}

function setUserdata(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

function clearUserData() {
    sessionStorage.removeItem('userData');
}

function isLogged() {
    return !(sessionStorage.getItem('userData') == null);
}

async function loadMovie(ctx, next) {
    const moviePromise = getMovieById(ctx.params.id);
    ctx.moviePromise = moviePromise;
    next();
}

async function deleteMovie(ctx) {
    await deleteMovieById(ctx.params.id);
    ctx.page.redirect('/home');
}

export {
    getUserData,
    setUserdata,
    clearUserData,
    isLogged,
    loadMovie,
    deleteMovie
};