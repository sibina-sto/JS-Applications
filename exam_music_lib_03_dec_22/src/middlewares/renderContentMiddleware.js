import { render } from '../../node_modules/lit-html/lit-html.js';

export const addRender = (main, nav) => {
  return (ctx, next) => {
    ctx.renderContent = view => render(view, main);
    ctx.renderNav = template => render(template, nav);
    next();
  };
};
