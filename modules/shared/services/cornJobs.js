const corn = require("node-cron");
const Coupon = require("../models/coupon/coupon");

const checkAndExpireCoupens = async () => {
  console.log("Running a job at 11:00 am and 11:55 pm every day");
  const now = Date.now();

  await Coupon.updateMany(
    { expireDate: { $lt: now }, isExpired: false },
    { isExpired: true }
  );
};

const scheduleJobs = () => {
  corn.schedule("55 11,23 * * *", checkAndExpireCoupens);
};

module.exports = scheduleJobs;
