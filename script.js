document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.left-arrow');
    const nextButton = document.querySelector('.right-arrow');
    let currentSlideIndex = 1; // Starts from the second slide (index 1)
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('current-slide', 'prev-slide', 'next-slide');
            slide.style.transition = 'opacity 1s ease-in-out'; // Ensures smooth fade transition
            if (index === currentSlideIndex) {
                slide.classList.add('current-slide');
                slide.style.opacity = 1;
            } else if (index === (currentSlideIndex - 1 + slides.length) % slides.length) {
                slide.classList.add('prev-slide');
                slide.style.opacity = 0;
            } else {
                slide.classList.add('next-slide');
                slide.style.opacity = 0;
            }
        });
    }

    // Set initial state of the slideshow
    updateSlides();

    // Click to navigate slides
    prevButton.addEventListener('click', function () {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlides();
    });

    nextButton.addEventListener('click', function () {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlides();
    });

    // Mouse drag functionality for desktop users
    const slideshowContainer = document.querySelector('.slideshow-container');

    slideshowContainer.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX;
        scrollLeft = slideshowContainer.scrollLeft;
        slideshowContainer.style.cursor = 'grabbing'; // Change cursor on drag
    });

    slideshowContainer.addEventListener('mouseleave', () => {
        isMouseDown = false;
        slideshowContainer.style.cursor = 'grab'; // Reset cursor
    });

    slideshowContainer.addEventListener('mouseup', () => {
        isMouseDown = false;
        slideshowContainer.style.cursor = 'grab'; // Reset cursor
    });

    slideshowContainer.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        const x = e.pageX;
        const walk = (x - startX) * 3; // Scroll speed (can adjust the multiplier to change speed)
        slideshowContainer.scrollLeft = scrollLeft - walk;
    });

    // Swipe functionality for touch devices
    let touchStartX = 0;

    slideshowContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
    });

    slideshowContainer.addEventListener('touchmove', (e) => {
        const touchEndX = e.touches[0].pageX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 30) {
            if (diff > 0) {
                // Swipe left
                currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            } else {
                // Swipe right
                currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            }
            updateSlides();
            touchStartX = touchEndX; // reset touchStartX to avoid multiple detections
        }
    });

    // Keyboard arrow functionality
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateSlides();
        } else if (e.key === 'ArrowRight') {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlides();
        }
    });
});
