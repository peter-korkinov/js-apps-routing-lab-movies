import { getUserData } from "/src/util.js";
import { page, render } from "/src/lib.js";

import { catalogPage } from "/src/views/catalog.js";
import { detailsPage } from "./views/details.js";
import { createPage } from "/src/views/create.js";
import { editPage } from "/src/views/edit.js";
import { loginPage } from "/src/views/login.js";
import { registerPage } from "/src/views/register.js";
import { logout, postLike } from "./api/data.js";
import { deleteMovie, loadMovie } from "./util.js";


const root = document.querySelector('main');
document.getElementById('nav-logout').addEventListener('click', onLogout);

page(decorateContext)
page('/home', catalogPage);
page('/details/:id', loadMovie, detailsPage);
page('/create', createPage);
page('/edit/:id', loadMovie, editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/delete/:id', deleteMovie);
page('/like/:id', postLike);
page('/', '/home')

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('welcome-msg').textContent = `Welcome, ${userData.email}`;
        [...document.querySelectorAll('nav .user')].forEach(e => e.style.display = 'inline-block');
        [...document.querySelectorAll('nav .guest')].forEach(e => e.style.display = 'none');
    } else {
        [...document.querySelectorAll('nav .user')].forEach(e => e.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(e => e.style.display = 'inline-block');
    }
}

async function onLogout() {
    await logout();
    updateUserNav();
    page('/home');
}



// // create placeholder modules for every view
// // configure and test nav
// // implement modules
// // - create async funcs
// // - implement DOM logic

// // order of views:
// // - catalog (home)
// // - login/register
// // - create
// // - details
// // - edit
// // - delete

// import {showHome} from "./views/home.js";
// import {showDetails} from "./views/details.js";
// import {showEdit} from "./views/edit.js";
// import {showLogin} from "./views/login.js";
// import {showRegister} from "./views/register.js";
// import {userInfo, isLogged} from "./dom.js";
// import {logout} from "./api/data.js";

// document.querySelector('nav').addEventListener('click', onNavigate);

// const navLogout = document.getElementById('nav-logout')
// const navWelcomeMsg = document.getElementById('welcome-msg')
// const navLogin = document.getElementById('nav-login')
// const navRegister = document.getElementById('nav-register')

// const views = {
//   'nav-home': showHome,
//   'nav-logout': onLogout,
//   'nav-login': showLogin,
//   'nav-register': showRegister,
// }

// showHome();
// loggedOrGuestView();

// function onNavigate(event) {
//     const view = views[event.target.id];
//     if (typeof view === 'function') {
//       event.preventDefault();
//       view();
//     }
// }

// export function loggedOrGuestView() {
//   if (isLogged()) {
//     navWelcomeMsg.textContent = `Welcome, ${userInfo().email()}`;

//     navWelcomeMsg.style.display = '';
//     navLogout.style.display = '';
//     navLogin.style.display = 'none';
//     navRegister.style.display = 'none';

//     document.getElementById('add-movie-page-button').style.display = '';
//   } else {
//     navWelcomeMsg.style.display = 'none';
//     navLogout.style.display = 'none';
//     navLogin.style.display = '';
//     navRegister.style.display = '';

//     document.getElementById('add-movie-page-button').style.display = 'none';
//   }
// }

// async function onLogout() {
//     await logout();
//     loggedOrGuestView();
//     showLogin();
// }