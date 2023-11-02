const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//enable Cors - all requests
app.use(cors());
app.use(express.static("/public"));

// Define routes for your HTML pages
app.get("/", (req, res) => {
	res.sendFile("public/index.html", { root: __dirname });
});

app.get("/gallery", (req, res) => {
	res.sendFile("public/gallery.html", { root: __dirname });
});

app.get("/prices", (req, res) => {
	res.sendFile("public/prices.html", { root: __dirname });
});

app.post("/submit-form", async (req, res) => {
	try {
		const integromatURL =
			"https://hook.eu2.make.com/nmxg8s68yh3q1iy8udq6o8awh496e6la";
		const response = await axios.post(integromatURL, req.body, {
			headers: { "Content-Type": "application/json" },
		});

		// Handle response from Integromat if necessary
		console.log("Integromat Response:", response.data);

		res.status(200).json({ success: true });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
