var pickFiles = require('broccoli-static-compiler'),
    mergeTrees = require('broccoli-merge-trees'),
    compileSass = require('broccoli-sass'),
    concat = require('broccoli-concat'),
    uglify = require('broccoli-uglify-js'),
    funnel = require('broccoli-funnel'),

    jsConcat = concat(new mergeTrees(['node_modules', 'site']), {
      inputFiles: [
        'jquery/dist/jquery.js',
        'flexslider/jquery.flexslider.js',
        'js/*'
      ],
      outputFile: '/build/main.js'
    }),

    jsTree = uglify(jsConcat, {
      compress: true,
      mangle: true
    }),

    sassTree = compileSass(['site/scss', 'vendor/css', 'site/fontello/css', 'node_modules/normalize.css'], 'main.scss', 'build/main.css', {
      outputStyle: 'compressed',
      sourceComments: false
    }),

    fontTree = pickFiles('site/fontello/font', {
      srcDir: '/',
      files: ['*'],
      destDir: '/font'
    }),

    siteTree = funnel('site', {
      include: ['index.html', /^img/]
    }),

    trees = [sassTree, fontTree, siteTree, process.argv[2] === 'build' && process.argv[3] ? jsTree : jsConcat];

module.exports = mergeTrees(trees);
