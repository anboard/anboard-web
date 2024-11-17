// header toggle
  function toggleMenu() {
    const navWrapper = document.querySelector('.nav-wrapper');
    const openIcon = document.querySelector('.menu-toggle .open-icon');
    const closeIcon = document.querySelector('.menu-toggle .close-icon');
    navWrapper.classList.toggle('active');
    openIcon.style.display = openIcon.style.display === 'none' ? 'inline' : 'none';
    closeIcon.style.display = closeIcon.style.display === 'none' ? 'inline' : 'none';
  }

  function openModal() {
    document.getElementById('searchModal').style.display = 'block';
  }

  function closeModal() {
    document.getElementById('searchModal').style.display = 'none';
  }

  window.onclick = function(event) {
    const modal = document.getElementById('searchModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }




  
  // Function to search for a profile
  async function searchProfile() {
    const query = document.getElementById('searchInput').value.trim();
    const resultElement = document.getElementById('searchResult');
    resultElement.textContent = ''; // Clear previous results

    if (!query) {
      resultElement.textContent = 'Please enter a name or UPN number to search.';
      return;
    }

    try {
      // Send a request to the server to search for a profile
      const response = await fetch(`/search-profile?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (response.ok && data.profile) {
        // Display the profile information if found
        resultElement.textContent = `Name: ${data.profile.name}, UPN: ${data.profile.upn}`;
      } else {
        // Show "Profile not found" if no profile is found
        resultElement.textContent = 'Profile not found.';
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      resultElement.textContent = 'An error occurred. Please try again.';
    }
  }

  /* SEARCH MODAL */
// header about toggle

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



document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    // Click event to toggle dropdown visibility
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      // Close any other open dropdowns
      document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) {
          d.classList.remove('active');
        }
      });
      // Toggle the current dropdown
      dropdown.classList.toggle('active');
    });

    // Optional: Hover events to show/hide dropdown (works for larger screens)
    dropdown.addEventListener('mouseenter', () => {
      dropdown.classList.add('active');
    });

    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('active');
    });
  });

  // Click outside to close dropdowns
  document.addEventListener('click', (e) => {
    const isDropdownClick = e.target.closest('.dropdown');
    if (!isDropdownClick) {
      dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
  });
});


