import { editMovie } from "../api/data.js";
import { html, until } from "/src/lib.js";


const editTemplate = (moviePromise) => html`
    <section id="edit-movie">
        ${until(moviePromise, html`<p>Loading &hellip;</p>`)}
    </section>
`;

const formTemplate = (movie, onSubmit) => html`
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input id="title" type="text" class="form-control" placeholder="Movie Title" .value=${movie.title} name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description" .value=${movie.description}></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" .value=${movie.img} name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`;

export function editPage(ctx) {
    ctx.render(editTemplate(loadMovie(ctx, onSubmit)));

    
}

async function loadMovie(ctx, onSubmit) {
    const movie = await ctx.moviePromise;

    return formTemplate(movie, onSubmit);

    async function onSubmit(event) {
        event.preventDefault();
    
        const formData = new FormData(event.target);
    
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const img = formData.get('imageUrl');
    
        if (title === '' || description ==='' || img === '') {
            return alert('All fields are required!');
        }
    
        const newMovie = await editMovie(movie.id, {title, description, img});
        ctx.page.redirect(`/details/${newMovie._id}`);
    }    
}

