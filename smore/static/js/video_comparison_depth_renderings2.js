// Variables for keeping track of the current video
let currentVideoIndex = 1; // Starts at video 1

// Video paths and custom labels for buttons
const videoData = [
  { path: "../smore/static/videos/depth_renderings/scene-0011/scene0011.mp4", label: "scene-0011" },
  { path: "../smore/static/videos/depth_renderings/scene-0103/scene0103.mp4", label: "scene-0103" },
  { path: "../smore/static/videos/depth_renderings/scene-0247/scene0247.mp4", label: "scene-0247" },
];

// Select video buttons container, video element, and counter
const videoButtonsContainer = document.getElementById('videoButtonsContainer'); // Container for video buttons
const videoElement = document.getElementById('videocompare');
const videoSource = document.getElementById('videosrc');
const videoCounter = document.getElementById('videoCounter');

// Initialize video buttons
function initializeVideoButtons() {
  videoData.forEach((data, index) => {
    const button = document.createElement('button');
    button.textContent = data.label; // Use custom label for the button
    button.value = index + 1;
    button.classList.add('video-button');
    if (index + 1 === currentVideoIndex) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      currentVideoIndex = index + 1;
      updateVideoSource();
      updateActiveButton();
    });
    videoButtonsContainer.appendChild(button);
  });
}

// Update video source based on currentVideoIndex
function updateVideoSource() {
  const videoPath = videoData[currentVideoIndex - 1].path;

  videoSource.src = videoPath;
  videoElement.load();

  videoCounter.innerText = `Playing: ${videoData[currentVideoIndex - 1].label}`;
}

// Update the active button style
function updateActiveButton() {
  const buttons = document.querySelectorAll('.video-button');
  buttons.forEach((button, index) => {
    if (index + 1 === currentVideoIndex) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Initialize on window load
window.onload = function () {
  initializeVideoButtons();
  updateVideoSource();
};
