/* 
   DSG Digital Strategy & Growth 
   Main JavaScript
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Mobile Menu
    initMobileMenu();
    
    // Initialize Back to Top Button
    initBackToTop();
    
    // Initialize Animations
    initAnimations();
    
    // Initialize Form Validation
    initFormValidation();
    
    // Initialize Counters
    initCounters();
});

// Mobile Menu Functions
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });
    }
}

// Back to Top Button Functions
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animations Functions
function initAnimations() {
    // Animate elements when they enter viewport
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length) {
        // Set up Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class with delay if specified
                    const delay = entry.target.dataset.animationDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe each element
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Form Validation Functions
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                valid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                valid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                valid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                valid = false;
            }
            
            // Submit form if valid
            if (valid) {
                // Get form data
                const formData = new FormData(contactForm);
                const formDataObj = {};
                
                // Convert FormData to object
                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });
                
                // Submit to HubSpot using the function from forms.js
                if (typeof submitToHubSpot === 'function') {
                    submitToHubSpot(formDataObj);
                } else {
                    console.error('HubSpot submission function not found');
                    // Fallback message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                    
                    contactForm.reset();
                    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }
            }
        });
    }
}

// Helper function to show error messages
function showError(input, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    input.parentNode.appendChild(errorMessage);
    input.classList.add('error');
    
    // Remove error class when input changes
    input.addEventListener('input', function() {
        input.classList.remove('error');
        const errorEl = input.parentNode.querySelector('.error-message');
        if (errorEl) {
            errorEl.remove();
        }
    }, { once: true });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds
    const step = Math.ceil(target / (duration / 20)); // Update every 20ms
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, 20);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const menuToggle = document.getElementById('mobile-menu-toggle');
                
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        }
    });
});

// When scrolling, add a class to header
window.addEventListener('scroll', debounce(function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}, 50));

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// HubSpot form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Submit to HubSpot
            const portalId = '242636499'; // Replace with your actual HubSpot portal ID
            const formId = 'd37a5d05-940b-45b8-9653-43a9e0980213'; // Replace with your actual HubSpot form ID
            
            const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
            
            // Prepare data for HubSpot
            const data = {
                fields: Object.keys(formDataObj).map(key => ({
                    name: key,
                    value: formDataObj[key]
                })),
                context: {
                    pageUri: window.location.href,
                    pageName: document.title
                }
            };
            
            // Send to HubSpot
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again later.');
            });
        });
    }
});