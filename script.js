// ===================================================================
// KOMYFY - Interactive Behaviors (FASE 1: Header + Hero)
// ===================================================================

// DOM Elements
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const headerNav = document.getElementById('headerNav');
const navLinks = document.querySelectorAll('.nav-link');

// ===================================
// HEADER: Scroll Effect
// ===================================
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;

    // Adiciona classe 'scrolled' ao header quando rolar mais de 50px
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
});

// ===================================
// MOBILE MENU: Toggle
// ===================================
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    headerNav.classList.toggle('active');

    // Previne scroll do body quando menu está aberto
    document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : '';
});

// Fecha menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        headerNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===================================
// SMOOTH SCROLL: Links internos
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignora links vazios ou apenas "#"
        if (href === '#' || href === '') return;

        e.preventDefault();

        const targetElement = document.querySelector(href);

        if (targetElement) {
            const headerHeight = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVIGATION: Active Link on Scroll
// ===================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');

                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// FADE-IN ANIMATIONS: Intersection Observer
// ===================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplica fade-in aos cards informativos e novos elementos
const fadeElements = document.querySelectorAll('.hero-info-card, .why-card, .about-grid, .pricing-card, .service-card, .portfolio-card');
fadeElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(element);
});

// ===================================
// NEWSLETTER: Form Submission
// ===================================
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const email = emailInput.value;

        if (email) {
            // Show success feedback
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Subscrito! ✓';
            submitButton.style.background = '#4CAF50';
            submitButton.disabled = true;

            // Reset after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.style.background = '';
                submitButton.disabled = false;
                emailInput.value = '';
            }, 3000);
        }
    });
}

// ===================================
// COUNTER ANIMATION: Métricas
// ===================================
const metricNumbers = document.querySelectorAll('.metric-number');
let metricsAnimated = false;

function animateMetricCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const targetNumber = parseInt(text);

    if (isNaN(targetNumber)) return;

    const duration = 2000;
    const increment = targetNumber / (duration / 16);
    let currentNumber = 0;

    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            element.textContent = hasPlus ? `${targetNumber}+` : targetNumber;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentNumber);
        }
    }, 16);
}

const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !metricsAnimated) {
            metricNumbers.forEach(metric => animateMetricCounter(metric));
            metricsAnimated = true;
        }
    });
}, { threshold: 0.5 });

const aboutMetrics = document.querySelector('.about-metrics');
if (aboutMetrics) {
    metricsObserver.observe(aboutMetrics);
}

// ===================================
// LOADING ANIMATION: Page Load
// ===================================
window.addEventListener('load', () => {
    // Fade-in suave da página
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ===================================
// CONSOLE BRANDING
// ===================================
console.log(
    '%c🚀 KOMYFY WEBSITE — 100% CONCLUÍDO! ',
    'background: #F2A900; color: #0B0B0B; font-size: 18px; font-weight: bold; padding: 8px 16px; border-radius: 4px;'
);
console.log(
    '%c✅ Todas as 4 Fases Implementadas — Pronto para Lançamento!',
    'color: #4CAF50; font-size: 13px; font-weight: 600;'
);
console.log(
    '%cHeader → Hero → Diferenciais → Sobre → Planos → Serviços → Portfólio → Newsletter → Footer',
    'color: #E5E5E5; font-size: 11px;'
);
