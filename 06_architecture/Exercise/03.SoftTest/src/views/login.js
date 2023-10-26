import { login } from '../../user.js'
const section = document.getElementById("loginView");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit)

let ctx = null;

export function showLogin(context){
    ctx = context
    context.showSection(section);
}


async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(form);

    const {email, password} = Object.fromEntries(formData);
    await login(email, password);
    ctx.updateNavigate()
    ctx.goTo("/catalog")
}