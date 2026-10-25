/* =========================================================================
   Subway Menu, Decided. — shared script
   Runs on every page. Keep this framework-free and dependency-free so it
   works unmodified on GitHub Pages / Cloudflare Pages with no build step.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  highlightCurrentNavLink();
  initImageFallback();
  initHeroSearch();
});

/* ---------------------------------------------------------------------
   Mobile nav: toggles the dropdown panel that css/style.css hides/shows
   via the .topbar.nav-open class. Closes on outside click, on Escape,
   and whenever the viewport crosses back into desktop width.
   --------------------------------------------------------------------- */
function initMobileNav() {
  var toggle = document.querySelector('.nav-toggle');
  var topbar = document.querySelector('.topbar');
  if (!toggle || !topbar) return;

  function setOpen(open) {
    topbar.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!topbar.classList.contains('nav-open'));
  });

  document.addEventListener('click', function (e) {
    if (topbar.classList.contains('nav-open') && !topbar.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 880) setOpen(false);
  });
}

/* ---------------------------------------------------------------------
   Marks whichever nav link (desktop top-nav or mobile panel) points at
   the current page with a .current class, so css/style.css can style it.
   Matches on the link's pathname against the page's own pathname.
   --------------------------------------------------------------------- */
function highlightCurrentNavLink() {
  var here = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  var links = document.querySelectorAll('.top-nav a, .mobile-nav-panel a');
  links.forEach(function (link) {
    var target = link.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
    if (target === here && target !== '/' ) {
      link.classList.add('current');
    }
  });
}

/* ---------------------------------------------------------------------
   Broken-image fallback: item photos aren't uploaded yet on most pages.
   Rather than showing the browser's broken-image icon, this hides any
   <img> that fails to load so the layout stays clean until real photos
   are added at the paths those <img> tags already point to.
   --------------------------------------------------------------------- */
function initImageFallback() {
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
    }, { once: true });
  });
}

/* ---------------------------------------------------------------------
   Homepage search: the homepage has no item list of its own, so a search
   goes to the decision tool with the query in the URL. The tool reads
   that query and fills its own search box. No search button is left dead.
   --------------------------------------------------------------------- */
function initHeroSearch() {
  var box = document.querySelector('.hero-search');
  if (!box) return;
  var input = box.querySelector('input');
  var button = box.querySelector('button');
  if (!input || !button) return;
  function go() {
    var q = input.value.trim();
    if (!q) return;
    window.location.href = 'tool/?q=' + encodeURIComponent(q);
  }
  button.addEventListener('click', go);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') go();
  });
}
