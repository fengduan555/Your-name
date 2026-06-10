(function () {
  'use strict';

  /* ── Navbar scroll effect ── */
  var navbar = document.querySelector('.navbar');
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navbar && navLinks) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── Mobile menu toggle ── */
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── Active nav link based on current page ── */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var allLinks = document.querySelectorAll('.nav-links a');
  allLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll-triggered fade-in ── */
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) { observer.observe(el); });
  }

  /* ── Homepage parallax ── */
  var heroBg = document.querySelector('.hero-bg');
  var hint = document.querySelector('.hero-hint');

  if (heroBg && hint) {
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var moved = false;

    document.addEventListener('mousemove', function (e) {
      if (!moved) {
        moved = true;
        hint.style.opacity = '0';
      }
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;
      heroBg.style.transform = 'translate(' + (dx * -12) + 'px, ' + (dy * -12) + 'px)';
    });

    document.addEventListener('mouseleave', function () {
      heroBg.style.transform = 'translate(0, 0)';
    });

    window.addEventListener('resize', function () {
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
    });
  }

  /* ── Lightbox ── */
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }
})();
