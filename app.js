// Initialize Reveal.js presentation
Reveal.initialize({
  // Display controls in the bottom right corner
  controls: true,

  // Display a presentation progress bar
  progress: true,

  // Display the page number of the current slide
  slideNumber: "c/t",

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
  transition: "slide", // none/fade/slide/convex/concave/zoom

  // Transition speed
  transitionSpeed: "default", // default/fast/slow

  // Transition style for full page slide backgrounds
  backgroundTransition: "fade", // none/fade/slide/convex/concave/zoom

  // Number of slides away from the current that are visible
  viewDistance: 3,

  // Number of slides away from the current that are visible on mobile
  // devices. It is advisable to set this to a lower number than
  // viewDistance in order to save resources.
  mobileViewDistance: 2,

  // The display mode that will be used to show slides
  display: "block",

  // Hide cursor if inactive
  hideInactiveCursor: true,

  // Time before the cursor is hidden (in ms)
  hideCursorTime: 5000,

  // Plugin configuration
  plugins: [RevealHighlight, RevealZoom, RevealNotes],

  // Highlight.js configuration
  highlight: {
    highlightOnLoad: true,
    escapeHTML: false,
  },

  // Zoom configuration
  zoom: {
    scale: 2,
  },
});

// Custom JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // Add loading animation
  document.body.classList.add("reveal-loaded");

  // Custom keyboard shortcuts
  document.addEventListener("keydown", function (event) {
    // Press 'f' for fullscreen
    if (event.key === "f" || event.key === "F") {
      toggleFullscreen();
    }

    // Press 't' to toggle theme (if needed)
    if (event.key === "t" || event.key === "T") {
      toggleTheme();
    }

    // Press 'h' for help
    if (event.key === "h" || event.key === "H") {
      showHelp();
    }
  });

  // Add smooth scrolling behavior
  document.documentElement.style.scrollBehavior = "smooth";

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
    document.documentElement.requestFullscreen().catch((err) => {
      console.log("Error attempting to enable fullscreen:", err.message);
    });
  } else {
    document.exitFullscreen();
  }
}

// Theme toggle functionality (for future enhancement)
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains("dark-theme");

  if (isDark) {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
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

  const helpModal = document.createElement("div");
  helpModal.innerHTML = helpContent;
  helpModal.className = "help-overlay";
  helpModal.onclick = function (e) {
    if (e.target === helpModal) closeHelp();
  };

  document.body.appendChild(helpModal);
}

function closeHelp() {
  const helpModal = document.querySelector(".help-overlay");
  if (helpModal) {
    helpModal.remove();
  }
}

// Progress indicator enhancement
function initializeProgressIndicator() {
  const progressBar = document.querySelector(".reveal .progress span");
  if (progressBar) {
    // Add glow effect on progress
    progressBar.style.boxShadow = "0 0 10px var(--primary-neon)";
  }
}

// Slide counter enhancement
function initializeSlideCounter() {
  Reveal.on("slidechanged", function (event) {
    const slideNumber = document.querySelector(".reveal .slide-number");
    if (slideNumber) {
      // Add animation to slide number changes
      slideNumber.style.transform = "scale(1.1)";
      setTimeout(() => {
        slideNumber.style.transform = "scale(1)";
      }, 200);
    }

    // Update browser title with current slide
    const slideTitle = event.currentSlide.querySelector("h1, h2");
    if (slideTitle) {
      document.title = `${slideTitle.textContent} - DBSCAN Presentation`;
    }
  });
}

// Accessibility features
function addAccessibilityFeatures() {
  // Add ARIA labels to navigation
  const controls = document.querySelectorAll(".reveal .controls button");
  controls.forEach((control) => {
    if (control.classList.contains("navigate-left")) {
      control.setAttribute("aria-label", "Previous slide");
    } else if (control.classList.contains("navigate-right")) {
      control.setAttribute("aria-label", "Next slide");
    } else if (control.classList.contains("navigate-up")) {
      control.setAttribute("aria-label", "Previous vertical slide");
    } else if (control.classList.contains("navigate-down")) {
      control.setAttribute("aria-label", "Next vertical slide");
    }
  });

  // Add skip link for keyboard users
  const skipLink = document.createElement("a");
  skipLink.href = "#content";
  skipLink.textContent = "Skip to content";
  skipLink.className = "skip-link";
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
  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px";
  });
  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add content landmark
  const slides = document.querySelector(".reveal .slides");
  slides.setAttribute("id", "content");
  slides.setAttribute("role", "main");
  slides.setAttribute("aria-label", "Presentation slides");
}

