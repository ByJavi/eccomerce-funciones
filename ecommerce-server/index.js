require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8800;

const dbConnect = require("./conection/dbConnect");
dbConnect();

app.use("/", (req, res) => {
  res.send("Index");
});

app.listen(PORT, () => {
  console.log(`¡Servidor en ejecución! PORT: ${PORT}`);
});
