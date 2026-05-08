// CUSTOM JS: society-ecosystem/script.js

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Strip hash on load so pull-to-refresh doesn't jump
if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
}

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
    // 5. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu for external links with a delay so Safari doesn't cancel navigation
        const mobileLinks = mobileMenu.querySelectorAll('a:not([href^="#"])');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 150);
            });
        });
    }
    
    // 6. Smooth Scroll Intercept (Prevents URL Hash Updates)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Ensure mobile menu closes
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // 7. Custom Telegram Backend Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            const successMessage = document.getElementById('success-message');
            
            // Get form values
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Visual feedback
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    // Hide form fields and button, show success
                    Array.from(contactForm.children).forEach(child => {
                        if (child.id !== 'success-message') {
                            child.classList.add('hidden');
                        }
                    });
                    successMessage.classList.remove('hidden');
                } else {
                    throw new Error('Server error');
                }
            } catch (err) {
                alert("Something went wrong. Please try reaching out on Telegram or Facebook directly!");
                submitBtn.innerHTML = 'Send Message &rarr;';
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            }
        });
    }
});
