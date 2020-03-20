// Third party.
let environments = require("gulp-environments"),
    ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin"),
    modernizr = require("modernizr-webpack-plugin"),
    path = require("path"),
    uglify = require("uglifyjs-webpack-plugin"),
    webpack = require("webpack");

// Environment variables.
let development = environments.development,
    production = environments.production;

// Configuration files.
let gulpConfig = require("configs/gulp.js"),
    modernizrConfig = require(path.resolve("configs/modernizr.js"));

// Misc variables.
let nodeModulesAbsPath = path.resolve(gulpConfig.dirs.src.node_modules);

// -----------------------------------------------
// Webpack Configuration:
// -----------------------------------------------
module.exports = {
    watch: false,
    entry: {
        app: [
            "axios",
            "bootstrap",
            "react",
            "react-dom",
            "react-router",
            "redux",
            gulpConfig.entry_point
        ],
        head: "jquery"
    },
    output: {
        filename: "[name].js"
    },

    mode: production() ? "production" : "development",
    module: {
        rules: [
            {
                test: require.resolve("jquery"),
                use: [
                    {
                        loader: "expose-loader",
                        options: "jQuery"
                    },
                    {
                        loader: "expose-loader",
                        options: "$"
                    },
                    {
                        loader: "expose-loader",
                        options: "window.jQuery"
                    }
                ]
            },
            {
                test: [/\.ts(x?)$/, /\.js(x?)$/],
                exclude: [
                    /node_modules\/(?!(swiper|dom7)\/).*/,
                    /\.test\.jsx?$/
                ],
                use: [
                    {
                        loader: "babel-loader",
                        query: {
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-numeric-separator",
                                "@babel/plugin-proposal-object-rest-spread"
                            ],
                            presets: [
                                [
                                    "@babel/env",
                                    {
                                        corejs: 2,
                                        useBuiltIns: "entry"
                                    }
                                ],
                                "@babel/react",
                                "@babel/typescript"
                            ]
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin({
            reportFiles: ["src/scripts/**/*"]
        }),
        new modernizr(modernizrConfig),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new webpack.LoaderOptionsPlugin({
            debug: development()
        })
    ],

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [path.resolve("src/scripts/"), nodeModulesAbsPath]
    },

    optimization: {
        minimizer: [
            new uglify({
                uglifyOptions: {
                    compress: {
                        collapse_vars: false,
                        drop_console: true
                    }
                }
            })
        ]
    },

    node: { fs: "empty" },

    stats: {
        // Configure the console output.
        chunks: true,
        chunkModules: true,
        colors: true,
        modules: true,
        reasons: true
    }
};
