require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8800;

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json(); // parse application/json
const urlencodedParser = bodyParser.urlencoded({ extended: false }); // parse application/x-www-form-urlencoded

// Conexión a MongoDB
const dbConnect = require("./connection/dbConnect");
dbConnect();

// Middleware
app.use(jsonParser);
app.use(urlencodedParser);

// Rutas
const authRouter = require("./routes/authRoute");
app.use("/api/user", jsonParser, authRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running! Port: ${PORT}`);
});
