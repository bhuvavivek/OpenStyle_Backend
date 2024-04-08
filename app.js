const express = require("express");
const { connectMongoDb } = require("./db/connection");
const userRoute = require("./modules/user/routes/userRoute");
const otpRoute = require("./modules/shared/routes/otpRoute");
const couponRoute = require("./modules/shared/routes/couponRoute");
const vendorRoute = require("./modules/vendor/routes/vendorRoutes");
const appoinementRoute = require("./modules/shared/routes/apppiointmentRoute");
const PasswordRoute = require("./modules/shared/routes/passwordRoute");
const errorhandlingmiddleware = require("./modules/shared/middleware/errorhandlingmiddleware");
const session = require("express-session");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// middleware

// connect mongodb
connectMongoDb(process.env.DB_URL)
  .then(() => console.log("mongodb connected"))
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

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Use the error handling middleware
app.use(errorhandlingmiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} `);
});
