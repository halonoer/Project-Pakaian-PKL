// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// Category filter functionality
const categoryButtons = document.querySelectorAll('.category-btn');
const productItems = document.querySelectorAll('.product-item');

categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Get selected category
        const selectedCategory = this.getAttribute('data-category');

        // Filter products with animation
        productItems.forEach((item, index) => {
            // Reset animation
            item.style.animation = 'none';

            setTimeout(() => {
                if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
                    item.style.display = 'block';
                    item.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                } else {
                    item.style.display = 'none';
                }
            }, 10);
        });
    });
});

// Add to Cart functionality
const addToCartButtons = document.querySelectorAll('.btn-add-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        // Add animation
        this.style.transform = 'scale(0.95)';

        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);

        // Show notification
        showNotification('Product added to cart!');
    });
});

// Notification function
function showNotification(message) {
    // Check if notification already exists
    let notification = document.querySelector('.notification');

    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background-color: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            opacity: 0;
            transform: translateX(400px);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(notification);
    }

    notification.textContent = message;

    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
    }, 3000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                navbarToggler.click();
            }
        }
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form-wrapper form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            message: this.querySelector('textarea').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all fields!');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Message sent successfully!');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Create and add Scroll to Top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Product card hover effect
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Featured card parallax effect
const featuredCards = document.querySelectorAll('.featured-card');

window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;

    featuredCards.forEach((card, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Gallery lightbox effect (simple)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function () {
        // Add scale animation
        this.style.transform = 'scale(0.95)';

        setTimeout(() => {
            this.style.transform = 'scale(1)';
            showNotification('Gallery image clicked!');
        }, 100);
    });
});

// Testimonial carousel auto-play (optional enhancement)
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    testimonials.forEach((testimonial, index) => {
        if (index === testimonialIndex) {
            testimonial.style.transform = 'scale(1.05)';
            testimonial.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
        } else {
            testimonial.style.transform = 'scale(1)';
            testimonial.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
        }
    });

    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
}

// Auto-rotate testimonials every 4 seconds
if (testimonials.length > 0) {
    setInterval(rotateTestimonials, 4000);
}

// View All Products button
const viewAllBtn = document.querySelector('.btn-view-all');

if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Show all products
        productItems.forEach((item, index) => {
            item.style.display = 'block';
            item.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s forwards`;
        });

        // Reset category buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        categoryButtons[0].classList.add('active'); // Activate "All" button

        showNotification('Showing all products!');
    });
}

// FAQ accordion smooth scroll
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', function () {
        setTimeout(() => {
            const accordionItem = this.closest('.accordion-item');
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = accordionItem.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 350); // Wait for accordion animation
    });
});

// Loading animation on page load
window.addEventListener('load', function () {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 2s ease';

        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
            showNotification('🎉 You found the secret!');
        }, 2000);
    }
});

console.log('🎨 Fashion Store Website Loaded Successfully!');
console.log('💡 Tip: Try pressing the Konami code for a surprise!');