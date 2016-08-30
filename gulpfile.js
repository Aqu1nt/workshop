var elixir = require("laravel-elixir");
require("laravel-elixir-livereload");

elixir(function(mix){

    // Babel configuration
    var config = elixir.config.js.browserify.transformers.find(transformer => transformer.name === 'babelify');
    // config.options.plugins = ["babel-plugin-transform-decorators-legacy"];
    config.options.presets = ["es2015", "stage-2"];

    mix.browserify('./src/js/Workshop.js');

    mix.sass('./src/sass/workshop.scss', undefined, undefined, {
        includePaths : ['node_modules']
    });

    mix.copy('./src/html', './public');

    mix.livereload();
});