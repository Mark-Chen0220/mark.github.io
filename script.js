// Smooth scrolling for navigation links
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu after clicking (if open)
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".carousel-item");
    const leftBtn = document.querySelector(".carousel-btn.left");
    const rightBtn = document.querySelector(".carousel-btn.right");
    const totalItems = items.length;
    let currentIndex = 0;
    const autoScrollInterval = 3000; // 3 seconds

    // Function to update carousel positions
    function updateCarousel() {
        items.forEach((item, index) => {
            const offset = (index - currentIndex + totalItems) % totalItems;
            let translateX, scale, opacity, zIndex, shadow;

            // Center image (offset 0)
            if (offset === 0) {
                translateX = 0;
                scale = 1.2;
                opacity = 1;
                zIndex = 10;
                shadow = "0 10px 20px rgba(0, 0, 0, 0.3)";
            }
            // Adjacent images (offset 1 or totalItems - 1)
            else if (offset === 1 || offset === totalItems - 1) {
                translateX = offset === 1 ? 200 : -200;
                scale = 0.8;
                opacity = 0.7;
                zIndex = 5;
                shadow = "0 5px 10px rgba(0, 0, 0, 0.2)";
            }
            // Edge images (offset 2 or totalItems - 2)
            else {
                translateX = offset <= 2 ? 350 : -350;
                scale = 0.6;
                opacity = 0.4;
                zIndex = 1;
                shadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
            }

            item.style.transform = `translateX(${translateX}px) scale(${scale}) translateY(-50%)`;
            item.style.opacity = opacity;
            item.style.zIndex = zIndex;
            item.querySelector("img").style.boxShadow = shadow;
        });
    }

    // Auto-scroll function
    function autoScroll() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    // Button event listeners
    leftBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
        resetAutoScroll();
    });

    rightBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
        resetAutoScroll();
    });

    // Auto-scroll with pause on interaction
    let intervalId = setInterval(autoScroll, autoScrollInterval);

    function resetAutoScroll() {
        clearInterval(intervalId);
        intervalId = setInterval(autoScroll, autoScrollInterval);
    }

    carousel.addEventListener("mouseenter", () => clearInterval(intervalId));
    carousel.addEventListener("mouseleave", () => {
        intervalId = setInterval(autoScroll, autoScrollInterval);
    });

    // Initial setup
    updateCarousel();
});