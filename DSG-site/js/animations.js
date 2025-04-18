// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// Animate elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('visible');
    }
  });
};

// Counter animation for stats
const initCounters = () => {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const duration = 2000; // ms
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        if (counter.classList.contains('currency')) {
          counter.textContent = Math.floor(current).toLocaleString();
        } else {
          counter.textContent = (Math.floor(current * 10) / 10).toFixed(1).replace(/\.0$/, '');
        }
        requestAnimationFrame(updateCounter);
      } else {
        if (counter.classList.contains('currency')) {
          counter.textContent = target.toLocaleString();
        } else {
          counter.textContent = target.toString().includes('.') ? target : target.toFixed(0);
        }
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
};

// Enhanced liquid background animation
const animateLiquidBackground = () => {
  const blobs = document.querySelectorAll('.blob');
  
  // Initial random positions
  blobs.forEach(blob => {
    const randomX = Math.random() * 10 - 5;
    const randomY = Math.random() * 10 - 5;
    blob.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });
  
  // Mouse movement effect
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, index) => {
      const speed = 0.05 * (index + 1);
      const offsetX = (mouseX - 0.5) * speed * 100;
      const offsetY = (mouseY - 0.5) * speed * 100;
      
      blob.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + mouseY * 0.1})`;
    });
  });
  
  // Subtle continuous animation
  let time = 0;
  const animate = () => {
    time += 0.01;
    
    blobs.forEach((blob, index) => {
      const x = Math.sin(time + index) * 15;
      const y = Math.cos(time + index) * 15;
      
      // Get current transform and add subtle movement
      const currentTransform = blob.style.transform;
      if (currentTransform.includes('translate')) {
        const currentX = parseFloat(currentTransform.split('translate(')[1].split('px')[0]);
        const currentY = parseFloat(currentTransform.split('px, ')[1].split('px')[0]);
        
        blob.style.transform = `translate(${currentX + x * 0.01}px, ${currentY + y * 0.01}px) ${
          currentTransform.includes('scale') ? 'scale(' + currentTransform.split('scale(')[1] : ''
        }`;
      }
    });
    
    requestAnimationFrame(animate);
  };
  
  animate();
};

// Neumorphic hover effect
const addNeumorphicEffects = () => {
  document.querySelectorAll('.neumorphic').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.classList.add('neumorphic-hover');
    });
    
    item.addEventListener('mouseleave', function() {
      this.classList.remove('neumorphic-hover');
    });
  });
};

// Progress bar implementation
const initProgressBar = () => {
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll animations
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Initialize counters
  initCounters();
  
  // Initialize liquid background
  animateLiquidBackground();
  
  // Initialize neumorphic effects
  addNeumorphicEffects();
  
  // Initialize progress bar
  initProgressBar();
  
  // Add animation classes to elements
  document.querySelectorAll('.service-card, .portfolio-item, .stat-item, h1, h2')
    .forEach(el => {
      if (!el.classList.contains('animate-on-scroll')) {
        el.classList.add('animate-on-scroll');
      }
    });
});

// Add liquid cursor effect
const addLiquidCursorEffect = () => {
  const cursor = document.createElement('div');
  cursor.classList.add('liquid-cursor');
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  const animate = () => {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;
    
    cursorX += diffX * 0.1;
    cursorY += diffY * 0.1;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animate);
  };
  
  animate();
};

// Parallax effect for hero section
const parallaxEffect = () => {
  const hero = document.querySelector('.hero');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (hero) {
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
  });
};

// Initialize animations
window.addEventListener('load', () => {
  // Add animation classes to elements
  document.querySelectorAll('.service-card, .portfolio-item, .about-content h3, .section-title h2')
    .forEach(el => el.classList.add('animate-on-scroll'));
  
  // Initialize animations
  animateOnScroll();
  addLiquidCursorEffect();
  parallaxEffect();
  
  // Check for animations on scroll
  window.addEventListener('scroll', animateOnScroll);
});
