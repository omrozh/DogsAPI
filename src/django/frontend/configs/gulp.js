// -----------------------------------------------
// Gulp Configuration:
// -----------------------------------------------
module.exports = {
    dirs: {
        dist: {
            root: "dist/",
            css: "dist/css/",
            images: "dist/images/",
            javascript: "dist/scripts/"
        },
        src: {
            root: "src/",
            images: 'src/images/bmw/uk/**/*',
            javascript: 'src/scripts/bmw/uk/',
            node_modules: "node_modules/"
            scss: 'src/styles/bmw/uk/**/*.scss',
        },
        watch: {
            images: "src/images/",
            scss: "src/styles/**/*.scss"
        }
    },

    entry_point: './src/scripts/app.jsx',

    // Options.
    autoprefixer: {},
    proxyUrl: "http://localhost:8000/",
    sass: {
        outputStyle: "compressed",
        errLogToConsole: true,
        precision: 5,
        includePaths: ["./node_modules/"],
        sourceComments: "map",
        sourceMap: "sass"
    },
    svgs: {
        inlineHtmlDest: "templates/partials"
    }
};
