// Mobile menu functionality
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Navigation system
        const mainContent = document.querySelector('.main-content');
        const portfolioSection = document.querySelector('.portfolio-preview');
        const casosSection = document.querySelector('.social-proof');
        const footer = document.querySelector('.footer');

        // Main nav links
        document.querySelectorAll('.main-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href') !== '#') {
                    e.preventDefault();
                    showMainContent();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            });
        });

        // Portfolio link
        document.querySelectorAll('.portfolio-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showPortfolio();
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            });
        });

        // Casos link
        document.querySelectorAll('.casos-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showCasos();
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            });
        });

        // Functions to show sections
        function showMainContent() {
            mainContent.style.display = 'block';
            portfolioSection.style.display = 'none';
            casosSection.style.display = 'none';
            footer.style.display = 'block';
            window.scrollTo(0, 0);
        }

        function showPortfolio() {
            mainContent.style.display = 'none';
            portfolioSection.style.display = 'block';
            casosSection.style.display = 'none';
            footer.style.display = 'block';
            window.scrollTo(0, 0);
            
            // Trigger animations
            document.querySelectorAll('.portfolio-preview .fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }

        function showCasos() {
            mainContent.style.display = 'none';
            portfolioSection.style.display = 'none';
            casosSection.style.display = 'block';
            footer.style.display = 'block';
            window.scrollTo(0, 0);
            
            // Trigger animations
            document.querySelectorAll('.social-proof .fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        });