// Enhanced code highlighting
function initializeCodeHighlighting() {
  // Add copy button to code blocks
  const codeBlocks = document.querySelectorAll("pre code");
  codeBlocks.forEach((codeBlock, index) => {
    const pre = codeBlock.parentElement;
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.className = "code-copy-btn";
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

    copyButton.onclick = function () {
      navigator.clipboard.writeText(codeBlock.textContent).then(() => {
        copyButton.textContent = "Copied!";
        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 2000);
      });
    };

    pre.style.position = "relative";
    pre.appendChild(copyButton);

    pre.addEventListener("mouseenter", () => {
      copyButton.style.opacity = "1";
    });

    pre.addEventListener("mouseleave", () => {
      copyButton.style.opacity = "0";
    });
  });
}

// Mobile device detection
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Touch gesture support for mobile
function initializeTouchGestures() {
  let startX, startY, endX, endY;
  const threshold = 50; // Minimum distance for swipe

  document.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", function (e) {
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
  Reveal.on("slidechanged", function (event) {
    // Add entrance animations to elements
    const elements = event.currentSlide.querySelectorAll("h1, h2, .fragment");
    elements.forEach((el, index) => {
      if (!el.classList.contains("fragment")) {
        el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
      }
    });
  });
}

// Performance optimizations
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Preload next slide images
  Reveal.on("slidechanged", function (event) {
    const nextSlide = Reveal.getSlide(Reveal.getIndices().h + 1);
    if (nextSlide) {
      const nextImages = nextSlide.querySelectorAll("img");
      nextImages.forEach((img) => {
        if (img.dataset.src) {
          const preloadImg = new Image();
          preloadImg.src = img.dataset.src;
        }
      });
    }
  });
}

// Initialize additional features after Reveal.js is ready
Reveal.on("ready", function () {
  animateOnSlideChange();
  optimizePerformance();

  // Add custom CSS animations
  const style = document.createElement("style");
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
  const meta = document.createElement("meta");
  meta.name = "description";
  meta.content =
    "Professional presentation on DBSCAN clustering algorithm, comparing relative merits with OPTICS and HDBSCAN, covering clustering tendency assessment and quality metrics analysis.";
  document.head.appendChild(meta);

  console.log("DBSCAN Presentation loaded successfully!");
  console.log("Total slides:", Reveal.getTotalSlides());
  console.log("Use arrow keys, space, or swipe to navigate");
  console.log('Press "?" for help, "F" for fullscreen, "ESC" for overview');

  // Initial chart creation - check current slide
  checkAndCreateCharts();
});

// Function to check and create charts
function checkAndCreateCharts() {
  console.log("checkAndCreateCharts called");

  // Use setTimeout to ensure DOM is fully rendered
  setTimeout(() => {
    if (document.getElementById("dbscan-interactive-chart")) {
      console.log("Creating interactive concepts chart...");
      createInteractiveConceptsChart();
    }
    if (document.getElementById("dbscan-demo-chart")) {
      console.log("Creating live demo chart...");
      createLiveDemoChart();
    }
  }, 100);
}

// Re-draw charts when the slide becomes visible
Reveal.on("slidechanged", function (event) {
  console.log("Slide changed, checking for charts...");
  checkAndCreateCharts();
});

// Error handling
window.addEventListener("error", function (e) {
  console.error("Presentation error:", e.error);
});

// Service worker registration for offline capability (optional)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(function (error) {
    console.log("Service Worker registration failed:", error);
  });
}

// --- START: CUSTOM CODE FOR INTERACTIVE DBSCAN CHARTS ---

