// Smooth Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll for Section Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update mobile nav active state
            if (window.innerWidth <= 768) {
                updateActiveNav(targetId);
            }
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Add a slight delay for children if needed
            if (entry.target.hasAttribute('data-aos-delay')) {
                const delay = entry.target.getAttribute('data-aos-delay');
                entry.target.style.transitionDelay = `${delay}ms`;
            }
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize Animations
document.querySelectorAll('[data-aos]').forEach(el => {
    // Set initial styles via JS to avoid flash
    el.style.opacity = '0';
    if (el.getAttribute('data-aos') === 'fade-up') {
        el.style.transform = 'translateY(40px)';
    } else if (el.getAttribute('data-aos') === 'zoom-in') {
        el.style.transform = 'scale(0.95)';
    } else if (el.getAttribute('data-aos') === 'fade-right') {
        el.style.transform = 'translateX(-30px)';
    } else if (el.getAttribute('data-aos') === 'fade-left') {
        el.style.transform = 'translateX(30px)';
    }

    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
});

// Custom class update for reveal
document.addEventListener('scroll', () => {
    document.querySelectorAll('[data-aos]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            el.style.opacity = '1';
            el.style.transform = 'translate(0, 0) scale(1)';
        }
    });
});

// Mobile Nav Active State on Scroll
const sections = document.querySelectorAll('section[id]');
function updateActiveNav(id) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === id) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = '#' + section.getAttribute('id');
        }
    });

    if (current) {
        updateActiveNav(current);
    }
});
