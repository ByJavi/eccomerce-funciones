const { default: mongoose } = require("mongoose");
const URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successful connection to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
module.exports = dbConnect;
