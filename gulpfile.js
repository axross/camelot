'use strict';

const autoprefixer = require('autoprefixer');
const csswring = require('csswring');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;

const environment = process.env.NODE_ENV;
let isWatching = false;

gulp.task('bundle:css', () => {
  gulp.src('./src/client/bootstrap.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(postcss([
      autoprefixer({ browsers: ['iOS >= 8', 'Android >= 4.0'] }),
      csswring,
    ]))
    .pipe(rename('bundle.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public'));
});

gulp.task('bundle:js', () => {
  gulp.src('./src/client/bootstrap.js')
    .pipe(named())
    .pipe(webpack({
      output: {
        filename: 'bundle.js',
      },
      devtool: 'source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.json$/, loader: 'json-loader' },
        ],
      },
      plugins: environment === 'production' ? [
        new EnvironmentPlugin(['NODE_ENV']),
        new UglifyJsPlugin({
          compress: { warnings: false },
          minimize: true,
          outputs: { comments: false },
        }),
      ] : [
        new EnvironmentPlugin(['NODE_ENV']),
      ],
      watch: isWatching,
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('bundle:js-lib', () => {
  gulp.src('./src/client/lib.js')
    .pipe(named())
    .pipe(webpack({
      devtool: 'source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.json$/, loader: 'json-loader' },
        ],
      },
      plugins: [
        new EnvironmentPlugin(['NODE_ENV']),
        new UglifyJsPlugin({
          compress: { warnings: false },
          minimize: true,
          outputs: { comments: false },
        }),
      ],
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('turnon-watching', () => { isWatching = true; });
gulp.task('bundle', [
  'bundle:js',
  'bundle:js-lib',
  'bundle:css',
]);
gulp.task('bundle-watch', ['turnon-watching', 'bundle'], () => {
  gulp.watch(['./src/client/**/*.styl'], ['bundle:css']);
});
