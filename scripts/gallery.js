const imagesContainer = document.querySelector(".images-container");
const modal = document.getElementById("gallery-modal");
const modalImage = document.querySelector(".modal-image");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const closeButton = document.querySelector(".close-button");

let currentImageIndex = 0;
let images = [];

// Create an array of image URLs
imagesContainer.querySelectorAll("img").forEach((img) => {
	images.push(img.src);
});

// Open the modal and display the clicked image
imagesContainer.addEventListener("click", (event) => {
	const clickedImage = event.target.closest(".gallery-item img");
	if (clickedImage) {
		const clickedIndex = images.indexOf(clickedImage.src);
		if (clickedIndex !== -1) {
			currentImageIndex = clickedIndex;
			modalImage.src = images[currentImageIndex];
			modal.style.display = "flex";
		}
	}
});

// Close the modal
closeButton.addEventListener("click", () => {
	modal.style.display = "none";
});

// Navigate to the previous image
prevButton.addEventListener("click", () => {
	currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
	modalImage.src = images[currentImageIndex];
});

// Navigate to the next image
nextButton.addEventListener("click", () => {
	currentImageIndex = (currentImageIndex + 1) % images.length;
	modalImage.src = images[currentImageIndex];
});

// Close the modal when clicking outside the image
window.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.style.display = "none";
	}
});

// Close the modal when pressing the Escape key
window.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		modal.style.display = "none";
	}
});
