import { logout } from '../api/userService.js';

export const logoutView = async ctx => {
  await logout();
  ctx.page.redirect('/catalog');
};
