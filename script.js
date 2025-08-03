// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeBtn = document.getElementById('darkModeBtn');
    const body = document.body;
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }
    
    darkModeBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        // Add a subtle animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });

    // Smooth scrolling for dock navigation links
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active dock item highlighting
    function updateActiveDockItem() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const dockItem = document.querySelector(`.dock-item[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                dockItems.forEach(item => item.classList.remove('active'));
                if (dockItem) dockItem.classList.add('active');
            }
        });
    }

    // Scroll indicator dots
    function updateScrollDots() {
        const sections = document.querySelectorAll('section');
        const dots = document.querySelectorAll('.dot');
        const scrollPos = window.scrollY + window.innerHeight / 2;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) dots[index].classList.add('active');
            }
        });
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveDockItem();
        updateScrollDots();
        
        // Parallax effect for geometric shape
        const geometricShape = document.querySelector('.geometric-shape');
        if (geometricShape) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            geometricShape.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`;
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Resume download functionality
    const downloadResumeBtn = document.getElementById('downloadResume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a sample resume content
            const resumeContent = `
PRIYVRAT MODI
Software Engineer

Email: priyvrat.modi@example.com
Phone: +1 (555) 123-4567
Location: San Francisco, CA

SUMMARY
Experienced Software Engineer with expertise in full-stack development, 
specializing in modern web technologies and AI-driven solutions.

EDUCATION
• PhD in Computer Science (2016-2020)
• Harvard University - React and Node.js Certificate (2018-2022)
• Oxford University - Full Stack Web Development (2010-2012)

SKILLS
• Front-End: HTML, CSS, JavaScript, React, Angular
• Back-End: Node.js, Express, Python, Django
• Databases: MySQL, PostgreSQL, MongoDB
• Tools & Platforms: Git, Docker, AWS, Heroku

EXPERIENCE
• Advanced Data Analytics with Big Data Tools (2016-2020)
• Cloud-Native Application Architectures (2018-2022)
• AI-Driven User Experience Personalization (2016-2020)

PROJECTS
• Online Cinema Platform - Full-stack streaming application
• Portfolio Website - Modern glass morphism design
• Various AI and web development projects
            `;
            
            // Create and download the resume file
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Priyvrat_Modi_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            showNotification('Resume downloaded successfully!', 'success');
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.glass-box, .project-showcase, .skills-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typing effect for home title
    const homeTitle = document.querySelector('.home-title');
    if (homeTitle) {
        const originalText = homeTitle.textContent;
        homeTitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < originalText.length) {
                homeTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Skill icons hover effect
    const skillIcons = document.querySelectorAll('.skill-icon');
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1)';
            this.style.boxShadow = '0 15px 35px rgba(221, 160, 221, 0.3)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        });
    });

    // Project button interaction
    const projectBtn = document.querySelector('.project-btn');
    if (projectBtn) {
        projectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Project details coming soon!', 'info');
        });
    }

    // Social links interaction
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label');
            showNotification(`${platform} profile coming soon!`, 'info');
        });
    });

    // Initialize scroll position
    updateActiveDockItem();
    updateScrollDots();
});

// Additional utility functions
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

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'H' to go to home
    if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey) {
        const homeSection = document.getElementById('home');
        if (homeSection && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'Escape' to close notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }
});

