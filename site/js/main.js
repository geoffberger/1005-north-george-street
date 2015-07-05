/* global jQuery */
(function($) {
  'use strict';

  var $dom = $('html, body');

  function removeJsBodyClassName() {
    $(document.body).removeClass('js');
  }

  function startSlideShows() {
    var $thumbnails = $('#thumbnails'),
        scrubControl = function(targetSelector, className) {
        $thumbnails
          .find(targetSelector)
          .addClass(className)
          .text('');
        };

    $thumbnails.flexslider({
      animation: 'slide',
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      itemWidth: Math.round($thumbnails.find('img').eq(0).outerWidth() + 4),
      asNavFor: '#slideshow'
    });

    $('#slideshow').flexslider({
      animation: 'slide',
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      directionNav: false,
      sync: '#thumbnails'
    });

    scrubControl('.flex-next', 'icon-right-open-big');
    scrubControl('.flex-prev', 'icon-left-open-big');
  }

  function scrollToOwnerSection() {
    var contactOwnerTop;

    $('#contact-owner-item').click(function(e) {
      e.preventDefault();

      if (!contactOwnerTop) {
        contactOwnerTop = $('#contact-owner').position().top;
      }

      $dom.animate({
        scrollTop: contactOwnerTop
      });
    });
  }

  function scrollToTop() {
    $('#top-link').click(function(e) {
      e.preventDefault();

      $dom.animate({
        scrollTop: 0
      });
    });
  }

  $(window).load(function() {
    removeJsBodyClassName();
    startSlideShows();
    scrollToOwnerSection();
    scrollToTop();
  });
}(jQuery));

