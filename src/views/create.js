import { createMovie } from "../api/data.js";
import { html } from "/src/lib.js";


const createTemplate = (onCreate) => html`
    <section id="add-movie">
        <form @submit=${onCreate} class="text-center border border-light p-5" action="#" method="">
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input id="title" type="text" class="form-control" placeholder="Title" name="title" value="">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </section>
`;

export function createPage(ctx) {
    ctx.render(createTemplate(onCreate));

    async function onCreate(event) {
        event.preventDefault();
    
        const formData = new FormData(event.target);
    
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const img = formData.get('imageUrl');
    
        if (title === '' || description ==='' || img === '') {
            return alert('All fields are required!');
        }
    
        const newMovie = await createMovie({title, description, img});
        ctx.page.redirect(`/details/${newMovie._id}`);
    }
}

