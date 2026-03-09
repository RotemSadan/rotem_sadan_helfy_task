const express = require("express");
const taskRoutes = require("./routes/routes");
const { applyMiddleware } = require("./middleware/middleware");

const app = express();
const PORT = 3001;


applyMiddleware(app);

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});