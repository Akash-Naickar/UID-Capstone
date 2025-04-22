const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');
const navbar = document.querySelector('.main-header');
let scrollStarted = false;
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Check if at the top of the page
  if (scrollTop === 0) {
    // At the top - return to original state
    navbar.classList.remove('hidden');
    navbar.classList.remove('visible');
    navbar.classList.add('at-top');
  } else if (scrollTop > lastScrollTop + 5) {
    // Scrolling down - hide navbar
    navbar.classList.add('hidden');
    navbar.classList.remove('visible');
    navbar.classList.remove('at-top');
  } else if (scrollTop < lastScrollTop - 5) {
    // Scrolling up - show navbar with background
    navbar.classList.remove('hidden');
    navbar.classList.add('visible');
    navbar.classList.remove('at-top');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Initialize the navbar state on page load
document.addEventListener('DOMContentLoaded', () => {
  if (window.scrollY === 0) {
    navbar.classList.add('at-top');
  }
});

btn.addEventListener('click', navToggle);
document.addEventListener('scroll', scrollPage);

function navToggle() {
  btn.classList.toggle('open');
  overlay.classList.toggle('overlay-show');
  document.body.classList.toggle('stop-scrolling');
  menu.classList.toggle('show-menu');
}

function scrollPage() {
  const scrollPos = window.scrollY;

  if (scrollPos > 100 && !scrollStarted) {
    countUp();
    scrollStarted = true;
  } else if (scrollPos < 100 && scrollStarted) {
    reset();
    scrollStarted = false;
  }
}



function countUp() {
  counters.forEach((counter) => {
    counter.innerText = '0';

    const updateCounter = () => {
      // Get count target
      const target = +counter.getAttribute('data-target');
      // Get current counter value
      const c = +counter.innerText;

      // Create an increment
      const increment = target / 25 ;

      // If counter is less than target, add increment
      if (c < target) {
        // Round up and set counter value
        counter.innerText = `${Math.ceil(c + increment)}`;

        setTimeout(updateCounter, 75);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

function reset() {
  counters.forEach((counter) => (counter.innerHTML = '0'));
}