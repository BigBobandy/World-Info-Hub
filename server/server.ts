const express = require("express");
const cors = require("cors");
import path from "path";

const app = express();

// Enable CORS for all requests
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Import routes
import countriesRoutes from "./routes/countriesRoutes";

// Use routes
app.use("/api", countriesRoutes);

// Set the port that the server will listen on
const PORT = process.env.PORT || 3000;

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, "../client")));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
