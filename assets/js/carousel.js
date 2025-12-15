/**
 * Screenshot Carousel for Phone Mockup
 * Handles automatic rotation, manual controls, and responsive behavior
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== Screenshot Carousel ====================
    const carousel = {
        currentIndex: 0,
        slides: null,
        indicators: null,
        autoplayInterval: null,
        autoplayDelay: 4000, // 4 seconds
        
        init() {
            this.slides = document.querySelectorAll('.screenshot-slide');
            
            if (!this.slides.length) {
                console.log('No carousel slides found');
                return;
            }
            
            // Create controls if they don't exist
            this.createControls();
            this.setupEventListeners();
            this.startAutoplay();
        },
        
        createControls() {
            const phoneContent = document.querySelector('.phone-content');
            if (!phoneContent) return;
            
            // Check if controls already exist
            if (document.querySelector('.carousel-controls')) {
                this.indicators = document.querySelectorAll('.indicator');
                return;
            }
            
            // Create controls container
            const controls = document.createElement('div');
            controls.className = 'carousel-controls';
            
            // Previous button
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-btn';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.onclick = () => this.previousSlide();
            controls.appendChild(prevBtn);
            
            // Indicators
            const indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'carousel-indicators';
            
            for (let i = 0; i < this.slides.length; i++) {
                const indicator = document.createElement('button');
                indicator.className = 'indicator' + (i === 0 ? ' active' : '');
                indicator.onclick = () => this.goToSlide(i);
                indicatorsContainer.appendChild(indicator);
            }
            
            controls.appendChild(indicatorsContainer);
            this.indicators = indicatorsContainer.querySelectorAll('.indicator');
            
            // Next button
            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-btn';
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.onclick = () => this.nextSlide();
            controls.appendChild(nextBtn);
            
            phoneContent.appendChild(controls);
        },
        
        setupEventListeners() {
            // Pause autoplay on hover
            const phoneScreen = document.querySelector('.phone-screen');
            if (phoneScreen) {
                phoneScreen.addEventListener('mouseenter', () => this.stopAutoplay());
                phoneScreen.addEventListener('mouseleave', () => this.startAutoplay());
                phoneScreen.addEventListener('touchstart', () => this.stopAutoplay());
                phoneScreen.addEventListener('touchend', () => this.startAutoplay());
            }
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.previousSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });
        },
        
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.updateCarousel();
            this.resetAutoplay();
        },
        
        previousSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.updateCarousel();
            this.resetAutoplay();
        },
        
        goToSlide(index) {
            this.currentIndex = index;
            this.updateCarousel();
            this.resetAutoplay();
        },
        
        updateCarousel() {
            // Update slides
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentIndex);
            });
            
            // Update indicators
            this.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        },
        
        startAutoplay() {
            this.stopAutoplay(); // Clear any existing intervals
            this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplayDelay);
        },
        
        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        },
        
        resetAutoplay() {
            this.startAutoplay();
        }
    };
    
    // Initialize carousel
    carousel.init();
    
    console.log('✨ Screenshot carousel initialized!');
});

