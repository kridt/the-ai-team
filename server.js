import express from "express";

const app = express();
const PORT = 3000;

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
