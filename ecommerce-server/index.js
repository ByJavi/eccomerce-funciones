require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8800;

// connect to MongoDB
const dbConnect = require("./connection/dbConnect");
dbConnect();

// Middleware
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json(); // parse application/json
const urlencodedParser = bodyParser.urlencoded({ extended: false }); // parse application/x-www-form-urlencoded
app.use(jsonParser);
app.use(urlencodedParser);

const { notFound, errorHandler } = require("./middlewares/errorHandler");
app.use(notFound);
app.request(errorHandler);

// Routes
const authRouter = require("./routes/authRoute");
app.use("/api/user", jsonParser, authRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running! Port: ${PORT}`);
});
