import { getAllMovies } from "../api/data.js";
import { isLogged } from "../util.js";
import { html, until } from "/src/lib.js";


const catalogTemplate = (moviePromise) => html`
    <section id="home-page">
        <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
            <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
                class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px">
            <h1 class="display-4">Movies</h1>
            <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
        </div>

        <h1 class="text-center">Movies</h1>

        ${
        isLogged() ?
        html`
        <section id="add-movie-button">
            <a id="add-movie-page-button" href="/create" class="btn btn-warning ">Add Movie</a>
        </section>` :
        html`
        <section id="add-movie-button">
            <a id="add-movie-page-button" href="/login" class="btn btn-warning ">Add Movie</a>
        </section>`
        }

        <section id="movie">
            <div class=" mt-3 ">
                <div class="row d-flex d-wrap">

                    <div id="movies-catalog" class="card-deck d-flex justify-content-center">

                        ${until(moviePromise, html`<p>Loading &hellip;</p>`)}

                    </div>
                </div>
            </div>
        </section>

    </section>
`;

const movieCardTemplate = (movie) => html`
    <div class="card mb-4">
        <img class="card-img-top" src="${movie.img}"
            alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <a href=${`/details/${movie._id}`}>
                <button type="button" class="btn btn-info">Details</button>
            </a>
        </div>
    </div>
`;

function catalogPage(ctx) {     
    ctx.render(catalogTemplate(loadMovies()));
}

async function loadMovies() {
    const movies = await getAllMovies();
    return movies.map(movieCardTemplate);
}

export {
    catalogPage
}


// _createdOn: 1614935055353
// ​​
// _id: "1240549d-f0e0-497e-ab99-eb8f703713d7"
// ​​
// _ownerId: "847ec027-f659-4086-8032-5173e2f9c93a"
// ​​
// description: "Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Comes on the screens 2020."
// ​​
// img: "https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg"
// ​​
// title: "Black Widow"

// <div class="card mb-4">
//                         <img class="card-img-top" src="https://pbs.twimg.com/media/ETINgKwWAAAyA4r.jpg"
//                              alt="Card image cap" width="400">
//                         <div class="card-body">
//                             <h4 class="card-title">Wonder Woman 1984</h4>
//                         </div>
//                         <div class="card-footer">
//                             <a href="#/details/6lOxMFSMkML09wux6sAF">
//                                 <button type="button" class="btn btn-info">Details</button>
//                             </a>
//                         </div>

//                     </div>