//
// CHART 1: Interactive DBSCAN Concepts (Core, Border, Noise)
//
function createInteractiveConceptsChart() {
  // Data ported from your chart_script.py
  const core_data = {
    x: [
      2.39, 2.83, 1.34, 1.56, 1.83, 2.53, 2.06, 1.44, 2.79, 1.79, 2.48, 1.58,
      2.45, 1.54, 1.93, 2.74, 1.53, 2.21, 2.15, 2.05, 1.56, 1.86, 1.46, 1.51,
      2.53, 1.74, 8.79, 8.3, 7.55, 7.53, 7.42, 8.44, 7.91, 8.01, 8.03, 8.35,
      7.82, 8.08, 8.31, 8.13, 7.4, 7.94, 8.87, 8.23, 7.95, 8.26, 7.58, 7.93,
      7.74, 5.09, 5.21, 5.48, 4.26, 4.41, 4.19, 4.38, 4.04, 5.75, 5.82, 6.2,
      5.92, 5.62,
    ],
    y: [
      3.49, 2.04, 3.43, 2.42, 2.94, 2.9, 2.3, 3.89, 2.34, 3.49, 2.43, 3.42,
      3.86, 3.63, 3.25, 2.74, 2.62, 3.4, 2.41, 2.11, 2.76, 3.12, 2.46, 3.01,
      3.2, 2.48, 6.23, 6.13, 6.09, 5.5, 5.67, 5.51, 6.06, 6.32, 5.74, 5.79,
      5.86, 6.3, 6.54, 5.91, 6.15, 5.53, 5.9, 6.34, 6.21, 6.24, 5.89, 6.55,
      5.82, 9.17, 8.62, 9.2, 8.93, 8.11, 8.23, 8.02, 8.21, 9.94, 9.71, 9.91,
      10.15, 9.87,
    ],
  };
  const border_data = {
    x: [
      2.8, 1.89, 2.87, 8.95, 7.15, 6.45, 9.61, 7.19, 8.41, 7.02, 5.42, 3.73,
      4.54, 4.6, 3.52, 6.45, 5.34,
    ],
    y: [
      3.9, 3.91, 2.8, 6.26, 5.8, 6.35, 6.1, 6.29, 5.23, 5.48, 8.31, 8.25, 7.73,
      8.6, 8.02, 10.22, 10.12,
    ],
  };
  const noise_data = {
    x: [
      1.32, 1.98, 2.23, 3.16, 2.86, 3.32, 2.49, 2.87, 3.79, 9.22, 11.23, -0.63,
      6.95, 0.47, 4.29,
    ],
    y: [
      1.88, 4.96, 5.22, 1.1, 0.77, 4.78, 6.1, 4.7, 10.14, 8.44, 2.68, 6.51, 2.0,
      1.25, 1.15,
    ],
  };

  const core_trace = {
    x: core_data.x,
    y: core_data.y,
    mode: "markers",
    name: "Core",
    marker: { color: "#1FB8CD", size: 10 },
    hovertemplate:
      "<b>Core Point</b><br>X: %{x:.2f}<br>Y: %{y:.2f}<extra></extra>",
  };
  const border_trace = {
    x: border_data.x,
    y: border_data.y,
    mode: "markers",
    name: "Border",
    marker: { color: "#B0E0E6", size: 8, line: { color: "#1FB8CD", width: 1 } },
    hovertemplate:
      "<b>Border Point</b><br>X: %{x:.2f}<br>Y: %{y:.2f}<extra></extra>",
  };
  const noise_trace = {
    x: noise_data.x,
    y: noise_data.y,
    mode: "markers",
    name: "Noise",
    marker: { color: "rgba(204, 204, 204, 0.8)", size: 6 },
    hovertemplate:
      "<b>Noise Point</b><br>X: %{x:.2f}<br>Y: %{y:.2f}<extra></extra>",
  };

  const layout = {
    title: { text: "DBSCAN Point Types", font: { color: "white" } },
    showlegend: true,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
    xaxis: {
      title: "X Coordinate",
      color: "white",
      gridcolor: "rgba(255,255,255,0.1)",
    },
    yaxis: {
      title: "Y Coordinate",
      color: "white",
      gridcolor: "rgba(255,255,255,0.1)",
    },
    legend: { font: { color: "white" } },
  };

  Plotly.newPlot(
    "dbscan-interactive-chart",
    [core_trace, border_trace, noise_trace],
    layout,
    { responsive: true }
  );
}

