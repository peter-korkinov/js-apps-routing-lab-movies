import { html } from "/src/lib.js";

import { register } from "../api/data.js";


const registerTemplate = (onSubmit) => html`
    <section id="form-sign-up">
        <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="post">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="">
            </div>

            <div class="form-group">
                <label for="repeatPassword">Repeat Password</label>
                <input id="repeatPassword" type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
            </div>

            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePassword = formData.get('repeatPassword').trim();

        if (password !== rePassword) {
            return alert('Passwords do not match');
        }

        await register(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/home');         
    }
}