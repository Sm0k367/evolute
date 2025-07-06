// --- Global Background Effects (Placeholder for WebGL/Rive Integration) ---
// In a real 1000x scenario, this would load a Three.js scene, Rive animation, or a sophisticated particle system.
// For now, it serves as a conceptual hook for where that advanced rendering would attach.
function initializeGlobalBackgroundEffects() {
    const bgContainer = document.getElementById('global-background-effects');
    if (!bgContainer) return;

    // Example placeholder: If you were to integrate Three.js:
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // const renderer = new THREE.WebGLRenderer({ alpha: true });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // bgContainer.appendChild(renderer.domElement);
    //
    // function animate() {
    //     requestAnimationFrame(animate);
    //     // Add your generative art / neural network animation logic here
    //     renderer.render(scene, camera);
    // }
    // animate();

    // For a simpler, immediate visual, we can use CSS animations on the container,
    // which is already set up in style.css for `global-background-effects`.
    // The previous neural-node JS is now removed as a full WebGL/Rive replacement is implied here.
    console.log('Global background effects initialized (placeholder for WebGL/Rive).');
}

// --- Live Stats Counter Animation & Continuous Increment ---
function animateStats() {
    const stats = {
        creationsCount: { elementId: 'creationsCount', target: 48000, current: 47293, isHero: true }, // Hero stat
        activeCreatorsCount: { elementId: 'activeCreatorsCount', target: 16500, current: 15200 }, // Hero stat
        videosGeneratedCount: { elementId: 'videosGeneratedCount', target: 13500, current: 12700 },
        totalViewsCount: { elementId: 'totalViewsCount', target: 2800000, current: 2400000 },
        viralHitsCount: { elementId: 'viralHitsCount', target: 950, current: 847 },
        engagementRate: { elementId: 'engagementRate', target: 99, current: 98, suffix: '%' }
    };

    Object.values(stats).forEach(stat => {
        const element = document.getElementById(stat.elementId);
        if (!element) return;

        let start = stat.current;
        const end = stat.target;
        const duration = 2000; // milliseconds
        const range = end - start;
        let startTime = null;

        function formatNumber(num, isViews = false) {
            if (isViews) {
                if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
                if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
            }
            return Math.floor(num).toLocaleString();
        }

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Ease-in-out
                const value = start + (range * easedProgress);
                element.textContent = formatNumber(value, stat.elementId === 'totalViewsCount') + (stat.suffix || '');
                requestAnimationFrame(animate);
            } else {
                element.textContent = formatNumber(end, stat.elementId === 'totalViewsCount') + (stat.suffix || '');
                // Continuous increment for hero creationsCount
                if (stat.isHero && stat.elementId === 'creationsCount') {
                    setInterval(() => {
                        stat.target += Math.floor(Math.random() * 5) + 1; // Increment by 1-5
                        stat.current = stat.target; // Keep current aligned for display
                        element.textContent = stat.target.toLocaleString();
                    }, 3000); // Update every 3 seconds
                }
            }
        };
        requestAnimationFrame(animate);
    });
}


// --- Intersection Observer for Scroll-Triggered Fade-in/Slide-up Animations ---
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

