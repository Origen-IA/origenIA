    document.addEventListener('DOMContentLoaded', () => {
        const testimonialsData = [
            { quote: "Increíble transformación. Mis ventas subieron 400%.", author: "María G.", company: "Boutique Online", img: "https://uifaces.co/our-content/donated/xP_Yp3xG.jpg" },
            { quote: "El proceso fue rapidísimo y el resultado superó mis expectativas.", author: "Carlos P.", company: "Tienda de Gadgets", img: "https://uifaces.co/our-content/donated/vIymu9gN.jpg" },
            { quote: "Nuestras fotos para el menú online ahora lucen espectaculares. ¡Totalmente recomendado!", author: "Ana R.", company: "Restaurante Sabor Local", img: "https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" }
        ];
        
        function initMobileMenu() {
            const toggleBtn = document.getElementById('mobile-nav-toggle');
            const navMenu = document.getElementById('main-nav');
            const overlay = document.getElementById('menu-overlay');
            const navLinks = navMenu.querySelectorAll('.nav-link');
            const openMenu = () => {
                navMenu.classList.add('is-open');
                toggleBtn.classList.add('is-open');
                overlay.classList.add('is-open');
                document.body.classList.add('no-scroll');
            };
            const closeMenu = () => {
                navMenu.classList.remove('is-open');
                toggleBtn.classList.remove('is-open');
                overlay.classList.remove('is-open');
                document.body.classList.remove('no-scroll');
            };
            toggleBtn.addEventListener('click', () => navMenu.classList.contains('is-open') ? closeMenu() : openMenu());
            navLinks.forEach(link => link.addEventListener('click', closeMenu));
            overlay.addEventListener('click', closeMenu);
        }
        
        function initPageNavigation() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
                    link.classList.add('active');
                    
                    const targetPageId = link.dataset.page;
                    if (targetPageId) {
                         e.preventDefault();
                        document.querySelectorAll('.page-view').forEach(page => page.classList.toggle('hidden', page.id !== `${targetPageId}-page`));
                        const targetSectionId = link.getAttribute('href');
                        if (targetSectionId && targetSectionId.startsWith('#')) {
                            const targetElement = document.querySelector(targetSectionId);
                            if (targetElement) {
                                const headerOffset = document.querySelector('.main-header').offsetHeight;
                                const elementPosition = targetElement.getBoundingClientRect().top;
                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                            }
                        } else { window.scrollTo(0, 0); }
                    }
                });
            });
        }
        
        function initBeforeAfterSlider(selector) {
            const slider = document.querySelector(selector);
            if (!slider) return;
            const imageAfter = slider.querySelector('.image-after');
            const handle = slider.querySelector('.slider-handle');
            const sliderInput = slider.querySelector('.slider-input');
            sliderInput.addEventListener('input', (e) => {
                const value = e.target.value;
                imageAfter.style.clipPath = `polygon(${value}% 0, 100% 0, 100% 100%, ${value}% 100%)`;
                handle.style.left = `${value}%`;
            });
        }
        
        function initTestimonialSlider() {
            const track = document.getElementById('testimonial-track');
            if(!track) return;
            let currentIndex = 0;
            track.innerHTML = ''; 
            testimonialsData.forEach(t => {
                const slide = document.createElement('div');
                slide.className = 'testimonial-card';
                slide.innerHTML = `<img src="${t.img}" alt="Foto de ${t.author}" class="testimonial-image" loading="lazy"><div><blockquote><p>"${t.quote}"</p></blockquote><cite>- ${t.author}, ${t.company}</cite></div>`;
                track.appendChild(slide);
            });
            const slides = Array.from(track.children);
            if (slides.length === 0) return; 
            const moveToSlide = () => {
                if (slides.length > 0) {
                    const slideWidth = slides[0].getBoundingClientRect().width;
                    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
                }
            }
            document.getElementById('next-testimonial').addEventListener('click', () => { currentIndex = (currentIndex + 1) % slides.length; moveToSlide(); });
            document.getElementById('prev-testimonial').addEventListener('click', () => { currentIndex = (currentIndex - 1 + slides.length) % slides.length; moveToSlide(); });
            window.addEventListener('resize', moveToSlide);
            moveToSlide();
        }

        function initCounterAnimation() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            const animate = (counter) => {
                const target = +counter.dataset.target;
                const initialText = counter.innerText;
                let count = 0;
                const updateCount = () => {
                    const increment = target / speed;
                    count += increment;
                    if (count < target) {
                        let displayText = Math.ceil(count).toString();
                        if (initialText.includes('+')) displayText = '+' + displayText;
                        if (initialText.includes('%')) displayText += '%';
                        if (initialText.includes('<')) displayText = '<' + displayText + 'h';
                        counter.innerText = displayText;
                        setTimeout(updateCount, 10);
                    } else {
                        let final_text = counter.dataset.target;
                        if (initialText.includes('+')) final_text = '+' + final_text;
                        if (initialText.includes('%')) final_text += '%';
                        if (initialText.includes('<')) final_text = '<' + final_text + 'h';
                        counter.innerText = final_text;
                    }
                };
                updateCount();
            };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counters.forEach(counter => { if (!counter.dataset.animated) { animate(counter); counter.dataset.animated = 'true'; } });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            const statsSection = document.querySelector('.success-stats');
            if (statsSection) observer.observe(statsSection);
        }

        function initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
            }, { threshold: 0.1 });
            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        }
        
        initMobileMenu();
        initPageNavigation();
        initBeforeAfterSlider('#hero-slider');
        initBeforeAfterSlider('#main-slider');
        initTestimonialSlider();
        initScrollAnimations();
        initCounterAnimation();
    });