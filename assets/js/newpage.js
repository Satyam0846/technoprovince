document.addEventListener('DOMContentLoaded', function() {
    
    


    // scraping-testimonial slider
    const testimonialTrack = document.querySelector('.scraping-testimonial-track');
    const testimonials = document.querySelectorAll('.scraping-testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-scraping-testimonial');
    const nextButton = document.querySelector('.next-scraping-testimonial');
    let currentIndex = 0;

    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        }, 5000);
    }

    

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggleButton = item.querySelector('.faq-toggle');
        toggleButton.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
// cleansing javascrpt

 // Scroll animations
 function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-item")

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight
    const revealTop = reveal.getBoundingClientRect().top
    const revealPoint = 150

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add("active")
    }
  })
}

window.addEventListener("scroll", revealOnScroll)
window.addEventListener("load", revealOnScroll)



// Add animation to service cards when they come into view
const serviceCards = document.querySelectorAll(".service-card")

// Simple function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
}

// Add animation class when scrolling
function handleScroll() {
  serviceCards.forEach((card) => {
    if (isInViewport(card)) {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }
  })
}

// Initialize service cards
serviceCards.forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
})

// Add scroll event listener
window.addEventListener("scroll", handleScroll)

// Trigger once on load
handleScroll()

});

  
  




