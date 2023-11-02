document.addEventListener("DOMContentLoaded", function () {
	const hamburgerButton = document.querySelector(".hamburger input");
	const modal = document.querySelector(".nav-sm-modal");
	const modalContent = document.querySelector(".nav-links-wrapper");

	hamburgerButton.addEventListener("click", function () {
		modal.classList.toggle("modal-open");
	});

	// Close modal when any click occurs within the modal content area
	modalContent.addEventListener("click", function (event) {
		// Check if the clicked element is a link or not
		if (!event.target.closest("a")) {
			modal.classList.remove("modal-open");
		}
	});
});
