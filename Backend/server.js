const express = require("express");

const app = express();
const PORT = 3000;

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Server is healthy",
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
