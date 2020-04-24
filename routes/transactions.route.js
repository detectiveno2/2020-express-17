const express = require("express");

const controller = require("../controllers/transactions.controller");
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
  "/complete/:id",
  cookieMiddleware.createAndCountCookies,
  controller.complete
);

module.exports = router;
