

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  // let scrollTop = document.querySelector('.scroll-top');

  // function toggleScrollTop() {
  //   if (scrollTop) {
  //     window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  //   }
  // }
  // scrollTop.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // });

  // window.addEventListener('load', toggleScrollTop);
  // document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


//team script
// let currentSlide = 0;

// function showSlide(index) {
//     const slides = document.querySelectorAll('.slide');
//     const sliderContainer = document.querySelector('.slider-container');

//     if (!sliderContainer || slides.length === 0) {
//         return; // Exit function if elements are not found
//     }

//     if (index >= slides.length) {
//         currentSlide = 0;
//     } else if (index < 0) {
//         currentSlide = slides.length - 1;
//     } else {
//         currentSlide = index;
//     }

//     sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
// }

// function changeSlide(direction) {
//     showSlide(currentSlide + direction);
// }

// // Ensure the script runs only if the slider exists
// document.addEventListener("DOMContentLoaded", () => {
//     if (document.querySelector('.slider-container')) {
//         setInterval(() => {
//             changeSlide(1);
//         }, 4000);
//     }
// });

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const sliderContainer = document.querySelector('.slider-container');

    if (!sliderContainer || slides.length === 0) {
        return; // Exit function if elements are not found
    }

    if (index >= slides.length) {
        currentSlide = 0;
        // Make a smooth transition back to the first slide
        sliderContainer.style.transition = 'none'; // Disable transition for instant move
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        setTimeout(() => {
            // Enable transition again after a small delay
            sliderContainer.style.transition = 'transform 0.5s ease';
        }, 50); // Slight delay before the next transition starts
    } else if (index < 0) {
        currentSlide = slides.length - 1;
        sliderContainer.style.transition = 'none';
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        setTimeout(() => {
            sliderContainer.style.transition = 'transform 0.5s ease';
        }, 50);
    } else {
        currentSlide = index;
    }

    // Apply the transform for regular transitions
    if (index >= 0 && index < slides.length) {
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Ensure the script runs only if the slider exists
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('.slider-container')) {
        setInterval(() => {
            changeSlide(1);
        }, 4000);
    }
});






document.querySelectorAll('.ibox').forEach(box => {
  box.addEventListener('click', function() {
      let boxId = this.id;

      switch (boxId) {
          case "service-id1":
              window.location.href = "itservice";
              break;
          case "service-id2":
              window.location.href = "digitalm";
              break;
          case "service-id3":
              window.location.href = "data-scraping";
              break;
          case "service-id4":
              window.location.href = "video-editing";
              break;
          default:
              console.log("No matching ID found.");
      }
  });
});

const cookieBox = document.querySelector(".cookie_wrapper"),
  buttons = document.querySelectorAll(".button");

const executeCodes = () => {
  //if cookie contains technoprovince it will be returned and below of this code will not run
  if (document.cookie.includes("technoprovince")) return;
  cookieBox.classList.add("show");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      cookieBox.classList.remove("show");

      //if button has acceptBtn id
      if (button.id == "acceptBtn") {
        //set cookies for 1 month. 60 = 1 min, 60 = 1 hours, 24 = 1 day, 30 = 30 days
        document.cookie = "cookieBy= technoprovince; max-age=" + 60 * 60 * 24 * 30;
      }
    });
  });
};

//executeCodes function will be called on webpage load
window.addEventListener("load", executeCodes);



