const { Router } = require("express");
const passport = require("passport");
const controller = require("../controllers/comment.controller");
const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.create
);

module.exports = router;
