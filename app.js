const express = require("express");
const { connectMongoDb } = require("./db/connection");
const userRoute = require("./modules/user/routes/userRoute");
const otpRoute = require("./modules/shared/routes/otpRoute");
const couponRoute = require("./modules/shared/routes/couponRoute");
const vendorRoute = require("./modules/vendor/routes/vendorRoutes");
const appoinementRoute = require("./modules/shared/routes/apppiointmentRoute");
const PasswordRoute = require("./modules/shared/routes/passwordRoute");
const errorhandlingmiddleware = require("./modules/shared/middleware/errorhandlingmiddleware");
const BankRoute = require("./modules/shared/routes/bankRoute");
const reviewRoute = require("./modules/shared/routes/reviewRoute");
const salonRoute = require("./modules/user/routes/salonInfoRoute");
const session = require("express-session");
const scheduleJobs = require("./modules/shared/services/cornJobs");
const app = express();

// for cloudnery
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// middleware

// connect mongodb
connectMongoDb(process.env.DB_URL)
  .then(() => {
    console.log("mongodb connected");
    scheduleJobs();
  })
  .catch((err) => console.log(err));

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      //secure: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.use("/api/user", userRoute);
app.use("/api/otp", otpRoute);
app.use("/api/vendor", vendorRoute);
app.use("/api/appointment", appoinementRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/password", PasswordRoute);
app.use("/api/bankaccount", BankRoute);
app.use("/api/review", reviewRoute);
app.use("/api/salon", salonRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/images/cloudnery", async (req, res) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "demo",
    resource_type: "image",
  };

  try {
    const result = await cloudinary.uploader.upload(
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
      options
    );

    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
// Use the error handling middleware
app.use(errorhandlingmiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} `);
});
