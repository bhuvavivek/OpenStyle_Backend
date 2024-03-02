function setFlag(flag = false) {
  return function (req, res, next) {
    req.isforgotpassword = flag;
    next();
  };
}

module.exports = { setFlag };