function setupFadeInAnimations() {
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// --- Manifestation Interface Logic ---
const videoEmbedURL = "https://www.youtube.com/embed/YOUR_DEMO_VIDEO_ID?autoplay=1&controls=0&modestbranding=1&rel=0"; // CRITICAL: Replace with your actual YouTube video ID

function setupManifestationInterface() {
    const manifestButton = document.getElementById('manifestButton');
    const visionPrompt = document.getElementById('visionPrompt');
    const loadingAnimation = document.getElementById('loadingAnimation');
    const videoContainer = document.getElementById('videoContainer');
    const videoPlaceholderContent = document.getElementById('videoPlaceholderContent');
    const playDemoButton = document.getElementById('playDemoButton');
    const shareOptions = document.getElementById('shareGeneratedContent');

    if (!manifestButton || !visionPrompt || !loadingAnimation || !videoContainer || !videoPlaceholderContent || !playDemoButton || !shareOptions) {
        console.warn('One or more manifestation interface elements not found. Skipping setup.');
        return;
    }

    // Initial state: show placeholder, hide loading, hide share
    videoContainer.style.display = 'block';
    loadingAnimation.style.display = 'none';
    shareOptions.style.display = 'none';
    videoPlaceholderContent.style.display = 'flex'; // Ensure placeholder is visible initially

    playDemoButton.addEventListener('click', () => {
        // Hide placeholder and load video
        videoPlaceholderContent.style.display = 'none';
        videoContainer.innerHTML = `<iframe src="${videoEmbedURL}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        videoContainer.classList.add('is-visible'); // Trigger fade-in for the video
    });

    manifestButton.addEventListener('click', () => {
        const promptText = visionPrompt.value.trim();
        if (promptText === '') {
            alert('Please enter your vision to manifest!');
            return;
        }

        // 1. Hide video/placeholder, show loading animation
        videoContainer.style.display = 'none';
        shareOptions.style.display = 'none'; // Hide share options if visible
        loadingAnimation.style.display = 'flex'; // Show loading
        loadingAnimation.classList.add('is-visible'); // Fade in loading

        // Simulate AI generation time
        setTimeout(() => {
            // In a real app, this would be an API call to your backend
            // const generatedVideoURL = callYourAIGenerationAPI(promptText);

            // For demo: Hide loading, show video, show share options
            loadingAnimation.classList.remove('is-visible');
            loadingAnimation.style.display = 'none';

            // Replace with the actual generated video (or the demo for now)
            videoContainer.innerHTML = `<iframe src="${videoEmbedURL}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            videoContainer.style.display = 'block';
            videoContainer.classList.add('is-visible'); // Trigger fade-in

            shareOptions.style.display = 'flex'; // Show share options
            shareOptions.classList.add('is-visible'); // Trigger fade-in for share

        }, 4000); // Simulate 4 seconds of generation
    });
}

