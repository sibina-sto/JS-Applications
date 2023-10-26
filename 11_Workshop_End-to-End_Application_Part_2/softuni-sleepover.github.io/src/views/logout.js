import { logout } from '../data/user.js';


export function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/');
}