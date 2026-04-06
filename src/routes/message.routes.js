const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

router.get("/message", requireAuth, messageController.message);

module.exports = router;