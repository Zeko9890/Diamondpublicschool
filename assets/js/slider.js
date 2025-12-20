// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize slider
    function initSlider() {
        if (slides.length === 0) return;
        
        // Show first slide
        showSlide(currentSlide);
        
        // Start autoplay
        startAutoplay();
        
        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Pause autoplay on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', pauseAutoplay);
            sliderContainer.addEventListener('mouseleave', startAutoplay);
        }
    }
    
    // Show specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate corresponding dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        showSlide(index);
    }
    
    // Start autoplay
    function startAutoplay() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000); // Change slide every 5 seconds
    }
    
    // Pause autoplay
    function pauseAutoplay() {
        clearInterval(slideInterval);
    }
    
    // Initialize the slider
    initSlider();
});