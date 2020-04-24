module.exports.createAndCountCookies = (req, res, next) => {
  if (!req.cookies.count) {
    res.cookie("count", 1);
    next();
  }
  let newValue = parseInt(req.cookies.count);
  newValue += 1;
  res.cookie("count", newValue);
  console.log(req.cookies);
  next();
};
