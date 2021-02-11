const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const clothing = require("./routes/clothing");
const review = require("./routes/review");
const cart = require("./routes/cart");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

// Load Env
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use(fileupload());
app.use(helmet());
app.use(xss());
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/clothings", express.static("/api/v1/clothings"), clothing);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reviews", review);
app.use("/api/v1/carts", cart);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
}

app.use(error);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started at ${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
