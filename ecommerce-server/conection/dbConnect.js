const { default: mongoose } = require("mongoose");
const URI = process.env.MONGODB_URI;

const dbConnect = () => {
  try {
    // Example mongodb://localhost:27017/ecommerce
    const conn = mongoose.connect(URI);
    console.log("¡Conexión exitosa con la base de datos!");
  } catch (error) {
    // throw new Error(error);
    console.log("¡Error al conectarse a la base de datos!");
  }
};

module.exports = dbConnect;
