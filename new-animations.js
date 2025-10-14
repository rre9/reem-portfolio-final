/*!
 * © 2025 Reem Nawaf — All Rights Reserved.
 * Unauthorized copying, modification, or redistribution is prohibited.
 */

class ModernAnimations {
    constructor() {
        this.elements = [];
        this.scrollY = 0;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.bindEvents();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: [0, 0.1, 0.5, 1]
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const animationType = element.dataset.animate || 'fadeInUp';
                const delay = parseInt(element.dataset.delay) || 0;

                if (entry.isIntersecting) {
                    setTimeout(() => {
                        this.animateElement(element, animationType);
                    }, delay);
                }
            });
        }, options);

        // Observe all elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(el => {
            this.observer.observe(el);
        });
    }

    animateElement(element, animationType) {
        element.classList.add('animate-in');

        switch (animationType) {
            case 'fadeInUp':
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                break;
            case 'fadeInLeft':
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
                break;
            case 'fadeInRight':
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
                break;
            case 'scaleIn':
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
                break;
            case 'slideInUp':
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                break;
        }
    }

    setupScrollAnimations() {
        // Smooth scroll-based animations
        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
            this.updateScrollAnimations();
        });
    }

    updateScrollAnimations() {
        const scrollElements = document.querySelectorAll('[data-scroll]');

        scrollElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;

            // Calculate scroll progress (0 to 1)
            const scrollProgress = Math.max(0, Math.min(1,
                (windowHeight - elementTop) / (windowHeight + elementHeight)
            ));

            const scrollType = element.dataset.scroll;

            switch (scrollType) {
                case 'parallax':
                    const speed = parseFloat(element.dataset.speed) || 0.5;
                    const yPos = -(this.scrollY * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                    break;

                case 'fade':
                    element.style.opacity = scrollProgress;
                    break;

                case 'slide':
                    const slideDistance = 50;
                    const slideY = slideDistance * (1 - scrollProgress);
                    element.style.transform = `translateY(${slideY}px)`;
                    element.style.opacity = scrollProgress;
                    break;
            }
        });
    }

    setupParallaxEffects() {
        // Background parallax effects
        const parallaxBgs = document.querySelectorAll('[data-parallax-bg]');

        window.addEventListener('scroll', () => {
            parallaxBgs.forEach(bg => {
                const speed = parseFloat(bg.dataset.parallaxBg) || 0.5;
                const yPos = -(window.pageYOffset * speed);
                bg.style.backgroundPosition = `center ${yPos}px`;
            });
        });
    }

    bindEvents() {
        // Add smooth scrolling to navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Method to add stagger animation to multiple elements
    staggerAnimation(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * delay}ms`;
        });
    }

    // Method to add hover animations
    addHoverAnimations() {
        const hoverElements = document.querySelectorAll('[data-hover]');

        hoverElements.forEach(element => {
            const hoverType = element.dataset.hover;

            element.addEventListener('mouseenter', () => {
                switch (hoverType) {
                    case 'lift':
                        element.style.transform = 'translateY(-10px)';
                        break;
                    case 'scale':
                        element.style.transform = 'scale(1.05)';
                        break;
                    case 'rotate':
                        element.style.transform = 'rotate(5deg)';
                        break;
                }
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }
}


// Initialize animations when DOM is loaded
// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animations = new ModernAnimations();
    animations.addHoverAnimations();

    // Add stagger animation to project cards
    animations.staggerAnimation('.project-card', 150);

    // Animate hero section immediately on page load
    const heroElements = document.querySelectorAll('#home [data-animate]');
    heroElements.forEach((element) => {
        const delay = parseInt(element.dataset.delay) || 0;
        const animationType = element.dataset.animate;

        setTimeout(() => {
            element.classList.add('animate-in');
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        }, delay);
    });
});