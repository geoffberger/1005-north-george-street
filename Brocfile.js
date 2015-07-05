var pickFiles = require('broccoli-static-compiler'),
    mergeTrees = require('broccoli-merge-trees'),
    compileSass = require('broccoli-sass'),
    concat = require('broccoli-concat'),
    funnel = require('broccoli-funnel'),

    jsTree = concat(new mergeTrees(['node_modules', 'site']), {
      inputFiles: [
        'jquery/dist/jquery.min.js',
        'flexslider/jquery.flexslider.js',
        'js/*'
      ],
      outputFile: '/build/main.js'
    }),

    sassTree = compileSass(['site/scss', 'vendor/css', 'site/fontello/css', 'node_modules/normalize.css'], 'main.scss', 'build/main.css'),

    fontTree = pickFiles('site/fontello/font', {
      srcDir: '/',
      files: ['*'],
      destDir: '/font'
    }),

    siteTree = funnel('site');

module.exports = mergeTrees([jsTree, sassTree, fontTree, siteTree]);
