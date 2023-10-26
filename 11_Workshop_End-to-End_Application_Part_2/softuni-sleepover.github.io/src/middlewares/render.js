import { render } from '../lib/lit-html.js';

export function addRender(main, nav) {
    return function(ctx, next) {
        ctx.render = renderMain;
        ctx.renderNav = renderNav;

        next();
    };

    function renderMain(content) {
        render(content, main);
    }

    function renderNav(content) {
        render(content, nav);
    }
}
