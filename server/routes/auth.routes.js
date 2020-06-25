const { Router } = require("express");
const { login, createUser } = require("../controllers/auth.controller");
const router = Router();

router.post("/admin/login", login); // api/auth/admin/login
router.post("/admin/createUser", createUser); // api/auth/admin/createUser

module.exports = router;
