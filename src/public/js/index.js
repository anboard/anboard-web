// header toggle
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.querySelector(".menu-toggle");
  const openIcon = menuToggle.querySelector(".open-icon");
  const closeIcon = menuToggle.querySelector(".close-icon");

  if (navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    openIcon.style.display = "inline";
    closeIcon.style.display = "none";
  } else {
    navMenu.classList.add("active");
    openIcon.style.display = "none";
    closeIcon.style.display = "inline";
  }
}

// Toggles dropdown menu visibility on click
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);

  // Close any other open dropdowns
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    if (menu !== dropdown) {
      menu.classList.remove('show');
    }
  });

  // Toggle the selected dropdown
  dropdown.classList.toggle('show');
}

// Closes all dropdowns when clicking outside
document.addEventListener('click', (event) => {
  const isDropdown = event.target.closest('.dropdown');
  const isDropdownMenu = event.target.closest('.dropdown-menu');

  if (!isDropdown && !isDropdownMenu) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
  }
});




function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.querySelector(".menu-toggle");
  const openIcon = menuToggle.querySelector(".open-icon");
  const closeIcon = menuToggle.querySelector(".close-icon");

  navMenu.classList.toggle("active");

  // Show/hide menu icons
  if (navMenu.classList.contains("active")) {
    openIcon.style.display = "none";
    closeIcon.style.display = "block";
  } else {
    openIcon.style.display = "block";
    closeIcon.style.display = "none";
  }
}

// Close menu when clicking outside
window.addEventListener("click", (e) => {
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove("active");
    menuToggle.querySelector(".open-icon").style.display = "block";
    menuToggle.querySelector(".close-icon").style.display = "none";
  }
});









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



// member toggle page section
function toggleSection(section) {
  const videoSection = document.getElementById('video-section');
  const audioSection = document.getElementById('audio-section');
  
  const videoButton = document.getElementById('video-toggle');
  const audioButton = document.getElementById('audio-toggle');
  
  if (section === 'video') {
    videoSection.style.display = 'block';
    audioSection.style.display = 'none';
    videoButton.classList.add('active');
    audioButton.classList.remove('active');
  } else {
    videoSection.style.display = 'none';
    audioSection.style.display = 'block';
    audioButton.classList.add('active');
    videoButton.classList.remove('active');
  }
}

// member page section
