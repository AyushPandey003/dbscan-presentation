// Initialize Reveal.js presentation
Reveal.initialize({
    // Display controls in the bottom right corner
    controls: true,
    
    // Display a presentation progress bar
    progress: true,
    
    // Display the page number of the current slide
    slideNumber: 'c/t',
    
    // Add the current slide number to the hash so that reloading the
    // page/copying the URL will return you to the same slide
    hash: true,
    
    // Enable keyboard shortcuts for navigation
    keyboard: true,
    
    // Enable the slide overview mode
    overview: true,
    
    // Vertical centering of slides
    center: false,
    
    // Enable touch navigation on mobile devices
    touch: true,
    
    // Loop the presentation
    loop: false,
    
    // Change the presentation direction to be RTL
    rtl: false,
    
    // Randomizes the order of slides each time the presentation loads
    shuffle: false,
    
    // Turns fragments on and off globally
    fragments: true,
    
    // Flags whether to include the current fragment in the URL,
    // so that reloading brings you to the same fragment position
    fragmentInURL: true,
    
    // Flags if the presentation is running in an embedded mode,
    // i.e. contained within a limited portion of the screen
    embedded: false,
    
    // Flags if we should show a help overlay when the questionmark
    // key is pressed
    help: true,
    
    // Flags if it should be possible to pause the presentation (blackout)
    pause: true,
    
    // Flags if speaker notes should be visible to all viewers
    showNotes: false,
    
    // Global override for autoplaying embedded media (video/audio/iframe)
    autoPlayMedia: null,
    
    // Global override for preloading lazy-loaded iframes
    preloadIframes: null,
    
    // Number of milliseconds between automatically proceeding to the
    // next slide, disabled when set to 0, this value can be overwritten
    // by using a data-autoslide attribute on your slides
    autoSlide: 0,
    
    // Stop auto-sliding after user input
    autoSlideStoppable: true,
    
    // Use this method for navigation when auto-sliding
    autoSlideMethod: null,
    
    // Specify the average time in seconds that you think you'll spend
    // presenting each slide. This is used to show a pacing timer in the
    // speaker view
    defaultTiming: null,
    
    // Enable slide navigation via mouse wheel
    mouseWheel: false,
    
    // Apply a 3D roll to links on hover
    rollingLinks: false,
    
    // Hides the address bar on mobile devices
    hideAddressBar: true,
    
    // Opens links in an iframe preview overlay
    previewLinks: false,
    
    // Transition style
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    
    // Transition speed
    transitionSpeed: 'default', // default/fast/slow
    
    // Transition style for full page slide backgrounds
    backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
    
    // Number of slides away from the current that are visible
    viewDistance: 3,
    
    // Number of slides away from the current that are visible on mobile
    // devices. It is advisable to set this to a lower number than
    // viewDistance in order to save resources.
    mobileViewDistance: 2,
    
    // The display mode that will be used to show slides
    display: 'block',
    
    // Hide cursor if inactive
    hideInactiveCursor: true,
    
    // Time before the cursor is hidden (in ms)
    hideCursorTime: 5000,
    
    // Plugin configuration
    plugins: [
        RevealHighlight,
        RevealZoom,
        RevealNotes
    ],
    
    // Highlight.js configuration
    highlight: {
        highlightOnLoad: true,
        escapeHTML: false
    },
    
    // Zoom configuration
    zoom: {
        scale: 2
    }
});

// Custom JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.classList.add('reveal-loaded');
    
    // Custom keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Press 'f' for fullscreen
        if (event.key === 'f' || event.key === 'F') {
            toggleFullscreen();
        }
        
        // Press 't' to toggle theme (if needed)
        if (event.key === 't' || event.key === 'T') {
            toggleTheme();
        }
        
        // Press 'h' for help
        if (event.key === 'h' || event.key === 'H') {
            showHelp();
        }
    });
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize custom features
    initializeProgressIndicator();
    initializeSlideCounter();
    addAccessibilityFeatures();
    initializeCodeHighlighting();
    
    // Add touch gesture support for mobile
    if (isMobileDevice()) {
        initializeTouchGestures();
    }
});

// Fullscreen functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err.message);
        });
    } else {
        document.exitFullscreen();
    }
}

// Theme toggle functionality (for future enhancement)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Help modal
function showHelp() {
    const helpContent = `
        <div class="help-modal">
            <div class="help-content">
                <h3>Keyboard Shortcuts</h3>
                <ul>
                    <li><strong>→ / ↓</strong> - Next slide</li>
                    <li><strong>← / ↑</strong> - Previous slide</li>
                    <li><strong>Space</strong> - Next slide</li>
                    <li><strong>Esc</strong> - Slide overview</li>
                    <li><strong>F</strong> - Fullscreen</li>
                    <li><strong>S</strong> - Speaker notes</li>
                    <li><strong>B</strong> - Blackout</li>
                    <li><strong>?</strong> - Show this help</li>
                </ul>
                <button onclick="closeHelp()" class="btn btn--primary">Close</button>
            </div>
        </div>
    `;
    
    const helpModal = document.createElement('div');
    helpModal.innerHTML = helpContent;
    helpModal.className = 'help-overlay';
    helpModal.onclick = function(e) {
        if (e.target === helpModal) closeHelp();
    };
    
    document.body.appendChild(helpModal);
}

