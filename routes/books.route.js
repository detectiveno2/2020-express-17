const express = require("express");

const controller = require("../controllers/books.controller");
const cookieMiddleware = require("../middlewares/cookies.middleware");

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
  controller.postEdit
);

router.get(
  "/delete/:id",
  cookieMiddleware.createAndCountCookies,
  controller.delete
);

module.exports = router;
