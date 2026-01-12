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

// Detectar se está em mobile
const isMobile = window.innerWidth <= 768;

// Opções otimizadas para mobile e desktop
const observerOptions = {
    threshold: isMobile ? 0.05 : 0.15, // Mobile: dispara mais cedo
    rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -80px 0px' // Mobile: margem menor
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
const fadeElements = document.querySelectorAll('.why-card, .about-grid, .why-hire-card, .pricing-card, .service-card, .portfolio-card');

// Velocidades otimizadas: mais rápidas em mobile
const animationDuration = isMobile ? 0.4 : 0.6; // Mobile: 0.4s, Desktop: 0.6s
const staggerDelay = isMobile ? 0.05 : 0.1; // Mobile: 0.05s entre elementos, Desktop: 0.1s

fadeElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = isMobile ? 'translateY(15px)' : 'translateY(30px)'; // Menos movimento em mobile
    element.style.transition = `opacity ${animationDuration}s ease ${index * staggerDelay}s, transform ${animationDuration}s ease ${index * staggerDelay}s`;
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

    // Duração mais rápida em mobile: 1s, desktop: 2s
    const duration = isMobile ? 1000 : 2000;
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
    '%cHeader → Hero → Diferenciais → Sobre → Planos → Serviços → Portfólio → Newsletter → Footer',
    'color: #E5E5E5; font-size: 11px;'
);

// ===================================
// PARTICLE NETWORK ANIMATION (ADM Style)
// ===================================
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // Mouse interaction
    const mouse = {
        x: null,
        y: null,
        radius: 150
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Particle Class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Draw particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Update particle position
        update() {
            // Boundary checks
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse repulsion
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 10;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 10;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 10;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 10;
                }
            }

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;

            this.draw();
        }
    }

    // Initialize particles
    function initParticles() {
        particlesArray = [];
        // Calculate number of particles based on screen size
        let numberOfParticles = (canvas.height * canvas.width) / 9000;

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1; // Random size between 1 and 3
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1; // Random speed/direction
            let directionY = (Math.random() * 2) - 1;
            let color = 'rgba(242, 169, 0, 0.6)'; // Primary Orange color

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Connect particles with lines
    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                    ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(242, 169, 0,' + opacityValue + ')'; // Orange lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    // Start
    initParticles();
    animateParticles();
}
