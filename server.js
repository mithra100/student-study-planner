const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student Study Planner Server is Running!");
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "Student Study Planner API is working"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});