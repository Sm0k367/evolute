// Neural Network Node Generation and Movement
function createNeuralNetwork() {
    const network = document.getElementById('neuralNetwork');
    if (!network) return;

    const nodeCount = 60; // Slightly more nodes for a denser look
    network.innerHTML = ''; // Clear any existing nodes

    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';

        // Set random start/end positions for animation variables
        const x1 = Math.random() * 100 + 'vw';
        const y1 = Math.random() * 100 + 'vh';
        const x2 = Math.random() * 100 + 'vw';
        const y2 = Math.random() * 100 + 'vh';
        const x3 = Math.random() * 100 + 'vw';
        const y3 = Math.random() * 100 + 'vh';
        const x4 = Math.random() * 100 + 'vw';
        const y4 = Math.random() * 100 + 'vh';

        node.style.setProperty('--x1', x1);
        node.style.setProperty('--y1', y1);
        node.style.setProperty('--x2', x2);
        node.style.setProperty('--y2', y2);
        node.style.setProperty('--x3', x3);
        node.style.setProperty('--y3', y3);
        node.style.setProperty('--x4', x4);
        node.style.setProperty('--y4', y4);

        node.style.animationDelay = Math.random() * 5 + 's'; // Stagger start times
        node.style.animationDuration = (20 + Math.random() * 10) + 's'; // Vary duration
        network.appendChild(node);
    }
}

// Live Stats Counter Animation
function animateStats() {
    const stats = {
        creationsCount: { element: document.getElementById('creationsCount'), target: 47293, current: 45000 },
        videosGenerated: { element: document.getElementById('videosGenerated'), target: 12700, current: 12000 },
        totalViews: { element: document.getElementById('totalViews'), target: 2400000, current: 2300000 },
        viralHits: { element: document.getElementById('viralHits'), target: 847, current: 820 },
        activeCreators: { element: document.getElementById('activeCreators'), target: 15200, current: 14800 }
    };

    Object.values(stats).forEach(stat => {
        if (!stat.element) return; // Skip if element not found

        const increment = (stat.target - stat.current) / 100; // Divide into 100 steps
        let steps = 0;
        const timer = setInterval(() => {
            stat.current += increment;
            steps++;

            if (steps >= 100) { // Ensure it stops exactly at target
                stat.current = stat.target;
                clearInterval(timer);
            }

            let displayValue = Math.floor(stat.current);
            if (stat.target >= 1000000) {
                displayValue = (displayValue / 1000000).toFixed(1) + 'M';
            } else if (stat.target >= 1000) {
                displayValue = (displayValue / 1000).toFixed(1) + 'K';
            }

            stat.element.textContent = displayValue;
        }, 30); // Faster animation speed
    });
}

// Continuous increment for Hero Creations Count
function startHeroCreationsCounter() {
    const creationsCountElement = document.getElementById('creationsCount');
    if (!creationsCountElement) return;

    // Initialize if it's still at its default (starting) value or lower than target
    let currentCount = parseInt(creationsCountElement.textContent.replace(/[^\d]/g, '')) || 47293;

    setInterval(() => {
        currentCount += Math.floor(Math.random() * 5) + 1; // Increment by 1-5
        creationsCountElement.textContent = currentCount.toLocaleString();
    }, 3000); // Update every 3 seconds
}


// Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // element is 10% visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

// Function to observe all elements with 'fade-in' class
function setupFadeInAnimations() {
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}


// Smooth Scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// DOM Content Loaded - Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    createNeuralNetwork(); // Start the background neural network animation
    setupFadeInAnimations(); // Set up scroll-triggered animations

    // Start stat animations when the page loads
    animateStats();
    startHeroCreationsCounter(); // Start the continuous hero counter

    // --- Optional: Add a subtle loading screen or initial animation
    // Example: Fade in the content-wrapper after a short delay
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        setTimeout(() => {
            contentWrapper.style.opacity = '1';
            contentWrapper.style.transition = 'opacity 1s ease-in';
        }, 100); // A very slight delay
    }

});

// --- Future enhancements could go here:
// - Dynamic video loading (if you had an API for the "Generate" button)
// - More complex interactive elements
// - Parallax effects
// - WebGL integrations for truly advanced visuals
