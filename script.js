// Attractive Animated Cursor with Trail Effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;
let trailDelay = 0;

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;

    followerX += distX * 0.1;
    followerY += distY * 0.1;

    if (cursorFollower) {
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
    }

    requestAnimationFrame(animateFollower);
}

function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    document.body.appendChild(trail);

    setTimeout(() => trail.remove(), 500);
}

function createClickEffect(x, y) {
    const clickEffect = document.createElement('div');
    clickEffect.className = 'cursor-click';
    clickEffect.style.left = `${x}px`;
    clickEffect.style.top = `${y}px`;
    document.body.appendChild(clickEffect);

    setTimeout(() => clickEffect.remove(), 600);
}

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

        trailDelay += 1;
        if (trailDelay % 3 === 0) {
            createTrail(mouseX, mouseY);
        }
    });

    document.addEventListener('click', (e) => {
        createClickEffect(e.clientX, e.clientY);
    });

    animateFollower();
}

// Cursor hover effects with enhanced animation
const hoverElements = document.querySelectorAll(
    'a, button, .btn, .skill-tag, .stat-card, .education-card, .contact-item, input, textarea, .theme-toggle, .ai-avatar, .social-link'
);

hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursor?.classList.add('active');
        cursorFollower?.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
        cursor?.classList.remove('active');
        cursorFollower?.classList.remove('active');
    });
});

// AI Avatar Scroll Trigger
const aiAvatar = document.getElementById('aiAvatar');
let avatarShown = false;

if (aiAvatar) {
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;

        if (scrollPercentage > 20 && !avatarShown) {
            aiAvatar.classList.add('show');
            avatarShown = true;
        }

        if (scrollPercentage < 5) {
            aiAvatar.classList.remove('show');
            avatarShown = false;
        }
    });

    aiAvatar.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }

        aiAvatar.style.animation = 'none';
        setTimeout(() => {
            aiAvatar.style.animation = 'slideUp 0.5s ease forwards';
        }, 10);
    });
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
    body.classList.add('light-theme');
    if (themeToggle) {
        themeToggle.textContent = '??';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');

        if (body.classList.contains('light-theme')) {
            themeToggle.textContent = '??';
            localStorage.setItem('theme', 'light');
            cursor?.style.setProperty('border-color', 'rgba(2, 132, 199, 0.8)');
            cursorFollower?.style.setProperty('border-color', 'rgba(2, 132, 199, 0.3)');
        } else {
            themeToggle.textContent = '??';
            localStorage.setItem('theme', 'dark');
            cursor?.style.setProperty('border-color', 'rgba(0, 217, 255, 0.8)');
            cursorFollower?.style.setProperty('border-color', 'rgba(0, 217, 255, 0.3)');
        }

        themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg) scale(1)';
        }, 300);
    });
}

// Magnetic effect on buttons
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

// Ripple effect on click
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
});

// Particles animation
const particlesContainer = document.getElementById('particles');
function createParticle() {
    if (!particlesContainer) return;

    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
    particle.style.animationDelay = `${Math.random() * 2}s`;
    particlesContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 5000);
}

if (particlesContainer) {
    setInterval(createParticle, 300);
    for (let i = 0; i < 20; i += 1) {
        setTimeout(createParticle, i * 100);
    }
}

// Parallax effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    document.querySelectorAll('.stat-card, .skill-category').forEach((el, index) => {
        const speed = (index + 1) * 0.5;
        el.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
});

// 3D Tilt effect on cards
const tiltCards = document.querySelectorAll('.education-card, .stat-card');
tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Number counter animation
const animateNumbers = () => {
    document.querySelectorAll('.stat-number').forEach((counter) => {
        const target = counter.innerText;
        const isDecimal = target.includes('.');
        const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
        const suffix = target.replace(/[0-9.]/g, '');

        if (Number.isNaN(numericTarget)) return;

        let current = 0;
        const increment = numericTarget / 50;
        const timer = setInterval(() => {
            current += increment;

            if (current >= numericTarget) {
                counter.innerText = target;
                clearInterval(timer);
            } else {
                counter.innerText = isDecimal ? `${current.toFixed(2)}${suffix}` : `${Math.floor(current)}${suffix}`;
            }
        }, 30);
    });
};

// Intersection Observer for section animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        if (entry.target.id === 'about') {
            animateNumbers();
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const target = targetId ? document.querySelector(targetId) : null;

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let currentSection = '';

    document.querySelectorAll('section').forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id') || currentSection;
        }
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href')?.slice(1);
        if (href === currentSection) {
            link.classList.add('active');
        }
    });
});

// Text reveal animation on scroll
const revealElements = document.querySelectorAll('.about-text p, .timeline-item, .section-title');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;

        setTimeout(() => {
            entry.target.classList.add('reveal-text');
        }, index * 100);
    });
}, { threshold: 0.1 });

revealElements.forEach((el) => revealObserver.observe(el));

// Logo hover effect
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'rotate(360deg)';
        logo.style.transition = 'transform 0.6s ease';
    });

    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'rotate(0deg)';
    });
}

// Skill tag hover sound effect (visual feedback)
document.querySelectorAll('.skill-tag').forEach((tag) => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-5px) scale(1.1)';
    });

    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

if (contactForm && contactStatus) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            subject: document.getElementById('contactSubject').value.trim(),
            message: document.getElementById('contactMessage').value.trim(),
        };

        if (!formData.name || !formData.email || !formData.message) {
            contactStatus.textContent = 'Please fill in all required fields.';
            contactStatus.className = 'form-status error';
            return;
        }

        contactStatus.textContent = 'Sending your message...';
        contactStatus.className = 'form-status sending';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Something went wrong. Please try again later.');
            }

            contactStatus.textContent = 'Thank you! Your message has been sent.';
            contactStatus.className = 'form-status success';
            contactForm.reset();
        } catch (error) {
            console.error('Contact form error:', error);
            contactStatus.textContent = error.message;
            contactStatus.className = 'form-status error';
        }
    });
}
