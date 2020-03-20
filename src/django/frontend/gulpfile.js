// -----------------------------------------------
// Global Variables:
// -----------------------------------------------
// Project dependencies.
let gulp = require("gulp");

let autoprefixer = require("autoprefixer"),
    browserSync = require("browser-sync").create(),
    chalk = require("chalk"),
    clean = require("gulp-clean"),
    cssnano = require("cssnano"),
    environments = require("gulp-environments"),
    filter = require("gulp-filter"),
    imagemin = require("gulp-imagemin"),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    sass = require("gulp-sass"),
    sassLint = require("gulp-sass-lint"),
    sourcemaps = require("gulp-sourcemaps"),
    webp = require("gulp-webp"),
    webpack = require("webpack-stream");

// Configuration files.
let gulpConfig, webpackConfig;

// -----------------------------------------------
// Set Environment Variables
// -----------------------------------------------
const development = environments.development,
    production = environments.production;

// Sets the working environment to be development.
gulp.task("set-dev-node-env", callback => {
    environments.current(development);

    callback();
});

// Sets the working environment to be production.
gulp.task("set-prod-node-env", callback => {
    environments.current(production);

    callback();
});

// -----------------------------------------------
// Worker Tasks:
// -----------------------------------------------
// Begins a browser sync stream, which automatically refreshes a proxy on file change.
gulp.task("browser-sync", () => {
    browserSync.init({
        proxy: {
            target: gulpConfig.proxyUrl
        }
    });
});

// Removes all files from the distribution folder.
gulp.task("clean", () => {
    return gulp
        .src(gulpConfig.dirs.dist.root, {
            allowEmpty: true,
            read: false
        })
        .pipe(clean());
});

// Optimises all image assets and generates out our WEBP variants.
gulp.task("images", () => {
    return gulp
        .src(gulpConfig.dirs.src.images)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(imagemin())
        .pipe(gulp.dest(gulpConfig.dirs.dist.images))
        .pipe(webp())
        .pipe(gulp.dest(gulpConfig.dirs.dist.images))
        .pipe(development(browserSync.stream()));
});

// Compiles the project's Sass files into their CSS equivalents.
gulp.task("sass", () => {
    const plugins = [autoprefixer(gulpConfig.autoprefixer), cssnano()];

    return (
        gulp
            .src(gulpConfig.dirs.src.scss)
            .pipe(
                sassLint({
                    configFile: "./configs/sass-lint.json"
                })
            )
            .pipe(sassLint.format())
            .pipe(plumber({ errorHandler: onError }))
            .pipe(sass(gulpConfig.sass).on("error", sass.logError))
            .pipe(development(sourcemaps.init()))
            .pipe(postcss(plugins))
            .pipe(development(sourcemaps.write("./maps")))
            .pipe(gulp.dest(gulpConfig.dirs.dist.css))
            // filter out things like map as these will trigger a page refresh.
            .pipe(filter(["**/*.css"]))
            .pipe(development(browserSync.stream()))
    );
});

// Initialises Webpack to build out our JavaScript files.
gulp.task("webpack", () => {
    // If we're building for development, also include source maps.
    if (development()) {
        webpackConfig.watch = true;
        webpackConfig.devtool = "inline-source-map";
    }

    return gulp
        .src(gulpConfig.entry_point)
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(gulpConfig.dirs.dist.javascript))
        .pipe(development(browserSync.stream()));
});

// -----------------------------------------------
// Watcher Tasks:
// -----------------------------------------------
// Watches for any changes made to our static files.
gulp.task(
    "watch",
    gulp.series("images", () => {
        gulp.watch(
            gulpConfig.dirs.watch.images,
            { cwd: "./" },
            gulp.parallel("images")
        );
        gulp.watch(
            gulpConfig.dirs.watch.scss,
            { cwd: "./" },
            gulp.parallel("sass")
        );
    })
);

// -----------------------------------------------
// Grouped Tasks:
// -----------------------------------------------
// Runs the development build tasks.
gulp.task(
    "dev",
    gulp.series(
        "set-dev-node-env",
        "clean",
        gulp.parallel("webpack", "sass", "watch", "browser-sync")
    ),
    callback => {
        callback();
    }
);

// Runs the production build tasks.
gulp.task(
    "dist",
    gulp.series(
        "set-prod-node-env",
        "clean",
        gulp.parallel("webpack", "public", "sass", "images")
    ),
    callback => {
        callback();
    }
);

// Default set of tasks to run when no argument is specified.
gulp.task("default", gulp.parallel("dev"), callback => {
    callback();
});

// -----------------------------------------------
// Error Handling:
// -----------------------------------------------
// Handles any errors which are raised during a task. If we're in production mode break from the process, otherwise try
// and continue.
let onError = error => {
    console.log("Error encountered", error, development());

    if (development()) {
        console.error(
            chalk.white.bgRed.bold(error.plugin + " : " + error.message)
        );

        this.emit("end");
    } else {
        process.exit(1);
    }
};
