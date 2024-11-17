document.addEventListener('DOMContentLoaded', function() {
    const mainCarousel = document.querySelector('.main-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    
    // Function to update the active slide and thumbnail
    function updateSlide(index) {
        // Remove active class from all slides and thumbnails
        slides.forEach(slide => slide.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to current slide and thumbnail
        slides[index].classList.add('active');
        thumbnails[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Previous button click handler
    prevButton.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        updateSlide(newIndex);
    });
    
    // Next button click handler
    nextButton.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        updateSlide(newIndex);
    });
    
    // Thumbnail click handlers
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    mainCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    mainCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevButton.click();
            } else {
                nextButton.click();
            }
        }
    }
    
    // Auto-advance carousel (optional)
    // Uncomment the following code if you want auto-advancing
    /*
    const autoAdvanceInterval = 5000; // 5 seconds
    
    setInterval(() => {
        nextButton.click();
    }, autoAdvanceInterval);
    */
});