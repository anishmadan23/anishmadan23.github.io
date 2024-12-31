window.HELP_IMPROVE_VIDEOJS = false;

// var INTERP_BASE = "./static/interpolation/stacked";
// var NUM_INTERP_FRAMES = 240;

// var interp_images = [];
// function preloadInterpolationImages() {
//   for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
//     var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
//     interp_images[i] = new Image();
//     interp_images[i].src = path;
//   }
// }

// function setInterpolationImage(i) {
//   var image = interp_images[i];
//   image.ondragstart = function() { return false; };
//   image.oncontextmenu = function() { return false; };
//   $('#interpolation-image-wrapper').empty().append(image);
// }

function playVids(videoId) {
  var videoMerge = document.getElementById(videoId + "Merge");
  var vid = document.getElementById(videoId);

  var position = 0.5;
  var vidWidth = vid.videoWidth/2;
  var vidHeight = vid.videoHeight;

  var mergeContext = videoMerge.getContext("2d");

  
  if (vid.readyState > 3) {
      vid.play();

      function trackLocation(e) {
          // Normalize to [0, 1]
          bcr = videoMerge.getBoundingClientRect();
          position = ((e.pageX - bcr.x) / bcr.width);
      }
      function trackLocationTouch(e) {
          // Normalize to [0, 1]
          bcr = videoMerge.getBoundingClientRect();
          position = ((e.touches[0].pageX - bcr.x) / bcr.width);
      }

      // videoMerge.addEventListener("mousemove",  trackLocation, false); 
      // videoMerge.addEventListener("touchstart", trackLocationTouch, false);
      // videoMerge.addEventListener("touchmove",  trackLocationTouch, false);

      videoMerge.removeEventListener("mousemove", trackLocation, false);
      videoMerge.removeEventListener("touchstart", trackLocationTouch, false);
      videoMerge.removeEventListener("touchmove", trackLocationTouch, false);

      videoMerge.addEventListener("mousemove", trackLocation, false);
      videoMerge.addEventListener("touchstart", trackLocationTouch, false);
      videoMerge.addEventListener("touchmove", trackLocationTouch, false);

      function drawLoop() {
          mergeContext.drawImage(vid, 0, 0, vidWidth, vidHeight, 0, 0, vidWidth, vidHeight);
          var colStart = (vidWidth * position).clamp(0.0, vidWidth);
          var colWidth = (vidWidth - (vidWidth * position)).clamp(0.0, vidWidth);
          mergeContext.drawImage(vid, colStart+vidWidth, 0, colWidth, vidHeight, colStart, 0, colWidth, vidHeight);
          requestAnimationFrame(drawLoop);

          
          var arrowLength = 0.09 * vidHeight;
          var arrowheadWidth = 0.025 * vidHeight;
          var arrowheadLength = 0.04 * vidHeight;
          var arrowPosY = vidHeight / 10;
          var arrowWidth = 0.007 * vidHeight;
          var currX = vidWidth * position;

          // Draw circle
          mergeContext.arc(currX, arrowPosY, arrowLength*0.7, 0, Math.PI * 2, false);
          mergeContext.fillStyle = "#FFD79340";
          mergeContext.fill()
          //mergeContext.strokeStyle = "#444444";
          //mergeContext.stroke()
          
          // Draw border
          mergeContext.beginPath();
          mergeContext.moveTo(vidWidth*position, 0);
          mergeContext.lineTo(vidWidth*position, vidHeight);
          mergeContext.closePath()
          mergeContext.strokeStyle = "#AAAAAA";
          mergeContext.lineWidth = 5;            
          mergeContext.stroke();

          // Draw arrow
          mergeContext.beginPath();
          mergeContext.moveTo(currX, arrowPosY - arrowWidth/2);
          
          // Move right until meeting arrow head
          mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY - arrowWidth/2);
          
          // Draw right arrow head
          mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY - arrowheadWidth/2);
          mergeContext.lineTo(currX + arrowLength/2, arrowPosY);
          mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY + arrowheadWidth/2);
          mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY + arrowWidth/2);

          // Go back to the left until meeting left arrow head
          mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY + arrowWidth/2);
          
          // Draw left arrow head
          mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY + arrowheadWidth/2);
          mergeContext.lineTo(currX - arrowLength/2, arrowPosY);
          mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY  - arrowheadWidth/2);
          mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY);
          
          mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY - arrowWidth/2);
          mergeContext.lineTo(currX, arrowPosY - arrowWidth/2);

          mergeContext.closePath();

          mergeContext.fillStyle = "#AAAAAA";
          mergeContext.fill();

          
          
      }
      requestAnimationFrame(drawLoop);
  } 
}

