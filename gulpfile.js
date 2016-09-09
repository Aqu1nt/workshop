var elixir = require("laravel-elixir");
require("laravel-elixir-livereload");

elixir((mix) => {

    // Babel configuration
    var babelConfig = elixir.config.js.browserify.transformers.find(transformer => transformer.name === 'babelify');
    // config.options.plugins = ["babel-plugin-transform-decorators-legacy"];
    babelConfig.options.presets = ["es2015", "stage-2"];

    //Transpile JS
    mix.browserify('./src/js/Workshop.js', undefined, undefined, {
        packageCache : {},
        cache : {},
        debug : true
    });

    //Compile sass
    mix.sass('./src/sass/workshop.scss', undefined, undefined, {
        includePaths : ['node_modules']
    });

    //Copy html
    mix.copy('./src/html', './public');

    //Livereload
    mix.livereload();
});