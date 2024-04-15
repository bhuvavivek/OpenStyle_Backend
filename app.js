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

// Use the error handling middleware
app.use(errorhandlingmiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} `);
});
