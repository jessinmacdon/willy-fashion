window.addEventListener("DOMContentLoaded", (event) => {
	var form = document.getElementById("appointmentForm");
	var modal = document.getElementById("loaderModal");
	var successMessage = document.getElementById("successMessage");
	var errorMessage = document.getElementById("errorMessage");
	var loadingMessage = document.querySelector(".loading-message");

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		var dateField = document.getElementById("appointmentDate");
		var timeField = document.getElementById("appointmentTime");
		var nameField = document.getElementById("appointmentName");
		var phoneField = document.getElementById("appointmentPhone");
		var serviceField = document.getElementById("appointmentService");

		var rawDate = new Date(dateField.value);
		var formattedDate = `${rawDate.getDate()}-${
			rawDate.getMonth() + 1
		}-${rawDate.getFullYear()}`;

		if (
			formattedDate === "" ||
			timeField.value === "" ||
			nameField.value === "" ||
			phoneField.value === "" ||
			serviceField.value === "0"
		) {
			alert("Please fill out all fields and select a service.");
			return;
		}

		modal.style.display = "block";
		loadingMessage.style.display = "block";
		successMessage.style.display = "none";
		errorMessage.style.display = "none";

		var formData = {
			date: formattedDate,
			time: timeField.value,
			name: nameField.value,
			phone: phoneField.value,
			service: serviceField.value,
		};

		var message = `New Appointment:
			Name: ${formData.name}
			Phone: ${formData.phone}
			Date: ${formData.date}
			Time: ${formData.time}
			Service: ${formData.service}`;

		message = message.replace(/(?:\r\n|\r|\n)/g, "\n");

		//post new appointment information to make/integromat
		fetch("https://hook.eu2.make.com/nmxg8s68yh3q1iy8udq6o8awh496e6la", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message: message }),
		})
			.then((response) => response.text())
			.then((data) => {
				console.log(data);

				// Handle the response text as needed
				if (data === "Accepted") {
					// Handle success
					loadingMessage.style.display = "none";
					successMessage.style.display = "block";
					// Show the modal
					$("#loaderModal").modal("show");
					// Hide the modal after 2 seconds
					setTimeout(function () {
						$("#loaderModal").modal("hide");
					}, 2000);
				} else {
					// Handle failure
					loadingMessage.style.display = "none";
					errorMessage.style.display = "block";
					// Show the modal
					$("#loaderModal").modal("show");
					// Hide the modal after 2 seconds
					setTimeout(function () {
						$("#loaderModal").modal("hide");
					}, 2000);
				}
			})
			.catch((error) => {
				console.error("Error sending form data:", error);
				modal.style.display = "none";
				errorMessage.style.display = "block";
			});
	});
});
