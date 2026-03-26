const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

router.get("/info", requireAuth, usersController.renderUserInfos);

module.exports = router;