/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Homepage card tilt interaction for desktop pointers
  $(document).ready(function() {
    if (!window.matchMedia('(any-hover: hover)').matches) {
      return;
    }

    var tiltSelector = '#header .check55, .interests .icon-box, .services .icon-box, .contact .info-box, .portfolio .portfolio-wrap, .projectpage';
    var cards = document.querySelectorAll(tiltSelector);
    if (!cards.length) {
      return;
    }

    cards.forEach(function(card) {
      if (card.dataset.tiltReady === 'true') {
        return;
      }

      card.dataset.tiltReady = 'true';
      card.classList.add('tilt-card');

      card.addEventListener('mousemove', function(event) {
        var rect = card.getBoundingClientRect();
        var px = (event.clientX - rect.left) / rect.width;
        var py = (event.clientY - rect.top) / rect.height;
        var rotateY = (px - 0.5) * 10;
        var rotateX = (0.5 - py) * 10;
        var shiftX = (px - 0.5) * 3;
        var shiftY = (py - 0.5) * 4;

        card.style.setProperty('--mx', (px * 100).toFixed(2) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(2) + '%');
        card.style.transform = 'perspective(900px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translate3d(' + shiftX.toFixed(2) + 'px, ' + shiftY.toFixed(2) + 'px, 10px)';
      });

      card.addEventListener('mouseenter', function() {
        card.classList.add('is-tilting');
      });

      card.addEventListener('mouseleave', function() {
        card.classList.remove('is-tilting');
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
      });
    });
  });

})(jQuery);

// Mobile nav guidance tooltip: show once on mobile after 2s
(function() {
  function showMobileNavTip() {
    try {
      var forceShow = /([?&])showTip=1(&|$)/.test(location.search) || location.hash === '#showTip';
      if (localStorage.getItem('mobileMenuTipShown') && !forceShow) return;
      var btn = document.querySelector('.mobile-nav-toggle');
      if (!btn) return;
      var tip = document.createElement('div');
      tip.className = 'mobile-nav-tip';
      tip.innerHTML = 'Tap here for menu <span class="arrow">›</span>';
      document.body.appendChild(tip);

      // Position tip relative to button (recompute after it's in DOM)
      var rect = btn.getBoundingClientRect();
      var tipRect = tip.getBoundingClientRect();
      // default place to the left of button
      var left = rect.left - tipRect.width - 12;
      // if it would go off-screen, place to the right
      if (left < 8) left = rect.left + rect.width + 8;
      // clamp right edge
      var maxLeft = Math.max(8, window.innerWidth - tipRect.width - 8);
      if (left > maxLeft) left = maxLeft;
      tip.style.top = (rect.top + rect.height + 8) + 'px';
      tip.style.left = left + 'px';

      // animate in
      requestAnimationFrame(function() { tip.classList.add('visible'); });

      // hide on click or when mobile menu toggles
      var hide = function() {
        if (!tip) return;
        tip.classList.remove('visible');
        setTimeout(function() { tip && tip.remove(); }, 260);
        localStorage.setItem('mobileMenuTipShown', '1');
        btn.removeEventListener('click', hide);
      };

      // debug log
      if (forceShow) console.info('mobile-nav-tip: forceShow enabled');

      tip.addEventListener('click', function() { btn.click(); hide(); });
      btn.addEventListener('click', hide);

      // auto hide after 5s
      setTimeout(hide, 5000);
    } catch (e) {
      console.error('mobile nav tip error', e);
    }
  }

  // show after delay if on small screen
  window.addEventListener('load', function() {
    setTimeout(function() {
      if (window.innerWidth < 992) showMobileNavTip();
    }, 2000);
  });
})();