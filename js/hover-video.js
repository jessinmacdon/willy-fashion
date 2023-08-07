// Get all video elements with the class "hover-video"
const hoverVideos = document.querySelectorAll(".hover-video");

// Add event listeners for video hover
hoverVideos.forEach((video) => {
	video.addEventListener("mouseenter", () => {
		video.play();
	});

	video.addEventListener("mouseleave", () => {
		video.pause();
		video.currentTime = 0;
	});
});
