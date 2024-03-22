require("dotenv").config();

const express = require("express");
const { connectMongoDb } = require("./db/connection");
const userRoute = require("./modules/user/routes/userRoute");
const otpRoute = require("./modules/shared/routes/otpRoute");
const vendorRoute = require("./modules/vendor/routes/vendorRoutes");
const errorhandlingmiddleware = require("./modules/shared/middleware/errorhandlingmiddleware");
const app = express();

const PORT = process.env.PORT || 3000;

// middleware

// connect mongodb
connectMongoDb(process.env.DB_URL)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/otp", otpRoute);
app.use("/api/vendor", vendorRoute);

// Use the error handling middleware
app.use(errorhandlingmiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} `);
});
