/**
 * Portfolio Website — Main JavaScript
 * Hammad Iqbal Malik — Software Engineer Portfolio
 * Vanilla JS — No frameworks or libraries
 */

'use strict';

/* ============================================
   DOM Element References
   ============================================ */
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const scrollTopBtn = document.getElementById('scroll-top');
const typingText = document.getElementById('typing-text');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillItems = document.querySelectorAll('.skill-item');
const fadeElements = document.querySelectorAll('.fade-in');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const currentYear = document.getElementById('current-year');

/* ============================================
   Typing Animation — Hero Section
   ============================================ */
const typingPhrases = [
    'Software Engineer',
    'MERN Stack Developer',
    'Full Stack Developer',
    'Problem Solver'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    // Pause at end of phrase, then start deleting
    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

/* ============================================
   Page Loader
   ============================================ */
function hideLoader() {
    // Minimum display time so loader is visible
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }, 800);
}

/* ============================================
   Dark Mode Toggle — localStorage Persistence
   ============================================ */
const THEME_KEY = 'portfolio-theme';

function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return 'dark';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ============================================
   Mobile Navigation Toggle
   ============================================ */
function toggleNav() {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
}

function closeNav() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
}

/* ============================================
   Sticky Header on Scroll
   ============================================ */
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

/* ============================================
   Scroll to Top Button
   ============================================ */
function handleScrollTopBtn() {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================
   Active Navigation Link Highlighting
   ============================================ */
function updateActiveNavLink() {
    const scrollPos = window.scrollY + header.offsetHeight + 100;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ============================================
   Fade-in Animations on Scroll (Intersection Observer)
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

/* ============================================
   Skill Progress Bar Animation
   ============================================ */
function initSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillValue = entry.target.getAttribute('data-skill');
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.width = `${skillValue}%`;
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillItems.forEach(item => skillObserver.observe(item));
}

/* ============================================
   Project Filtering
   ============================================ */
function filterProjects(filter) {
    projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);

        if (shouldShow) {
            card.classList.remove('hidden');
            // Re-trigger fade animation
            card.classList.remove('visible');
            requestAnimationFrame(() => {
                card.classList.add('visible');
            });
        } else {
            card.classList.add('hidden');
        }
    });
}

function initProjectFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.getAttribute('data-filter'));
        });
    });
}

/* ============================================
   Contact Form Handling
   Uses FormSubmit — works without backend
   ============================================ */
function initContactForm() {
    if (!contactForm) return;

    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        formStatus.textContent = 'Sending your message...';
        formStatus.className = 'form-status';

        if (submitBtn) submitBtn.disabled = true;
        if (submitText) submitText.textContent = 'Sending...';

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        })
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error('Form submission failed');
            })
            .then(() => {
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            })
            .catch(() => {
                formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
                formStatus.className = 'form-status error';
            })
            .finally(() => {
                if (submitBtn) submitBtn.disabled = false;
                if (submitText) submitText.textContent = 'Send Message';
            });
    });
}

/* ============================================
   Smooth Scroll for Anchor Links
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                closeNav();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ============================================
   Footer — Dynamic Year
   ============================================ */
function setCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

/* ============================================
   Throttle Helper — Performance Optimization
   ============================================ */
function throttle(fn, delay) {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
}

/* Combined scroll handler (throttled for performance) */
const handleScroll = throttle(() => {
    handleHeaderScroll();
    handleScrollTopBtn();
    updateActiveNavLink();
}, 100);

/* ============================================
   Initialize Everything on DOM Ready
   ============================================ */
function init() {
    // Prevent scroll while loader is visible
    document.body.classList.add('no-scroll');

    // Apply saved theme preference
    applyTheme(getPreferredTheme());

    // Set footer year
    setCurrentYear();

    // Start typing animation
    typeEffect();

    // Initialize all features
    initScrollAnimations();
    initSkillBars();
    initProjectFilters();
    initContactForm();
    initSmoothScroll();

    // Event Listeners
    window.addEventListener('load', hideLoader);
    window.addEventListener('scroll', handleScroll);
    themeToggle.addEventListener('click', toggleTheme);
    navToggle.addEventListener('click', toggleNav);
    scrollTopBtn.addEventListener('click', scrollToTop);

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeNav();
        }
    });

    // Run scroll handlers once on load
    handleScroll();
}

// Boot the application
document.addEventListener('DOMContentLoaded', init);
