/* global jQuery */
(function($) {
  'use strict';

  var $dom = $('html, body');

  function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
      return true;
    }
  }

  function replaceTelephone() {
    if (isMobile()) {
      var $homeTel = $('#home-tel');
      var telNumber = $('<div/>').text($homeTel.data('tel-number')).text();
      $homeTel.wrapInner('<a href="tel:' + telNumber + '"/>');
    }
  }

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

  function loadGoogleMap() {
    var mapEl = document.getElementById('map'),
        iframe = document.createElement('iframe');

    iframe.frameborder = 0;
    iframe.allowfullscreen = true;
    iframe.src = mapEl.getAttribute('data-iframe-src');
    iframe.width = mapEl.getAttribute('data-iframe-width');
    iframe.height = mapEl.getAttribute('data-iframe-height');
    iframe.setAttribute('style', 'border: 0;');
    mapEl.appendChild(iframe);
  }

  $(window).load(function() {
    replaceTelephone();
    removeJsBodyClassName();
    startSlideShows();
    scrollToOwnerSection();
    scrollToTop();
    loadGoogleMap();
  });
}(jQuery));

