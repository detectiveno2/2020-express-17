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

  if (user.wrongLoginCount > 3) {
    res.render("auth/login", {
      error: "Your account is locked."
    });
    return;
  }

  console.log(user.wrongLoginCount);

  if (!user) {
    res.render("auth/login", {
      error: "User does not exist."
    });
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result === false) {
      let newValue = (user.wrongLoginCount += 1);
      db.get("users")
        .find({ id: user.id })
        .assign({ wrongLoginCount: newValue })
        .write();
      res.render("auth/login", {
        error: "Wrong password.",
        values: req.body
      });

      return;
    }

    res.cookie("userId", user.id);

    res.redirect("/users");
  });

  return;
};
