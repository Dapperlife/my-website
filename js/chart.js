// DOM Elements
const loader = document.querySelector('.loader');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const heroContent = document.querySelector('.hero-content');
const heroScroll = document.querySelector('.hero-scroll');
const collectionCards = document.querySelectorAll('.collection-card');
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 1500);
});

// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Initialize hero animations
setTimeout(() => {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
}, 500);

setTimeout(() => {
    heroScroll.style.opacity = '1';
}, 1500);

// Collection card hover effect
collectionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.collection-overlay').style.transform = 'translateY(0)';
        card.querySelector('.collection-image').style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.collection-overlay').style.transform = 'translateY(100%)';
        card.querySelector('.collection-image').style.transform = 'scale(1)';
    });
});

// Testimonial Carousel
let currentIndex = 0;

function showSlide(index) {
    carouselItems.forEach((item, i) => {
        item.classList.remove('active');
        item.style.opacity = '0';
        item.style.transform = `translateX(${(i - index) * 100}%)`;
    });
    
    carouselItems[index].classList.add('active');
    setTimeout(() => {
        carouselItems[index].style.opacity = '1';
    }, 50);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentIndex);
}

carouselNext.addEventListener('click', nextSlide);
carouselPrev.addEventListener('click', prevSlide);

// Initialize carousel
showSlide(currentIndex);

// Auto-rotate carousel
setInterval(nextSlide, 5000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = totalItems;
    });
}

updateCartCount();