Number.prototype.clamp = function(min, max) {
return Math.min(Math.max(this, min), max);
};
  
  
function resizeAndPlay(element)
{
var cv = document.getElementById(element.id + "Merge");
cv.width = element.videoWidth/2;
cv.height = element.videoHeight;


element.play();
// element.style.height = "0px";  // Hide video without stopping it
console.log(`Video dimensions: ${element.videoWidth}x${element.videoHeight}`);
console.log(`Canvas dimensions: ${cv.width}x${cv.height}`);
playVids(element.id);
}

// function playVids(videoId) {
//   const videoMerge = document.getElementById(videoId + "Merge");
//   const vid = document.getElementById(videoId);
//   const slider = document.getElementById("slider");

//   let position = slider.value / 100; // Initialize position from slider value
//   const vidWidth = vid.videoWidth / 2;
//   const vidHeight = vid.videoHeight;
//   const mergeContext = videoMerge.getContext("2d");

//   function updatePositionFromSlider() {
//     position = slider.value / 100; // Map slider value [0, 100] to [0.0, 1.0]
//   }

//   slider.addEventListener("input", updatePositionFromSlider);

//   if (vid.readyState > 3) {
//     vid.play();

//     function drawLoop() {
//       mergeContext.clearRect(0, 0, videoMerge.width, videoMerge.height);

//       mergeContext.drawImage(vid, 0, 0, vidWidth, vidHeight, 0, 0, vidWidth, vidHeight);
//       const colStart = (vidWidth * position).clamp(0.0, vidWidth);
//       const colWidth = (vidWidth - (vidWidth * position)).clamp(0.0, vidWidth);
//       mergeContext.drawImage(vid, colStart + vidWidth, 0, colWidth, vidHeight, colStart, 0, colWidth, vidHeight);

//       requestAnimationFrame(drawLoop);
//     }

//     requestAnimationFrame(drawLoop);
//   }
// }

// Number.prototype.clamp = function (min, max) {
//   return Math.min(Math.max(this, min), max);
// };

// function resizeAndPlay(element) {
//   const cv = document.getElementById(element.id + "Merge");
//   cv.width = element.videoWidth / 2;
//   cv.height = element.videoHeight;

//   element.play();
//   playVids(element.id);
// }

// // Function to load a new video
// function loadVideo(videoId, videoPath) {
//   const videoElement = document.getElementById(videoId);
//   const slider = document.getElementById("slider");

//   // Stop the current video
//   videoElement.pause();

//   // Update the video source
//   videoElement.src = videoPath;

//   // Reset the slider to the middle
//   slider.value = 50;

//   // Reload and play the video
//   videoElement.load();
//   videoElement.play();

//   // Resize and play
//   resizeAndPlay(videoElement);
// }


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 8,
			loop: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
    
    // // Loop on each carousel initialized
    // for(var i = 0; i < carousels.length; i++) {
    // 	// Add listener to  event
    // 	carousels[i].on('before:show', state => {
    // 		console.log(state);
    // 	});
    // }

    // // Access to bulmaCarousel instance of an element
    // var element = document.querySelector('#carouselVideoReconstruction');
    // if (element && element.bulmaCarousel) {
    // 	// bulmaCarousel instance is available as element.bulmaCarousel
    // 	element.bulmaCarousel.on('before-show', function(state) {
    // 		console.log(state);
    // 	});
    // }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    // preloadInterpolationImages();

    // $('#interpolation-slider').on('input', function(event) {
    //   setInterpolationImage(this.value);
    // });
    // setInterpolationImage(0);
    // $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    // bulmaSlider.attach();

})