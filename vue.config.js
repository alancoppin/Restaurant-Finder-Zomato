module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                @import "@/assets/scss/_variables.scss";
                `
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/'
};