//
// CHART 2: Live DBSCAN Parameter Demo
//
function createLiveDemoChart() {
  console.log("createLiveDemoChart called");
  const epsilonSlider = document.getElementById("epsilon-slider");
  const minSamplesSlider = document.getElementById("minsamples-slider");
  const epsilonValue = document.getElementById("epsilon-value");
  const minSamplesValue = document.getElementById("minsamples-value");

  console.log("Sliders found:", epsilonSlider, minSamplesSlider);
  console.log("Value displays found:", epsilonValue, minSamplesValue);

  if (
    !epsilonSlider ||
    !minSamplesSlider ||
    !epsilonValue ||
    !minSamplesValue
  ) {
    console.error("Some demo chart elements not found");
    return;
  }

  // Better synthetic data for the demo - more clearly separated clusters
  const demoData = [
    // Cluster 1 (bottom-left)
    [1, 1],
    [1.5, 1],
    [2, 1],
    [1, 1.5],
    [1.5, 1.5],
    [2, 1.5],
    [1, 2],
    [1.5, 2],
    [2, 2],
    // Cluster 2 (top-right)
    [7, 7],
    [7.5, 7],
    [8, 7],
    [7, 7.5],
    [7.5, 7.5],
    [8, 7.5],
    [7, 8],
    [7.5, 8],
    [8, 8],
    // Cluster 3 (bottom-right)
    [7, 1],
    [7.5, 1],
    [8, 1],
    [7, 1.5],
    [7.5, 1.5],
    [8, 1.5],
    [7, 2],
    [7.5, 2],
    // Some noise points
    [4, 4],
    [4.5, 9],
    [0.5, 5],
    [9.5, 4],
    [3, 3],
  ];
  const clusterColors = ["#00ffff", "#ff00ff", "#00ff80", "#ffff00", "#ff8000"];

  function updateChart() {
    console.log("updateChart called");
    const epsilon = parseFloat(epsilonSlider.value);
    const minSamples = parseInt(minSamplesSlider.value);
    epsilonValue.textContent = epsilon;
    minSamplesValue.textContent = minSamples;

    console.log(`Running DBSCAN with eps=${epsilon}, minSamples=${minSamples}`);

    // Run DBSCAN with our implementation
    const clusters = dbscan(demoData, epsilon, minSamples);
    console.log("DBSCAN result:", clusters);

    const traces = [];
    const uniqueClusters = [...new Set(clusters)];
    console.log("Unique clusters:", uniqueClusters);

    uniqueClusters.forEach((clusterId) => {
      const points = { x: [], y: [] };
      clusters.forEach((cluster, pointIndex) => {
        if (cluster === clusterId) {
          points.x.push(demoData[pointIndex][0]);
          points.y.push(demoData[pointIndex][1]);
        }
      });

      if (clusterId === -1) {
        // Noise points
        traces.push({
          x: points.x,
          y: points.y,
          mode: "markers",
          name: "Noise",
          marker: { color: "rgba(204, 204, 204, 0.8)", size: 8 },
        });
      } else {
        // Cluster points
        traces.push({
          x: points.x,
          y: points.y,
          mode: "markers",
          name: `Cluster ${clusterId + 1}`,
          marker: {
            color: clusterColors[clusterId % clusterColors.length],
            size: 12,
          },
        });
      }
    });

    const layout = {
      showlegend: true,
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
      xaxis: {
        title: "X",
        color: "white",
        gridcolor: "rgba(255,255,255,0.1)",
        range: [-1, 10],
      },
      yaxis: {
        title: "Y",
        color: "white",
        gridcolor: "rgba(255,255,255,0.1)",
        range: [-1, 10],
      },
      legend: { font: { color: "white" } },
      transition: { duration: 300, easing: "cubic-in-out" },
    };

    console.log("Creating plot with traces:", traces);
    try {
      Plotly.react("dbscan-demo-chart", traces, layout, { responsive: true });
      console.log("Plot created successfully");
    } catch (error) {
      console.error("Error creating plot:", error);
    }
  }

  epsilonSlider.addEventListener("input", updateChart);
  minSamplesSlider.addEventListener("input", updateChart);

  // Initial chart draw
  updateChart();
}

// --- END: CUSTOM CODE ---