function closeHelp() {
    const helpModal = document.querySelector('.help-overlay');
    if (helpModal) {
        helpModal.remove();
    }
}

// Progress indicator enhancement
function initializeProgressIndicator() {
    const progressBar = document.querySelector('.reveal .progress span');
    if (progressBar) {
        // Add glow effect on progress
        progressBar.style.boxShadow = '0 0 10px var(--primary-neon)';
    }
}

// Slide counter enhancement
function initializeSlideCounter() {
    Reveal.on('slidechanged', function(event) {
        const slideNumber = document.querySelector('.reveal .slide-number');
        if (slideNumber) {
            // Add animation to slide number changes
            slideNumber.style.transform = 'scale(1.1)';
            setTimeout(() => {
                slideNumber.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Update browser title with current slide
        const slideTitle = event.currentSlide.querySelector('h1, h2');
        if (slideTitle) {
            document.title = `${slideTitle.textContent} - DBSCAN Presentation`;
        }
    });
}

// Accessibility features
function addAccessibilityFeatures() {
    // Add ARIA labels to navigation
    const controls = document.querySelectorAll('.reveal .controls button');
    controls.forEach(control => {
        if (control.classList.contains('navigate-left')) {
            control.setAttribute('aria-label', 'Previous slide');
        } else if (control.classList.contains('navigate-right')) {
            control.setAttribute('aria-label', 'Next slide');
        } else if (control.classList.contains('navigate-up')) {
            control.setAttribute('aria-label', 'Previous vertical slide');
        } else if (control.classList.contains('navigate-down')) {
            control.setAttribute('aria-label', 'Next vertical slide');
        }
    });
    
    // Add skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#content';
    skipLink.textContent = 'Skip to content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-neon);
        color: var(--dark-bg);
        padding: 8px;
        border-radius: 4px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add content landmark
    const slides = document.querySelector('.reveal .slides');
    slides.setAttribute('id', 'content');
    slides.setAttribute('role', 'main');
    slides.setAttribute('aria-label', 'Presentation slides');
}

// Enhanced code highlighting
function initializeCodeHighlighting() {
    // Add copy button to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement;
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'code-copy-btn';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--accent-blue);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        copyButton.onclick = function() {
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        };
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        pre.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
    });
}

// Mobile device detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Touch gesture support for mobile
function initializeTouchGestures() {
    let startX, startY, endX, endY;
    const threshold = 50; // Minimum distance for swipe
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - next slide
                Reveal.next();
            } else {
                // Swipe right - previous slide
                Reveal.prev();
            }
        }
        
        // Vertical swipe
        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
            if (diffY > 0) {
                // Swipe up - next vertical slide
                Reveal.down();
            } else {
                // Swipe down - previous vertical slide
                Reveal.up();
            }
        }
    });
}

// Animation utilities
function animateOnSlideChange() {
    Reveal.on('slidechanged', function(event) {
        // Add entrance animations to elements
        const elements = event.currentSlide.querySelectorAll('h1, h2, .fragment');
        elements.forEach((el, index) => {
            if (!el.classList.contains('fragment')) {
                el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
            }
        });
    });
}

// Performance optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload next slide images
    Reveal.on('slidechanged', function(event) {
        const nextSlide = Reveal.getSlide(Reveal.getIndices().h + 1);
        if (nextSlide) {
            const nextImages = nextSlide.querySelectorAll('img');
            nextImages.forEach(img => {
                if (img.dataset.src) {
                    const preloadImg = new Image();
                    preloadImg.src = img.dataset.src;
                }
            });
        }
    });
}

// Initialize additional features after Reveal.js is ready
Reveal.on('ready', function() {
    animateOnSlideChange();
    optimizePerformance();
    
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .help-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .help-content {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 12px;
            border: 2px solid var(--primary-neon);
            box-shadow: 0 0 40px rgba(0, 255, 255, 0.5);
            max-width: 500px;
            color: var(--text-primary);
        }
        
        .help-content h3 {
            color: var(--primary-neon);
            margin-bottom: 1rem;
        }
        
        .help-content ul {
            list-style: none;
            padding: 0;
            margin: 1rem 0;
        }
        
        .help-content li {
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .help-content strong {
            color: var(--accent-teal);
            font-family: monospace;
        }
        
        .skip-link:focus {
            top: 6px !important;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add presentation metadata
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Professional presentation on DBSCAN clustering algorithm, comparing relative merits with OPTICS and HDBSCAN, covering clustering tendency assessment and quality metrics analysis.';
    document.head.appendChild(meta);
    
    console.log('DBSCAN Presentation loaded successfully!');
    console.log('Total slides:', Reveal.getTotalSlides());
    console.log('Use arrow keys, space, or swipe to navigate');
    console.log('Press "?" for help, "F" for fullscreen, "ESC" for overview');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Presentation error:', e.error);
});

// Service worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(function(error) {
        console.log('Service Worker registration failed:', error);
    });
}