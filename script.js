// CUSTOM JS: society-ecosystem/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2');
            navbar.classList.remove('py-4', 'mt-4');
        } else {
            navbar.classList.add('py-4', 'mt-4');
            navbar.classList.remove('py-2');
        }
    });

    // 3. Dynamic Glow effect for Service Cards
    // Tracks mouse position to create a flashlight glow effect on the border
    const cards = document.querySelectorAll('.hover-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 4. Duplicate items in Amazon Storefront carousel for infinite scroll
    const carousel = document.querySelector('.animate-scroll-x');
    if(carousel) {
        // Clone the content to make it scroll infinitely without jumping
        const content = carousel.innerHTML;
        carousel.innerHTML = content + content;
    }
});
