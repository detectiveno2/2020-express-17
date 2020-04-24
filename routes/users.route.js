const express = require("express");

const controller = require("../controllers/users.controller");
const cookieMiddleware = require("../middlewares/cookies.middleware");
const validate = require("../validate/users.validate");

const router = express.Router();

router.get("/", cookieMiddleware.createAndCountCookies, controller.index);

router.get(
  "/create",
  cookieMiddleware.createAndCountCookies,
  controller.create
);

router.post(
  "/create",
  cookieMiddleware.createAndCountCookies,
  validate.checkLength,
  controller.postCreate
);

router.get(
  "/edit/:id",
  cookieMiddleware.createAndCountCookies,
  controller.edit
);

router.post(
  "/edit",
  cookieMiddleware.createAndCountCookies,
  validate.checkLength,
  controller.postEdit
);

router.get(
  "/delete/:id",
  cookieMiddleware.createAndCountCookies,
  controller.delete
);

module.exports = router;
