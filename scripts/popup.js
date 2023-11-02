window.addEventListener("DOMContentLoaded", (event) => {
	var form = document.getElementById("appointmentForm");
	var modal = document.getElementById("loaderModal");
	var successMessage = document.getElementById("successMessage");
	var errorMessage = document.getElementById("errorMessage");
	var loadingMessage = document.querySelector(".loading-message");

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		// Get form fields by their IDs inside the event listener
		var dateField = document.getElementById("appointmentDate");
		var timeField = document.getElementById("appointmentTime");
		var nameField = document.getElementById("appointmentName");
		var phoneField = document.getElementById("appointmentPhone");
		var serviceField = document.getElementById("appointmentService");

		var rawDate = new Date(dateField.value);
		var formattedDate = `${rawDate.getDate()}-${
			rawDate.getMonth() + 1
		}-${rawDate.getFullYear()}`;

		// Check if any of the fields are empty
		if (
			formattedDate === "" ||
			timeField.value === "" ||
			nameField.value === "" ||
			phoneField.value === "" ||
			serviceField.value === "0"
		) {
			// Handle empty fields here, if needed
			alert("Please fill out all fields and select a service.");
			return;
		}

		// Show the modal and loading message
		modal.style.display = "block";
		loadingMessage.style.display = "block";
		successMessage.style.display = "none";
		errorMessage.style.display = "none";

		// Delay hiding the loading message for 3 seconds
		setTimeout(function () {
			loadingMessage.style.display = "none";

			// Construct the formData object inside the event listener
			var formData = {
				date: formattedDate,
				time: timeField.value,
				name: nameField.value,
				phone: phoneField.value,
				service: serviceField.value,
			};

			// Assuming you have your form data in an object named formData
			var message = `New Appointment:
          Name: ${formData.name}
          Phone: ${formData.phone}
          Date: ${formData.date}
          Time: ${formData.time}
          Service: ${formData.service}`;

			// Adding newline characters between each element
			message = message.replace(/(?:\r\n|\r|\n)/g, "\n");

			fetch(form.action, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: message }),
			})
				.then((response) => response.json())
				.then((data) => {
					// Handle response from your server if necessary
					console.log(data);

					// Show appropriate message inside the modal
					if (data.success) {
						loadingMessage.style.display = "none";
						successMessage.style.display = "block";
					} else {
						loadingMessage.style.display = "none";
						errorMessage.style.display = "block";
					}
				})
				.catch((error) => {
					// Handle errors if the request fails
					console.error("Error sending form data:", error);

					// Hide the modal and update its content
					modal.style.display = "none";
					errorMessage.style.display = "block";
				});
		}, 3000); // 3000 milliseconds = 3 seconds
	});

	function closeModal() {
		// Close the modal and reset its content
		modal.style.display = "none";
		loadingMessage.style.display = "block";
		successMessage.style.display = "none";
		errorMessage.style.display = "none";
	}
});
