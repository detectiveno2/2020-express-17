const shortid = require("shortid");

const db = require("../db");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};

module.exports.edit = (req, res) => {
  let user = db
    .get("users")
    .find({ id: req.params.id })
    .value();
  res.render("users/edit", {
    id: user.id,
    oldName: user.name,
    oldPhone: user.phone
  });
};

module.exports.postEdit = (req, res) => {
  db.get("users")
    .find({ id: req.body.id })
    .assign(req.body)
    .write();
  res.redirect("/users");
};

module.exports.delete = (req, res) => {
  db.get("users")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/users");
};
