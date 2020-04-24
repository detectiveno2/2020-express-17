module.exports.checkLength = (req, res, next) => {
  if (req.body.name.length > 30) {
    res.render("users/create", {
      error: "Your name is so long, it's over 30 characters"
    });
    return;
  }
  next();
};
