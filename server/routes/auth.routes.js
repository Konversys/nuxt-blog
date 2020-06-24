const { Router } = require("express");
const { login, createUser } = require("../controllers/auth.controller");
const router = Router();

router.post("/admin/login", login);
router.post("/admin/createUser", createUser);

module.exports = router;
