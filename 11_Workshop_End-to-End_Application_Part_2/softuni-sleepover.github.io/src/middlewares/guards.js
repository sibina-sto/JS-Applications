export function hasUser() {
    return function (ctx, next) {
        if (!ctx.user) {
            ctx.page.redirect('/login');
        } else {
            next();
        }
    };
}

export function isOwner() {
    return function(ctx, next) {
        if (ctx.data?.owner?.objectId !== ctx.user?.objectId) {
            ctx.page.redirect('/login');
        } else {
            next();
        }
    };
}