document.addEventListener('DOMContentLoaded', function() {
    // Progress bar implementation
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Liquid background animation
    document.addEventListener('mousemove', function(e) {
        const blobs = document.querySelectorAll('.blob');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            const speed = 0.05 * (index + 1);
            const offsetX = (mouseX - 0.5) * speed * 100;
            const offsetY = (mouseY - 0.5) * speed * 100;
            
            blob.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + mouseY * 0.1})`;
        });
    });
    
    // Add hover effects to cards and buttons
    document.querySelectorAll('.service-card, button').forEach(element => {
        element.classList.add('hover-effect');
    });
    
    // Add pulse animation to important call-to-action elements
    document.querySelectorAll('.cta-button').forEach(element => {
        element.classList.add('pulse');
    });
    
    // Counter animation for stats
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                if (counter.classList.contains('currency')) {
                    counter.textContent = '$' + Math.floor(current).toLocaleString();
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (counter.classList.contains('currency')) {
                    counter.textContent = '$' + target.toLocaleString();
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
    
    // Neumorphic hover effect
    document.querySelectorAll('.neumorphic').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('neumorphic-hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('neumorphic-hover');
        });
    });
});