// --- Social Share Logic ---
function setupSocialSharing() {
    document.querySelectorAll('.social-share-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const shareType = event.currentTarget.dataset.share;
            const pageUrl = window.location.href;
            const shareText = "Witness my vision manifested by Evolute AI! Beyond creation, the dawn of sentient manifestation. #EvoluteAI #AIcreation"; // Customize share text

            let shareLink = '';

            switch (shareType) {
                case 'twitter':
                    shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`;
                    break;
                case 'facebook':
                    shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
                    break;
                case 'linkedin':
                    shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(pageUrl).then(() => {
                        alert('Link copied to clipboard!');
                    }).catch(err => {
                        console.error('Failed to copy link: ', err);
                    });
                    return; // Don't open new window for copy
                default:
                    return;
            }

            window.open(shareLink, '_blank', 'width=600,height=400');
        });
    });
}

// --- Dynamic Gallery Showcase (Conceptual) ---
// In a 1000x scenario, this would fetch data from an API
// representing AI-generated content (video, image, audio)
// and populate the gallery dynamically.
function loadShowcaseGallery() {
    const gallery = document.getElementById('showcaseGallery');
    if (!gallery) return;

    // Simulate fetching data for 6 items
    const demoItems = [
        { type: 'video', src: 'https://www.youtube.com/embed/YOUR_SHORT_VIDEO_ID_1?controls=0&modestbranding=1&rel=0&autoplay=0&mute=1', thumbnail: 'https://img.youtube.com/vi/YOUR_SHORT_VIDEO_ID_1/mqdefault.jpg', title: 'Cyberpunk Metamorphosis', description: 'A city breathes, shifts, and evolves.' },
        { type: 'image', src: 'https://via.placeholder.com/600x450/5B1FFF/FFFFFF?text=AI+Design+1', thumbnail: 'https://via.placeholder.com/300x225/5B1FFF/FFFFFF?text=AI+Design+1_thumb', title: 'Neo-Organic Architecture', description: 'Concepts beyond human design.' },
        { type: 'video', src: 'https://www.youtube.com/embed/YOUR_SHORT_VIDEO_ID_2?controls=0&modestbranding=1&rel=0&autoplay=0&mute=1', thumbnail: 'https://img.youtube.com/vi/YOUR_SHORT_VIDEO_ID_2/mqdefault.jpg', title: 'Cosmic Soundscape', description: 'Visuals to a SoundForge composition.' },
        { type: 'image', src: 'https://via.placeholder.com/600x450/FF5B00/FFFFFF?text=AI+Design+2', thumbnail: 'https://via.placeholder.com/300x225/FF5B00/FFFFFF?text=AI+Design+2_thumb', title: 'Abstract Sentience', description: 'A peek into the AI consciousness.' },
        { type: 'video', src: 'https://www.youtube.com/embed/YOUR_SHORT_VIDEO_ID_3?controls=0&modestbranding=1&rel=0&autoplay=0&mute=1', thumbnail: 'https://img.youtube.com/vi/YOUR_SHORT_VIDEO_ID_3/mqdefault.jpg', title: 'Ethereal Forest', description: 'Dreamscapes brought to life.' },
        { type: 'image', src: 'https://via.placeholder.com/600x450/4CAF50/FFFFFF?text=AI+Code+Viz', thumbnail: 'https://via.placeholder.com/300x225/4CAF50/FFFFFF?text=AI+Code+Viz_thumb', title: 'CodeSynth Visualization', description: 'The beauty of AI-generated logic.' }
    ];

    // CRITICAL: Replace YOUR_SHORT_VIDEO_ID_X with actual YouTube video IDs for your showcase snippets.
    // Replace placeholder image URLs with actual images/thumbnails of your AI-generated content.

    // Clear placeholders and populate
    gallery.innerHTML = '';
    demoItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in';
        galleryItem.style.transitionDelay = `${index * 0.1}s`; // Stagger fade-in

        let mediaElement;
        if (item.type === 'video') {
            mediaElement = document.createElement('img'); // Use img for thumbnail initially
            mediaElement.src = item.thumbnail;
            mediaElement.alt = item.title;
            // Add a play icon overlay if it's a video thumbnail
            const playIconOverlay = document.createElement('div');
            playIconOverlay.className = 'play-icon-overlay material-symbols-outlined';
            playIconOverlay.textContent = 'play_arrow';
            galleryItem.appendChild(playIconOverlay);
            // On click, load the actual iframe for video
            galleryItem.addEventListener('click', () => {
                const videoIframe = document.createElement('iframe');
                videoIframe.src = `${item.src}&autoplay=1`;
                videoIframe.setAttribute('frameborder', '0');
                videoIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                videoIframe.setAttribute('allowfullscreen', '');
                galleryItem.innerHTML = ''; // Clear thumbnail and play icon
                galleryItem.appendChild(videoIframe);
            });
        } else {
            mediaElement = document.createElement('img');
            mediaElement.src = item.src;
            mediaElement.alt = item.title;
        }

        const overlayContent = document.createElement('div');
        overlayContent.className = 'overlay-content';
        overlayContent.innerHTML = `<h4>${item.title}</h4><p>${item.description}</p>`;

        galleryItem.appendChild(mediaElement);
        galleryItem.appendChild(overlayContent);
        gallery.appendChild(galleryItem);
    });

    // Manually observe items after they're added
    gallery.querySelectorAll('.gallery-item').forEach(element => {
        observer.observe(element);
    });
}


// --- Smooth Scrolling for internal links ---
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


// --- DOM Content Loaded - Initialize everything ---
document.addEventListener('DOMContentLoaded', function() {
    initializeGlobalBackgroundEffects(); // Setup advanced background (conceptual)
    animateStats(); // Start all stat animations
    setupManifestationInterface(); // Setup prompt and video player
    setupSocialSharing(); // Setup social sharing buttons
    loadShowcaseGallery(); // Load dynamic gallery items

    // Ensure hero content fades in first
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('is-visible');
    }

    // Set up other section fade-in animations after a slight delay
    // to prevent immediate trigger on page load for elements high up
    setTimeout(() => {
        setupFadeInAnimations();
    }, 500); // Give hero section a moment to animate
});
