/* global jQuery */
/* jshint browser: true */

(function($, undefined) {
  'use strict';

  $(document).ready(function() {
    $('html').removeClass('no-js');
  });

  /* @FIXME: Pre examples (hack)
   * ---------------------------
   *  Converte gli esempi markdown / html e crea un div "collapsible"
   *  per mostrare / nascondere il codice
   */
  $('pre').each(function doExample() {
    doExample.count = doExample.count ? doExample.count + 1 : 1;
    var id = 'code-collapse-' + doExample.count,
      showLinkTextOpen = 'Mostra il codice',
      showLinkTextClose = 'Nascondi il codice',
      $showLink = $('<a class="lg-example-toggle btn btn-primary" role="button" data-toggle="collapse" href="#' + id + '" ' +
        ' aria-expanded="false" aria-controls="' + id + '">' + showLinkTextOpen + '</a>');

    $(this)
      .before('<div class="lg-example-result">' + $(this).text() + '</div>')
      .before($showLink)
      .wrap('<div class="lg-example-code collapse" id="' + id + '"></div>');

    $showLink.on('click', function() {
      $(this).text($(this).text() === showLinkTextOpen ? showLinkTextClose : showLinkTextOpen);
    });
  });

  /* Offcanvas menu */

  $(document).ready(function() {
    $('[data-toggle="offcanvas"]').click(function(e) {
      e.preventDefault();
      $('.row-offcanvas').toggleClass('active');
      $(this).toggleClass('active');
    });
  });

  $(document).ready(function() {
    $('.row-offcanvas').click(function(e) {
      if ($(e.target).hasClass('row-offcanvas') && $(this).is('.active')) {
        $(this).removeClass('active');
      }
    });
  });

  $(document).keyup(function(e) {
    // Bind key esc
    if (e.which === 27) {
      $('[data-toggle="offcanvas"]').click().focus();
    }
  });


  /* Skiplink */

  jQuery(document).ready(function($) {
    $('.skiplink a').on({
      'focus': function() {
        $('.skiplink')
          .removeClass('sr-only')
          .addClass('skiplink--focused');
      },
      'blur': function() {
        $('.skiplink')
          .addClass('sr-only')
          .removeClass('skiplink--focused');
      }
    });
  });

  /* End Skiplink */
  /* Code highlight */

  //  $(document).ready(function () {
  //    // code highlight with prismjs
  //    $('pre').addClass('language-markup');
  //    Prism.highlightAll();
  //  });

  /* Palette examples */

  $(document).ready(function() {
    var tohex = function(x) {
      return ('0' + parseInt(x).toString(16)).slice(-2);
    };

    var rgb2hex = function(rgb) {
      if (/^#/.test(rgb)) {
        return rgb;
      }
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return '#' + tohex(rgb[1]) + tohex(rgb[2]) + tohex(rgb[3]);
    };

    $('.palette-example > *').each(function() {
      var color = rgb2hex($(this).css('color'));
      $(this)
        .wrapInner('<span class="lg-color-example-text"></span>')
        .append(' <span class="lg-color-example-text">' + color + '</span>')
        .prepend('<span class="lg-color-example" style="background:' + color + '"></span>');
    });
  });

  $('article > p > img, .lg-showcase > img').on('click', function() {
    $('<img class="lg-modal modal fade" src="' + $(this).attr('src') + '">').modal('show');
  });

  /* Cookie law */

  /*$(document).ready(function() {
    $.cookieBar({
      fixed: true,
      bottom: true,
      message: $('.cookie-message').text(),
      acceptButton: true,
      acceptText: 'Ok',
      policyButton: true,
      policyText: 'Privacy Policy',
      policyURL: '/linee-guida/privacy-policy',
      acceptOnContinue: true,
      acceptOnScroll: 200,
      acceptFunction: location.reload
    });
  });*/

  /* Scripts Functions */

  // Avoid `console` errors in browsers that lack a console.
  (function() {
    var method;
    var noop = function() {};
    var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
      method = methods[length];

      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
  }());

  /* Modernizr Image SVG Fallback PNG */

  //if(!Modernizr.svg) {
  //    $('img[src*="svg"]').attr('src', function() {
  //        return $(this).attr('src').replace('.svg', '.png');
  //    });
  //}

  if (!document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1')) {
    $('img[src*="svg"]').attr('src', function() {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }

  /* Next / prev links */

  /*$(function() {
    var sibl = {},
      cur = null;
    $('.navmenu li').each(function(i, el) {
      var $l = $(el).find('> a').eq('0');
      if (window.location.pathname.replace(/\/$/, '') === $l.attr('href').replace(/\/$/, '')) {
        cur = i;
      }
      sibl[i] = $l;
    });

    if (cur) {
      var $links = $('<div class="row nextPrev"></div>').appendTo('article');

      var prev = sibl[cur - 1],
        next = sibl[cur + 1];

      if (prev && $(prev).attr('href')[0] === '#') {
        prev = sibl[cur - 2];
      }
      if (next && $(next).attr('href')[0] === '#') {
        next = sibl[cur + 2];
      }

      if (prev && !$(prev).attr('class')) {
        $('<div class="col-md-6 nextPrev-prev"></div>')
          .append(' <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>')
          .append($(prev).clone())
          .appendTo($links);
      } else {
        $links.append('<div class="col-md-6"></div>');
      }

      if (next) {
        $('<div class="col-md-6 nextPrev-next"></div>')
          .append($(next).clone())
          .appendTo($links)
          .append(' <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>');
      } else {
        $links.append('<div class="col-md-6"></div>');
      }
    }
  });*/

  /* Scroll to top button */

  $(function() {
    $('.scrollto_top').bind('click', function(event) {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - $('.navbar').height() - 200
      }, 500);
      event.preventDefault();
    });
  });

  /* Sticky navbar */

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 80) {
      $('.scrollto_top').removeClass('sr-only');
      $('.navbar').addClass('navbar--small');
      $('.nav-banner').addClass('nav-banner--small');
    } else {
      $('.nav-banner').removeClass('nav-banner--small');
      $('.navbar').removeClass('navbar--small');
      $('.scrollto_top').addClass('sr-only');
    }
  });

  /* Navigation menu */

  $(function() {

    /* iterate through nested list */

    $('.navmenu ul').each(function() {
      var listItem = $(this).closest('li');
      var itemLink = listItem.find('> a');
      var title = 'Espandi il menu ' + $.trim(itemLink.text());
      var trigger = $('<span></span>').attr({
        tabindex: 0,
        'aria-label': title,
        'title': title,
      });

      $(listItem).find('[href^=#]')
        .add(trigger)
        .on('click', function(ev) {
          var node = $(this).is('a') ? $(this) : $(this).closest('a');

          /* Clear all open and not nested element  */
          if (!$(this).closest('li.open').length) {
            $('.navmenu ul').slideUp(300);
            $('.navmenu li').removeClass('open');
          }

          if (node.siblings('ul').is(':visible')) {
            node.siblings('ul').slideUp(300);
            node.parent().removeClass('open');
          } else {
            node.siblings('ul').slideDown(300);
            node.parent().addClass('open');
          }
          return false;
        })
        .on('keydown', function(e) {
          if (e.which === 13 || e.which === 32) {
            $(this).click();
            return false;
          }
        });

      itemLink.append(trigger);
    });

    /* Get current element and set their ancestors as active */

    $('.navmenu a[href=\'' + window.location.pathname + '\'], ' +
        '.navmenu a[href=\'' + window.location.pathname.slice(0, -1) + '\']')
      .addClass('current');

    $('.navmenu .current').parents().filter(function(index) {
      return (this.nodeName === 'LI');
    }).addClass('active open');

  });

  /* Fix issues with <base> tag */
  $('[href^=#]').on('click', function(e) {
    document.location.hash = $(this).attr('href');
    e.preventDefault();
  });

})(jQuery);
