const bcrypt = require("bcrypt");

const db = require("../db");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = db
    .get("users")
    .find({ email: email })
    .value();

  if (!user) {
    res.render("auth/login", {
      error: "User does not exist."
    });
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    console.log(result);
    if (result === false) {
      res.render("auth/login", {
        error: "Wrong password.",
        values: req.body
      });
      return;
    }

    res.cookie("userId", user.id, { signed: true });

    res.redirect("/users");
  });

  return;
};
