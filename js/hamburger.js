document.addEventListener("DOMContentLoaded", function () {
	const hamburgerButton = document.querySelector(".hamburger-button");
	const navigationWrapper = document.querySelector(".main-navigation-wrapper");

	hamburgerButton.addEventListener("click", function () {
		navigationWrapper.classList.toggle("hamburger-menu-open");
	});
});
