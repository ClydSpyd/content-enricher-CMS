const express = require("express");
const rssRoutes = require("./routes/rss-data");
const testRoutes = require("./routes/test");
const articleRoutes = require("./routes/article");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const path = require("path");

const PORT = process.env.PORT || 6969;
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/test", testRoutes);
app.use("/api/rss", rssRoutes);
app.use("/api/article", articleRoutes);

// Serve static files from the assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "main.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
