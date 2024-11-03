function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const anbContain1 = document.querySelector('.anbcontain1');
    const anbContain2 = document.querySelector('.anbcontain2');
    menuToggle.classList.toggle('active');
    anbContain1.classList.toggle('active');
    anbContain2.classList.toggle('active');
}

//index page section3 carousel
document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector('.carousel-track');
    const nextButton = document.getElementById('nextButton');

    if (!track || !nextButton) {
        console.error("Carousel elements are not found. Please check your HTML structure.");
        return;
    }

    let currentIndex = 0;
    const cards = document.querySelectorAll('.card');
    const totalCards = cards.length;
    const visibleCards = 5; // Number of cards to show at a time

    function moveToNextCard() {
        if (totalCards <= visibleCards) {
            return; // No need to scroll if total cards are less than or equal to visible cards
        }

        currentIndex += 1;
        if (currentIndex > totalCards - visibleCards) {
            currentIndex = 0; // Reset to the start when reaching the end
        }

        const cardWidth = cards[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * (cardWidth + 16)}px)`;
    }

    // Auto-scroll every 5 seconds
    setInterval(moveToNextCard, 5000);

    // Scroll on button click
    nextButton.addEventListener('click', moveToNextCard);
});
//index page section3 carousel


// indexpage section5 carousel
document.addEventListener("DOMContentLoaded", () => {
    const carouselSlide = document.querySelector('.carousel-slide');
    const testimonials = document.querySelectorAll('.testimonial');

    let currentIndex = 0;
    const slideInterval = 10000; // 10 seconds

    function moveToSlide(index) {
        currentIndex = index;
        carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Next button
    const nextButton = document.querySelector('.carousel-control.next');
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            moveToSlide(currentIndex);
        });
    }

    // Previous button
    const prevButton = document.querySelector('.carousel-control.prev');
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            moveToSlide(currentIndex);
        });
    }

    // Auto-slide every 10 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        moveToSlide(currentIndex);
    }, slideInterval);
});

// indexpage section5 carousel
