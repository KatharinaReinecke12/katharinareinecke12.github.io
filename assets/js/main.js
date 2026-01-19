// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Active Navigation Link
const currentLocation = window.location.pathname;
const navLinksItems = document.querySelectorAll('.nav-links a');

navLinksItems.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentLocation === linkPath ||
        (currentLocation === '/' && linkPath.includes('index.html')) ||
        (currentLocation.includes(linkPath) && linkPath !== '/')) {
        link.classList.add('active');
    }
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Theme configuration
const themes = {
    moss: {
        name: 'moss',
        label: '🌾 Natur',
        dataTheme: null // default theme, no data-theme attribute
    },
    nature: {
        name: 'nature',
        label: '🌿 Moosgrün',
        dataTheme: 'nature'
    }
};

// Get saved theme or default to moss
let currentTheme = localStorage.getItem('theme') || 'moss';

// Apply saved theme on page load
if (currentTheme === 'nature') {
    htmlElement.setAttribute('data-theme', 'nature');
    if (themeToggle) themeToggle.textContent = themes.nature.label;
} else {
    htmlElement.removeAttribute('data-theme');
    if (themeToggle) themeToggle.textContent = themes.moss.label;
}

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (currentTheme === 'moss') {
            // Switch to nature theme
            currentTheme = 'nature';
            htmlElement.setAttribute('data-theme', 'nature');
            themeToggle.textContent = themes.nature.label;
            localStorage.setItem('theme', 'nature');
        } else {
            // Switch to moss theme
            currentTheme = 'moss';
            htmlElement.removeAttribute('data-theme');
            themeToggle.textContent = themes.moss.label;
            localStorage.setItem('theme', 'moss');
        }
    });
}
