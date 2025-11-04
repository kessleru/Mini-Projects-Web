// Folder navigation
document.addEventListener('DOMContentLoaded', () => {
    const folderCards = document.querySelectorAll('.folder-card:not(.coming-soon)');

    folderCards.forEach(card => {
        card.addEventListener('click', () => {
            const path = card.getAttribute('data-path');
            if (path) {
                // Add a subtle animation before navigation
                card.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    window.location.href = path;
                }, 200);
            }
        });

        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Parallax effect for decorative dots
    const dots = document.querySelectorAll('.decorative-dots');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        dots.forEach((dot, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            dot.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Add ripple effect on card click
    folderCards.forEach(card => {
        card.addEventListener('mousedown', (e) => {
            const ripple = document.createElement('span');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add smooth scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all folder cards
    folderCards.forEach(card => {
        observer.observe(card);
    });


    // Console easter egg
    console.log('%c🚀 Kessleru Mini Projects', 'font-size: 20px; color: #a855f7; font-weight: bold;');
    console.log('%cVisite: https://github.com/kessleru', 'font-size: 14px; color: #22c55e;');
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(168, 85, 247, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    .folder-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
