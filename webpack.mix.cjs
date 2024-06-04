let mix = require('laravel-mix');
const webpack = require("webpack");
const path = require("path");

mix
    .webpackConfig({
        plugins: [
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
            new webpack.DefinePlugin({
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
            }),
        ],
        resolve: {
            extensions: [".js", ".vue", ".json"],
            alias: {
                "@": path.resolve(__dirname, "resources/js/"),
            },
            fallback: {
                stream: require.resolve("stream-browserify"),
            },
        },
        stats: {
            children: true,
        },
    })
    .options({
        autoprefixer: { remove: false },
        cleanCss: { level: { 1: { specialComments: "none" } } },
        processCssUrls: false,
    })
    .js('resources/js/app.js', 'public/js')
    .sass("resources/sass/app.scss", "public/css")
    .vue({ version: 3 })
    .version()
    .sourceMaps(false);