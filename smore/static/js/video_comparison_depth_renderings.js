// Variables for keeping track of the current video
let currentVideoIndex = 1; // Starts at video 1

// Video paths for buttons (modify this array to include paths)
const videoPaths = [
  "../smore/static/videos/video_recon/combined_neurad_output_inferno_rs.mp4",
  "../smore/static/videos/video_recon/combined_neurad_output_inferno_rs.mp4",
  "../smore/static/videos/video_recon/combined_neurad_output_inferno_rs.mp4",
];

// Select video buttons container, video element, and counter
const videoButtonsContainer = document.getElementById('videoButtonsContainer'); // Container for video buttons
const videoElement = document.getElementById('videocompare');
const videoSource = document.getElementById('videosrc');
const videoCounter = document.getElementById('videoCounter');

// Initialize video buttons
function initializeVideoButtons() {
  videoPaths.forEach((path, index) => {
    const button = document.createElement('button');
    button.textContent = `Video ${index + 1}`;
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
  const videoPath = videoPaths[currentVideoIndex - 1];

  videoSource.src = videoPath;
  videoElement.load();

  videoCounter.innerText = `Video ${currentVideoIndex} of ${videoPaths.length}`;
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
